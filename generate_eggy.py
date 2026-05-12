# -*- coding: utf-8 -*-
"""生成84个蛋蛋宠物占位图片 (12元素 × 7阶段)"""
import os
from PIL import Image, ImageDraw, ImageFont

# 基础路径
base_path = r"C:\Users\Administrator\Desktop\页游\eggy"

# 12个元素
elements = ["火", "水", "草", "电", "冰", "格斗", "毒", "地面", "飞行", "精神", "恶", "龙"]

# 元素颜色 (RGB)
element_colors = {
    "火": (255, 100, 80),
    "水": (80, 150, 255),
    "草": (100, 200, 100),
    "电": (255, 240, 80),
    "冰": (180, 230, 255),
    "格斗": (220, 150, 100),
    "毒": (180, 100, 255),
    "地面": (200, 160, 100),
    "飞行": (140, 190, 255),
    "精神": (255, 120, 220),
    "恶": (100, 100, 100),
    "龙": (255, 180, 60),
}

# 阶段名称
stage_names = {
    1: "蛋",
    2: "初",
    3: "幼",
    4: "成",
    5: "熟",
    6: "完",
    7: "神",
}

# 阶段大小比例
stage_sizes = {
    1: 0.6,   # 蛋阶段 - 小
    2: 0.7,
    3: 0.8,
    4: 0.85,
    5: 0.9,
    6: 0.95,
    7: 1.0,   # 神话 - 大
}

# 尝试加载字体
try:
    # 尝试系统字体
    font_path = "C:\\Windows\\Fonts\\msyh.ttc"  # 微软雅黑
    font = ImageFont.truetype(font_path, 36)
    small_font = ImageFont.truetype(font_path, 24)
except:
    try:
        font_path = "C:\\Windows\\Fonts\\simhei.ttf"  # 黑体
        font = ImageFont.truetype(font_path, 36)
        small_font = ImageFont.truetype(font_path, 24)
    except:
        font = None
        small_font = None

# 确保目录存在
os.makedirs(base_path, exist_ok=True)

# 图片尺寸
img_size = 128

# 生成图片
count = 0
for elem in elements:
    for stage in range(1, 8):
        # 创建图片 (带透明度支持)
        img = Image.new('RGBA', (img_size, img_size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # 获取颜色
        r, g, b = element_colors[elem]
        
        # 阶段尺寸
        size_ratio = stage_sizes[stage]
        circle_size = int(img_size * 0.7 * size_ratio)
        offset = (img_size - circle_size) // 2
        
        # 绘制圆形背景 (带渐变效果)
        # 外圈 - 深色
        outer_r = int(r * 0.6)
        outer_g = int(g * 0.6)
        outer_b = int(b * 0.6)
        draw.ellipse(
            [offset - 4, offset - 4, offset + circle_size + 4, offset + circle_size + 4],
            fill=(outer_r, outer_g, outer_b, 255)
        )
        
        # 中圈 - 主色
        mid_r = int(r * 0.85)
        mid_g = int(g * 0.85)
        mid_b = int(b * 0.85)
        draw.ellipse(
            [offset, offset, offset + circle_size, offset + circle_size],
            fill=(mid_r, mid_g, mid_b, 255)
        )
        
        # 内圈 - 亮色高光
        inner_size = int(circle_size * 0.7)
        inner_offset = offset + (circle_size - inner_size) // 2
        draw.ellipse(
            [inner_offset, inner_offset, inner_offset + inner_size, inner_offset + inner_size],
            fill=(r, g, b, 255)
        )
        
        # 添加高光
        highlight_x = int(offset + circle_size * 0.3)
        highlight_y = int(offset + circle_size * 0.3)
        highlight_size = int(circle_size * 0.15)
        draw.ellipse(
            [highlight_x, highlight_y, highlight_x + highlight_size, highlight_y + highlight_size],
            fill=(255, 255, 255, 180)
        )
        
        # 绘制文字
        text_color = (255, 255, 255, 255)
        
        # 阶段编号
        stage_text = str(stage)
        if font:
            bbox = draw.textbbox((0, 0), stage_text, font=small_font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            x = (img_size - text_width) // 2
            y = (img_size - text_height) // 2 + 5
            draw.text((x, y), stage_text, fill=text_color, font=small_font)
        
        # 保存图片
        filename = f"{elem}{stage}.png"
        filepath = os.path.join(base_path, filename)
        img.save(filepath, 'PNG')
        
        count += 1
        print(f"已生成: {filename}")

print(f"\n完成! 共生成 {count} 个图片文件")
