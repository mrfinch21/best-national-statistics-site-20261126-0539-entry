// NusaStat — data resmi Indonesia. Semua angka berasal dari publikasi resmi
// (BPS, Bank Dunia / WDI, Ditjen Dukcapil Kemendagri) dan dicantumkan beserta
// tahun rujukannya di tiap bagian. Tidak ada angka yang ditebak: bila sebuah
// deret hanya punya dua titik, grafiknya hanya menampilkan dua titik itu.
window.NUSA_DATA = {
  meta: {
    country: "Indonesia",
    updated: "26 November 2026",
    sources: "Badan Pusat Statistik (BPS) · Bank Dunia (World Development Indicators) · Ditjen Dukcapil Kemendagri"
  },
  indicators: [
    { label: "PDB 2024", value: "1.396,3", unit: "US$ miliar", note: "Produk domestik bruto atas dasar harga berlaku", source: "BPS / Bank Dunia (WDI), 2024" },
    { label: "Pertumbuhan PDB 2024", value: "5,03", unit: "%", note: "Tumbuh terhadap tahun sebelumnya", source: "BPS, 2024" },
    { label: "PDB per kapita 2024", value: "4.925", unit: "US$", note: "PDB dibagi jumlah penduduk", source: "Bank Dunia (WDI), 2024" },
    { label: "Penduduk 2024", value: "281,6", unit: "juta jiwa", note: "Hasil proyeksi dan pencatatan resmi", source: "BPS, 2024" },
    { label: "Kemiskinan, Sep 2025", value: "8,25", unit: "%", note: "23,36 juta jiwa; turun dari 8,47% pada Mar 2025", source: "BPS, Sep 2025" },
    { label: "Pengangguran (TPT), Nov 2025", value: "4,74", unit: "%", note: "Penduduk bekerja 147,91 juta jiwa", source: "BPS, Nov 2025" },
    { label: "Gini, Sep 2025", value: "0,363", unit: "rasio", note: "Ketimpangan pengeluaran penduduk", source: "BPS, Sep 2025" },
    { label: "Ekspor barang 2024", value: "264,70", unit: "US$ miliar", note: "Nilai ekspor barang sepanjang 2024", source: "BPS, 2024" }
  ],
  economy: {
    gdp: { value: 1396.3, display: "US$1.396,3 miliar", year: 2024, source: "BPS / Bank Dunia (WDI)" },
    growth: { value: 5.03, display: "5,03%", year: 2024, source: "BPS" },
    gdpPerCapita: { value: 4925, display: "US$4.925", year: 2024, source: "Bank Dunia (WDI)" },
    exports: { value: 264.7, display: "US$264,70 miliar", year: 2024, source: "BPS" },
    inflation: [
      { label: "Inflasi kalender 2024", value: 1.57, display: "1,57%", source: "BPS" },
      { label: "Inflasi rerata 2024", value: 2.18, display: "2,18%", source: "Bank Dunia (WDI)" }
    ],
    sizeBars: [
      { label: "PDB 2024", value: 1396.3, display: "US$1.396,3 miliar" },
      { label: "Ekspor barang 2024", value: 264.7, display: "US$264,70 miliar" }
    ]
  },
  population: {
    total: { value: 281.6, display: "281,6 juta jiwa", year: 2024, source: "BPS" },
    javaShare: { value: 55.93, display: "55,93%", note: "157,39 juta jiwa tinggal di Pulau Jawa", year: "Semester I 2024", source: "Ditjen Dukcapil Kemendagri" },
    poverty: {
      series: [
        { label: "Mar 2025", value: 8.47 },
        { label: "Sep 2025", value: 8.25 }
      ],
      count: "23,36 juta jiwa",
      source: "BPS"
    },
    unemployment: { tpt: 4.74, employed: "147,91 juta jiwa", year: "Nov 2025", source: "BPS" },
    gini: { value: 0.363, display: "0,363", year: "Sep 2025", source: "BPS" }
  },
  regions: {
    year: 2024,
    source: "BPS",
    note: "Sepuluh provinsi dengan penduduk terbanyak. Pulau Jawa menampung 55,93% penduduk Indonesia (157,39 juta jiwa, Semester I 2024, Dukcapil).",
    provinces: [
      { name: "Jawa Barat", value: 50.35, display: "50,35 juta" },
      { name: "Jawa Timur", value: 41.92, display: "41,92 juta" },
      { name: "Jawa Tengah", value: 37.89, display: "37,89 juta" },
      { name: "Sumatera Utara", value: 15.59, display: "15,59 juta" },
      { name: "Banten", value: 12.43, display: "12,43 juta" },
      { name: "DKI Jakarta", value: 10.70, display: "10,70 juta" },
      { name: "Sulawesi Selatan", value: 9.50, display: "9,50 juta" },
      { name: "Lampung", value: 9.40, display: "9,40 juta" },
      { name: "Sumatera Selatan", value: 8.80, display: "8,80 juta" },
      { name: "Riau", value: 6.70, display: "6,70 juta" }
    ]
  }
};
