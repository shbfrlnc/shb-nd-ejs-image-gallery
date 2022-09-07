# NDMGGLLRY - Aplikasi Image Gallery dengan Node.js

## Software Apakah Ini?

NDMGGLLRY adalah Aplikasi Image Gallery dengan Node.js.

## Screenshot

![ScreenShot](.readme-assets/NDMGGLLRY-1.png?raw=true)

## Cara Mencoba Kode Ini

Untuk mencoba kode ini, masuk ke dalam folder ini via terminal.

Selanjutnya, jalankan:

```
npm install
```

Selanjutnya, jalankan:

```
npm run dev
```

## Pendahuluan

Kali ini saya akan memberi contoh cara membuat aplikasi image gallery dengan Node.js.

Aplikasi yang akan kita buat ini nantinya bisa mengupload gambar dan menyimpannya dalam database.

Selain itu, image gallery ini juga bisa difilter dengan menggunakan tags.

## Cara Kerja

Aplikasi ini bekerja sebagaimana aplikasi CRUD pada umumnya.

Bedanya, ada file yang di-upload ke server.

Image yang sudah diupload akan masuk ke dalam listing image dan dapat dihapus dan didownload.

Dalam pembuatannya, aplikasi ini menggunakan multer untuk mengupload file dan menggunakan uuid untuk menggenerate nama yang unik untuk tiap file gambar yang diupload.

## Struktur Project

Untuk melihat struktur project aplikasi ini, silakan buka project ini di text editor.
