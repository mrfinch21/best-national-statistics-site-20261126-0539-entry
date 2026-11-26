# NusaStat — Statistik Indonesia

Portal statistik Indonesia dari angka resmi: ekonomi, penduduk, dan daerah,
lengkap dengan sumber dan tahun rujukan tiap angka. Situs statis tanpa build
step dan tanpa permintaan jaringan — semua berkasnya ada di `app/`.

## Halaman

- **Ringkasan** (`#/`): delapan indikator utama, tiga sorotan, dan tautan jelajah.
- **Ekonomi** (`#/ekonomi`): PDB 2024 US$1.396,3 miliar, tumbuh 5,03%; PDB per
  kapita US$4.925; ekspor barang US$264,70 miliar; inflasi kalender 1,57%
  dan rerata 2,18%.
- **Penduduk** (`#/penduduk`): 281,6 juta jiwa (2024); kemiskinan 8,25%
  (Sep 2025, turun dari 8,47% pada Mar 2025); pengangguran 4,74% (Nov 2025);
  gini 0,363.
- **Daerah** (`#/daerah`): sepuluh provinsi terpadat (BPS 2024) — Jawa Barat
  50,35 juta, Jawa Timur 41,92 juta, Jawa Tengah 37,89 juta — dan sebaran
  penduduk: Pulau Jawa menampung 55,93% penduduk Indonesia.

## Sumber data

Badan Pusat Statistik (BPS), Bank Dunia (World Development Indicators),
Ditjen Dukcapil Kemendagri. Setiap angka di situs mencantumkan sumber dan
tahunnya; tidak ada angka yang ditebak.

## Menjalankan

Sajikan `app/` dengan server statis apa pun, misalnya:

```
cd app && python3 -m http.server 8080
```

lalu buka http://localhost:8080. Semua tautan memakai rute hash, jadi situs
tetap bekerja dari berkas lokal.

## Penyerahan

`main.ts` menyalin `app/` dan `screenshots/` ke direktori keluaran dan
menulis `dossier.json` dengan `buildDossier` dari `vendor/makefun-frontend.ts`
(salinan kit, tidak diubah). Di luar grader:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Lisensi: MIT.
