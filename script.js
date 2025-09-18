// --- Utility: check if device is phone ---
function isPhone() {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// --- Touch screen warning for non-phones ---
if (!isPhone()) {
  window.addEventListener('touchstart', function() {
    alert('No touchscreen allowed!');
  });
}

// --- Background color changer ---
let colors = ['#ff9999', '#99ccff', '#99ff99', '#ffcc99', '#ccccff'];
let colorIndex = 0;
function changeBackground() {
  document.body.style.backgroundColor = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
}
setInterval(changeBackground, 3000);

// --- Elements ---
const invertBtn = document.getElementById('invertBtn');
const glitchBtn = document.getElementById('glitchBtn');
const confettiBtn = document.getElementById('confettiBtn');
const runningBtn = document.getElementById('runningBtn');
const piInput = document.getElementById('piInput');
const submitPiBtn = document.getElementById('submitPi');
const rewardBox = document.getElementById('rewardBox');

// --- Invert page with animation ---
let inverted = false;
invertBtn.addEventListener('click', () => {
  document.body.style.transition = 'transform 0.8s';
  if (!inverted) {
    document.body.style.transform = 'rotateY(180deg)';
  } else {
    document.body.style.transform = 'rotateY(0deg)';
  }
  inverted = !inverted;
  // Make sure buttons remain visible
  setTimeout(() => {
    document.body.style.transition = '';
  }, 800);
});

// --- Glitch effect ---
glitchBtn.addEventListener('click', () => {
  document.body.classList.add('glitch');
  setTimeout(() => {
    document.body.classList.remove('glitch');
  }, 1000);
});

// --- Confetti effect ---
confettiBtn.addEventListener('click', () => {
  startConfetti();
  setTimeout(stopConfetti, 3000);
});

// --- Running button logic ---
runningBtn.disabled = true; // frozen initially

submitPiBtn.addEventListener('click', () => {
  const userCode = piInput.value.trim();
  const correctCode = "3.141592653"; // first 10 digits of pi including the dot
  if (userCode === correctCode) {
    alert("Correct code! You can now catch the running button.");
    runningBtn.disabled = false; // unfreeze button
    piInput.value = '';
  } else {
    alert("Wrong code, try again!");
  }
});

runningBtn.addEventListener('click', () => {
  if (!runningBtn.disabled) {
    rewardBox.style.display = 'block';
    rewardBox.textContent = "🎉 Congratulations! You caught the running button! 🎉";
  }
});

// --- Confetti helper functions ---
let confettiInterval;
function startConfetti() {
  if (confettiInterval) return;
  confettiInterval = setInterval(() => {
    createConfettiParticle();
  }, 100);
}

function stopConfetti() {
  clearInterval(confettiInterval);
  confettiInterval = null;
}

// Create a confetti particle
function createConfettiParticle() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * window.innerWidth + 'px';
  confetti.style.backgroundColor = randomColor();
  document.body.appendChild(confetti);
  setTimeout(() => {
    confetti.remove();
  }, 3000);
}

function randomColor() {
  const colors = ['#ff0a54', '#ff477e', '#ff85a1', '#fbb1b1', '#f9bec7'];
  return colors[Math.floor(Math.random() * colors.length)];
}




