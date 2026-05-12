# -*- coding: utf-8 -*-
import os
import codecs

base_path = r'C:\Users\Administrator\Desktop\页游\eggy'
files = sorted(os.listdir(base_path))

elements = ['火', '水', '草', '电', '冰', '格斗', '毒', '地面', '飞行', '精神', '恶', '龙']

output_lines = []
output_lines.append(f'Total files: {len(files)}')

# Check and fix file names
for elem in elements:
    for stage in range(1, 8):
        expected = f'{elem}{stage}.png'
        if expected in files:
            continue
        else:
            # Find files with matching stage
            elem_char = elem[0]
            matches = [f for f in files if f.endswith(f'{stage}.png') and f[0] == elem_char]
            if matches:
                actual = matches[0]
                output_lines.append(f'Renaming: {actual} -> {expected}')
                os.rename(os.path.join(base_path, actual), os.path.join(base_path, expected))

# List all current files
files = sorted(os.listdir(base_path))
output_lines.append(f'Final count: {len(files)}')
for f in files:
    output_lines.append(f)

# Write to file with UTF-8 BOM
with codecs.open(r'C:\Users\Administrator\Desktop\页游\file_report.txt', 'w', 'utf-8-sig') as out:
    out.write('\n'.join(output_lines))
