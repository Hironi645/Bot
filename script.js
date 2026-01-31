let time = 10;
const counter = document.getElementById("loader-count");
const loader = document.getElementById("devil-loader");

counter.textContent = time;

const devilTimer = setInterval(() => {
  time--;
  counter.textContent = time;

  if (time <= 0) {
    clearInterval(devilTimer);
    loader.classList.add("hide");
    setTimeout(() => loader.remove(), 600);
  }
}, 1000);

document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("devil-toast");

  setTimeout(() => toast.classList.add("show"), 500);
  setTimeout(() => toast.classList.remove("show"), 4000);
});

const modal = document.getElementById("modal");
const $ = id => document.getElementById(id);

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
    "Denpasar","Mataram","Bima",
    "Kupang","Maumere","Labuan Bajo"
  ],
  "Maluku":[
    "Ambon","Tual","Masohi","Namlea"
  ],
  "Papua":[
    "Jayapura","Merauke","Timika",
    "Nabire","Wamena","Sorong","Manokwari"
  ]
};

const select = document.getElementById("kota");
const search = document.getElementById("searchKota");

function render(filter=""){
  select.innerHTML = "";
  for(const pulau in dataIndonesia){
    const group = document.createElement("optgroup");
    group.label = pulau;

    dataIndonesia[pulau]
      .filter(kota => kota.toLowerCase().includes(filter))
      .forEach(kota=>{
        const opt = document.createElement("option");
        opt.textContent = kota;
        group.appendChild(opt);
      });

    if(group.children.length > 0){
      select.appendChild(group);
    }
  }
}

search.addEventListener("input", e=>{
  render(e.target.value.toLowerCase());
});

render(); // load awal

function cekForm() {
  if (
    !$("nama").value ||
    !$("umur").value ||
    !$("usn").value ||
    !$("kota").value ||
    !$("alasan").value
  ) {
    alert("Data belum lengkap");
    return;
  }
  modal.classList.add("show");
}

function kirim() {
  const pesan = `
DEVIL REIGN — FORM MEMBER
Nama : ${$("nama").value}
Umur : ${$("umur").value}
USN : ${$("usn").value}
Kota : ${$("kota").value}
Alasan :
${$("alasan").value}
`;

  window.open(
    `https://wa.me/${$("adminWA").value}?text=${encodeURIComponent(pesan)}`,
    "_blank"
  );
}
