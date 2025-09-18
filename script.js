// BroadcastChannel to receive commands from admin page
const bc = new BroadcastChannel('crazytown');

let clones = [];
let isFrozen = false;

// Helper function for random color
function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

// Confetti spawning
function spawnConfetti(x, y, count = 10) {
  const container = document.getElementById('confetti-container');
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = getRandomColor();
    const size = Math.random() * 10 + 5;
    confetti.style.width = confetti.style.height = `${size}px`;
    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function showReward(msg) {
  const popup = document.getElementById('reward-popup');
  popup.textContent = msg;
  popup.style.display = 'block';
  setTimeout(() => { popup.style.display = 'none'; }, 4000);
}

// Background color changing every second (only if not inverted)
setInterval(() => {
  if (!document.body.classList.contains('inverted-upside-down')) {
    document.body.style.backgroundColor = getRandomColor();
  }
}, 1000);

// Buttons and elements
const spinButton = document.getElementById('spin-button');
const runawayBtn = document.getElementById('runaway-button');
const cloneButton = document.getElementById('clone-button');
const clearClonesButton = document.getElementById('clear-clones-button');
const invertButton = document.getElementById('invert-button');
const glitchButton = document.getElementById('glitch-button');
const confettiRainButton = document.getElementById('confetti-rain-button');


// DO NOT PRESS
spinButton.addEventListener('click', () => {
  alert('YOU PRESSED THE BUTTON. NOW YOU MUST DANCE. 💃🕺');
});

// Runaway button positioning & movement
runawayBtn.style.position = 'fixed';
const headerHeight = document.getElementById('header-container').offsetHeight;
runawayBtn.style.top = headerHeight + 100 + 'px';
runawayBtn.style.left = '50%';
runawayBtn.style.transform = 'translateX(-50%)';

function moveRandom(el) {
  if (isFrozen) return;
  const maxWidth = window.innerWidth - el.offsetWidth - 20;
  const maxHeight = window.innerHeight - el.offsetHeight - 20;
  const minTop = headerHeight + 10;

  el.style.left = Math.random() * maxWidth + 'px';
  el.style.top = (Math.random() * (maxHeight - minTop) + minTop) + 'px';
}

runawayBtn.addEventListener('mouseenter', () => {
  if (isFrozen) return;
  moveRandom(runawayBtn);
});

runawayBtn.addEventListener('click', () => {
  if (isFrozen) {
    showReward('🎉 You outsmarted the button! You win! 🎉');
    spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
  }
});

// Clone button
cloneButton.addEventListener('click', () => {
  const clone = cloneButton.cloneNode(true);
  clone.textContent = "I'm a clone!";
  clone.style.position = 'fixed';
  clone.style.top = Math.random() * (window.innerHeight - 40) + 'px';
  clone.style.left = Math.random() * (window.innerWidth - 150) + 'px';
  clone.style.zIndex = 9999;
  clone.addEventListener('click', () => {
    alert('Clone clicked!');
  });
  document.body.appendChild(clone);
  clones.push(clone);
});

// Clear clones
clearClonesButton.addEventListener('click', () => {
  clones.forEach(c => c.remove());
  clones = [];
});

// Invert with animation
invertButton.addEventListener('click', () => {
  toggleInvert();
});

function toggleInvert() {
  // If already inverted, remove animation and revert
  if (document.body.classList.contains('inverted-upside-down')) {
    document.body.classList.remove('inverting');
    setTimeout(() => {
      document.body.classList.remove('inverted-upside-down');
    }, 1000);
  } else {
    // Add animation then invert
    document.body.classList.add('inverting');
    setTimeout(() => {
      document.body.classList.add('inverted-upside-down');
      document.body.classList.remove('inverting');
    }, 1000);
  }
}

// Glitch effect
glitchButton.addEventListener('click', () => {
  document.body.classList.add('glitching');
  setTimeout(() => {
    document.body.classList.remove('glitching');
  }, 3000);
});

// Confetti rain
let confettiInterval;
confettiRainButton.addEventListener('click', () => {
  startConfettiRain();
  setTimeout(stopConfettiRain, 7000);
});

function startConfettiRain() {
  confettiInterval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    spawnConfetti(x, 0, 15);
  }, 300);
}

function stopConfettiRain() {
  clearInterval(confettiInterval);
}

// Freeze runaway button
function freezeButton() {
  isFrozen = true;
  runawayBtn.textContent = '😳 You froze me!';
  runawayBtn.style.backgroundColor = 'lightblue';
  runawayBtn.style.border = '3px solid blue';
}

// === BroadcastChannel listener for admin commands ===
bc.onmessage = (event) => {
  switch (event.data) {
    case 'trigger-do-not-press':
      spinButton.click();
      break;
    case 'trigger-confetti-rain':
      startConfettiRain();
      break;
    case 'trigger-stop-confetti-rain':
      stopConfettiRain();
      break;
    case 'trigger-glitch':
      glitchButton.click();
      break;
    case 'trigger-invert':
      toggleInvert();
      break;
    case 'trigger-freeze':
      freezeButton();
      break;
    case 'trigger-clone':
      cloneButton.click();
      break;
    case 'trigger-clear-clones':
      clearClonesButton.click();
      break;
  }
};

// Invisible admin button
const adminBtn = document.getElementById('admin-invisible-btn');
adminBtn.addEventListener('click', () => {
  const password = prompt('Enter admin password:');
  if (password === 'SuperSecret123!') {
    window.open('admin.html', '_blank');
  } else {
    alert('Wrong password!');
  }
});



