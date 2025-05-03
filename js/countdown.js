// Countdown functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get countdown elements
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  const messageElement = document.querySelector('.message');
  
  // Update the countdown every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // Display a random message from config
  updateMessage();
  setInterval(updateMessage, 30000); // Change message every 30 seconds
  
  // Update the photo if specified in config
  if (CONFIG.photoUrl) {
    document.querySelector('.couple-photo').src = CONFIG.photoUrl;
  }
  
  // Set music source if specified in config
  if (CONFIG.musicUrl) {
    document.getElementById('background-music').src = CONFIG.musicUrl;
  }
  
  // Display birthday person's name in title if provided
  if (CONFIG.name && CONFIG.name !== "Sweetheart") {
    document.querySelector('.title').textContent = `Counting Down to ${CONFIG.name}'s Special Day`;
  }
});

// Function to update the countdown timer
function updateCountdown() {
  // Get current time and birthday time
  const currentTime = new Date();
  const birthdayTime = CONFIG.birthday;
  
  // Calculate time difference
  const timeDiff = birthdayTime - currentTime;
  
  // Check if birthday has passed
  if (timeDiff <= 0) {
    // It's birthday time!
    displayBirthdayMessage();
    triggerBirthdayCelebration();
    return;
  }
  
  // Calculate days, hours, minutes, seconds
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
  // Update the DOM with new values
  document.getElementById('days').textContent = formatTimeValue(days);
  document.getElementById('hours').textContent = formatTimeValue(hours);
  document.getElementById('minutes').textContent = formatTimeValue(minutes);
  document.getElementById('seconds').textContent = formatTimeValue(seconds);
  
  // Apply pulse animation at specific intervals
  if (seconds === 0) {
    pulseCountdownItem(document.getElementById('minutes'));
    
    if (minutes === 0) {
      pulseCountdownItem(document.getElementById('hours'));
      
      if (hours === 0) {
        pulseCountdownItem(document.getElementById('days'));
      }
    }
  }
  
  // Trigger special effects at certain milestones
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    triggerBirthdayCelebration();
  } else if (days === 0 && hours === 0 && minutes === 0) {
    triggerSpecialEffect('confetti', 50);
  } else if (days === 0 && hours === 0 && minutes <= 30 && seconds === 0) {
    triggerSpecialEffect('stars', 20);
  } else if (days === 0 && hours <= 2 && minutes === 0 && seconds === 0) {
    triggerSpecialEffect('hearts', 30);
  } else if (days === 1 && hours === 0 && minutes === 0 && seconds === 0) {
    triggerSpecialEffect('stars', 40);
  }
}

// Format time values to have leading zeros
function formatTimeValue(value) {
  return value < 10 ? `0${value}` : value;
}

// Update message with a random one from config
function updateMessage() {
  const messageElement = document.querySelector('.message');
  const messages = CONFIG.messages;
  
  if (messages && messages.length > 0) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    
    // Fade out current message
    messageElement.style.opacity = 0;
    
    // Set new message and fade in after a short delay
    setTimeout(() => {
      messageElement.textContent = messages[randomIndex];
      messageElement.style.opacity = 1;
    }, 500);
  }
}

// Function to display birthday message
function displayBirthdayMessage() {
  const countdownContainer = document.querySelector('.countdown-container');
  const messageElement = document.querySelector('.message');
  
  // Hide countdown
  countdownContainer.style.display = 'none';
  
  // Update header
  document.querySelector('.title').textContent = "Happy Birthday!";
  document.querySelector('.subtitle').textContent = "Today is your special day!";
  
  // Update message
  messageElement.textContent = `Happy Birthday, ${CONFIG.name}! Today is all about celebrating wonderful, amazing you! I love you! ❤️`;
  
  // Make message more prominent
  const messageContainer = document.querySelector('.message-container');
  messageContainer.style.transform = 'scale(1.1)';
  messageContainer.style.background = 'rgba(255, 182, 193, 0.7)';
}

// Add pulse animation to a countdown item
function pulseCountdownItem(element) {
  if (!element) return;
  
  // Add pulse class
  element.classList.add('pulsing');
  
  // Remove class after animation completes
  setTimeout(() => {
    element.classList.remove('pulsing');
  }, 1000);
}