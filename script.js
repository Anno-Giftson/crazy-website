// Variables
const piCode = "3.1415926535"; // First 10 digits of Pi

// Elements
const glitchBtn = document.getElementById("glitchBtn");
const invertBtn = document.getElementById("invertBtn");
const cloneBtn = document.getElementById("cloneBtn");
const clearClonesBtn = document.getElementById("clearClonesBtn");
const confettiBtn = document.getElementById("confettiBtn");
const runningBtn = document.getElementById("runningBtn");
const clickHereBtn = document.getElementById("clickHereBtn");
const submitBtn = document.getElementById("submitBtn");
const codeInput = document.getElementById("codeInput");
const rewardDiv = document.getElementById("reward");
const invisibleBtn = document.getElementById("invisibleBtn");
const body = document.body;

let clonesContainer = document.getElementById("clonesContainer");
let inverted = false;
let glitchInterval;
let confettiRunning = false;

// === Glitch Effect ===
glitchBtn.addEventListener("click", () => {
  if (glitchInterval) {
    clearInterval(glitchInterval);
    glitchInterval = null;
    body.classList.remove("glitch");
  } else {
    glitchInterval = setInterval(() => {
      body.classList.toggle("glitch");
    }, 200);
  }
});

// === Invert Animation ===
invertBtn.addEventListener("click", () => {
  inverted = !inverted;
  if (inverted) {
    body.classList.add("invert-anim");
    setTimeout(() => {
      body.classList.remove("invert-anim");
      body.classList.add("inverted");
    }, 1000);
  } else {
    body.classList.add("invert-back-anim");
    setTimeout(() => {
      body.classList.remove("invert-back-anim");
      body.classList.remove("inverted");
    }, 1000);
  }
});

// === Clone Me Button ===
cloneBtn.addEventListener("click", () => {
  const clone = document.createElement("button");
  clone.textContent = "I'm a Clone!";
  clone.className = "clone-btn";
  clonesContainer.appendChild(clone);
});

// === Clear Clones Button ===
clearClonesBtn.addEventListener("click", () => {
  clonesContainer.innerHTML = "";
});

// === Confetti Rain Button ===
confettiBtn.addEventListener("click", () => {
  if (confettiRunning) return;
  confettiRunning = true;
  // Basic confetti effect (can be expanded)
  let count = 100;
  const interval = setInterval(() => {
    if (count <= 0) {
      clearInterval(interval);
      confettiRunning = false;
      return;
    }
    createConfetti();
    count--;
  }, 30);
});

function createConfetti() {
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(confetti);
  setTimeout(() => {
    confetti.remove();
  }, 3000);
}

// === Running Button and Pi Code Challenge ===

runningBtn.disabled = true; // Frozen at start

clickHereBtn.addEventListener("click", () => {
  rewardDiv.textContent = "Enter the first 10 digits of Pi to unlock the running button!";
});

submitBtn.addEventListener("click", () => {
  if (codeInput.value === piCode) {
    rewardDiv.textContent = "Correct! Now catch the running button!";
    runningBtn.disabled = false;
  } else {
    rewardDiv.textContent = "Wrong code. Try again.";
  }
});

// Running button moves on mouseover
runningBtn.addEventListener("mouseover", () => {
  if (!runningBtn.disabled) {
    const x = Math.random() * (window.innerWidth - runningBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - runningBtn.offsetHeight);
    runningBtn.style.position = "absolute";
    runningBtn.style.left = x + "px";
    runningBtn.style.top = y + "px";
  }
});

// Reward on click
runningBtn.addEventListener("click", () => {
  if (!runningBtn.disabled) {
    alert("You caught me! Here's your reward!");
  }
});

// === Invisible Button ===
invisibleBtn.addEventListener("click", () => {
  alert("Invisible button clicked!");
});

// === Touchscreen Warning (non-phone devices) ===
function isTouchDevice() {
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
}

if (!/Mobi|Android/i.test(navigator.userAgent) && isTouchDevice()) {
  document.addEventListener("touchstart", () => {
    alert("No touchscreen allowed on this device!");
  }, { once: false });
}








