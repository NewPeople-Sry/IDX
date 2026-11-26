const defaultGalleryPhotos = [
  {
    title: "06.30 WIB: Berkumpul & pengarahan awal study tour",
    url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Perjalanan rombongan menuju gedung BEI Jakarta",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Kedatangan di kawasan SCBD Bursa Efek Indonesia",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Suasana ruang edukasi & pemaparan pasar modal",
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Penjelasan saham & cara kerja perdagangan efek",
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Mengenal indeks dan sektor saham tercatat di BEI",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Sesi tanya jawab bersama narasumber BEI",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Mencatat poin penting selama sesi materi",
    url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Praktik membaca data saham di Aplikasi IDX",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82",
  },
  {
    title: "Penutup kunjungan & dokumentasi bersama",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=82",
  },
];

let galleryPhotos = defaultGalleryPhotos.map((item) => ({ ...item }));

const galleryGrid = document.querySelector("#gallery-grid");
const photoPicker = document.querySelector("#photo-picker");
const photoReset = document.querySelector("#photo-reset");
const photoStatus = document.querySelector("#photo-status");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
let activePhotoIndex = 0;
let uploadedPhotoUrls = [];

function renderGallery() {
  galleryGrid.replaceChildren();

  galleryPhotos.forEach((photo, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");
    const caption = document.createElement("span");
    const indexLabel = document.createElement("span");

    button.className = "gallery-card";
    button.type = "button";
    button.setAttribute("aria-label", `Buka foto ${index + 1}: ${photo.title}`);
    image.src = photo.url;
    image.alt = photo.title;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      image.classList.add("image-unavailable");
      image.alt = `${photo.title} (foto tidak dapat dimuat)`;
    }, { once: true });

    caption.className = "gallery-card-caption";
    indexLabel.className = "gallery-card-index";
    caption.append(document.createTextNode(photo.title), indexLabel);
    indexLabel.textContent = `${String(index + 1).padStart(2, "0")} / 10`;
    button.append(image, caption);
    button.addEventListener("click", () => openLightbox(index));
    galleryGrid.append(button);
  });
}

function openLightbox(index) {
  activePhotoIndex = index;
  const photo = galleryPhotos[activePhotoIndex];
  lightboxImage.src = photo.url;
  lightboxImage.alt = photo.title;
  lightboxCaption.textContent = `${String(activePhotoIndex + 1).padStart(2, "0")} / 10 · ${photo.title}`;
  lightbox.showModal();
}

function moveLightbox(direction) {
  const nextIndex = (activePhotoIndex + direction + galleryPhotos.length) % galleryPhotos.length;
  openLightbox(nextIndex);
}

function revokeUploadedPhotos() {
  uploadedPhotoUrls.forEach((url) => URL.revokeObjectURL(url));
  uploadedPhotoUrls = [];
}

photoPicker.addEventListener("change", () => {
  const selectedPhotos = Array.from(photoPicker.files ?? [])
    .filter((file) => file.type.startsWith("image/"))
    .slice(0, 10);

  if (selectedPhotos.length === 0) return;

  revokeUploadedPhotos();
  uploadedPhotoUrls = selectedPhotos.map((file) => URL.createObjectURL(file));
  selectedPhotos.forEach((file, index) => {
    galleryPhotos[index] = {
      title: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
      url: uploadedPhotoUrls[index],
    };
  });
  renderGallery();
  photoReset.hidden = false;
  photoStatus.textContent = `${selectedPhotos.length} dari 10 bingkai diperbarui dengan foto lokal untuk pratinjau. Simpan file ke folder assets/ sebelum publikasi.`;
  photoPicker.value = "";
});

photoReset.addEventListener("click", () => {
  revokeUploadedPhotos();
  galleryPhotos = defaultGalleryPhotos.map((item) => ({ ...item }));
  renderGallery();
  photoReset.hidden = true;
  photoStatus.textContent = "Galeri dikembalikan ke 10 bingkai default. Klik foto untuk memperbesar atau unggah foto kunjungan Anda.";
});

document.querySelector("#lightbox-close").addEventListener("click", () => lightbox.close());
document.querySelector("#lightbox-prev").addEventListener("click", () => moveLightbox(-1));
document.querySelector("#lightbox-next").addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

const videoPicker = document.querySelector("#video-picker");
const visitVideo = document.querySelector("#visit-video");
const videoFrame = document.querySelector("#video-frame");
const videoDuration = document.querySelector("#video-duration");
const videoStatus = document.querySelector("#video-status");
let uploadedVideoUrl;

videoPicker.addEventListener("change", () => {
  const [file] = videoPicker.files ?? [];
  if (!file || !file.type.startsWith("video/")) return;

  if (uploadedVideoUrl) URL.revokeObjectURL(uploadedVideoUrl);
  uploadedVideoUrl = URL.createObjectURL(file);
  visitVideo.src = uploadedVideoUrl;
  videoFrame.classList.add("has-video");
  videoStatus.textContent = `${file.name} dipilih untuk pratinjau. Salin file ke folder assets agar video ikut terkumpul bersama website.`;
  videoPicker.value = "";
});

visitVideo.addEventListener("loadedmetadata", () => {
  if (!Number.isFinite(visitVideo.duration)) return;
  const totalSeconds = Math.round(visitVideo.duration);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  videoDuration.textContent = `DURASI · ${minutes}:${seconds}`;

  if (totalSeconds <= 90) {
    videoStatus.textContent = `Durasi video ${minutes}:${seconds} — sesuai ketentuan (maksimal 90 detik, minimal bebas).`;
  } else {
    videoStatus.textContent = `Durasi video ${minutes}:${seconds} melebihi batas maksimal 90 detik (01:30). Potong durasi agar sesuai ketentuan.`;
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Buka navigasi" : "Tutup navigasi");
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka navigasi");
    siteNav.classList.remove("is-open");
  }
});

const progressBar = document.querySelector("#scroll-progress");
let scrollUpdatePending = false;

window.addEventListener("scroll", () => {
  if (scrollUpdatePending) return;
  scrollUpdatePending = true;
  window.requestAnimationFrame(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    scrollUpdatePending = false;
  });
}, { passive: true });

const navLinks = Array.from(siteNav.querySelectorAll('a[href^="#"]'));
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = navLinks.find((item) => item.hash === `#${entry.target.id}`);
      if (!link || !entry.isIntersecting) return;
      navLinks.forEach((item) => item.removeAttribute("aria-current"));
      link.setAttribute("aria-current", "location");
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  observedSections.forEach((section) => sectionObserver.observe(section));
}

window.addEventListener("beforeunload", () => {
  revokeUploadedPhotos();
  if (uploadedVideoUrl) URL.revokeObjectURL(uploadedVideoUrl);
});

const marketCatalog = [
  {
    category: "indeks",
    tag: "Indeks Utama",
    code: "IHSG",
    title: "Indeks Harga Saham Gabungan",
    desc: "Mengukur kinerja keseluruhan saham yang tercatat di Papan Utama dan Papan Pengembangan BEI.",
    example: "Acuan utama kondisi pasar modal Indonesia.",
  },
  {
    category: "indeks",
    tag: "Indeks Likuid",
    code: "LQ45",
    title: "45 Saham Likuiditas Tinggi",
    desc: "Berisi 45 emiten dengan likuiditas transaksi tertinggi, kapitalisasi besar, dan fundamental yang dievaluasi berkala.",
    example: "Sering dipantau oleh investor institusi & pemula.",
  },
  {
    category: "indeks",
    tag: "Indeks Syariah",
    code: "ISSI",
    title: "Indeks Saham Syariah Indonesia",
    desc: "Mencakup seluruh saham syariah yang tercatat di BEI dan masuk dalam Daftar Efek Syariah (DES) OJK.",
    example: "Memenuhi prinsip syariah dalam kegiatan usaha & rasio keuangan.",
  },
  {
    category: "sektor",
    tag: "Sektor Keuangan",
    code: "IDXFIN",
    title: "Perbankan & Jasa Keuangan",
    desc: "Mencakup bank umum, pembiayaan, asuransi, dan layanan keuangan yang berperan besar dalam kapitalisasi BEI.",
    example: "Contoh sektor: Perbankan besar & keuangan digital.",
  },
  {
    category: "sektor",
    tag: "Sektor Konsumer",
    code: "IDXNCYC",
    title: "Barang Konsumen Primer & Ritel",
    desc: "Perusahaan makanan, minuman, kebutuhan rumah tangga, dan ritel yang permintaannya relatif stabil.",
    example: "Produknya dekat dengan aktivitas harian masyarakat.",
  },
  {
    category: "sektor",
    tag: "Sektor Infrastruktur",
    code: "IDXINFRA",
    title: "Telekomunikasi, Energi & Utilitas",
    desc: "Mencakup operator telekomunikasi, jalan tol, konstruksi, kelistrikan, serta penyedia energi nasional.",
    example: "Menopang konektivitas dan pembangunan jangka panjang.",
  },
  {
    category: "papan",
    tag: "Papan Pencatatan",
    code: "UTAMA",
    title: "Papan Utama (Main Board)",
    desc: "Ditujukan bagi emiten berskala besar yang telah memiliki rekam jejak operasional dan keuangan mapan.",
    example: "Memenuhi persyaratan aset dan laba bersih lebih ketat.",
  },
  {
    category: "papan",
    tag: "Papan Pencatatan",
    code: "PENGEMBANGAN",
    title: "Papan Pengembangan",
    desc: "Wadah bagi perusahaan menengah atau perusahaan bertumbuh yang belum memenuhi syarat Papan Utama.",
    example: "Mendukung ekspansi perusahaan menuju skala lebih besar.",
  },
  {
    category: "papan",
    tag: "Papan Pencatatan",
    code: "AKSELERASI",
    title: "Papan Akselerasi",
    desc: "Dirancang khusus untuk memfasilitasi perusahaan skala kecil dan menengah (UKM) mencari modal di bursa.",
    example: "Membuka akses pendanaan publik bagi bisnis rintisan.",
  },
];

const explorerGrid = document.querySelector("#explorer-grid");
const stockSearch = document.querySelector("#stock-search");
const filterPills = Array.from(document.querySelectorAll(".filter-pill"));
let activeFilter = "semua";

function renderExplorer() {
  if (!explorerGrid) return;
  const query = (stockSearch?.value ?? "").trim().toLowerCase();
  const filtered = marketCatalog.filter((item) => {
    const matchCategory = activeFilter === "semua" || item.category === activeFilter;
    const matchQuery = !query
      || item.title.toLowerCase().includes(query)
      || item.code.toLowerCase().includes(query)
      || item.desc.toLowerCase().includes(query)
      || item.tag.toLowerCase().includes(query);
    return matchCategory && matchQuery;
  });

  explorerGrid.replaceChildren();
  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "explorer-empty";
    empty.textContent = "Tidak ada indeks atau sektor yang cocok dengan pencarian tersebut.";
    explorerGrid.append(empty);
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "explorer-card";

    const top = document.createElement("div");
    top.className = "explorer-card-top";
    const tag = document.createElement("span");
    tag.className = "explorer-tag";
    tag.textContent = item.tag;
    const code = document.createElement("span");
    code.className = "explorer-code";
    code.textContent = item.code;
    top.append(tag, code);

    const title = document.createElement("h4");
    title.textContent = item.title;
    const desc = document.createElement("p");
    desc.textContent = item.desc;
    const example = document.createElement("div");
    example.className = "explorer-example";
    example.textContent = item.example;

    card.append(top, title, desc, example);
    explorerGrid.append(card);
  });
}

filterPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    activeFilter = pill.dataset.filter ?? "semua";
    filterPills.forEach((btn) => {
      const active = btn === pill;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });
    renderExplorer();
  });
});

stockSearch?.addEventListener("input", renderExplorer);

const idxScreen = document.querySelector("#idx-screen");
const idxTabs = Array.from(document.querySelectorAll(".idx-tab"));

function renderIdxTab(tabName) {
  if (!idxScreen) return;
  idxScreen.replaceChildren();

  if (tabName === "ringkasan") {
    const header = document.createElement("div");
    header.className = "idx-quote-header";
    const ticker = document.createElement("div");
    ticker.className = "idx-ticker";
    ticker.append(document.createTextNode("SIMULASI · BBRI / TLKM"));
    const sub = document.createElement("span");
    sub.textContent = "Contoh tampilan data emiten di Aplikasi IDX (ilustrasi edukasi)";
    ticker.append(sub);

    const price = document.createElement("div");
    price.className = "idx-price";
    const priceVal = document.createElement("strong");
    priceVal.textContent = "Rp 4.500";
    const priceDiff = document.createElement("span");
    priceDiff.textContent = "+70 (+1,58%)";
    price.append(priceVal, priceDiff);
    header.append(ticker, price);

    const stats = document.createElement("div");
    stats.className = "idx-stats-grid";
    const items = [
      ["Kode Ticker (4 Huruf)", "Identitas Unik", "Setiap perusahaan tercatat punya 4 huruf kode resmi di BEI."],
      ["Satuan Perdagangan", "1 Lot = 100 Lembar", "Pembelian saham di pasar reguler dilakukan per kelipatan lot."],
      ["Volume & Nilai", "Likuiditas Harian", "Menunjukkan seberapa aktif saham diperdagangkan hari itu."],
      ["Keterbukaan Informasi", "Laporan Resmi", "Aplikasi IDX memuat laporan keuangan & pengumuman resmi emiten."],
    ];
    items.forEach(([label, val, note]) => {
      const box = document.createElement("div");
      box.className = "idx-stat";
      const s = document.createElement("span");
      s.textContent = label;
      const st = document.createElement("strong");
      st.textContent = val;
      const sm = document.createElement("small");
      sm.textContent = note;
      box.append(s, st, sm);
      stats.append(box);
    });
    idxScreen.append(header, stats);
    return;
  }

  if (tabName === "orderbook") {
    const book = document.createElement("div");
    book.className = "idx-orderbook";

    const buildCol = (titleText, rows) => {
      const col = document.createElement("div");
      col.className = "idx-book-col";
      const h = document.createElement("h4");
      h.textContent = titleText;
      col.append(h);
      rows.forEach(([p, l]) => {
        const r = document.createElement("div");
        r.className = "idx-book-row";
        const sp1 = document.createElement("span");
        sp1.textContent = p;
        const sp2 = document.createElement("span");
        sp2.textContent = l;
        r.append(sp1, sp2);
        col.append(r);
      });
      return col;
    };

    book.append(
      buildCol("BID (ANTRIAN BELI)", [["Rp 4.490", "1.240 lot"], ["Rp 4.480", "3.150 lot"], ["Rp 4.470", "2.080 lot"]]),
      buildCol("OFFER / ASK (ANTRIAN JUAL)", [["Rp 4.500", "980 lot"], ["Rp 4.510", "2.410 lot"], ["Rp 4.520", "4.100 lot"]])
    );
    const note = document.createElement("p");
    note.className = "quiz-feedback";
    note.textContent = "Transaksi langsung terjadi (match) apabila pembeli setuju membeli di harga Offer terendah, atau penjual melepas saham di harga Bid tertinggi.";
    idxScreen.append(book, note);
    return;
  }

  const list = document.createElement("ul");
  list.className = "idx-rules-list";
  const rules = [
    ["Aplikasi IDX vs Sekuritas: ", "Aplikasi IDX Mobile berfokus pada informasi pasar, grafik, indeks, dan edukasi. Eksekusi beli/jual dilakukan melalui aplikasi Perusahaan Sekuritas Anggota Bursa."],
    ["Rekening Efek & RDN: ", "Investor wajib memiliki Rekening Efek dan Rekening Dana Nasabah (RDN) atas nama pribadi melalui sekuritas berizin OJK."],
    ["Fraksi Harga & ARA/ARB: ", "Kenaikan/penurunan harga saham mengikuti fraksi harga dan batas persentase harian (Auto Rejection) yang ditetapkan BEI."],
  ];
  rules.forEach(([boldText, rest]) => {
    const li = document.createElement("li");
    const b = document.createElement("b");
    b.textContent = boldText;
    li.append(b, document.createTextNode(rest));
    list.append(li);
  });
  idxScreen.append(list);
}

idxTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    idxTabs.forEach((btn) => {
      const active = btn === tab;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });
    renderIdxTab(tab.dataset.idxTab ?? "ringkasan");
  });
});

const simPrice = document.querySelector("#sim-price");
const simLots = document.querySelector("#sim-lots");
const simChange = document.querySelector("#sim-change");
const simSharesLabel = document.querySelector("#sim-shares-label");
const simLotsValue = document.querySelector("#sim-lots-value");
const simChangeValue = document.querySelector("#sim-change-value");
const simInitial = document.querySelector("#sim-initial");
const simFinal = document.querySelector("#sim-final");
const simDiff = document.querySelector("#sim-diff");
const idrFormatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

function updateSimulator() {
  if (!simPrice || !simLots || !simChange) return;
  const price = Math.max(50, Number(simPrice.value) || 50);
  const lots = Math.max(1, Number(simLots.value) || 1);
  const pct = Number(simChange.value) || 0;
  const shares = lots * 100;
  const initialVal = price * shares;
  const finalVal = Math.round(initialVal * (1 + pct / 100));
  const diffVal = finalVal - initialVal;
  const sign = diffVal > 0 ? "+" : "";

  simSharesLabel.textContent = `(${shares.toLocaleString("id-ID")} lembar)`;
  simLotsValue.textContent = `${lots} lot`;
  simChangeValue.textContent = `${pct > 0 ? "+" : ""}${pct}%`;
  simInitial.textContent = idrFormatter.format(initialVal);
  simFinal.textContent = idrFormatter.format(finalVal);
  simDiff.textContent = `${sign}${idrFormatter.format(diffVal)} (${pct > 0 ? "+" : ""}${pct}%)`;
  simDiff.classList.toggle("is-negative", diffVal < 0);
}

[simPrice, simLots, simChange].forEach((input) => input?.addEventListener("input", updateSimulator));

const quizData = [
  {
    q: "1. Berapa jumlah lembar saham dalam 1 lot di Bursa Efek Indonesia?",
    options: ["10 lembar", "50 lembar", "100 lembar", "1.000 lembar"],
    answer: 2,
    explain: "Di BEI, satuan perdagangan pasar reguler adalah 1 lot yang setara dengan 100 lembar saham.",
  },
  {
    q: "2. Melalui lembaga apa investor melakukan transaksi beli dan jual saham?",
    options: ["Langsung ke kantor BEI", "Perusahaan Sekuritas Anggota Bursa", "Bank sentral", "Kantor pos"],
    answer: 1,
    explain: "BEI menyediakan sistem dan aturan perdagangan, sedangkan investor bertransaksi melalui Perusahaan Sekuritas Anggota Bursa.",
  },
  {
    q: "3. Apa fungsi utama aplikasi resmi IDX Mobile dalam pembelajaran pasar modal?",
    options: [
      "Menjanjikan keuntungan harian pasti",
      "Menyajikan data pasar, indeks, dan keterbukaan informasi resmi BEI",
      "Menggantikan peran OJK dalam pengawasan bank",
      "Mencetak sertifikat fisik saham di rumah",
    ],
    answer: 1,
    explain: "Aplikasi IDX Mobile membantu masyarakat memantau data perdagangan, indeks, dan keterbukaan informasi resmi dari BEI.",
  },
  {
    q: "4. Apa arti dari IHSG?",
    options: [
      "Indeks Harga Saham Gabungan seluruh saham tercatat di BEI",
      "Nama saham milik satu perusahaan teknologi",
      "Aplikasi khusus transaksi obligasi negara",
      "Biaya administrasi pembukaan rekening",
    ],
    answer: 0,
    explain: "IHSG adalah indeks komposit yang menggambarkan pergerakan harga gabungan saham-saham yang tercatat di BEI.",
  },
  {
    q: "5. Sikap apa yang paling tepat setelah mempelajari cara kerja saham?",
    options: [
      "Membeli saham hanya karena ajakan media sosial",
      "Meminjam dana tanpa memperhitungkan risiko rugi",
      "Memahami profil risiko, membaca data emiten, dan berinvestasi secara rasional",
      "Menganggap harga saham selalu naik setiap hari",
    ],
    answer: 2,
    explain: "Harga saham dipengaruhi penawaran dan permintaan serta memiliki risiko naik-turun, sehingga riset dan pengelolaan risiko sangat penting.",
  },
];

const quizList = document.querySelector("#quiz-list");
const quizScorePill = document.querySelector("#quiz-score-pill");
const quizSummary = document.querySelector("#quiz-summary");
const quizReset = document.querySelector("#quiz-reset");
let quizAnswers = new Map();

function renderQuiz() {
  if (!quizList) return;
  quizAnswers = new Map();
  quizList.replaceChildren();
  updateQuizScore();

  quizData.forEach((item, qIndex) => {
    const card = document.createElement("article");
    card.className = "quiz-card";

    const question = document.createElement("p");
    question.className = "quiz-question";
    question.textContent = item.q;

    const optionsWrap = document.createElement("div");
    optionsWrap.className = "quiz-options";

    const feedback = document.createElement("p");
    feedback.className = "quiz-feedback";
    feedback.hidden = true;

    item.options.forEach((optText, optIndex) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.textContent = optText;
      btn.addEventListener("click", () => {
        if (quizAnswers.has(qIndex)) return;
        const isCorrect = optIndex === item.answer;
        quizAnswers.set(qIndex, isCorrect);
        Array.from(optionsWrap.children).forEach((childBtn, idx) => {
          childBtn.disabled = true;
          if (idx === item.answer) childBtn.classList.add("is-correct");
          else if (idx === optIndex && !isCorrect) childBtn.classList.add("is-wrong");
        });
        feedback.hidden = false;
        feedback.textContent = `${isCorrect ? "Benar." : "Belum tepat."} ${item.explain}`;
        updateQuizScore();
      });
      optionsWrap.append(btn);
    });

    card.append(question, optionsWrap, feedback);
    quizList.append(card);
  });
}

function updateQuizScore() {
  if (!quizScorePill || !quizSummary) return;
  const answered = quizAnswers.size;
  const correct = Array.from(quizAnswers.values()).filter(Boolean).length;
  quizScorePill.textContent = `Skor: ${correct} / ${quizData.length}`;
  if (answered === 0) {
    quizSummary.textContent = "Pilih jawaban pada setiap pertanyaan untuk melihat penjelasan langsung.";
  } else if (answered < quizData.length) {
    quizSummary.textContent = `${answered} dari ${quizData.length} pertanyaan terjawab.`;
  } else {
    quizSummary.textContent = `Selesai! Anda menjawab benar ${correct} dari ${quizData.length} pertanyaan materi kunjungan BEI.`;
  }
}

quizReset?.addEventListener("click", renderQuiz);

renderGallery();
renderExplorer();
renderIdxTab("ringkasan");
updateSimulator();
renderQuiz();
