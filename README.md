# BEI Visit — Dokumentasi & Panduan Kunjungan Bursa Efek Indonesia

Website dokumentasi dan literasi pasar modal dari kunjungan studi ke Bursa Efek Indonesia (BEI) yang dimulai pukul 06.30 WIB. Dibangun dengan HTML5, CSS3, dan Vanilla JavaScript tanpa framework atau dependensi eksternal.

## Fitur Utama

- **Profil & Mekanisme Pasar Modal**: Penjelasan peran BEI, OJK, KPEI, KSEI, serta alur transaksi saham dari perusahaan ke investor.
- **Eksplorasi Indeks & Sektor Saham**: Pencarian dan filter interaktif untuk mengenal indeks utama (IHSG, LQ45, ISSI), sektor industri, dan papan pencatatan di BEI.
- **Simulasi Aplikasi IDX & Kalkulator Lot**: Tab interaktif cara membaca ringkasan saham, orderbook (Bid/Offer), aturan dasar perdagangan, serta simulasi perhitungan 1 lot (100 lembar) dan skenario perubahan harga.
- **Agenda Kunjungan (Mulai 06.30 WIB)**: Linimasa lengkap dari pengarahan pagi, pemaparan materi saham, praktik aplikasi IDX, hingga dokumentasi.
- **Galeri 10 Foto & Lightbox**: Mendukung pratinjau unggah foto langsung (hingga 10 foto), reset ke foto default, dan navigasi keyboard (`ArrowLeft`, `ArrowRight`, `Escape`).
- **Pemutar Video Maksimal 90 Detik**: Mendukung pratinjau video dengan validasi durasi otomatis (`<= 90 detik`, durasi minimal bebas).
- **Kuis Kilat Pasar Modal**: 5 soal interaktif dengan umpan balik langsung dan perhitungan skor.

## Menjalankan Website

1. Buka folder project dan jalankan `index.html` di browser (atau gunakan server lokal seperti `python -m http.server`).
2. Koneksi internet hanya diperlukan untuk memuat Google Fonts dan foto default Unsplash sebelum Anda menggantinya dengan dokumentasi lokal.

## Memasang Foto & Video Asli

- **10 Foto**: Salin foto ke folder `assets/` (misalnya `assets/galeri-01.jpg` s.d. `assets/galeri-10.jpg`), lalu perbarui `defaultGalleryPhotos` di `script.js`.
- **Video Maksimal 90 Detik**: Simpan video sebagai `assets/vlog-kunjungan.mp4` dan tambahkan atribut `src="assets/vlog-kunjungan.mp4"` pada elemen `<video id="visit-video">` di `index.html`.
