let clones = [];
let isFrozen = false;
let confettiInterval = null;

// Initialize after DOM loaded
window.addEventListener('DOMContentLoaded', () => {
  setupRunawayButton();
  setupButtons();
  setupAdminButton();
  setupBackgroundColorChanger();
  setupConfettiMouseMove();
  setupPuzzle();
});

function setupRunawayButton() {
  const runawayBtn = document.getElementById("runaway-button");
  runawayBtn.style.position = "fixed";
  const headerHeight = document.getElementById('header-container').offsetHeight;
  runawayBtn.style.top = (headerHeight + 100) + "px";
  runawayBtn.style.left = "50%";
  runawayBtn.style.transform = "translateX(-50%)";

  runawayBtn.addEventListener("mouseenter", () => {
    if (isFrozen) return;
    moveRandom(runawayBtn);
  });

  runawayBtn.addEventListener("click", () => {
    if (isFrozen) {
      showReward("🎉 You outsmarted the button! You win! 🎉");
      spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
    }
  });
}

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

function setupButtons() {
  document.getElementById("spin-button").addEventListener("click", () => {
    alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
  });

  document.getElementById("clone-button").addEventListener("click", () => {
    const clone = document.getElementById("clone-button").cloneNode(true);
    clone.textContent = "I'm a clone!";
    clone.style.position = "fixed";
    clone.style.top = `${Math.random() * (window.innerHeight - 40)}px`;
    clone.style.left = `${Math.random() * (window.innerWidth - 150)}px`;
    clone.style.zIndex = 9999;
    clone.addEventListener("click", () => {
      alert("You clicked a clone! But it does nothing...");
    });
    document.body.appendChild(clone);
    clones.push(clone);
  });

  document.getElementById("clear-clones-button").addEventListener("click", () => {
    clones.forEach(c => c.remove());
    clones = [];
  });

  document.getElementById("invert-button").addEventListener("click", () => {
    animateInvertPage();
  });

  document.getElementById("glitch-button").addEventListener("click", () => {
    glitchEffect();
  });

  document.getElementById("confetti-rain-button").addEventListener("click", () => {
    if(confettiInterval) {
      clearInterval(confettiInterval);
      confettiInterval = null;
      document.getElementById('confetti-rain-button').textContent = "Start Confetti Rain!";
    } else {
      startConfettiRain();
      document.getElementById('confetti-rain-button').textContent = "Stop Confetti Rain!";
    }
  });
}

function animateInvertPage() {
  const body = document.body;
  body.style.transition = "transform 1s ease, filter 1s ease";
  body.style.transformOrigin = "center center";

  if (!body.classList.contains("inverted")) {
    body.style.transform = "rotateY(180deg)";
    body.style.filter = "invert(1)";
    body.classList.add("inverted");

    setTimeout(() => {
      body.style.transform = "";
      body.style.filter = "";
      body.classList.remove("inverted");
    }, 1000);
  }
}

function glitchEffect() {
  if (document.body.classList.contains("glitching")) return; // Prevent multiple

  const body = document.body;
  body.classList.add("glitching");

  const glitchColors = ["hotpink", "lime", "cyan", "yellow", "magenta"];
  let glitchInterval = setInterval(() => {
    body.style.color = glitchColors[Math.floor(Math.random() * glitchColors.length)];
    body.style.backgroundColor = glitchColors[Math.floor(Math.random() * glitchColors.length)];
  }, 100);

  setTimeout(() => {
    clearInterval(glitchInterval);
    body.classList.remove("glitching");
    body.style.color = "";
    body.style.backgroundColor = "";
  }, 3000);
}

function startConfettiRain() {
  confettiInterval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    spawnConfetti(x, -10, 1);
  }, 50);
}

function spawnConfetti(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.backgroundColor = randomColor();
    confetti.style.left = (x + Math.random() * 20 - 10) + "px";
    confetti.style.top = (y + Math.random() * 20 - 10) + "px";
    confetti.style.width = confetti.style.height = (5 + Math.random() * 7) + "px";
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.getElementById("confetti-container").appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

function randomColor() {
  const colors = ["hotpink", "lime", "cyan", "yellow", "magenta", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function showReward(text) {
  const popup = document.getElementById("reward-popup");
  popup.textContent = text;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 4000);
}

function setupBackgroundColorChanger() {
  // Change background color every 2 seconds
  setInterval(() => {
    if (isFrozen) return;
    document.body.style.backgroundColor = randomColor();
  }, 2000);
}

function setupConfettiMouseMove() {
  document.body.addEventListener("mousemove", (e) => {
    spawnConfetti(e.clientX, e.clientY, 1);
  });
}

// --- PUZZLE SETUP ---
function setupPuzzle() {
  const openPuzzleBtn = document.getElementById("open-puzzle-btn");
  const puzzleContent = document.getElementById("puzzle-content");
  const clueBtn = document.getElementById("clue-button");
  const clueText = document.getElementById("clue-text");
  const submitBtn = document.getElementById("submit-code");
  const freezeInput = document.getElementById("freeze-code");

  openPuzzleBtn.addEventListener("click", () => {
    puzzleContent.style.display = "block";
  });

  clueBtn.addEventListener("click", () => {
    clueText.style.display = clueText.style.display === "none" ? "block" : "none";
  });

  submitBtn.addEventListener("click", () => {
    const code = freezeInput.value.trim();
    if (code === PI_CODE) {
      isFrozen = true;
      alert("Correct code! The runaway button is frozen!");
    } else {
      alert("Wrong code! Try again!");
    }
  });
}

// First 50 digits of pi (after decimal)
const PI_CODE = "14159265358979323846264338327950288419716939937510";

// --- ADMIN SETUP ---
function setupAdminButton() {
  const adminBtn = document.getElementById("admin-invisible-btn");

  adminBtn.addEventListener("click", () => {
    const password = prompt("Enter admin password:");
    if (password === ADMIN_PASSWORD) {
      openAdminPanel();
    } else {
      alert("Wrong password!");
    }
  });
}

const ADMIN_PASSWORD = "SuperSecret123!";

function openAdminPanel() {
  // Create admin popup
  if (document.getElementById("admin-popup")) return; // Already open

  const adminPopup = document.createElement("div");
  adminPopup.id = "admin-popup";

  adminPopup.innerHTML = `
    <h2>Admin Control Panel</h2>
    <button id="admin-freeze-btn">Freeze Runaway Button for All</button>
    <button id="admin-unfreeze-btn">Unfreeze Runaway Button</button>
    <button id="admin-spin-btn">Trigger DO NOT PRESS for All</button>
    <button id="admin-glitch-btn">Trigger Glitch Effect for All</button>
    <button id="admin-invert-btn">Trigger Invert Animation for All</button>
    <button id="admin-close-btn">Close Admin Panel</button>
  `;

  document.body.appendChild(adminPopup);

  document.getElementById("admin-freeze-btn").addEventListener("click", () => {
    isFrozen = true;
    broadcastAction("freeze");
    alert("Runaway button frozen for everyone!");
  });

  document.getElementById("admin-unfreeze-btn").addEventListener("click", () => {
    isFrozen = false;
    broadcastAction("unfreeze");
    alert("Runaway button unfrozen for everyone!");
  });

  document.getElementById("admin-spin-btn").addEventListener("click", () => {
    broadcastAction("spin");
    alert("DO NOT PRESS action triggered for everyone!");
  });

  document.getElementById("admin-glitch-btn").addEventListener("click", () => {
    broadcastAction("glitch");
    alert("Glitch effect triggered for everyone!");
  });

  document.getElementById("admin-invert-btn").addEventListener("click", () => {
    broadcastAction("invert");
    alert("Invert animation triggered for everyone!");
  });

  document.getElementById("admin-close-btn").addEventListener("click", () => {
    adminPopup.remove();
  });
}

// --- BROADCASTING SETUP ---
// For demo: Using localStorage events to simulate broadcast across tabs
window.addEventListener("storage", (event) => {
  if (event.key === "admin-action" && event.newValue) {
    handleAdminAction(event.newValue);
  }
});

function broadcastAction(action) {
  localStorage.setItem("admin-action", action);
  // Clear immediately to allow re-broadcast if needed
  setTimeout(() => {
    localStorage.removeItem("admin-action");
  }, 100);
}

function handleAdminAction(action) {
  switch(action) {
    case "freeze":
      isFrozen = true;
      alert("Admin: Runaway button frozen!");
      break;
    case "unfreeze":
      isFrozen = false;
      alert("Admin: Runaway button unfrozen!");
      break;
    case "spin":
      alert("Admin triggered DO NOT PRESS button!");
      break;
    case "glitch":
      glitchEffect();
      break;
    case "invert":
      animateInvertPage();
      break;
  }
}

