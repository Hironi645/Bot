/* ============================================
   DEVIL REIGN - COMPLETE SCRIPT v4.3 FINAL
   Added: Devil Eyes Animation
   ============================================ */

// ========== 1. FIRE PARTICLES SYSTEM ==========
const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const colors = ['#ff1f1f', '#ff4444', '#ff6666', '#8b0000', '#ff0000'];

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 10,
    vx: (Math.random() - 0.5) * 1.5,
    vy: -Math.random() * 3 - 1,
    life: 0,
    maxLife: Math.random() * 100 + 80,
    size: Math.random() * 4 + 2,
    color: colors[Math.floor(Math.random() * colors.length)]
  };
}

let frameCount = 0;
function animateFire() {
  frameCount++;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (frameCount % 2 === 0) {
    for (let i = 0; i < 3; i++) {
      particles.push(createParticle());
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life++;
    p.size *= 0.985;

    const opacity = 1 - (p.life / p.maxLife);
    const alphaHex = Math.floor(opacity * 255).toString(16).padStart(2, '0');
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color + alphaHex;
    ctx.shadowBlur = 15;
    ctx.shadowColor = p.color;
    ctx.fill();

    if (p.life >= p.maxLife || p.size < 0.5) {
      particles.splice(i, 1);
    }
  }

  ctx.shadowBlur = 0;
  requestAnimationFrame(animateFire);
}

animateFire();

/// ========== 2. DEVIL EYES CONTROLLER ==========
class DevilEyes {
  constructor() {
    this.irises = document.querySelectorAll('.iris');
    this.isActive = true;
    this.position = -15; // Mulai dari kiri
    this.direction = 1; // 1 = ke kanan, -1 = ke kiri
    this.maxMove = 15; // Jarak gerakan pixel
    this.speed = 0.3; // Kecepatan gerakan
    this.animationId = null;
    this.init();
  }
  
  init() {
    // Setup transisi halus
    this.irises.forEach(iris => {
      iris.style.transition = 'transform 0.1s linear';
    });
    
    // Mulai animasi terus menerus
    this.animate();
    
    // Pause saat tab tidak aktif
    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
      if (this.isActive) {
        this.animate();
      } else {
        cancelAnimationFrame(this.animationId);
      }
    });
  }
  
  animate() {
    if (!this.isActive) return;
    
    // Update posisi
    this.position += this.speed * this.direction;
    
    // Balik arah jika sudah sampai ujung
    if (this.position >= this.maxMove) {
      this.direction = -1;
    } else if (this.position <= -this.maxMove) {
      this.direction = 1;
    }
    
    // Aplikasikan gerakan ke mata
    this.irises.forEach(iris => {
      iris.style.transform = `translate(calc(-50% + ${this.position}px), -50%)`;
    });
    
    // Loop terus menerus
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// Initialize Devil Eyes when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DevilEyes();
});

// ========== 3. LOADER SYSTEM ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('devil-loader').classList.add('hide');
  }, 2000);
});

// ========== 4. TOAST NOTIFICATION ==========
function showToast(message, duration = 3000) {
  const toast = document.getElementById('devil-toast');
  const toastMsg = document.getElementById('toast-message');
  
  toast.classList.remove('show');
  void toast.offsetWidth;
  
  toastMsg.textContent = message;
  toast.classList.add('show');
  
  if (duration > 0) {
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
}

// ========== 5. DATA KOTA SELURUH INDONESIA (500+) ==========
const dataIndonesia = {
  "Sumatra": [
    "Banda Aceh", "Sabang", "Langsa", "Lhokseumawe", "Subulussalam",
    "Medan", "Binjai", "Padang Sidempuan", "Pematangsiantar", "Sibolga",
    "Tanjungbalai", "Tebing Tinggi", "Gunungsitoli",
    "Padang", "Bukittinggi", "Padang Panjang", "Pariaman", "Payakumbuh",
    "Sawahlunto", "Solok",
    "Pekanbaru", "Dumai",
    "Batam", "Bintan", "Tanjungpinang", "Lingga", "Natuna", "Anambas",
    "Jambi", "Sungai Penuh", "Muara Bungo", "Kuala Tungkal",
    "Palembang", "Lubuklinggau", "Pagar Alam", "Prabumulih", "Baturaja",
    "Bengkulu", "Curup", "Mukomuko",
    "Bandar Lampung", "Metro", "Liwa", "Kalianda", "Pringsewu"
  ],
  
  "Jawa": [
    "Serang", "Cilegon", "Tangerang", "Tangerang Selatan", "Banten",
    "Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur",
    "Bandung", "Bekasi", "Bogor", "Depok", "Cimahi", "Cirebon", "Sukabumi", "Tasikmalaya",
    "Banjar", "Garut", "Indramayu", "Karawang", "Kuningan", "Majalengka", "Purwakarta",
    "Subang", "Sumedang", "Cianjur",
    "Semarang", "Magelang", "Pekalongan", "Salatiga", "Surakarta", "Tegal",
    "Banyumas", "Batang", "Blora", "Boyolali", "Brebes", "Cilacap", "Demak",
    "Grobogan", "Jepara", "Karanganyar", "Kebumen", "Kendal", "Klaten",
    "Kudus", "Pati", "Purbalingga", "Purworejo", "Rembang", "Sragen",
    "Sukoharjo", "Wonogiri", "Wonosobo",
    "Yogyakarta", "Bantul", "Gunungkidul", "Kulon Progo", "Sleman",
    "Surabaya", "Batu", "Blitar", "Kediri", "Madiun", "Malang", "Mojokerto",
    "Pasuruan", "Probolinggo", "Banyuwangi", "Bangkalan", "Bojonegoro",
    "Bondowoso", "Gresik", "Jember", "Jombang", "Lamongan", "Lumajang",
    "Magetan", "Nganjuk", "Ngawi", "Pacitan", "Pamekasan", "Ponorogo",
    "Sampang", "Sidoarjo", "Situbondo", "Sumenep", "Trenggalek", "Tuban",
    "Tulungagung"
  ],
  
  "Kalimantan": [
    "Pontianak", "Singkawang", "Mempawah", "Sambas", "Sintang", "Ketapang",
    "Palangkaraya", "Sampit", "Pangkalan Bun", "Kuala Kurun", "Tamiang Layang",
    "Banjarmasin", "Banjarbaru", "Martapura", "Rantau", "Pelaihari",
    "Barabai", "Kandangan", "Tanjung", "Amuntai",
    "Samarinda", "Balikpapan", "Bontang", "Sangatta", "Tenggarong",
    "Sendawar", "Melak", "Palaran",
    "Tanjung Selor", "Tarakan", "Nunukan", "Malinau", "Bulungan"
  ],
  
  "Sulawesi": [
    "Manado", "Bitung", "Tomohon", "Kotamobagu", "Tondano",
    "Gorontalo", "Limboto", "Kwandang",
    "Palu", "Poso", "Tolitoli", "Bangga", "Luwuk", "Parigi",
    "Mamuju", "Majene", "Polewali Mandar", "Mamasa",
    "Makassar", "Parepare", "Palopo", "Bantaeng", "Barru", "Bone",
    "Bulukumba", "Enrekang", "Gowa", "Jeneponto", "Selayar", "Maros",
    "Pangkajene", "Pinrang", "Sidenreng Rappang", "Sinjai", "Soppeng",
    "Takalar", "Tana Toraja", "Toraja Utara", "Wajo", "Sengkang",
    "Kendari", "Baubau", "Kolaka", "Raha", "Unaaha", "Wangi-wangi"
  ],
  
  "Bali & Nusa Tenggara": [
    "Denpasar", "Badung", "Bangli", "Buleleng", "Gianyar", "Jembrana",
    "Karangasem", "Klungkung", "Tabanan",
    "Mataram", "Bima", "Sumbawa Besar", "Praya", "Selong", "Taliwang",
    "Kupang", "Atambua", "Bajawa", "Betun", "Borong", "Ende", "Kefamenanu",
    "Labuan Bajo", "Larantuka", "Lewoleba", "Maumere", "Mbay", "Ruteng",
    "Sabu", "Soe", "Waibakul", "Waikabubak", "Waingapu"
  ],
  
  "Maluku": [
    "Ambon", "Tual", "Masohi", "Namlea", "Banda", "Langgur", "Dobo",
    "Ternate", "Tidore", "Sofifi", "Jailolo", "Labuha", "Maba", "Sanana"
  ],
  
  "Papua": [
    "Jayapura", "Sentani", "Abepura", "Merauke", "Timika", "Nabire",
    "Wamena", "Serui", "Biak", "Manokwari", "Sorong", "Fakfak",
    "Kaimana", "Bintuni", "Ransiki", "Teminabuan",
    "Merauke", "Tanah Merah", "Boven Digoel",
    "Nabire", "Sugapa", "Moanemani",
    "Jayawijaya", "Wamena", "Mulia",
    "Sorong", "Raja Ampat", "Maybrat",
    "Manokwari", "Teluk Bintuni", "Teluk Wondama", "Fakfak", "Kaimana"
  ]
};

// ========== 6. DROPDOWN KOTA ==========
const input = document.getElementById("searchKota");
const dropdown = document.getElementById("dropdown");
const hidden = document.getElementById("kotaTerpilih");
let activeIndex = -1;
let items = [];

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function render(filter = "") {
  dropdown.innerHTML = "";
  items = [];
  activeIndex = -1;

  const filterLower = filter.toLowerCase().trim();

  for (const pulau in dataIndonesia) {
    const hasil = dataIndonesia[pulau].filter(k =>
      k.toLowerCase().includes(filterLower)
    );
    
    if (hasil.length) {
      const g = document.createElement("div");
      g.className = "group";
      g.textContent = pulau;
      dropdown.appendChild(g);

      hasil.forEach(kota => {
        const div = document.createElement("div");
        div.className = "item";
        
        if (filterLower) {
          const regex = new RegExp(`(${escapeRegex(filter)})`, "gi");
          div.innerHTML = kota.replace(regex, "<b>$1</b>");
        } else {
          div.textContent = kota;
        }
        
        div.onclick = () => {
          input.value = kota;
          hidden.value = kota;
          dropdown.classList.remove("show");
        };
        
        dropdown.appendChild(div);
        items.push(div);
      });
    }
  }
  
  if (items.length) {
    dropdown.classList.add("show");
  } else {
    dropdown.classList.remove("show");
  }
}

input.addEventListener("input", (e) => {
  render(e.target.value);
});

input.addEventListener("keydown", (e) => {
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex = (activeIndex + 1) % items.length;
    updateActiveItem();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    updateActiveItem();
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (activeIndex >= 0 && items[activeIndex]) {
      items[activeIndex].click();
    }
  } else if (e.key === "Escape") {
    dropdown.classList.remove("show");
  }
});

function updateActiveItem() {
  items.forEach((item, index) => {
    item.classList.toggle("active", index === activeIndex);
  });
  
  if (items[activeIndex]) {
    items[activeIndex].scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown-container")) {
    dropdown.classList.remove("show");
  }
});

// ========== 7. SECURITY SYSTEM ==========
const modal = document.getElementById("modal");

// Config
const DEVIL_BLOCK_TIME = 120; // 2 menit
const DEVIL_MAX_ATTEMPT = 3;
const SUBMIT_COOLDOWN = 8; // 8 detik antar submit
const SPAM_THRESHOLD = 1;
const HUMAN_MIN_TIME = 3000; // 3 detik minimal isi form

let devilAttempt = 0;
let devilBlockedUntil = 0;
let submitAttempts = [];
let isSubmitting = false;
let formStartTime = Date.now();
let captchaAnswer = null;
let inputHistory = {};

function $(id) {
  return document.getElementById(id);
}

// Deteksi Ketik Sembarangan (TIDAK berlaku untuk USN Game)
function detectGarbageInput(value, fieldName) {
  // SKIP untuk USN Hotel Hideaway - bebas karakter
  if (fieldName === 'usn' || fieldName === 'USN') return false;
  
  if (!value || value.length < 3) return false;
  
  // 1. Keyboard Mashing (asdfgh, qwerty, zxcvbn)
  const keyboardRows = [
    'qwertyuiop', 'asdfghjkl', 'zxcvbnm',
    'qwertzuiop', 'yxcvbnm', '1234567890'
  ];
  
  for (let row of keyboardRows) {
    for (let i = 0; i <= row.length - 4; i++) {
      const substring = row.substring(i, i + 4);
      if (value.toLowerCase().includes(substring)) {
        return ` pola keyboard (${substring})`;
      }
    }
  }
  
  // 2. Alternating Pattern (kjkjkj, huhuhu)
  if (/^([a-z][a-z])\1{2,}$/i.test(value)) {
    return " pola berulang (ab-ab-ab)";
  }
  
  // 3. Konsonan berlebihan (tidak bisa diucapkan)
  const impossibleClusters = /[bcdfghjklmnpqrstvwxyz]{5,}/i;
  if (impossibleClusters.test(value)) {
    return " huruf konsonan berlebihan";
  }
  
  // 4. Tidak ada vokal (krtmpl)
  const noVowels = /[^aiueo]{6,}/i;
  if (noVowels.test(value)) {
    return " tidak ada vokal (random string)";
  }
  
  // 5. Karakter sama berulang (aaaa, bbbb)
  if (/(.)\1{3,}/.test(value)) {
    return " karakter berulang";
  }
  
  // 6. Sequential typing (abc, def, ghij)
  if (!inputHistory[fieldName]) inputHistory[fieldName] = [];
  inputHistory[fieldName].push(value);
  
  const history = inputHistory[fieldName];
  if (history.length >= 3) {
    const last3 = history.slice(-3);
    const diff1 = last3[1].length - last3[0].length;
    const diff2 = last3[2].length - last3[1].length;
    
    if (diff1 === 1 && diff2 === 1) {
      const last6 = last3[2].slice(-6).toLowerCase();
      for (let row of keyboardRows) {
        if (row.includes(last6)) return " sequential typing (abcdef)";
      }
    }
  }
  
  if (inputHistory[fieldName].length > 5) inputHistory[fieldName].shift();
  
  return false;
}

// Track behavior
document.addEventListener('DOMContentLoaded', () => {
  formStartTime = Date.now();
  
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    // SKIP USN untuk semua proteksi karena game username bebas
    if (input.id === 'usn') return;
    
    // Deteksi paste massal (>30 karakter)
    input.addEventListener('paste', (e) => {
      const pasteLength = (e.clipboardData || window.clipboardData).getData('text').length;
      if (pasteLength > 30) {
        devilAttempt++;
        showToast("⚠️ Jangan paste text panjang! Ketik manual.");
        e.preventDefault();
        if (devilAttempt >= DEVIL_MAX_ATTEMPT) activateDevilBlock();
      }
    });
    
    // Deteksi garbage saat selesai input (blur)
    input.addEventListener('blur', () => {
      const fieldName = input.id || input.name;
      const garbage = detectGarbageInput(input.value, fieldName);
      
      if (garbage) {
        devilAttempt++;
        showToast(`🤔 Input mencurigakan:${garbage}`);
        input.value = '';
        if (devilAttempt >= DEVIL_MAX_ATTEMPT) {
          showToast("⛔ Terlalu banyak input tidak wajar! Sistem dikunci.", 5000);
          activateDevilBlock();
        }
      }
    });
  });
});

// Generate CAPTCHA Matematika
function generateCaptcha() {
  const ops = ['+', '-', 'x'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let num1, num2;
  
  if (op === 'x') {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
  } else {
    num1 = Math.floor(Math.random() * 20) + 10;
    num2 = Math.floor(Math.random() * 10) + 1;
  }
  
  let answer;
  switch(op) {
    case '+': answer = num1 + num2; break;
    case '-': answer = num1 - num2; break;
    case 'x': answer = num1 * num2; break;
  }
  
  captchaAnswer = answer;
  return `${num1} ${op} ${num2} = ?`;
}

function isDevilBlocked() {
  const now = Date.now();
  if (now < devilBlockedUntil) {
    const sisa = Math.ceil((devilBlockedUntil - now) / 1000);
    showToast(`🚫 SISTEM DIBLOKIR! Tunggu ${sisa} detik`, 3000);
    return true;
  }
  return false;
}

function activateDevilBlock() {
  devilBlockedUntil = Date.now() + (DEVIL_BLOCK_TIME * 1000);
  devilAttempt = 0;
  submitAttempts = [];
  inputHistory = {};
  showToast(`⛔ AKSES DIBLOKIR ${DEVIL_BLOCK_TIME/60} MENIT!`, 5000);
  console.error(`[DEVIL GUARD] Locked until: ${new Date(devilBlockedUntil)}`);
}

function isSubmitSpam() {
  const now = Date.now();
  submitAttempts = submitAttempts.filter(time => now - time < SUBMIT_COOLDOWN * 1000);
  
  if (submitAttempts.length >= SPAM_THRESHOLD) {
    const remaining = Math.ceil((submitAttempts[0] + SUBMIT_COOLDOWN * 1000 - now) / 1000);
    showToast(`🚫 Cooldown aktif! Tunggu ${remaining} detik`, 3000);
    devilAttempt++;
    if (devilAttempt >= DEVIL_MAX_ATTEMPT) activateDevilBlock();
    return true;
  }
  
  submitAttempts.push(now);
  return false;
}

// Cek Nama Manusiawi (hanya untuk field nama)
function isHumanName(name) {
  if (!name || typeof name !== 'string') return false;
  const cleanName = name.toLowerCase().trim();
  
  // Cek mashing di nama
  const garbage = detectGarbageInput(name, 'nama');
  if (garbage) {
    showToast(`🤔 Nama terdeteksi:${garbage}`);
    return false;
  }
  
  if (cleanName.length < 3 || cleanName.length > 50) return false;
  
  // Rasio vokal/konsonan
  const vowels = (cleanName.match(/[aiueo]/g) || []).length;
  const consonants = (cleanName.match(/[bcdfghjklmnpqrstvwxyz]/g) || []).length;
  const total = vowels + consonants;
  
  if (total === 0) return false;
  const vowelRatio = vowels / total;
  
  if (vowelRatio < 0.2 || vowelRatio > 0.6) {
    showToast("🤔 Nama tidak manusiawi (cek vokal)!");
    return false;
  }
  
  // Cek nama umum Indonesia atau nama lengkap (ada spasi)
  const commonNames = ['budi', 'agus', 'dewi', 'siti', 'ani', 'adi', 'bambang', 'citra', 
    'dani', 'eko', 'fajar', 'gita', 'hendra', 'indah', 'joko', 'kirana', 'lina', 'mira', 
    'nina', 'oki', 'putri', 'rudi', 'sari', 'tono', 'uci', 'vina', 'wati', 'yuni', 'zain', 
    'ahmad', 'muhammad', 'abdul', 'fatimah', 'nur', 'dian', 'bayu', 'ratna', 'sinta', 'rio',
    'reza', 'fauzi', 'aldi', 'doni', 'erik', 'faisal', 'gilang', 'heri', 'irfan', 'juned'];
  
  const hasCommonName = commonNames.some(n => cleanName.includes(n));
  const hasSpace = cleanName.includes(' ');
  
  if (!hasSpace && !hasCommonName && cleanName.length < 6) {
    showToast("⚠️ Ketik nama lengkap (depan belakang) atau nama yang umum!");
    return false;
  }
  
  return true;
}

function isValidAge(age) {
  const num = parseInt(age);
  return !isNaN(num) && num >= 13 && num <= 80;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========== 8. FORM VALIDATION ==========
function cekForm() {
  if (isDevilBlocked()) return;
  if (isSubmitSpam()) return;

  const timeSpent = Date.now() - formStartTime;
  if (timeSpent < HUMAN_MIN_TIME) {
    showToast(`⚠️ Cek kembali data! (${Math.ceil((HUMAN_MIN_TIME - timeSpent)/1000)}s)`);
    return;
  }

  if (Date.now() > devilBlockedUntil) {
    devilAttempt = Math.max(0, devilAttempt - 1);
  }

  const fields = [
    { id: "nama", label: "Nama Lengkap", minLength: 3, isName: true },
    { id: "umur", label: "Umur", type: "age" },
    { id: "usn", label: "USN Hotel Hideaway", minLength: 3, isUSN: true }, // USN GAME - RELAXED
    { id: "kotaTerpilih", label: "Asal Kota", displayId: "searchKota" },
    { id: "alasan", label: "Alasan Bergabung", minLength: 10 }
  ];

  let hasError = false;

  for (const field of fields) {
    const el = $(field.id);
    const displayEl = field.displayId ? $(field.displayId) : el;
    let val = el.value.trim();

    if (!val) {
      devilAttempt++;
      showToast(`⚠️ ${field.label} wajib diisi!`);
      displayEl.focus();
      hasError = true;
      break;
    }

    if (field.type === "age") {
      if (!isValidAge(val)) {
        devilAttempt++;
        showToast("⚠️ Umur harus 13-80 tahun!");
        displayEl.focus();
        hasError = true;
        break;
      }
    } else if (field.isName) {
      if (!isHumanName(val)) {
        devilAttempt++;
        displayEl.focus();
        hasError = true;
        break;
      }
    } else if (field.isUSN) {
      // USN GAME: Bebas karakter apa saja, hanya cek panjang minimal
      if (val.length < field.minLength) {
        devilAttempt++;
        showToast(`⚠️ USN minimal ${field.minLength} karakter!`);
        displayEl.focus();
        hasError = true;
        break;
      }
      // Tidak ada cek garbage untuk USN - Boleh xX_Dark_123_Xx
    } else if (val.length < field.minLength) {
      devilAttempt++;
      showToast(`⚠️ ${field.label} minimal ${field.minLength} karakter!`);
      displayEl.focus();
      hasError = true;
      break;
    }
    
    // Final garbage check untuk field lain (bukan nama & bukan usn)
    if (!field.isName && !field.isUSN) {
      const garbage = detectGarbageInput(val, field.id);
      if (garbage) {
        devilAttempt++;
        showToast(`⚠️ ${field.label} tidak wajar:${garbage}`);
        displayEl.value = '';
        displayEl.focus();
        hasError = true;
        break;
      }
    }
  }

  if (hasError) {
    if (devilAttempt >= DEVIL_MAX_ATTEMPT) activateDevilBlock();
    return;
  }

  const adminWA = $("adminWA").value;
  if (!adminWA) {
    devilAttempt++;
    showToast("⚠️ Pilih Admin WhatsApp!");
    $("adminWA").focus();
    if (devilAttempt >= DEVIL_MAX_ATTEMPT) activateDevilBlock();
    return;
  }

  showCaptchaModal();
}

// ========== 9. CAPTCHA MODAL ==========
function showCaptchaModal() {
  let captchaModal = document.getElementById('captcha-modal');
  if (!captchaModal) {
    captchaModal = document.createElement('div');
    captchaModal.id = 'captcha-modal';
    captchaModal.innerHTML = `
      <div class="modal-box" style="max-width: 350px;">
        <h3 class="glitch-text" data-text="VERIFIKASI MANUSIA">VERIFIKASI MANUSIA</h3>
        <div class="divider"></div>
        <p style="text-align: center; font-size: 12px; color: #ff9b9b; margin-bottom: 20px;">
          Selesaikan soal matematika:
        </p>
        <div style="background: rgba(139,0,0,0.2); padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 20px; border: 1px solid var(--blood);">
          <span id="captcha-question" style="font-size: 28px; font-weight: bold; color: #fff; letter-spacing: 3px;"></span>
        </div>
        <input type="number" id="captcha-input" class="devil-input" placeholder="Jawaban..." style="text-align: center; font-size: 20px; margin-bottom: 20px;">
        <button class="btn-primary" onclick="verifyCaptcha()">VERIFIKASI</button>
        <button class="btn-primary" onclick="closeCaptcha()" style="background: #333; margin-top: 10px; font-size: 12px;">BATAL</button>
      </div>
    `;
    captchaModal.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9998;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    `;
    document.body.appendChild(captchaModal);
    
    captchaModal.addEventListener('click', (e) => {
      if (e.target === captchaModal) closeCaptcha();
    });
  }
  
  const question = generateCaptcha();
  document.getElementById('captcha-question').textContent = question;
  document.getElementById('captcha-input').value = '';
  
  setTimeout(() => {
    captchaModal.style.opacity = '1';
    captchaModal.style.visibility = 'visible';
    document.getElementById('captcha-input').focus();
  }, 100);
}

function closeCaptcha() {
  const captchaModal = document.getElementById('captcha-modal');
  if (captchaModal) {
    captchaModal.style.opacity = '0';
    captchaModal.style.visibility = 'hidden';
  }
}

function verifyCaptcha() {
  const input = document.getElementById('captcha-input');
  const userAnswer = parseInt(input.value);
  
  if (isNaN(userAnswer)) {
    showToast("⚠️ Masukkan jawaban angka!");
    input.value = '';
    input.focus();
    return;
  }
  
  if (userAnswer !== captchaAnswer) {
    devilAttempt++;
    showToast("❌ Jawaban salah! Coba lagi.");
    input.value = '';
    
    const question = generateCaptcha();
    document.getElementById('captcha-question').textContent = question;
    
    if (devilAttempt >= DEVIL_MAX_ATTEMPT) {
      closeCaptcha();
      activateDevilBlock();
    }
    return;
  }
  
  closeCaptcha();
  modal.classList.add('show');
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

// ========== 10. WHATSAPP SUBMISSION ==========
function kirim() {
  if (isDevilBlocked()) {
    modal.classList.remove("show");
    return;
  }
  
  if (isSubmitting) {
    showToast("⏳ Mohon tunggu...");
    return;
  }
  
  if (isSubmitSpam()) {
    modal.classList.remove("show");
    return;
  }

  isSubmitting = true;
  const btn = document.querySelector('.modal-box .btn-primary');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = "MENGIRIM...";
  }

  const kode = "DR-" + Math.floor(100000 + Math.random() * 900000);
  const nama = escapeHtml($("nama").value.trim());
  const umur = escapeHtml($("umur").value.trim());
  const usn = escapeHtml($("usn").value.trim()); // USN bebas karakter
  const kota = escapeHtml($("kotaTerpilih").value || $("searchKota").value);
  const alasan = escapeHtml($("alasan").value.trim());
  const adminWA = $("adminWA").value;
  
  if (!/^\d{10,15}$/.test(adminWA)) {
    showToast("⚠️ Nomor admin tidak valid!");
    resetSubmitState(btn);
    return;
  }

  const pesan = `☠️ *DEVIL REIGN — FORM MEMBER* ☠️
━━━━━━━━━━━━━━━━━━

⌁ *Kode Daftar :*
\`${kode}\`

⌁ *Identitas Pendaftar :*
👤 Nama : ${nama}
🎂 Umur : ${umur}
🆔 USN Hotel Hideaway : ${usn}

⌁ *Domisili :*
🌍 Asal Kota : ${kota}

⌁ *Alasan Bergabung :*
🩸 ${alasan}

━━━━━━━━━━━━━━━━━━
*VERIFIKASI :*
✅ Human Verified
⏳ Menunggu Approval Admin
━━━━━━━━━━━━━━━━━━

⚠️ *PERINGATAN :*
Data palsu = AUTO BLACKLIST

۝ *Satu Reign, Satu Kekuasaan* ۝
🔥 *DEVIL REIGN OFFICIAL* 🔥`;

  try {
    window.open(`https://wa.me/${adminWA}?text=${encodeURIComponent(pesan)}`, "_blank");
    modal.classList.remove("show");
    showToast("✅ Berhasil!", 2000);
    
    setTimeout(() => {
      resetForm();
      formStartTime = Date.now();
    }, 2000);
    
  } catch (error) {
    console.error("Error:", error);
    showToast("❌ Gagal mengirim!");
    resetSubmitState(btn);
  }
}

function resetSubmitState(btn) {
  isSubmitting = false;
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = "SETUJU & KIRIM";
  }
}

function resetForm() {
  const fields = ["nama", "umur", "usn", "kotaTerpilih", "alasan", "adminWA", "searchKota"];
  fields.forEach(id => {
    const el = $(id);
    if (el) el.value = "";
  });
  isSubmitting = false;
  inputHistory = {};
  const btn = document.querySelector('.modal-box .btn-primary');
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = "SETUJU & KIRIM";
  }
  formStartTime = Date.now();
}

// ========== 11. UTILITIES ==========
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('show')) {
      modal.classList.remove('show');
    }
    closeCaptcha();
  }
});

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// ========== 12. CONSOLE LOG ==========
console.log("%c☠️ DEVIL REIGN SYSTEM v4.3 FINAL", "color: #ff1f1f; font-size: 24px; font-weight: bold;");
console.log("%c👁️ Devil Eyes: WATCHING", "color: #ff0000; font-size: 14px;");
console.log("%c🎮 USN Game: RELAXED MODE", "color: #00ff00; font-size: 12px;");
console.log("%c🛡️ Anti-Mashing: ACTIVE", "color: #00ff00; font-size: 12px;");
console.log("%c🧮 Human Verification: ACTIVE", "color: #00ff00; font-size: 12px;");
console.log("%c⛔ Block: 120s | Attempts: 3/3", "color: #ffaa00; font-size: 11px;");
