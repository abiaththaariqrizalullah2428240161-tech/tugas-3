# Endpoint pengujian

Semua endpoint memakai `http://localhost:3000`.

## Brand
- `GET /brands` — melihat daftar merek.
- `POST /brands` — membuat merek (wajib header `x-api-key`).

Contoh POST brand:
```json
{ "nama": "Honda", "negara": "Jepang" }
```

## Motorcycle
- `GET /motorcycles` — semua motor.
- `GET /motorcycles?model=vario` — filter nama model.
- `GET /motorcycles?minHarga=20000000&maxHarga=35000000` — filter rentang harga.
- `GET /motorcycles?page=1&limit=5` — pagination.
- `GET /motorcycles?sort=harga&order=asc` — sorting.
- `GET /motorcycles?fields=model,harga,brand,spesifikasi` — projection.
- `GET /motorcycles?model=vario&page=1&limit=5&sort=harga&order=asc&fields=model,harga,brand` — gabungan fitur.
- `GET /motorcycles/:id` — satu motor.
- `POST /motorcycles` — tambah motor (wajib header `x-api-key`).
- `PUT /motorcycles/:id` — ubah motor (wajib header `x-api-key`).
- `DELETE /motorcycles/:id` — hapus motor (wajib header `x-api-key`).

Contoh POST motorcycle (ganti brand dengan `_id` dari GET /brands):
```json
{
  "brand": "ID_BRAND_DARI_GET_BRANDS",
  "model": "Vario 160 Abi Ath Thaariq Rizalullah",
  "harga": 27500000,
  "warna": ["hitam", "merah"],
  "spesifikasi": {
    "kapasitasCc": 160,
    "transmisi": "Automatic",
    "bahanBakar": "Bensin"
  }
}
```

`brand` adalah referencing (ObjectId). `spesifikasi` adalah embedding (subdocument di dalam Motorcycle).