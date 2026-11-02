
// ====================================
// DIWALI BLESSING WEBSITE
// COMPLETE JAVASCRIPT
// ====================================


// ====================================
// PERSONAL PHOTOS
// ====================================

const personPhotos = {
    "nav": "assets/Nav.jpg.jpeg",
    "sneha": "assets/sneha.jpg.jpeg"
};


// ====================================
// RELATIONSHIP BLESSINGS
// ====================================

const blessings = {

    family: {
        slogan: "Your love is my greatest blessing.",
        message:
            "May Goddess Lakshmi bless you with prosperity, good health and endless happiness. May your home always shine with peace, love and positivity. Thank you for being my strength and my greatest blessing. Happy Diwali! 🪔"
    },

    friends: {
        slogan: "Good friends make every festival brighter.",
        message:
            "May your life sparkle brighter than the Diwali lights, your dreams shine like the stars and your smile never fade. Wishing you endless happiness, crazy adventures and beautiful memories. Happy Diwali, bestie! 💗"
    },

    cousins: {
        slogan: "Same roots, endless memories and crazy vibes.",
        message:
            "May this Diwali bring you success, happiness and everything your heart wishes for. May we always keep laughing, creating memories and annoying each other just like always. Stay blessed, my favourite partner in crime! 🧡"
    }

};


// ====================================
// ELEMENTS
// ====================================

const screens = ["welcome", "blessing", "gift", "memory"];

const music = document.getElementById("backgroundMusic");
const musicBtn = document.getElementById("musicBtn");

const photo = document.getElementById("revealedPhoto");
const photoFallback = document.getElementById("photoFallback");

const openGiftBtn = document.getElementById("openGiftBtn");
const giftBox = document.getElementById("giftBox");

let selectedType = "family";
let receiverName = "";
let senderName = "";


// ====================================
// SCREEN NAVIGATION
// ====================================

function showScreen(screenId) {

    screens.forEach(id => {
        document.getElementById(id).classList.add("hidden");
    });

    document.getElementById(screenId).classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ====================================
// RELATIONSHIP SELECTION
// ====================================

document.querySelectorAll(".relation").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".relation").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedType = button.dataset.type;

        document.body.classList.remove(
            "family",
            "friends",
            "cousins"
        );

        if (selectedType !== "family") {
            document.body.classList.add(selectedType);
        }

    });

});


// ====================================
// ENTER DIWALI EXPERIENCE
// MUSIC STARTS HERE
// ====================================

document.getElementById("startBtn").addEventListener(
    "click",
    async () => {

        receiverName = document.getElementById("receiver").value.trim();
        senderName = document.getElementById("sender").value.trim();

        if (!receiverName) {
            alert("Please enter the receiver's name ❤️");
            return;
        }

        try {

            music.volume = 0.5;
            await music.play();

            musicBtn.textContent = "❚❚ Pause Music";

        } catch (error) {

            musicBtn.textContent = "▶ Play Music";
            console.log("Music could not start. Use the music button.");

        }

        document.getElementById("blessingHeading").textContent =
            `Happy Diwali, ${receiverName}! 🪔`;

        document.getElementById("relationSlogan").textContent =
            blessings[selectedType].slogan;

        document.getElementById("blessingText").textContent =
            blessings[selectedType].message;

        document.getElementById("senderText").textContent =
            senderName
                ? `With love, ${senderName} ❤️`
                : "With lots of love ❤️";

        document.getElementById("memoryTitle").textContent =
            `Dear ${receiverName}, You Are Special!`;

        showScreen("blessing");

    }
);


// ====================================
// OPEN GIFT SCREEN
// ====================================

document.getElementById("giftBtn").addEventListener(
    "click",
    () => {
        showScreen("gift");
    }
);


// ====================================
// GIFT OPENING + PHOTO REVEAL
// FIXED: ONLY ONE CLICK LISTENER
// ====================================

openGiftBtn.addEventListener("click", function () {

    console.log("GIFT BUTTON CLICKED!");

    const receiverKey = receiverName.trim().toLowerCase();
    const selectedPhoto = personPhotos[receiverKey];

    // Reset gift animation
    giftBox.classList.remove("open");

    // Restart animation
    void giftBox.offsetWidth;

    // Open gift box
    giftBox.classList.add("open");

    // Prevent repeated clicks during animation
    openGiftBtn.disabled = true;

    // Hide previous image and fallback
    photo.classList.add("hidden");
    photoFallback.classList.add("hidden");

    // Load personal photo
    if (selectedPhoto) {

        photo.onload = function () {

            photo.classList.remove("hidden");
            photoFallback.classList.add("hidden");

            console.log("Photo loaded successfully!");

        };

        photo.onerror = function () {

            photo.classList.add("hidden");

            photoFallback.textContent =
                "Your special photo could not be loaded ❤️";

            photoFallback.classList.remove("hidden");

            console.error("Image could not load:", selectedPhoto);

        };

        photo.src = selectedPhoto;

    } else {

        photoFallback.textContent =
            "A special Diwali wish just for you! ❤️";

        photoFallback.classList.remove("hidden");

    }

    // Show memory screen after gift animation
    setTimeout(function () {

        showScreen("memory");

        openGiftBtn.disabled = false;

    }, 1200);

});


// ====================================
// BACKGROUND MUSIC CONTROL
// ====================================

music.volume = 0.5;

music.addEventListener("canplay", () => {
    console.log("Diwali music is ready!");
});

music.addEventListener("error", () => {
    console.error("Music file failed to load:", music.currentSrc);
});


async function playBackgroundMusic() {

    try {

        await music.play();

        musicBtn.textContent = "❚❚ Pause Music";

        console.log("Music is playing!");

    } catch (error) {

        console.error("Music playback error:", error);

        musicBtn.textContent = "▶ Play Music";

    }

}


function pauseBackgroundMusic() {

    music.pause();

    musicBtn.textContent = "▶ Play Music";

}


musicBtn.addEventListener("click", async () => {

    if (music.paused) {

        await playBackgroundMusic();

    } else {

        pauseBackgroundMusic();

    }

});


// ====================================
// WHATSAPP SHARING
// ====================================

document.getElementById("shareBtn").addEventListener(
    "click",
    () => {

        if (
            window.location.protocol === "file:" ||
            window.location.hostname === ""
        ) {

            alert(
                "First publish your website online. Then you can share its public link through WhatsApp."
            );

            return;

        }

        const shareURL = new URL(
            window.location.pathname,
            window.location.origin
        );

        shareURL.searchParams.set("receiver", receiverName);
        shareURL.searchParams.set("sender", senderName);
        shareURL.searchParams.set("type", selectedType);

        const message =
            `🪔 Happy Diwali, ${receiverName}! ❤️\n\n` +
            `${senderName || "Someone special"} has prepared a little Diwali blessing and surprise for you.\n\n` +
            `Open your special gift here:\n${shareURL.href}`;

        const whatsappURL =
            "https://wa.me/?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");

    }
);


// ====================================
// CREATE ANOTHER BLESSING
// ====================================

document.getElementById("restartBtn").addEventListener(
    "click",
    () => {

        document.getElementById("receiver").value = "";
        document.getElementById("sender").value = "";

        receiverName = "";
        senderName = "";

        selectedType = "family";

        document.body.classList.remove(
            "friends",
            "cousins"
        );

        document.querySelectorAll(".relation").forEach(btn => {

            btn.classList.remove("active");

            if (btn.dataset.type === "family") {
                btn.classList.add("active");
            }

        });

        // Reset gift box
        giftBox.classList.remove("open");

        // Reset gift button
        openGiftBtn.disabled = false;

        // Reset personal photo
        photo.removeAttribute("src");
        photo.classList.add("hidden");

        // Reset fallback message
        photoFallback.textContent = "";
        photoFallback.classList.remove("hidden");

        showScreen("welcome");

    }
);


// ====================================
// READ PERSONALIZED WHATSAPP LINK
// ====================================

const urlParams = new URLSearchParams(window.location.search);

const sharedReceiver = urlParams.get("receiver");
const sharedSender = urlParams.get("sender");
const sharedType = urlParams.get("type");


if (sharedReceiver) {

    document.getElementById("receiver").value = sharedReceiver;

}


if (sharedSender) {

    document.getElementById("sender").value = sharedSender;

}


if (["family", "friends", "cousins"].includes(sharedType)) {

    selectedType = sharedType;

    document.querySelectorAll(".relation").forEach(btn => {

        btn.classList.toggle(
            "active",
            btn.dataset.type === selectedType
        );

    });

    document.body.classList.remove(
        "family",
        "friends",
        "cousins"
    );

    if (selectedType !== "family") {
        document.body.classList.add(selectedType);
    }

}
