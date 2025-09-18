let isFrozen = false;
let clones = [];
let confettiInterval;

document.getElementById("spin-button").addEventListener("click", () => {
  alert("YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺");
});

const runawayBtn = document.getElementById("runaway-button");

function moveRandom(el) {
  if (isFrozen) return;
  const maxX = window.innerWidth - el.offsetWidth;
  const maxY = window.innerHeight - el.offsetHeight;
  el.style.position = "fixed";
  el.style.left = Math.random() * maxX + "px";
  el.style.top = Math.random() * maxY + "px";
}

runawayBtn.addEventListener("mouseenter", () => {
  moveRandom(runawayBtn);
});

runawayBtn.addEventListener("click", () => {
  if (isFrozen) {
    showReward("🎉 You outsmarted the button! You win! 🎉");
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
  }
});

document.getElementById("clone-button").addEventListener("click", () => {
  const clone = runawayBtn.cloneNode(true);
  clone.textContent = "I'm a clone!";
  clone.style.position = "fixed";
  clone.style.top = Math.random() * (window.innerHeight - 40) + "px";
  clone.style.left = Math.random() * (window.innerWidth - 150) + "px";
  clone.style.zIndex = 9999;
  clone.addEventListener("click", () => {
    alert("Clone clicked!");
  });
  document.body.appendChild(clone);
  clones.push(clone);
});

document.getElementById("clear-clones-button").addEventListener("click", () => {
  clones.forEach(c => c.remove());
  clones = [];
});

document.getElementById("invert-button").addEventListener("click", () => {
  document.body.classList.toggle("inverted-upside-down");
});

document.getElementById("glitch-button").addEventListener("click", () => {
  document.body.classList.add("glitching");
  setTimeout(() => {
    document.body.classList.remove("glitching");
  }, 2000);
});

document.getElementById("confetti-rain-button").addEventListener("click", () => {
  startConfettiRain();
  setTimeout(stopConfettiRain, 7000);
});

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

setInterval(() => {
  if (!document.body.classList.contains('inverted-upside-down')) {
    document.body.style.backgroundColor = getRandomColor();
  }
}, 1000);

function spawnConfetti(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.width = confetti.style.height = `${Math.random() * 10 + 5}px`;
    document.getElementById("confetti-container").appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function startConfettiRain() {
  confettiInterval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    spawnConfetti(x, 0, 15);
  }, 300);
}

function stopConfettiRain() {
  clearInterval(confettiInterval);
}

document.getElementById("open-puzzle-btn").addEventListener("click", () => {
  const puzzle = document.getElementById("puzzle-content");
  puzzle.style.display = puzzle.style.display === "none" ? "block" : "none";
});

document.getElementById("clue-button").addEventListener("click", () => {
  const clue = document.getElementById("clue-text");
  clue.style.display = clue.style.display === "none" ? "block" : "none";
});

document.getElementById("submit-code").addEventListener("click", () => {
  const val = document.getElementById("freeze-code").value.trim();
  const piCode = "3.14159265358979323846264338327950288419716939937510";
  if (val === piCode) {
    isFrozen = true;
    runawayBtn.textContent = "😳 You froze me!";
    runawayBtn.style.backgroundColor = "lightblue";
    runawayBtn.style.border = "3px solid blue";
  } else {
    alert("Wrong code! Try again.");
  }
});

function showReward(msg) {
  const popup = document.getElementById("reward-popup");
  popup.textContent = msg;
  popup.style.display = "block";
  setTimeout(() => popup.style.display = "none", 4000);
}

document.getElementById("admin-invisible-btn").addEventListener("click", () => {
  const popup = document.createElement("div");
  popup.id = "admin-popup";
  popup.innerHTML = `
    <h3>Admin Login</h3>
    <input type="password" id="admin-password" placeholder="Enter password"/>
    <button onclick="checkAdminPassword()">Submit</button>
  `;
  document.body.appendChild(popup);
});

function checkAdminPassword() {
  const pass = document.getElementById("admin-password").value;
  if (pass === "totallycrazy") {
    alert("Access granted! Welcome, admin.");
    document.getElementById("admin-popup").remove();
  } else {
    alert("Wrong password!");
  }
}
