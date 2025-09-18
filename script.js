// Elements
const glitchBtn = document.getElementById("glitchBtn");
const invertBtn = document.getElementById("invertBtn");
const freezeRunningBtn = document.getElementById("freezeRunningBtn");
const catchBtn = document.getElementById("catchBtn");
const cloneMeBtn = document.getElementById("cloneMeBtn");
const clearClonesBtn = document.getElementById("clearClonesBtn");
const confettiBtn = document.getElementById("confettiBtn");
const buttonContainer = document.getElementById("buttonContainer");
const rewardDiv = document.getElementById("reward");
const codeForm = document.getElementById("codeForm");
const codeInput = document.getElementById("codeInput");
const title = document.getElementById("title");

let glitchActive = false;
let inverted = false;
let runningBtnFrozen = true;
let confettiInterval = null;

// --- Glitch button ---
glitchBtn.addEventListener("click", () => {
  glitchActive = !glitchActive;
  if (glitchActive) {
    title.classList.add("glitch");
  } else {
    title.classList.remove("glitch");
  }
});

// --- Invert button ---
invertBtn.addEventListener("click", () => {
  if (!inverted) {
    // animate invert forward
    document.body.classList.remove("invert-anim-back");
    document.body.classList.add("invert-anim");
  } else {
    // animate invert backward
    document.body.classList.remove("invert-anim");
    document.body.classList.add("invert-anim-back");
  }
  inverted = !inverted;
  // Make sure buttons remain visible
  buttonContainer.style.zIndex = "1000";
  title.style.zIndex = "1001";
});

// Remove animation classes after animation ends so can trigger again
document.body.addEventListener("animationend", (e) => {
  if (e.animationName === "invertFlip" || e.animationName === "invertFlipBack") {
    document.body.classList.remove("invert-anim");
    document.body.classList.remove("invert-anim-back");
  }
});

// --- Freeze Running Button ---
freezeRunningBtn.addEventListener("click", () => {
  runningBtnFrozen = true;
  catchBtn.disabled = true;
  rewardDiv.classList.add("hidden");
});

// --- Catch Button logic ---
catchBtn.addEventListener("click", () => {
  if (!runningBtnFrozen) {
    rewardDiv.classList.remove("hidden");
  }
});

// --- Clone Me button ---
cloneMeBtn.addEventListener("click", () => {
  const clone = cloneMeBtn.cloneNode(true);
  clone.id = ""; // Remove id so no duplicates
  clone.style.marginLeft = "10px";
  buttonContainer.appendChild(clone);
  clone.addEventListener("click", () => alert("You clicked a clone!"));
});

// --- Clear Clones button ---
clearClonesBtn.addEventListener("click", () => {
  // Remove all clones, keep original button
  [...buttonContainer.children].forEach((child) => {
    if (child !== cloneMeBtn && child.id !== "glitchBtn" && child.id !== "invertBtn" && child.id !== "freezeRunningBtn" && child.id !== "catchBtn" && child.id !== "clearClonesBtn" && child.id !== "confettiBtn") {
      buttonContainer.removeChild(child);
    }
  });
});

// --- Confetti Rain button ---
confettiBtn.addEventListener("click", () => {
  if (confettiInterval) {
    clearInterval(confettiInterval);
    confettiInterval = null;
  } else {
    confettiInterval = setInterval(createConfetti, 200);
    setTimeout(() => {
      clearInterval(confettiInterval);
      confettiInterval = null;
    }, 5000);
  }
});

function createConfetti() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti-piece");
  confetti.style.left = Math.random() * window.innerWidth + "px";
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
  confetti.style.animationDuration = 3 + Math.random() * 2 + "s";
  document.body.appendChild(confetti);
  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

// --- Code form logic ---
const correctCode = "3.141592653";

codeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const entered = codeInput.value.trim();
  if (entered === correctCode) {
    runningBtnFrozen = false;
    catchBtn.disabled = false;
    rewardDiv.classList.add("hidden");
    alert("Code accepted! You can now catch the running button.");
  } else {
    alert("Wrong code, try again.");
  }
  codeInput.value = "";
});

// --- Running Button movement ---
let moveInterval = null;

function startRunning() {
  if (runningBtnFrozen) return;

  moveInterval = setInterval(() => {
    const maxX = window.innerWidth - catchBtn.offsetWidth;
    const maxY = window.innerHeight - catchBtn.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    catchBtn.style.position = "fixed";
    catchBtn.style.left = `${newX}px`;
    catchBtn.style.top = `${newY}px`;
    catchBtn.style.zIndex = "1002";
  }, 800);
}

function stopRunning() {
  if (moveInterval) {
    clearInterval(moveInterval);
    moveInterval = null;
  }
}

// Start moving when running button is unfrozen
const observer = new MutationObserver(() => {
  if (!runningBtnFrozen) {
    startRunning();
  } else {
    stopRunning();
    // Reset button position to normal flow
    catchBtn.style.position = "relative";
    catchBtn.style.left = "";
    catchBtn.style.top = "";
    catchBtn.style.zIndex = "2";
    rewardDiv.classList.add("hidden");
  }
});

// Observe disabled attribute changes on catchBtn
observer.observe(catchBtn, { attributes: true, attributeFilter: ["disabled"] });

// Initial state
freezeRunningBtn.click();







