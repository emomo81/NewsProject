import re
import os

file_path = r'c:\Users\emomo\OneDrive\Desktop\Django\Project 2\NewsProject\frontend\src\pages\NewsHomePage.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add url: '#' after readTime
updated = re.sub(r"readTime: '(.*?)',", r"readTime: '\1',\n    url: '#',", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(updated)

print("Updated file successfully")
