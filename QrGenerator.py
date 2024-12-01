import qrcode
#this is really important
def generate_qr(driver_id, filename="driver_qr.png"):
    base_url = "http://localhost:3030/app"
    full_url = f"{base_url}?id={driver_id}"
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(full_url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    img.save(filename)
    print(f"QR code generated and saved as {filename}")

driver_id = "5" 
generate_qr(driver_id)
