#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""生成84个蛋蛋宠物占位图片 (12元素 × 7阶段)"""
import os
import base64
import struct
import zlib

def create_png(width, height, rgb_color):
    """创建一个简单的纯色PNG图片"""
    r, g, b = rgb_color
    
    # PNG签名
    signature = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)  # 8-bit RGB
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    ihdr_chunk = struct.pack('>I', 13) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc & 0xffffffff)
    
    # IDAT chunk - 原始图像数据
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # 过滤器类型
        for x in range(width):
            raw_data += bytes([r, g, b])
    
    compressed_data = zlib.compress(raw_data)
    idat_crc = zlib.crc32(b'IDAT' + compressed_data)
    idat_chunk = struct.pack('>I', len(compressed_data)) + b'IDAT' + compressed_data + struct.pack('>I', idat_crc & 0xffffffff)
    
    # IEND chunk
    iend_crc = zlib.crc32(b'IEND')
    iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc & 0xffffffff)
    
    return signature + ihdr_chunk + idat_chunk + iend_chunk

# 基础路径
base_path = r"C:\Users\Administrator\Desktop\页游\eggy"
os.makedirs(base_path, exist_ok=True)

# 12个元素及其颜色 (RGB)
elements_colors = {
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

# 生成84个图片 (12元素 × 7阶段)
count = 0
for elem, color in elements_colors.items():
    for stage in range(1, 8):
        filename = f"{elem}{stage}.png"
        filepath = os.path.join(base_path, filename)
        
        # 创建64x64的PNG
        png_data = create_png(64, 64, color)
        
        with open(filepath, 'wb') as f:
            f.write(png_data)
        
        count += 1
        print(f"已生成: {filename}")

print(f"\n完成! 共生成 {count} 个图片文件")
