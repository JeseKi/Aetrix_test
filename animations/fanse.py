# Import the Pillow library
from PIL import Image

# Open the image file
img = Image.open("Matrix图标.png")

# Invert the colors of the image
img_inverted = Image.eval(img, lambda x: 255 - x)

# Save the inverted image as a new file
img_inverted.save("Matrix图标_inverted.png")
