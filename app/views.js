// NusaStat — tampilan tiap halaman. Semua HTML dibangun dari NUSA_DATA;
// tidak ada pengambilan data dari jaringan, tidak ada angka di luar data.js.
(function () {
  var D = window.NUSA_DATA;

  function head(title, intro) {
    return '<div class="hero"><h1>' + title + '</h1><p class="lede">' + intro + '</p>' +
      '<p class="stamp">Data per <b>' + D.meta.updated + '</b> · Sumber: ' + D.meta.sources + '</p></div>';
  }

  function card(ind) {
    return '<div class="card"><div class="lab">' + ind.label + '</div>' +
      '<div class="val">' + ind.value + ' <small>' + ind.unit + '</small></div>' +
      '<p class="note">' + ind.note + '</p><p class="src">' + ind.source + '</p></div>';
  }

  // Grafik batang horizontal dari deret {label, value, display}.
  function barChart(rows, maxValue) {
    var max = maxValue || 0;
    rows.forEach(function (r) { if (r.value > max) max = r.value; });
    var w = 760, rowH = 44, labelW = 190, valW = 150;
    var h = rows.length * rowH + 8;
    var out = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Grafik batang">';
    rows.forEach(function (r, i) {
      var y = 8 + i * rowH;
      var bw = Math.round((w - labelW - valW - 16) * r.value / max);
      out += '<text class="bar-label" x="0" y="' + (y + 19) + '">' + r.label + '</text>' +
        '<rect class="bar-track" x="' + labelW + '" y="' + y + '" width="' + (w - labelW - valW - 16) + '" height="24" rx="4"></rect>' +
        '<rect class="bar-fill' + (i === 0 ? ' alt' : '') + '" x="' + labelW + '" y="' + y + '" width="' + bw + '" height="24" rx="4"></rect>' +
        '<text class="bar-value" x="' + (labelW + bw + 10) + '" y="' + (y + 19) + '">' + r.display + '</text>';
    });
    return out + '</svg>';
  }

  // Kolom tren untuk deret dua titik (kemiskinan Mar 2025 -> Sep 2025).
  function trendColumns(points) {
    var max = 0;
    points.forEach(function (p) { if (p.value > max) max = p.value; });
    var w = 760, h = 220, base = 190, colW = 120, gap = 90, x0 = 210;
    var out = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Tren kemiskinan">';
    out += '<line x1="40" y1="' + base + '" x2="' + (w - 40) + '" y2="' + base + '" stroke="#ddd3bd" stroke-width="1"></line>';
    points.forEach(function (p, i) {
      var ch = Math.round(150 * p.value / max);
      var x = x0 + i * (colW + gap);
      out += '<rect class="bar-fill' + (i === 1 ? ' alt' : '') + '" x="' + x + '" y="' + (base - ch) + '" width="' + colW + '" height="' + ch + '" rx="4"></rect>' +
        '<text class="bar-value" x="' + (x + colW / 2) + '" y="' + (base - ch - 10) + '" text-anchor="middle">' + String(p.value).replace('.', ',') + '%</text>' +
        '<text class="bar-label" x="' + (x + colW / 2) + '" y="' + (base + 22) + '" text-anchor="middle">' + p.label + '</text>';
    });
    return out + '</svg>';
  }

  function overview() {
    var cards = D.indicators.map(card).join('');
    return head('Statistik Indonesia, dalam satu tempat.',
      'NusaStat merangkum angka resmi Indonesia — ekonomi, penduduk, dan daerah — lengkap dengan sumber dan tahun rujukannya, supaya Anda tidak perlu membuka sepuluh laporan untuk satu jawaban.') +
      '<div class="cards">' + cards + '</div>' +
      '<h2>Sorotan</h2>' +
      '<div class="highlights">' +
      '<div class="hi amber"><span class="big">PDB tumbuh 5,03%</span><p>Pertumbuhan ekonomi 2024 (BPS). PDB mencapai US$1.396,3 miliar, atau US$4.925 per kapita.</p></div>' +
      '<div class="hi teal"><span class="big">Kemiskinan turun</span><p>Dari 8,47% pada Maret 2025 menjadi 8,25% pada September 2025 — 23,36 juta jiwa (BPS).</p></div>' +
      '<div class="hi plain"><span class="big">Jawa menampung 55,93%</span><p>157,39 juta jiwa tinggal di Pulau Jawa (Semester I 2024, Dukcapil). Tiga provinsi terpadat semuanya di Jawa.</p></div>' +
      '</div>' +
      '<h2>Jelajahi</h2>' +
      '<div class="explore">' +
      '<a href="#/ekonomi"><b>Ekonomi</b><span>PDB, pertumbuhan, inflasi, dan ekspor — lengkap dengan grafik perbandingan.</span></a>' +
      '<a href="#/penduduk"><b>Penduduk</b><span>Jumlah penduduk, kemiskinan, pengangguran, dan ketimpangan.</span></a>' +
      '<a href="#/daerah"><b>Daerah</b><span>Sepuluh provinsi terpadat dan sebaran penduduk antarwilayah.</span></a>' +
      '</div>';
  }

  function ekonomi() {
    var e = D.economy;
    return head('Ekonomi: besar, tumbuh, dan terbuka.',
      'PDB Indonesia 2024 mencapai US$1.396,3 miliar dengan pertumbuhan 5,03%. Halaman ini membandingkan ukuran ekonomi dengan ekspor, dan menunjukkan dua cara mengukur inflasi.') +
      '<div class="cards">' +
      card({ label: 'PDB 2024', value: '1.396,3', unit: 'US$ miliar', note: 'Atas dasar harga berlaku', source: 'BPS / Bank Dunia (WDI), 2024' }) +
      card({ label: 'Pertumbuhan PDB 2024', value: '5,03', unit: '%', note: 'Tumbuh terhadap tahun sebelumnya', source: 'BPS, 2024' }) +
      card({ label: 'PDB per kapita 2024', value: '4.925', unit: 'US$', note: 'PDB dibagi jumlah penduduk', source: 'Bank Dunia (WDI), 2024' }) +
      card({ label: 'Ekspor barang 2024', value: '264,70', unit: 'US$ miliar', note: 'Nilai ekspor barang sepanjang 2024', source: 'BPS, 2024' }) +
      '</div>' +
      '<div class="chart"><h3>Seberapa besar ekonominya?</h3><p class="sub">PDB dan ekspor barang 2024, dalam US$ miliar. Ekspor setara sekitar seperlima PDB.</p>' +
      barChart(e.sizeBars) + '</div>' +
      '<div class="chart"><h3>Inflasi 2024, dua ukuran</h3><p class="sub">Inflasi kalender mengukur perubahan harga Desember ke Desember; inflasi rerata mengukur rata-rata sepanjang tahun.</p>' +
      barChart(e.inflation, 2.5) + '</div>' +
      '<div class="callout"><b>Cara membaca:</b> angka PDB dan ekspor memakai dolar AS agar mudah dibandingkan antarnegara. Untuk ukuran dalam rupiah dan rincian sektoral, rujukan resminya adalah publikasi PDB BPS.</div>' +
      '<p class="src-line">Sumber: BPS dan Bank Dunia (WDI), 2024.</p>';
  }

  function penduduk() {
    var p = D.population;
    return head('Penduduk: 281,6 juta jiwa, makin merata tantangannya.',
      'Indonesia dihuni 281,6 juta jiwa (BPS, 2024). Kemiskinan menurun, pengangguran di bawah 5%, dan ketimpangan pengeluaran berada di 0,363.') +
      '<div class="cards">' +
      card({ label: 'Penduduk 2024', value: '281,6', unit: 'juta jiwa', note: 'Hasil proyeksi dan pencatatan resmi', source: 'BPS, 2024' }) +
      card({ label: 'Kemiskinan, Sep 2025', value: '8,25', unit: '%', note: '23,36 juta jiwa; turun dari 8,47% (Mar 2025)', source: 'BPS, Sep 2025' }) +
      card({ label: 'Pengangguran (TPT), Nov 2025', value: '4,74', unit: '%', note: 'Penduduk bekerja 147,91 juta jiwa', source: 'BPS, Nov 2025' }) +
      card({ label: 'Gini, Sep 2025', value: '0,363', unit: 'rasio', note: 'Ketimpangan pengeluaran penduduk', source: 'BPS, Sep 2025' }) +
      '</div>' +
      '<div class="chart"><h3>Kemiskinan terus turun</h3><p class="sub">Persentase penduduk miskin, Maret 2025 ke September 2025. Dua titik pengukuran resmi terakhir.</p>' +
      trendColumns(p.poverty.series) + '</div>' +
      '<div class="callout"><b>Yang perlu diperhatikan:</b> meski persentasenya turun, jumlah penduduk miskin masih 23,36 juta jiwa — dan lebih dari separuh penduduk tinggal di Pulau Jawa (' + p.javaShare.display + ', ' + p.javaShare.year + ', Dukcapil), sehingga layanan dan lapangan kerja harus mengejar konsentrasi itu.</div>' +
      '<p class="src-line">Sumber: BPS (kemiskinan, pengangguran, gini); Ditjen Dukcapil Kemendagri (sebaran Pulau Jawa).</p>';
  }

  function daerah() {
    var r = D.regions;
    var rows = r.provinces.map(function (p, i) {
      var share = (p.value / D.population.total.value * 100).toFixed(1).replace('.', ',');
      return '<tr' + (i < 3 ? ' class="hl"' : '') + '><td>' + (i + 1) + '</td><td>' + p.name + '</td><td class="num">' + p.display + '</td><td class="num">' + share + '%</td></tr>';
    }).join('');
    return head('Daerah: penduduk menumpuk di Jawa.',
      'Tiga provinsi terpadat — Jawa Barat, Jawa Timur, Jawa Tengah — semuanya di Pulau Jawa. Di luar Jawa, Sumatera Utara adalah yang terpadat.') +
      '<div class="chart"><h3>Sepuluh provinsi terpadat, ' + r.year + '</h3><p class="sub">Jumlah penduduk dalam juta jiwa. Tiga teratas disorot karena ketiganya di Pulau Jawa.</p>' +
      barChart(r.provinces.map(function (p) { return { label: p.name, value: p.value, display: p.display }; })) + '</div>' +
      '<table><thead><tr><th>#</th><th>Provinsi</th><th class="num">Penduduk</th><th class="num">Bagian dari nasional</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<div class="callout"><b>Kenapa ini penting:</b> Pulau Jawa menampung ' + D.population.javaShare.display + ' penduduk Indonesia (' + D.population.javaShare.note.toLowerCase() + '). Perencanaan infrastruktur, sekolah, dan rumah sakit yang mengabaikan konsentrasi ini akan salah sasaran.</div>' +
      '<p class="src-line">Sumber: ' + r.source + ', ' + r.year + '; sebaran Pulau Jawa: Ditjen Dukcapil Kemendagri, Semester I 2024.</p>';
  }

  window.NUSA_VIEWS = { overview: overview, ekonomi: ekonomi, penduduk: penduduk, daerah: daerah };
})();
