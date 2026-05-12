# -*- coding: utf-8 -*-
import os
import sys

base_path = r'C:\Users\Administrator\Desktop\页游\eggy'
files = sorted(os.listdir(base_path))
print(f'Total files: {len(files)}')

# Expected files: 12 elements x 7 stages = 84
elements = ['火', '水', '草', '电', '冰', '格斗', '毒', '地面', '飞行', '精神', '恶', '龙']
expected_count = 12 * 7

# Check for each expected file
missing = []
existing = []
for elem in elements:
    for stage in range(1, 8):
        expected = f'{elem}{stage}.png'
        if expected in files:
            existing.append(expected)
        else:
            # Find files that might match
            matches = [f for f in files if f.endswith(f'{stage}.png') and f[0] == elem[0]]
            if matches:
                print(f'File exists but wrong name: {matches[0]} (expected {expected})')
                # Rename
                os.rename(os.path.join(base_path, matches[0]), os.path.join(base_path, expected))
                existing.append(expected)
            else:
                missing.append(expected)

print(f'Existing correct files: {len(existing)}')
if missing:
    print(f'Missing files: {missing}')
else:
    print('All 84 files are correctly named!')

# List all current files
files = sorted(os.listdir(base_path))
for f in files:
    print(repr(f))
