let clones = [];
let isFrozen = false;

window.addEventListener('DOMContentLoaded', () => {
  // Position runaway button initially
  const runawayBtn = document.getElementById("runaway-button");
  runawayBtn.style.position = "fixed";
  const headerHeight = document.getElementById('header-container').offsetHeight;
  runawayBtn.style.top = (headerHeight + 100) + "px";
  runawayBtn.style.left = "50%";
  runawayBtn.style.transform = "translateX(-50%)";

  // Invisible admin button setup (not functional yet)
  const secretButton = document.getElementById("admin-invisible-btn");
  secretButton.addEventListener('click', () => {
    alert("Admin access clicked (setup later).");
  });
});

// Background color change every second unless inverted
setInterval(() => {
  if (!document.body.classList.contains('inverted-upside-down')) {
    document.body.style.backgroundColor = getRandomColor();
  }
}, 1000);

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

// Confetti on mouse move
document.addEventListener('mousemove', (e) => {
  spawnConfetti(e.pageX, e.pageY, 3);
});

function spawnConfetti(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.width = confetti.style.height = `${Math.random() * 10 + 5}px`;

    document.getElementById('confetti-container').appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// DO NOT PRESS button alert
document.getElementById("spin-button").addEventListener("click", () => {
  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
});

// Runaway button logic
const runawayBtn = document.getElementById("runaway-button");

function moveRandom(el) {
  if (isFrozen) return;
  el.style.position = "fixed";

  const headerHeight = document.getElementById('header-container').offsetHeight;
  const maxWidth = window.innerWidth - el.offsetWidth - 20;
  const maxHeight = window.innerHeight - el.offsetHeight - 20;
  const minTop = headerHeight + 10;

  el.style.left = Math.random() * maxWidth + "px";
  el.style.top = (Math.random() * (maxHeight - minTop) + minTop) + "px";
}

// Runaway button moves on mouse enter only if NOT frozen
runawayBtn.addEventListener("mouseenter", () => {
  if (!isFrozen) {
    moveRandom(runawayBtn);
  }
});

// When frozen and clicked, show reward popup
runawayBtn.addEventListener("click", () => {
  if (isFrozen) {
    showReward("🎉 You caught the runaway button! Congratulations! 🎉");
  }
});

// Clone button
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

// Clear clones
document.getElementById("clear-clones-button").addEventListener("click", () => {
  clones.forEach(c => c.remove());
  clones = [];
});

// Invert button with smooth animation and toggle
document.getElementById("invert-button").addEventListener("click", () => {
  const body = document.body;
  // Add transition class to trigger smooth animation
  body.classList.add("invert-transition");

  if (body.classList.contains("inverted-upside-down")) {
    // Remove inversion
    body.classList.remove("inverted-upside-down");
  } else {
    // Add inversion
    body.classList.add("inverted-upside-down");
  }

  // Remove transition class after animation completes (1s)
  setTimeout(() => {
    body.classList.remove("invert-transition");
  }, 1000);
});

// Glitch button effect
document.getElementById("glitch-button").addEventListener("click", () => {
  const title = document.getElementById("crazy-title");
  title.classList.add("glitch");
  setTimeout(() => {
    title.classList.remove("glitch");
  }, 1500);
});

// Puzzle controls
const openPuzzleBtn = document.getElementById("open-puzzle-btn");
const puzzleContent = document.getElementById("puzzle-content");
const freezeInput = document.getElementById("freeze-code");
const clueButton = document.getElementById("clue-button");
const clueText = document.getElementById("clue-text");

openPuzzleBtn.addEventListener("click", () => {
  if (puzzleContent.style.display === "none" || puzzleContent.style.display === "") {
    puzzleContent.style.display = "block";
  } else {
    puzzleContent.style.display = "none";
  }
});

clueButton.addEventListener("click", () => {
  if (clueText.style.display === "none" || clueText.style.display === "") {
    clueText.style.display = "block";
  } else {
    clueText.style.display = "none";
  }
});

// Submit code to freeze runaway button
document.getElementById("submit-code").addEventListener("click", () => {
  const code = freezeInput.value.trim();
  if (code === getFirst10PiDigits()) {
    isFrozen = true;
    runawayBtn.textContent = "😳 You froze me!";
    runawayBtn.style.backgroundColor = "lightblue";
    runawayBtn.style.border = "3px solid blue";
    alert("Correct! The runaway button is now frozen. Click it to win!");
  } else {
    alert("Incorrect code, try again!");
  }
});

// Utility for pi code with decimal included
function getFirst10PiDigits() {
  // "3.141592653" - first 10 digits including decimal point (total length 10)
  return "3.141592653";
}

// Reward popup
function showReward(message) {
  const popup = document.getElementById("reward-popup");
  popup.textContent = message;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 4000);
}

// Optional: glitch animation keyframes
const style = document.createElement('style');
style.textContent = `
@keyframes glitchEffect {
  0% { clip: rect(20px, 9999px, 35px, 0); transform: skew(0.3deg); }
  10% { clip: rect(5px, 9999px, 20px, 0); transform: skew(0.8deg); }
  20% { clip: rect(10px, 9999px, 30px, 0); transform: skew(0.1deg); }
  30% { clip: rect(15px, 9999px, 40px, 0); transform: skew(0.6deg); }
  40% { clip: rect(20px, 9999px, 35px, 0); transform: skew(0.4deg); }
  50% { clip: rect(5px, 9999px, 25px, 0); transform: skew(0.9deg); }
  60% { clip: rect(10px, 9999px, 30px, 0); transform: skew(0.2deg); }
  70% { clip: rect(15px, 9999px, 35px, 0); transform: skew(0.5deg); }
  80% { clip: rect(5px, 9999px, 25px, 0); transform: skew(0.3deg); }
  90% { clip: rect(10px, 9999px, 30px, 0); transform: skew(0.7deg); }
  100% { clip: rect(20px, 9999px, 35px, 0); transform: skew(0.4deg); }
}
.glitch {
  animation: glitchEffect 1.5s infinite;
  color: lime;
  text-shadow: 1px 1px 3px #0f0;
}
`;
document.head.appendChild(style);
