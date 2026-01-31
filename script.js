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
