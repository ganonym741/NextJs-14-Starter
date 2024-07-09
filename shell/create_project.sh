#!/bin/bash

# Menetapkan nilai variabel
PRIVATE_TOKEN="EDIT"
DESCRIPTION="EDIT "
PROJECT_PATH="EDIT"
NAMESPACE_ID="13"

# Menjalankan curl dengan jalur lengkap
response=$(/usr/bin/curl --request POST --header "PRIVATE-TOKEN: $PRIVATE_TOKEN" \
     --header "Content-Type: application/json" --data '{
        "description": "'"$DESCRIPTION"'",
        "path": "'"$PROJECT_PATH"'",
        "namespace_id": "'"$NAMESPACE_ID"'"}' \
     --url "https://gitsource.myequity.id/api/v4/projects/")

# Menyimpan status HTTP dalam variabel
http_status=$?

# Memeriksa apakah status HTTP adalah 0 (berhasil)
if [ $http_status -eq 0 ]; then
    echo "Permintaan berhasil. Response: $response"

    # Menghapus direktori .git jika sudah ada
    if [ -d ".git" ]; then
        rm -rf .git
    fi

    echo "disini"

    # Menjalankan langkah-langkah Git
    git init
    git remote add origin "http://gitsource.myequity.id/it-delivery/$PROJECT_PATH.git"
    git add .
    git commit -m "Initial commit"
    git push -u origin main

    echo "disini juga"
else
    echo "Permintaan gagal. Status HTTP: $http_status"
fi
