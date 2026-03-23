import json
import qrcode
import os
from dotenv import load_dotenv

load_dotenv()

class QRCode:
    def __init__(self):

        self.offices_path = os.path.join(os.path.dirname(__file__), "..", "offices.json")
        self.output_dir = os.path.join(os.path.dirname(__file__), "..", "qrcodes")
        os.makedirs(self.output_dir, exist_ok=True)

        self.base_url = os.getenv("BASE_URL")
        if not self.base_url:
            raise ValueError("BASE_URL not set")

        with open(self.offices_path) as f:
            self.offices = json.load(f)

    def generate_all_qrcode(self):
        generated_files = []

        for office_id, data in self.offices.items():
            url = f"{self.base_url}/{office_id}"
            img = qrcode.make(url)

            safe_name = "".join(c if c.isalnum() else "_" for c in data["name"])
            filename = os.path.join(self.output_dir, f"{office_id}_{safe_name}.png")
            img.save(filename)
            generated_files.append(filename)

        return generated_files