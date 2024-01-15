from PIL import Image, ImageSequence
import os

# Function to compress a GIF file
def compress_gif(input_path, output_path, max_size_mb):
    # Open the original GIF
    original_gif = Image.open(input_path)

    # Create a list to hold the frames
    frames = []

    # Iterate through each frame in the animated GIF
    for frame in ImageSequence.Iterator(original_gif):
        # Copy the frame to work on it
        frame_copy = frame.copy()

        # Append the copied frame to the frames list
        frames.append(frame_copy)

    # Set the initial compression quality
    quality = 80

    while True:
        # Save the frames as a new GIF with reduced quality
        frames[0].save(
            output_path,
            save_all=True,
            append_images=frames[1:],
            optimize=True,
            quality=quality,
            loop=0
        )

        # Check the size of the compressed GIF
        file_size_mb = os.path.getsize(output_path) / 1024 / 1024

        # If the size is within the limit, break the loop
        if file_size_mb <= max_size_mb:
            break

        # If the file is still too large, reduce the quality further
        quality -= 5

        # If quality drops below a threshold, stop trying
        if quality < 10:
            break

    return file_size_mb

# Define the input and output file paths
input_gif_path = 'code_rain.gif'
output_gif_path = 'compressed_code_rain.gif'

# Compress the GIF to under 1 MB
compressed_size = compress_gif(input_gif_path, output_gif_path, 1)

compressed_size
