#!/usr/bin/env bash
set -o errexit

# Build Frontend
echo "Building Frontend..."
cd ../../frontend
npm install
npm run build
cd ../Scripts/MyNewsWebsite

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input