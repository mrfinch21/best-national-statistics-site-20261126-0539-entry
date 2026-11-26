// NusaStat — program penyerahan (Node 22, pustaka standar saja).
// Situsnya adalah berkas statis di app/ (dibuka di app/index.html, tanpa
// build step, tanpa permintaan jaringan); isinya ada di berkasnya sendiri.
// Program ini menyalin app/ dan screenshots/ dari samping berkas ini ke
// /output, lalu menulis /output/dossier.json — ringkasan yang dibaca juri
// (tangkapan layar, berkas dan byte beban pertama, dan sumber situs) —
// dengan pustaka make.fun yang divendorkan. vendor/makefun-frontend.ts
// dibiarkan apa adanya: pemeriksa mengharuskan dossier.json sama persis
// dengan yang ditulis salinan pustaka miliknya.
//
// Di luar kontainer grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas pemeriksa (reference/gate.json): hanya text_max_bytes yang membentuk
// byte; sisanya menolak entri yang pemeriksa tolak (lebih dari 4 tangkapan
// layar atau satu di atas 256 KiB; lebih dari 993 berkas dan direktori di
// app/ atau 16 MiB berkas app/ — app/ dihitung di samping batas 1000 entri
// /output sendiri, bersama screenshots/ dan dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

// Verifikasi sendiri: baca kembali dossier yang baru ditulis dan laporkan
// ukurannya, supaya kegagalan tulis ketahuan di sini, bukan di pemeriksa.
const dossierBytes = readFileSync(join(out, 'dossier.json')).length;
const shotCount = readdirSync(join(out, 'screenshots')).filter((f) => !f.startsWith('.')).length;
console.log(`NusaStat: dossier ${dossierBytes} bytes, ${shotCount} screenshots, app/ + dossier.json written to ${out}`);
