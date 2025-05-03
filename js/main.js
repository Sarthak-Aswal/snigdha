// Main initialization script
document.addEventListener('DOMContentLoaded', function() {
  console.log('Birthday Countdown initialized!');
  
  // Add CSS class for initial animation sequence
  document.body.classList.add('loaded');
  
  // Create initial particles
  setTimeout(() => {
    triggerSpecialEffect('hearts', 15);
  }, 2500);
  
  // Check if we need to set up a special photo
  const couplePhoto = document.querySelector('.couple-photo');
  
  if (couplePhoto) {
    // Add loading animation until photo is loaded
    couplePhoto.classList.add('loading');
    
    couplePhoto.onload = function() {
      couplePhoto.classList.remove('loading');
    };
    
    couplePhoto.onerror = function() {
      // If photo fails to load, replace with a fallback
      couplePhoto.src = 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg';
    };
  }
  
  // Set page title
  updatePageTitle();
  setInterval(updatePageTitle, 60000); // Update every minute
});

// Update the page title with countdown information
function updatePageTitle() {
  const now = new Date();
  const birthday = CONFIG.birthday;
  const timeDiff = birthday - now;
  
  // If birthday has passed, show birthday message
  if (timeDiff <= 0) {
    document.title = `🎂 Happy Birthday, ${CONFIG.name}! 🎂`;
    return;
  }
  
  // Calculate days
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  // Update title based on days remaining
  if (days > 0) {
    document.title = `${days} days until ${CONFIG.name}'s Birthday! ❤️`;
  } else {
    // Less than a day, calculate hours
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.title = `${hours} hours until ${CONFIG.name}'s Birthday! ❤️`;
  }
}

// Trigger birthday celebration if it's the birthday
window.addEventListener('load', function() {
  const now = new Date();
  const birthday = CONFIG.birthday;
  
  if (now.getDate() === birthday.getDate() && 
      now.getMonth() === birthday.getMonth()) {
    triggerBirthdayCelebration();
  }
});