document.addEventListener('DOMContentLoaded', () => {
  // Buttons & elements
  const glitchBtn = document.getElementById('glitchBtn');
  const invertBtn = document.getElementById('invertBtn');
  const confettiBtn = document.getElementById('confettiBtn');
  const cloneBtn = document.getElementById('cloneBtn');
  const clearClonesBtn = document.getElementById('clearClonesBtn');
  const runningBtn = document.getElementById('runningBtn');
  const catchBtn = document.getElementById('catchBtn');
  const submitCode = document.getElementById('submitCode');
  const inputCode = document.getElementById('inputCode');
  const rewardMsg = document.getElementById('rewardMsg');
  const buttonContainer = document.getElementById('buttonContainer'); // Assuming a container for clones

  // State variables
  let isGlitching = false;
  let isInverted = false;
  let confettiInterval = null;
  let clones = [];

  // --- GLITCH EFFECT ---
  glitchBtn.addEventListener('click', () => {
    if (!isGlitching) {
      document.body.classList.add('glitch');
      isGlitching = true;
      setTimeout(() => {
        document.body.classList.remove('glitch');
        isGlitching = false;
      }, 2000); // glitch lasts 2 seconds
    }
  });

  // --- INVERT WITH ANIMATION ---
  invertBtn.addEventListener('click', () => {
    if (!isInverted) {
      document.body.style.transition = 'transform 0.6s';
      document.body.style.transform = 'rotateY(180deg)';
      setTimeout(() => {
        document.body.classList.add('inverted');
        document.body.style.transition = '';
        document.body.style.transform = '';
        isInverted = true;
      }, 600);
    } else {
      // reverse animation
      document.body.style.transition = 'transform 0.6s';
      document.body.style.transform = 'rotateY(180deg)';
      setTimeout(() => {
        document.body.classList.remove('inverted');
        document.body.style.transition = '';
        document.body.style.transform = '';
        isInverted = false;
      }, 600);
    }
  });

  // --- CONFETTI RAIN ---
  function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = 2 + Math.random() * 3 + 's';
    confetti.style.opacity = 1;
    document.body.appendChild(confetti);

    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }

  confettiBtn.addEventListener('click', () => {
    if (!confettiInterval) {
      confettiInterval = setInterval(createConfettiPiece, 100);
      confettiBtn.textContent = "Stop Confetti";
    } else {
      clearInterval(confettiInterval);
      confettiInterval = null;
      confettiBtn.textContent = "Confetti Rain";
    }
  });

  // --- CLONE ME ---
  cloneBtn.addEventListener('click', () => {
    const clone = cloneBtn.cloneNode(true);
    clone.textContent = "I'm a clone!";
    clone.id = ''; // clear id so multiple clones don't conflict
    clone.style.margin = '5px';
    buttonContainer.appendChild(clone);
    clones.push(clone);
  });

  // --- CLEAR CLONES ---
  clearClonesBtn.addEventListener('click', () => {
    clones.forEach(clone => clone.remove());
    clones = [];
  });

  // --- RUNNING BUTTON + CATCH BUTTON ---
  runningBtn.disabled = true;
  const correctCode = "3.141592653";

  catchBtn.addEventListener('mouseenter', () => {
    const maxX = window.innerWidth - catchBtn.offsetWidth;
    const maxY = window.innerHeight - catchBtn.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    catchBtn.style.position = 'absolute';
    catchBtn.style.left = randomX + 'px';
    catchBtn.style.top = randomY + 'px';
  });

  submitCode.addEventListener('click', () => {
    const enteredCode = inputCode.value.trim();
    if (enteredCode === correctCode) {
      rewardMsg.textContent = "Correct! Click the running button now.";
      rewardMsg.style.color = "green";
      runningBtn.disabled = false;
    } else {
      rewardMsg.textContent = "Wrong code! Try again.";
      rewardMsg.style.color = "red";
    }
  });

  runningBtn.addEventListener('click', () => {
    alert("🎉 Congratulations! You caught the running button! Here's your reward! 🎉");
  });

  // --- TOUCHSCREEN WARNING ---
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  if (!isMobileDevice()) {
    window.addEventListener('touchstart', (e) => {
      alert("No touchscreen allowed on this device!");
      e.preventDefault();
    }, { passive: false });
  }
});









