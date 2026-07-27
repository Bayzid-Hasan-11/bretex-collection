import { NextRequest, NextResponse } from "next/server";

const PIXEL_ID = process.env.META_PIXEL_ID || "2457911544687621";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || "";
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || "";
const GRAPH_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "0.0.0.0";
}

function hashValue(value: string): string {
  // Node 16+ has createHash on require("crypto")
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const crypto = require("crypto");
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  if (!ACCESS_TOKEN) {
    return NextResponse.json({ ok: false, error: "Missing CAPI access token" }, { status: 500 });
  }

  try {
    const { event_name, custom_data } = await req.json();

    const userData: Record<string, unknown> = {
      client_ip_address: getClientIp(req),
      client_user_agent: req.headers.get("user-agent") || "",
    };

    // Include hashed phone if provided
    if (custom_data?.phone) {
      userData.ph = [hashValue(custom_data.phone)];
    }

    const eventEntry: Record<string, unknown> = {
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      event_source_url: req.headers.get("origin") || "https://bretex-collection.vercel.app",
      user_data: userData,
    };

    if (custom_data && Object.keys(custom_data).length > 0) {
      eventEntry.custom_data = custom_data;
    }

    const payload: Record<string, unknown> = {
      data: [eventEntry],
    };

    if (TEST_EVENT_CODE) {
      (payload as Record<string, unknown>).test_event_code = TEST_EVENT_CODE;
    }

    const res = await fetch(GRAPH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("[CAPI] Meta API error:", result);
      return NextResponse.json({ ok: false, error: result }, { status: res.status });
    }

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("[CAPI] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
