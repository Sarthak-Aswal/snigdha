// Controls for music and theme
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const musicToggle = document.getElementById('music-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const bgMusic = document.getElementById('background-music');
  
  // Initialize based on time of day
  initializeTheme();
  
  // Music toggle
  if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', function() {
      if (bgMusic.paused) {
        // Play music
        bgMusic.play().catch(err => {
          console.log('Music playback error:', err);
        });
        musicToggle.querySelector('.music-text').textContent = 'Pause Music';
        musicToggle.classList.add('active');
      } else {
        // Pause music
        bgMusic.pause();
        musicToggle.querySelector('.music-text').textContent = 'Play Music';
        musicToggle.classList.remove('active');
      }
    });
  }
  
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('night-mode');
      
      // Update button text
      const themeIcon = themeToggle.querySelector('.theme-icon');
      const themeText = themeToggle.querySelector('.theme-text');
      
      if (document.body.classList.contains('night-mode')) {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Day Mode';
        themeToggle.classList.add('active');
      } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Night Mode';
        themeToggle.classList.remove('active');
      }
      
      // Save preference
      localStorage.setItem('theme', document.body.classList.contains('night-mode') ? 'night' : 'day');
    });
  }
  
  // Initialize theme based on time of day or saved preference
  function initializeTheme() {
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Use saved preference
      if (savedTheme === 'night') {
        document.body.classList.add('night-mode');
        
        if (themeToggle) {
          themeToggle.querySelector('.theme-icon').textContent = '☀️';
          themeToggle.querySelector('.theme-text').textContent = 'Day Mode';
          themeToggle.classList.add('active');
        }
      }
    } else {
      // Set based on time of day
      const currentHour = new Date().getHours();
      const isNightTime = currentHour < 6 || currentHour >= 18; // Night from 6pm to 6am
      
      if (isNightTime) {
        document.body.classList.add('night-mode');
        
        if (themeToggle) {
          themeToggle.querySelector('.theme-icon').textContent = '☀️';
          themeToggle.querySelector('.theme-text').textContent = 'Day Mode';
          themeToggle.classList.add('active');
        }
      }
    }
  }
});