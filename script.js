let touchBlocked = false;
let clones = [];
let isFrozen = false;

function isMobileDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return /android|iphone|ipad|ipod|mobile/i.test(ua);
}

window.addEventListener('DOMContentLoaded', () => {
  const runawayBtn = document.getElementById("runaway-button");
  runawayBtn.style.position = "fixed";
  const headerHeight = document.getElementById('header-container').offsetHeight;
  runawayBtn.style.top = (headerHeight + 100) + "px";
  runawayBtn.style.left = "50%";
  runawayBtn.style.transform = "translateX(-50%)";

  // Create invisible admin trigger
  const secretButton = document.createElement('div');
  secretButton.style.position = 'fixed';
  secretButton.style.top = '10px';
  secretButton.style.right = '10px';
  secretButton.style.width = '30px';
  secretButton.style.height = '30px';
  secretButton.style.opacity = '0';
  secretButton.style.zIndex = '99999';
  secretButton.style.cursor = 'pointer';
  secretButton.title = 'Admin';

  document.body.appendChild(secretButton);

  secretButton.addEventListener('click', () => {
    showAdminPopup();
  });
});

// Admin popup
function showAdminPopup() {
  const popup = document.createElement('div');
  popup.id = 'admin-popup';
  popup.innerHTML = `
    <h3>Admin Login</h3>
    <input type="password" id="admin-password" placeholder="Enter password"/>
    <button onclick="submitAdminPassword()">Submit</button>
  `;
  document.body.appendChild(popup);
}

function submitAdminPassword() {
  const input = document.getElementById('admin-password');
  if (input.value === 'totallycrazy') {
    alert('Welcome, admin!');
    document.getElementById('admin-popup').remove();
    showAdminPanel();
  } else {
    alert('Wrong password!');
  }
}

// Admin panel
function showAdminPanel() {
  alert('Admin panel is under construction');
}

// Spin button animation
document.getElementById("spin-button").addEventListener("click", () => {
  document.body.animate(
    [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ],
    {
      duration: 1000,
      iterations: 5,
    }
  );
});

// Runaway button behavior
document.getElementById("runaway-button").addEventListener("mouseenter", () => {
  if (touchBlocked || isFrozen) return;
  const button = document.getElementById("runaway-button");
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  let newX = Math.random() * (windowWidth - buttonWidth);
  let newY = Math.random() * (windowHeight - buttonHeight);

  button.style.left = newX + "px";
  button.style.top = newY + "px";
});

document.getElementById("runaway-button").addEventListener("click", () => {
  alert("You caught me!");
});

// Clone button
document.getElementById("clone-button").addEventListener("click", () => {
  const clone = document.getElementById("runaway-button").cloneNode(true);
  clone.style.position = "fixed";
  clone.style.zIndex = 99999;
  clone.style.backgroundColor = "hotpink";
  clone.style.border = "3px dashed lime";
  clone.style.color = "black";
  clone.style.left = Math.random() * (window.innerWidth - clone.offsetWidth) + "px";
  clone.style.top = Math.random() * (window.innerHeight - clone.offsetHeight) + "px";

  clone.addEventListener("click", () => {
    alert("You clicked a clone!");
  });

  document.body.appendChild(clone);
  clones.push(clone);
});

// Clear clones button
document.getElementById("clear-clones-button").addEventListener("click", () => {
  clones.forEach(clone => clone.remove());
  clones = [];
});

// Invert button with smooth animation
document.getElementById("invert-button").addEventListener("click", () => {
  document.body.classList.toggle("inverted-upside-down");
});

// Glitch button with animation
document.getElementById("glitch-button").addEventListener("click", () => {
  document.body.classList.add("glitching");
  setTimeout(() => {
    document.body.classList.remove("glitching");
  }, 3000);
});

// Puzzle open
document.getElementById("open-puzzle-btn").addEventListener("click", () => {
  const puzzleContent = document.getElementById("puzzle-content");
  puzzleContent.style.display = puzzleContent.style.display === "none" ? "block" : "none";
});

// Clue button
document.getElementById("clue-button").addEventListener("click", () => {
  document.getElementById("clue-text").style.display = "block";
});

// Submit code
document.getElementById("submit-code").addEventListener("click", () => {
  const codeInput = document.getElementById("freeze-code").value.trim();
  const pi50 = "3.14159265358979323846264338327950288419716939937510";
  if (codeInput === pi50) {
    isFrozen = true;
    alert("You have frozen the running button! Now you can catch it!");
  } else {
    alert("Wrong code!");
  }
});






































