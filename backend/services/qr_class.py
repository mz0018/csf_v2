import json
import qrcode
import os
from dotenv import load_dotenv

load_dotenv()

def generate_all_qrcode():

    offices_path = os.path.join(os.path.dirname(__file__), "..", "offices.json")

    with open(offices_path) as f:
        offices = json.load(f)

    base_url = os.getenv("BASE_URL")
    if not base_url:
        raise ValueError("BASE_URL not set")

    output_dir = os.path.join(os.path.dirname(__file__), "..", "qrcodes")
    os.makedirs(output_dir, exist_ok=True)

    generated_files = []

    for office_id, data in offices.items():
        url = f"{base_url}/{office_id}"
        img = qrcode.make(url)

        safe_name = "".join(c if c.isalnum() else "_" for c in data["name"])
        filename = os.path.join(output_dir, f"{office_id}_{safe_name}.png")
        img.save(filename)
        generated_files.append(filename)

    return generated_files
