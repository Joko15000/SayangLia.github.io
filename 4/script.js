// Tampilkan popup saat pertama kali masuk
window.onload = function () {
    document.getElementById("music-popup").style.display = "flex";
};

// Fungsi untuk memutar musik dan menutup popup
function playMusic(song) {
    let audio = document.getElementById("background-music");
    audio.src = song;
    audio.play();

    // Sembunyikan popup setelah memilih lagu
    document.getElementById("music-popup").style.display = "none";
    document.getElementById("content").style.display = "block";
}

// Gombalan Romantis
const gombalanList = [
    "Kamu mau engga sayang jadi temanku teman hidupku?",
    "Kamu mau engga sayang jadi pasangan sahku seumur hidupku?",
    "Kamu mau engga sayang jadi Istri aku?",
    "Kamu mau engga sayang jadi Ibu dari anak anakku?",
    "Kamu mau engga sayang jadi milikku seumur hidupku?"
];

let clickCount = 0;

function tampilkanGombalan() {
    let randomGombalan = gombalanList[Math.floor(Math.random() * gombalanList.length)];
    document.getElementById("gombalan").innerText = randomGombalan;

    clickCount++;

    // Jika tombol sudah ditekan 5 kali, tampilkan tombol WhatsApp
    if (clickCount === 5) {
        document.getElementById("whatsapp-button").style.display = "block";
    }
}

function kirimWhatsApp() {
    let nomorWhatsApp = "6281410149687"; // Ganti dengan nomor tujuan (tanpa +)
    let pesan = "Iya sayangkuu aku mau jadi Istri kamu❤️";
    let url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
    window.location.href = url;
}

// Array daftar gambar
let images = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg"];
let currentIndex = 0;

function updateImage() {
    let galleryImage = document.getElementById("gallery-image");
    galleryImage.src = images[currentIndex];

    // Update indikator dot
    updateDots();
}

// Fungsi untuk menampilkan gambar berikutnya
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

// Fungsi untuk menampilkan gambar sebelumnya
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

// Auto-slideshow
let slideshowInterval = setInterval(nextImage, 6000);

// Indikator Dot Pagination
function createDots() {
    let dotsContainer = document.getElementById("dots-container");
    dotsContainer.innerHTML = "";
    images.forEach((_, index) => {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateImage();
        });
        dotsContainer.appendChild(dot);
    });
}

// Update dot indikator
function updateDots() {
    let dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    let galleryContainer = document.querySelector(".gallery");
    let blurOverlay = document.createElement("div");
    blurOverlay.classList.add("blur-overlay");
    document.body.appendChild(blurOverlay); // Tambahkan overlay ke body

    galleryContainer.addEventListener("mouseenter", function () {
        blurOverlay.style.display = "block"; // Tampilkan efek blur
    });

    galleryContainer.addEventListener("mouseleave", function () {
        blurOverlay.style.display = "none"; // Hilangkan efek blur
    });
});

let originalMusic = "";
let originalTime = 0;
let isPlaying = false;

function hitungHari() {
    let startDate = new Date("2024-12-12"); // Tanggal awal yang dihitung
    let today = new Date();
    let daysCount = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    let message = `Start counting all the days, forever I will stay with you, with you, one only you. ❤️❤️❤️\n\nEngga berasa ${daysCount} hari Sudah kita bersama! Love as always sayang❤️. \n\nKita terus akan terus bersama ya sayang apapun yang terjadi, kita berjuang kita usahain bareng bareng ya sayang❤️. `;

    let audio = document.getElementById("background-music");

    // Simpan status lagu sebelumnya
    originalMusic = audio.src;
    originalTime = audio.currentTime;
    isPlaying = !audio.paused; // Cek apakah musik sedang diputar

    // Pause musik latar dan ganti dengan lagu khusus
    audio.pause();
    audio.src = "lagu/one.mp3";
    audio.load();
    audio.play();

    // Tampilkan alert setelah sedikit delay
    setTimeout(() => {
        alert(message);
        
        // Kembalikan lagu sebelumnya
        audio.src = originalMusic;
        audio.load();
        if (isPlaying) {
            audio.currentTime = originalTime; // Lanjut dari waktu sebelumnya
            audio.play();
        }
    }, 500); // Delay sedikit agar tidak ada masalah audio
}



function tampilkanPesan1() {
    showPopup("Aku ingin mencintaimu lebih dari kemarin, dan kurang dari besok. 🌹");
}

function tampilkanPesan2() {
    showPopup("Sama aja sayang engga ada bedanya semua tombol yang kamu klik kamu pencet aku bakal tetep sayang kamu hehehe❤️");
}

f

// Fungsi untuk menampilkan popup custom
function showPopup(message) {
    let popup = document.getElementById("custom-popup");
    let popupText = document.getElementById("popup-text");

    popupText.innerText = message;
    popup.style.display = "flex"; // Tampilkan popup

    // Sembunyikan popup setelah 3 detik
    setTimeout(() => {
        popup.style.display = "none";
    }, 6000);
}


function redirectToParent() {
    window.location.href = "../index.html";
}