<script>
const dataIndonesia = {
  "Sumatra":[
    "Banda Aceh","Medan","Binjai","Padang","Pekanbaru",
    "Jambi","Palembang","Bengkulu","Bandar Lampung",
    "Batam","Tanjungpinang","Pangkalpinang"
  ],
  "Jawa":[
    "Jakarta Pusat","Jakarta Utara","Jakarta Barat",
    "Jakarta Selatan","Jakarta Timur",
    "Bogor","Depok","Tangerang","Tangerang Selatan",
    "Bekasi","Bandung","Cirebon","Semarang",
    "Yogyakarta","Surabaya","Malang"
  ],
  "Kalimantan":[
    "Pontianak","Singkawang","Palangkaraya",
    "Banjarmasin","Banjarbaru",
    "Samarinda","Balikpapan","Bontang","Tarakan"
  ],
  "Sulawesi":[
    "Manado","Bitung","Gorontalo","Palu",
    "Makassar","Parepare","Kendari","Baubau","Mamuju"
  ],
  "Bali & Nusa Tenggara":[
    "Denpasar","Mataram","Bima","Kupang","Maumere","Labuan Bajo"
  ],
  "Maluku":[
    "Ambon","Tual","Masohi","Namlea"
  ],
  "Papua":[
    "Jayapura","Merauke","Timika","Nabire","Wamena","Sorong","Manokwari"
  ]
};

/* =========================
   DEVIL SEARCH ENGINE
========================= */
const input    = $("searchKota");
const dropdown = $("dropdown");
const hidden   = $("kota");
let activeIndex = -1;
let items = [];

function render(filter=""){
  dropdown.innerHTML = "";
  items = [];
  activeIndex = -1;

  for(const pulau in dataIndonesia){
    const hasil = dataIndonesia[pulau].filter(k =>
      k.toLowerCase().includes(filter)
    );

    if(!hasil.length) continue;

    const g = document.createElement("div");
    g.className = "group";
    g.textContent = `☠ ${pulau}`;
    dropdown.appendChild(g);

    hasil.forEach(kota=>{
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = kota.replace(
        new RegExp(filter,"ig"),
        m => `<span class="blood">${m}</span>`
      );

      div.onclick = () => {
        input.value = kota;
        hidden.value = kota;
        dropdown.style.display = "none";
      };

      dropdown.appendChild(div);
      items.push(div);
    });
  }

  dropdown.style.display = items.length ? "block" : "none";
}

input.addEventListener("input", e=>{
  render(e.target.value.toLowerCase());
});

input.addEventListener("keydown", e=>{
  if(!items.length) return;

  if(e.key === "ArrowDown"){
    activeIndex = (activeIndex + 1) % items.length;
  }
  else if(e.key === "ArrowUp"){
    activeIndex = (activeIndex - 1 + items.length) % items.length;
  }
  else if(e.key === "Enter"){
    items[activeIndex]?.click();
    return;
  }

  items.forEach(i => i.classList.remove("active"));
  items[activeIndex]?.classList.add("active");
});

document.addEventListener("click", e=>{
  if(!e.target.closest(".field")){
    dropdown.style.display = "none";
  }
});

/* =========================
   DEVIL FORM CHECK
========================= */
const modal = $("modal");

function devilAlert(msg){
  alert("☠ DEVIL WARNING ☠\n\n" + msg);
}

function cekForm(){
  const wajib = ["nama","umur","usn","kota","alasan"];
  for(const id of wajib){
    if(!$(id).value.trim()){
      devilAlert("DATA BELUM LENGKAP");
      $(id).focus();
      return;
    }
  }
  modal.classList.add("show");
}

/* =========================
   DEVIL SEND WHATSAPP
========================= */
function kirim(){
  const pesan = `
🔥 DEVIL REIGN — FORM MEMBER 🔥

👤 Nama  : ${$("nama").value}
🎂 Umur  : ${$("umur").value}
🆔 USN   : ${$("usn").value}
🌍 Kota  : ${$("kota").value}

🩸 Alasan Bergabung :
${$("alasan").value}
`;

  window.open(
    `https://wa.me/${$("adminWA").value}?text=${encodeURIComponent(pesan)}`,
    "_blank"
  );
}
</script>
