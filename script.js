// script.js

/* ============================================
   DEVIL REIGN - COMPLETE SCRIPT v5.0
   Update: Separated Files & Welcome Modal
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
    this.position = -15;
    this.direction = 1;
    this.maxMove = 15;
    this.speed = 0.3;
    this.animationId = null;
    this.init();
  }
  
  init() {
    this.irises.forEach(iris => {
      iris.style.transition = 'transform 0.1s linear';
    });
    
    this.animate();
    
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
    
    this.position += this.speed * this.direction;
    
    if (this.position >= this.maxMove) {
      this.direction = -1;
    } else if (this.position <= -this.maxMove) {
      this.direction = 1;
    }
    
    this.irises.forEach(iris => {
      iris.style.transform = `translate(calc(-50% + ${this.position}px), -50%)`;
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DevilEyes();
});

// ========== 3. LOADER & WELCOME SYSTEM ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('devil-loader').classList.add('hide');
    // Show welcome modal after loader
    setTimeout(() => {
      document.getElementById('promo-modal').classList.add('show');
    }, 500);
  }, 2000);
});

function closePromo() {
  document.getElementById('promo-modal').classList.remove('show');
}

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

// ========== 5. LOCATION SYSTEM ==========
let currentLocation = null;

function getLocation() {
  const btn = document.getElementById('btnLokasi');
  const info = document.getElementById('infoLokasi');
  const teks = document.getElementById('teksLokasi');
  
  if (!navigator.geolocation) {
    showToast("⚠️ Browser tidak mendukung geolocation");
    toggleManual();
    return;
  }
  
  btn.disabled = true;
  btn.classList.add('loading');
  btn.innerHTML = "<span>Mencari lokasi...</span>";
  
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      // Save coordinates
      document.getElementById('latCoord').value = lat;
      document.getElementById('lngCoord').value = lng;
      
      try {
        // Reverse geocoding using OpenStreetMap Nominatim
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&accept-language=id`);
        const data = await response.json();
        
        let locationName = "";
        if (data.address) {
          const city = data.address.city || data.address.town || data.address.village || data.address.county || "";
          const state = data.address.state || "";
          locationName = city || state || "Lokasi Terdeteksi";
        } else {
          locationName = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }
        
        // Fill hidden input
        document.getElementById('kotaTerpilih').value = locationName;
        currentLocation = { lat, lng, name: locationName };
        
        // Show info
        teks.textContent = `${locationName} (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
        info.classList.add('show');
        
        // Reset button
        btn.innerHTML = "<span>✓ Lokasi Terdeteksi</span>";
        btn.style.background = "linear-gradient(135deg, #004d00 0%, #002200 100%)";
        btn.style.borderColor = "#00ff00";
        btn.style.color = "#00ff00";
        
        showToast("✅ Lokasi berhasil dideteksi!");
        
      } catch (error) {
        console.error("Geocoding error:", error);
        // Fallback to coordinates only
        document.getElementById('kotaTerpilih').value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        teks.textContent = `Koordinat: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        info.classList.add('show');
        btn.innerHTML = "<span>✓ Koordinat Tersimpan</span>";
        showToast("⚠️ Nama kota tidak terdeteksi, menggunakan koordinat");
      }
      
      btn.classList.remove('loading');
      btn.disabled = false;
    },
    (error) => {
      console.error("Geolocation error:", error);
      btn.disabled = false;
      btn.classList.remove('loading');
      btn.innerHTML = "<span>📍 Dapatkan Lokasi Otomatis</span>";
      
      let errorMsg = "Gagal mendapatkan lokasi";
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMsg = "Izin lokasi ditolak";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg = "Informasi lokasi tidak tersedia";
          break;
        case error.TIMEOUT:
          errorMsg = "Timeout mendapatkan lokasi";
          break;
      }
      
      showToast(`⚠️ ${errorMsg}. Silakan ketik manual.`);
      toggleManual();
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function toggleManual() {
  const manualDiv = document.getElementById('manualInput');
  if (manualDiv.style.display === 'none') {
    manualDiv.style.display = 'block';
    manualDiv.querySelector('input').focus();
  } else {
    manualDiv.style.display = 'none';
  }
}

// ========== 6. SECURITY SYSTEM ==========
const modal = document.getElementById("modal");

// Config
const DEVIL_BLOCK_TIME = 120;
const DEVIL_MAX_ATTEMPT = 3;
const SUBMIT_COOLDOWN = 8;
const SPAM_THRESHOLD = 1;
const HUMAN_MIN_TIME = 3000;

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

function detectGarbageInput(value, fieldName) {
  if (fieldName === 'usn' || fieldName === 'USN') return false;
  
  if (!value || value.length < 3) return false;
  
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
  
  if (/^([a-z][a-z])\1{2,}$/i.test(value)) {
    return " pola berulang (ab-ab-ab)";
  }
  
  const impossibleClusters = /[bcdfghjklmnpqrstvwxyz]{5,}/i;
  if (impossibleClusters.test(value)) {
    return " huruf konsonan berlebihan";
  }
  
  const noVowels = /[^aiueo]{6,}/i;
  if (noVowels.test(value)) {
    return " tidak ada vokal (random string)";
  }
  
  if (/(.)\1{3,}/.test(value)) {
    return " karakter berulang";
  }
  
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

document.addEventListener('DOMContentLoaded', () => {
  formStartTime = Date.now();
  
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    if (input.id === 'usn') return;
    
    input.addEventListener('paste', (e) => {
      const pasteLength = (e.clipboardData || window.clipboardData).getData('text').length;
      if (pasteLength > 30) {
        devilAttempt++;
        showToast("⚠️ Jangan paste text panjang! Ketik manual.");
        e.preventDefault();
        if (devilAttempt >= DEVIL_MAX_ATTEMPT) activateDevilBlock();
      }
    });
    
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

function isHumanName(name) {
  if (!name || typeof name !== 'string') return false;
  const cleanName = name.toLowerCase().trim();
  
  const garbage = detectGarbageInput(name, 'nama');
  if (garbage) {
    showToast(`🤔 Nama terdeteksi:${garbage}`);
    return false;
  }
  
  if (cleanName.length < 3 || cleanName.length > 50) return false;
  
  const vowels = (cleanName.match(/[aiueo]/g) || []).length;
  const consonants = (cleanName.match(/[bcdfghjklmnpqrstvwxyz]/g) || []).length;
  const total = vowels + consonants;
  
  if (total === 0) return false;
  const vowelRatio = vowels / total;
  
  if (vowelRatio < 0.2 || vowelRatio > 0.6) {
    showToast("🤔 Nama tidak manusiawi (cek vokal)!");
    return false;
  }
  
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

// ========== 7. FORM VALIDATION ==========
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
    { id: "usn", label: "USN Hotel Hideaway", minLength: 3, isUSN: true },
    { id: "kotaTerpilih", label: "Asal Kota", displayId: "searchKota", checkManual: true },
    { id: "alasan", label: "Alasan Bergabung", minLength: 10 }
  ];

  let hasError = false;

  for (const field of fields) {
    const el = $(field.id);
    let displayEl = field.displayId ? $(field.displayId) : el;
    let val = el.value.trim();

    // Special check for kota (manual input fallback)
    if (field.checkManual && !val) {
      const manualVal = $('searchKota').value.trim();
      if (manualVal) {
        val = manualVal;
        el.value = manualVal;
      }
    }

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
      if (val.length < field.minLength) {
        devilAttempt++;
        showToast(`⚠️ USN minimal ${field.minLength} karakter!`);
        displayEl.focus();
        hasError = true;
        break;
      }
    } else if (val.length < field.minLength) {
      devilAttempt++;
      showToast(`⚠️ ${field.label} minimal ${field.minLength} karakter!`);
      displayEl.focus();
      hasError = true;
      break;
    }
    
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

// ========== 8. CAPTCHA MODAL ==========
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

// ========== 9. WHATSAPP SUBMISSION ==========
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
  const usn = escapeHtml($("usn").value.trim());
  
  // Get location data
  let kota = escapeHtml($("kotaTerpilih").value.trim());
  const lat = $("latCoord").value;
  const lng = $("lngCoord").value;
  
  // Format location with coordinates if available
  let lokasiText = kota;
  if (lat && lng) {
    lokasiText += `\n📍 Koordinat: ${lat}, ${lng}`;
    lokasiText += `\n🗺️ Maps: https://maps.google.com/?q=${lat},${lng}`;
  }
  
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
🌍 ${lokasiText}

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
  const fields = ["nama", "umur", "usn", "kotaTerpilih", "alasan", "adminWA", "searchKota", "latCoord", "lngCoord"];
  fields.forEach(id => {
    const el = $(id);
    if (el) el.value = "";
  });
  
  // Reset location UI
  document.getElementById('infoLokasi').classList.remove('show');
  document.getElementById('btnLokasi').innerHTML = "<span>📍 Dapatkan Lokasi Otomatis</span>";
  document.getElementById('btnLokasi').style.background = "";
  document.getElementById('btnLokasi').style.borderColor = "";
  document.getElementById('btnLokasi').style.color = "";
  document.getElementById('manualInput').style.display = 'none';
  
  isSubmitting = false;
  inputHistory = {};
  const btn = document.querySelector('.modal-box .btn-primary');
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = "SETUJU & KIRIM";
  }
  formStartTime = Date.now();
}

// ========== 10. UTILITIES ==========
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('show')) {
      modal.classList.remove('show');
    }
    closeCaptcha();
    if (document.getElementById('promo-modal').classList.contains('show')) {
      closePromo();
    }
  }
});

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// ========== 11. CONSOLE LOG ==========
console.log("%c☠️ DEVIL REIGN SYSTEM v5.0 LOCATION UPDATE", "color: #ff1f1f; font-size: 24px; font-weight: bold;");
console.log("%c👁️ Devil Eyes: WATCHING", "color: #ff0000; font-size: 14px;");
console.log("%c🌍 Auto Location: ACTIVE", "color: #00ff00; font-size: 12px;");
console.log("%c🎨 Website by: @hironimuaoosen09", "color: #ff69b4; font-size: 12px;");