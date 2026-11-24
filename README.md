# SI5C Kuis 1 — RESTful API Motorcycles + MongoDB

Project ini mengembangkan API sepeda motor menggunakan Express 5, Mongoose, dan MongoDB.

## Fitur
- MongoDB melalui Mongoose.
- Referencing: `Motorcycle.brand` memakai ObjectId dengan `ref: "Brand"`.
- Embedding: `Motorcycle.spesifikasi` adalah subdocument di dalam dokumen Motorcycle.
- Filtering: `model`, `minHarga`, `maxHarga`.
- Pagination: `page`, `limit`.
- Sorting: `sort`, `order`.
- Projection: `fields`.
- CRUD Motorcycle dan pembuatan/daftar Brand.

## Instalasi di Windows PowerShell
1. Pastikan MongoDB Server aktif.
2. Buka terminal pada folder project.
3. Jalankan:
   ```powershell
   npm install
   ```
4. Salin `.env.example` menjadi `.env`, lalu pastikan nilainya sesuai:
   ```env
   PORT=3000
   API_KEY=rahasia123
   NPM=2428240161
   MONGODB_URI=mongodb://127.0.0.1:27017/kuis1_motorcycles
   ```
5. Jalankan server:
   ```powershell
   npm run dev
   ```

Jika belum memiliki MongoDB Server lokal, gunakan MongoDB Atlas dan masukkan connection string Atlas ke `MONGODB_URI`.

## Urutan pengujian Postman / Thunder Client
1. `GET http://localhost:3000/` — cek API.
2. `POST http://localhost:3000/brands` — buat brand Honda. Header `x-api-key: rahasia123`; Body JSON `{"nama":"Honda","negara":"Jepang"}`.
3. `POST http://localhost:3000/brands` — buat brand Yamaha dengan body `{"nama":"Yamaha","negara":"Jepang"}`.
4. `GET http://localhost:3000/brands` — salin `_id` salah satu brand.
5. `POST http://localhost:3000/motorcycles` — buat data motor menggunakan `_id` brand. Header API key. Contoh body ada di `routes/README_ENDPOINTS.md`.
6. `GET http://localhost:3000/motorcycles` — pastikan brand tampil melalui populate dan spesifikasi tampil sebagai embedded document.
7. Uji filtering, pagination, sorting, dan projection menggunakan contoh URL di bawah.
8. Uji `GET /motorcycles/:id`, PUT, dan DELETE bila diperlukan.

## Contoh URL fitur endpoint utama
- Filter model: `/motorcycles?model=vario`
- Filter harga: `/motorcycles?minHarga=20000000&maxHarga=35000000`
- Pagination: `/motorcycles?page=1&limit=5`
- Sorting: `/motorcycles?sort=harga&order=asc`
- Projection: `/motorcycles?fields=model,harga,brand,spesifikasi`
- Gabungan: `/motorcycles?model=vario&page=1&limit=5&sort=harga&order=asc&fields=model,harga,brand`

## Bukti screenshot yang perlu dikumpulkan
Ambil screenshot asli dari Postman/Thunder Client dan terminal:
1. Server berhasil terhubung ke MongoDB.
2. POST brand Honda dan Yamaha.
3. GET brands (tampilkan `_id`).
4. POST motorcycle (tampilkan request body dan response).
5. GET motorcycles (tampilkan hasil populate dan embedded).
6. Filtering.
7. Pagination.
8. Sorting.
9. Projection.
10. Jika diminta, GET detail, PUT, dan DELETE.

Jangan mengunggah file `.env` atau folder `node_modules` ke GitHub. Jangan mengklaim screenshot sudah dilakukan sebelum pengujian benar-benar dijalankan.