// Global state
let isFrozen = false;
let clones = [];

// Continuously change background color (slow hue rotation)
let hue = 0;
setInterval(() => {
  hue = (hue + 1) % 360;
  document.body.style.backgroundColor = `hsl(${hue}, 100%, 20%)`;
}, 100);

// Spin / DO NOT PRESS button
document.getElementById("spin-button").addEventListener("click", () => {
  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
});

// Runaway button logic
const runawayBtn = document.getElementById("runaway-button");
runawayBtn.style.position = "fixed";
runawayBtn.style.top = "200px";
runawayBtn.style.left = "50%";
runawayBtn.style.transform = "translateX(-50%)";

runawayBtn.addEventListener("mouseenter", () => {
  if (!isFrozen) {
    const maxX = window.innerWidth - runawayBtn.offsetWidth - 20;
    const maxY = window.innerHeight - runawayBtn.offsetHeight - 20;
    const randX = Math.random() * maxX;
    const randY = Math.random() * (maxY - 100) + 100;
    runawayBtn.style.left = `${randX}px`;
    runawayBtn.style.top = `${randY}px`;
  }
});

runawayBtn.addEventListener("click", () => {
  if (isFrozen) {
    showReward("🎉 You clicked me while frozen! You win! 🎉");
  }
});

// Clone button logic
document.getElementById("clone-button").addEventListener("click", () => {
  const clone = document.getElementById("clone-button").cloneNode(true);
  clone.textContent = "I'm a clone!";
  clone.style.position = "fixed";
  clone.style.top = `${Math.random() * (window.innerHeight - 40)}px`;
  clone.style.left = `${Math.random() * (window.innerWidth - 150)}px`;
  clone.style.zIndex = 9999;
  clone.addEventListener("click", () => {
    alert("Clone clicked!");
  });
  document.body.appendChild(clone);
  clones.push(clone);
});

// Clear clones button
document.getElementById("clear-clones-button").addEventListener("click", () => {
  clones.forEach(c => c.remove());
  clones = [];
});

// Invert button toggles invert style on main-content
const mainContent = document.getElementById("main-content");
document.getElementById("invert-button").addEventListener("click", () => {
  mainContent.classList.toggle("inverted");
});

// Glitch button adds a glitch animation class on body
document.getElementById("glitch-button").addEventListener("click", () => {
  document.body.classList.add("glitching");
  setTimeout(() => {
    document.body.classList.remove("glitching");
  }, 1000);
});

// Confetti rain logic
let confettiInterval;
document.getElementById("confetti-rain-button").addEventListener("click", () => {
  startConfettiRain();
  setTimeout(stopConfettiRain, 7000);
});

function spawnConfetti(x, y, count = 15) {
  const container = document.getElementById("confetti-container");
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.width = confetti.style.height = `${Math.random() * 10 + 5}px`;

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

function startConfettiRain() {
  confettiInterval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    spawnConfetti(x, 0);
  }, 300);
}

function stopConfettiRain() {
  clearInterval(confettiInterval);
}

// Puzzle toggle open/close
const openPuzzleBtn = document.getElementById("open-puzzle-btn");
const puzzleContent = document.getElementById("puzzle-content");
openPuzzleBtn.addEventListener("click", () => {
  if (puzzleContent.style.display === "none") {
    puzzleContent.style.display = "block";
  } else {
    puzzleContent.style.display = "none";
  }
});

// Clue toggle
document.getElementById("clue-button").addEventListener("click", () => {
  const clueText = document.getElementById("clue-text");
  clueText.style.display = (clueText.style.display === "none") ? "block" : "none";
});

// Freeze button logic (submit code)
document.getElementById("submit-code").addEventListener("click", () => {
  const val = document.getElementById("freeze-code").value.trim();
  const correctCode = "3.141592653"; // 10 digits
  if (val === correctCode) {
    freezeRunawayButton();
  } else {
    alert("Wrong code! Try again.");
  }
});

function freezeRunawayButton() {
  isFrozen = true;
  runawayBtn.textContent = "😳 You froze me!";
  runawayBtn.style.backgroundColor = "lightblue";
  runawayBtn.style.border = "3px solid blue";
}

function showReward(msg) {
  const popup = document.getElementById("reward-popup");
  popup.textContent = msg;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 4000);
}












