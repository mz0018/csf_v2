import json
import qrcode
import os
from dotenv import load_dotenv

load_dotenv()

class QRCode:
    def __init__(self):
        self.offices_path = os.path.join(os.path.dirname(__file__), "..", "offices.json")
        self.base_dir = os.path.join(os.path.dirname(__file__), "..", "qrcodes")
        
        self.local_dir = os.path.join(self.base_dir, "local")
        self.remote_dir = os.path.join(self.base_dir, "remote")
        
        os.makedirs(self.local_dir, exist_ok=True)
        os.makedirs(self.remote_dir, exist_ok=True)

        self.base_url_local = os.getenv("BASE_URL_LOCAL")
        self.base_url_remote = os.getenv("BASE_URL_REMOTE")
        
        if not self.base_url_local or not self.base_url_remote:
            raise ValueError("BASE_URL_LOCAL and BASE_URL_REMOTE must be set")

        with open(self.offices_path) as f:
            self.offices = json.load(f)

    def generate_qrcode(self, output_dir, base_url):
        generated_files = []
        
        for office_id, data in self.offices.items():
            url = f"{base_url}/{office_id}"
            img = qrcode.make(url)
            
            safe_name = "".join(c if c.isalnum() else "_" for c in data["name"])
            filename = os.path.join(output_dir, f"{office_id}_{safe_name}.png")
            img.save(filename)
            generated_files.append(filename)
        
        return generated_files

    def generate_all_local(self):
        return self.generate_qrcode(self.local_dir, self.base_url_local)

    def generate_all_remote(self):
        return self.generate_qrcode(self.remote_dir, self.base_url_remote)

    def get_all_qrcode(self, qr_type="local"):
        results = []
        
        if qr_type == "local":
            output_dir = self.local_dir
            base_url = self.base_url_local
        else:
            output_dir = self.remote_dir
            base_url = self.base_url_remote

        for office_id, data in self.offices.items():
            safe_name = "".join(c if c.isalnum() else "_" for c in data["name"])
            filename = f"{office_id}_{safe_name}.png"
            filepath = os.path.join(output_dir, filename)
            
            if os.path.exists(filepath):
                results.append({
                    "office_id": office_id,
                    "name": data["name"],
                    "file": filepath,
                    "url": f"{base_url}/{filename}",
                    "type": qr_type
                })
        
        return results
