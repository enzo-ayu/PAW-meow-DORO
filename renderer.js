const { ipcRenderer, shell } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
    const IGButton = document.getElementById("IGLink");
    if (IGButton) {
        IGButton.addEventListener("click", (event) => {
            event.preventDefault();
            ipcRenderer.send("open-external-link", "https://www.instagram.com/ayun__nga/");
        });
    }

    const GHButton = document.getElementById("GHLink");
    if (GHButton) {
        GHButton.addEventListener("click", (event) => {
            event.preventDefault();
            ipcRenderer.send("open-external-link", "https://github.com/enzo-ayu/");
        });
    }

    const LIButton = document.getElementById("LILink");
    if (LIButton) {
        LIButton.addEventListener("click", (event) => {
            event.preventDefault();
            ipcRenderer.send("open-external-link", "https://www.linkedin.com/in/raphael-ayunga-26b391355/");
        });
    }

    const closeButton = document.querySelector(".OGCloseClass");
    const minimizeButton = document.querySelector(".OGMinClass");
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            ipcRenderer.send("close-window");
        });
    }
    if (minimizeButton) {
        minimizeButton.addEventListener("click", () => {
            ipcRenderer.send("minimize-window");
        });
    }

    // Timer logic
    let timeLeft = 20 * 60; 
    let isPaused = false;
    let timerInterval = null;

    function updateTimer() {
        if (!isPaused && timeLeft > 0) {
            timeLeft--;
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            document.getElementById("timer").textContent =
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } 
        
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            document.getElementById("timer").textContent = "TIME'S UP!";
        }
    }

    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(updateTimer, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    const pauseBtn = document.getElementById("pauseBtn");
    if (pauseBtn) {
        pauseBtn.addEventListener("click", function () {
            let img = pauseBtn.querySelector("img"); // Corrected selector
        
            if (isPaused) {
                startTimer();
                img.src = "assets/Pause.png"; // Ensure the correct path
            } else {
                pauseTimer();
                img.src = "assets/Play.png"; // Ensure the correct path
            }
        
            isPaused = !isPaused; // Toggle state
        
            // Debugging: Check if the image is loading correctly
            img.onerror = () => console.error("Error loading image:", img.src);
            img.onload = () => console.log("Image loaded:", img.src);
        });
        
    }

    startTimer(); // Start the timer on page load

    // Background music logic
    const bgMusic = document.getElementById("bgMusic");
    const muteBtn = document.getElementById("muteBtn");

    if (bgMusic && muteBtn) {
        const muteIcon = muteBtn.querySelector("img"); 

        // Start playing music when the page loads (optional)
        bgMusic.play().catch(error => console.log("Autoplay blocked:", error));

        muteBtn.addEventListener("click", () => {
            // Toggle mute
            bgMusic.muted = !bgMusic.muted;

            // Change button image based on mute state
            muteIcon.src = bgMusic.muted ? "assets/Muted.png" : "assets/Unmuted.png";
        });
    }
});
