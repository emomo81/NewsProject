#!/usr/bin/env bash
set -o errexit

echo "Building Frontend..."
cd ../../frontend
npm install
npm run build
cd ../Scripts/MyNewsWebsite

pip install -r requirements.txt
python manage.py collectstatic --no-input
# Remove the migrate and create_superuser lines