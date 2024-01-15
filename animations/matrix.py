import pygame
import random
import sys
from PIL import Image
import os

# 初始化pygame
pygame.init()

# 设置屏幕尺寸和标题
screen_width = 1920
screen_height = 1200
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("Matrix Code Rain")

# 定义颜色和字体尺寸
green = (0, 255, 0)
font_sizes = [10, 14, 18, 24, 30]

# ASCII字符集
ascii_chars = [chr(i) for i in range(32, 127)]

# 创建字符列
columns = int(screen_width / font_sizes[-1])
drops = [(0, random.choice(font_sizes), random.randint(3, 10)) for _ in range(columns)]

def draw_code_rain():
    for i in range(len(drops)):
        drop_position, font_size, group_size = drops[i]
        font = pygame.font.Font(None, font_size)
        alpha = int(255 * (font_size / max(font_sizes)))
        char_color = green + (alpha,)

        for j in range(group_size):
            char = random.choice(ascii_chars)
            text = font.render(char, True, char_color)
            screen.blit(text, (i * font_sizes[-1], (drop_position + j) * font_size))

        if (drop_position + group_size) * font_size > screen_height and random.uniform(0, 1) > 0.975:
            drops[i] = (0, random.choice(font_sizes), random.randint(3, 10))
        else:
            drops[i] = (drop_position + 1, font_size, group_size)

def save_frame(screen, frame_number):
    filename = f"frame_{frame_number}.png"
    pygame.image.save(screen, filename)
    return filename

# 主循环
frame_rate = 30
frame_count = 0
saved_frames = []
total_frames = 20 * frame_rate

running = True
while running:
    screen.fill((0, 0, 0))
    draw_code_rain()

    if frame_count < total_frames:
        saved_frame = save_frame(screen, frame_count)
        saved_frames.append(saved_frame)
        frame_count += 1
    else:
        running = False

    pygame.display.flip()
    pygame.time.delay(int(1000 / frame_rate))

# 创建GIF
frames = [Image.open(frame) for frame in saved_frames]
frames[0].save('code_rain.gif', save_all=True, append_images=frames[1:], optimize=False, duration=1000/frame_rate, loop=0)

# 清理保存的帧文件
for frame in saved_frames:
    os.remove(frame)

pygame.quit()
sys.exit()
