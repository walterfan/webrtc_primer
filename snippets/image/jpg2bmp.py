from PIL import Image
img_file = "../../images/lena.jpg"
img = Image.open(img_file)
rgb = img.convert("RGB")
print(rgb.getpixel((0,0)))
bmp = rgb.save("lena.bmp")