declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq: any;
    _fbq: any;
  }
}

const PIXEL_ID = "2457911544687621";

function ensureFbq(): void {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line no-prototype-builtins
  if (window.hasOwnProperty("fbq") && window.fbq) return;

  // eslint-disable-next-line prefer-const
  let f: any = (window.fbq = function () {
    f.callMethod ? f.callMethod(...arguments) : f.queue.push(arguments);
  });
  if (!window._fbq) window._fbq = f;
  f.push = f;
  f.loaded = true;
  f.version = "2.0";
  f.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", PIXEL_ID);
}

export function trackPageView(): void {
  ensureFbq();
  window.fbq("track", "PageView");
}

export function trackViewContent(): void {
  ensureFbq();
  window.fbq("track", "ViewContent");
}

export function trackAddToCart(): void {
  ensureFbq();
  window.fbq("track", "AddToCart");
}

export function trackInitiateCheckout(): void {
  ensureFbq();
  window.fbq("track", "InitiateCheckout");
}

export function trackContact(): void {
  ensureFbq();
  window.fbq("track", "Contact");
}

export async function sendCAPIEvent(
  eventName: string,
  customData?: Record<string, unknown>,
): Promise<void> {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_name: eventName, custom_data: customData }),
    });
  } catch {
    // Silently fail — never block the user experience
  }
}
