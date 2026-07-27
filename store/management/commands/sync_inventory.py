import gspread
from google.oauth2.service_account import Credentials
from django.core.management.base import BaseCommand
from store.models import Product

class Command(BaseCommand):
    help = 'Syncs inventory from Google Sheets to the database'

    def handle(self, *args, **kwargs):
        self.stdout.write("Connecting to Google Sheets...")
        
        # 1. Authorize with your JSON key
        scopes = [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive'
        ]
        creds = Credentials.from_service_account_file('credentials.json', scopes=scopes)
        client = gspread.authorize(creds)
        
        # 2. Open the sheet and get all rows
        try:
            sheet = client.open('BreTex Inventory').sheet1
            data = sheet.get_all_records()
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Could not open sheet: {e}"))
            return
        
        # 3. Loop through the rows and update PostgreSQL
        for row in data:
            # We use 'slug' to check if the product already exists
# 3. Loop through the rows and update PostgreSQL
            for row in data:
                # We use 'slug' to check if the product already exists
                product, created = Product.objects.update_or_create(
                    slug=row['slug'],
                    defaults={
                        'name': row['name'],
                        'price': row['price'],
                        'stock': row['stock'],
                        # We use .get() so it doesn't crash if a cell is empty
                        'description': row.get('description', ''),
                        'color': row.get('color', ''),
                        'size': row.get('size', ''),
                        'image_url': row.get('image_url', ''),
                        'category': row.get('category', '')
                    }
                )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Added new product: {product.name}"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Updated stock/price for: {product.name}"))
        
        self.stdout.write(self.style.SUCCESS("Inventory sync complete!"))