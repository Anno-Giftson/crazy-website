let touchBlocked = false;
let clones = [];
let isFrozen = false;
let isInverted = false;
let animationInProgress = false;
let confettiInterval;

const runawayBtn = document.getElementById("runaway-button");
const freezeInput = document.getElementById("freeze-code");
const adminInvisibleBtn = document.getElementById("admin-invisible-btn");
const adminPopup = document.getElementById("admin-popup");
const adminPasswordInput = document.getElementById("admin-password");
const rewardPopup = document.getElementById("reward-popup");

function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|ipod|mobile/i.test(ua);
}

window.addEventListener('DOMContentLoaded', () => {
  // Position runaway button initially
  runawayBtn.style.position = "fixed";
  const headerHeight = document.getElementById('header-container').offsetHeight;
  runawayBtn.style.top = (headerHeight + 100) + "px";
  runawayBtn.style.left = "50%";
  runawayBtn.style.transform = "translateX(-50%)";

  // Setup admin button event
  adminInvisibleBtn.addEventListener('click', () => {
    showAdminPopup();
  });

  document.getElementById('submit-admin-password').addEventListener('click', submitAdminPassword);
  document.getElementById('admin-popup-close').addEventListener('click', () => {
    hideAdminPopup();
  });

  // DO NOT PRESS button
  document.getElementById("spin-button").addEventListener("click", () => {
    alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
  });

  // Runaway button logic
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

  // Invert button with animation toggle
  document.getElementById("invert-button").addEventListener("click", () => {
    if (animationInProgress) return;
    animationInProgress = true;
    if (!isInverted) {
      document.body.classList.add('inverting');
      document.body.addEventListener('animationend', () => {
        document.body.classList.remove('inverting');
        document.body.classList.add('inverted-upside-down');
        animationInProgress = false;
      }, { once: true });
    } else {
      document.body.classList.add('reverting');
      document.body.addEventListener('animationend', () => {
        document.body.classList.remove('reverting');
        document.body.classList.remove('inverted-upside-down');
        animationInProgress = false;
      }, { once: true });
    }
    isInverted = !isInverted;
  });

  // Glitch button
  document.getElementById("glitch-button").addEventListener("click", () => {
    glitchEffect();
  });

  // Confetti rain button
  document.getElementById("confetti-rain-button").addEventListener("click", () => {
    startConfettiRain();
    setTimeout(stopConfettiRain, 7000);
  });

  // Puzzle toggle
  const openPuzzleBtn = document.getElementById("open-puzzle-btn");
  const puzzleContent = document.getElementById("puzzle-content");

  openPuzzleBtn.addEventListener("click", () => {
    puzzleContent.style.display = (puzzleContent.style.display === "none") ? "block" : "none";
  });

  // Clue button
  document.getElementById("clue-button").addEventListener("click", () => {
    const clueText = document.getElementById("clue-text");
    clueText.style.display = (clueText.style.display === "none") ? "block" : "none";
  });

  // No code submission yet, add your logic as needed
  document.getElementById("submit-code").addEventListener("click", () => {
    const code = freezeInput.value.trim();
    if (code === getPiDigits()) {
      isFrozen = true;
      alert("You froze the runaway button!");
    } else {
      alert("Incorrect code, try again!");
    }
  });

  // Start background color changes
  startBackgroundColorCycle();

  // Listen for admin commands via postMessage (for future real-time control)
  window.addEventListener("message", handleAdminCommands);
});

function showAdminPopup() {
  adminPopup.style.display = "flex";
  adminPasswordInput.value = "";
  adminPasswordInput.focus();
}

function hideAdminPopup() {
  adminPopup.style.display = "none";
  adminPasswordInput.value = "";
}

function submitAdminPassword() {
  const correctPassword = "SuperSecret123"; // Change your password here
  if (adminPasswordInput.value === correctPassword) {
    hideAdminPopup();
    window.open('admin.html', '_blank');
  } else {
    alert("Wrong password!");
    adminPasswordInput.focus();
  }
}

function moveRandom(elem) {
  const padding = 20;
  const maxX = window.innerWidth - elem.offsetWidth - padding;
  const maxY = window.innerHeight - elem.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  elem.style.left = `${x}px`;
  elem.style.top = `${y}px`;
}

function glitchEffect() {
  const title = document.getElementById("crazy-title");
  let iteration = 0;
  const maxIterations = 15;

  const glitchInterval = setInterval(() => {
    let text = title.textContent;
    if (iteration % 2 === 0) {
      title.style.color = "lime";
      title.style.textShadow = "2px 2px 5px red";
      title.textContent = text.split('').sort(() => Math.random() - 0.5).join('');
    } else {
      title.style.color = "hotpink";
      title.style.textShadow = "none";
      title.textContent = "💥 Welcome to CrazyTown 💥";
    }
    iteration++;
    if (iteration >= maxIterations) {
      clearInterval(glitchInterval);
      title.style.color = "hotpink";
      title.style.textShadow = "none";
      title.textContent = "💥 Welcome to CrazyTown 💥";
    }
  }, 100);
}

function spawnConfetti(x, y, count = 30) {
  const container = document.getElementById("confetti-container");

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.left = `${x + (Math.random() * 100 - 50)}px`;
    confetti.style.top = `${y + (Math.random() * 100 - 50)}px`;
    confetti.style.animationDuration = (2 + Math.random() * 2) + "s";

    container.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

function startConfettiRain() {
  confettiInterval = setInterval(() => {
    spawnConfetti(Math.random() * window.innerWidth, 0, 10);
  }, 300);
}

function stopConfettiRain() {
  clearInterval(confettiInterval);
}

function getRandomColor() {
  const colors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6', '#1abc9c', '#e67e22'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function startBackgroundColorCycle() {
  let hue = 0;
  setInterval(() => {
    if (isInverted) return; // optional: don't change background while inverted
    hue = (hue + 1) % 360;
    document.body.style.backgroundColor = `hsl(${hue}, 60%, 20%)`;
  }, 80);
}

function showReward(message) {
  rewardPopup.textContent = message;
  rewardPopup.style.display = "block";
  setTimeout(() => {
    rewardPopup.style.display = "none";
  }, 3000);
}

function getPiDigits() {
  // First 50 digits of Pi (without decimal)
  return "31415926535897932384626433832795028841971693993751";
}

function handleAdminCommands(event) {
  if (!event.data || typeof event.data !== 'object') return;
  if (event.data.type === 'COMMAND') {
    const cmd = event.data.command;
    if (cmd === 'DO_NOT_PRESS') {
      alert("Admin activated the DO NOT PRESS button for everyone!");
      document.getElementById("spin-button").click();
    } else if (cmd === 'INVERT_PAGE') {
      document.getElementById("invert-button").click();
    } else if (cmd === 'GLITCH') {
      document.getElementById("glitch-button").click();
    } else if (cmd === 'CONFETTI') {
      document.getElementById("confetti-rain-button").click();
    }
    // Add more commands as needed
  }
}




