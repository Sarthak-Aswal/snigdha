document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const musicToggle = document.getElementById('music-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const bgMusic = document.getElementById('background-music');
  
  // Initialize based on time of day
  initializeTheme();
  
  // iOS-specific audio initialization
  function initAudioForIOS() {
    // Create unlock event for iOS
    function unlockAudio() {
      // Create empty buffer
      const buffer = bgMusic.context.createBuffer(1, 1, 22050);
      const source = bgMusic.context.createBufferSource();
      source.buffer = buffer;
      
      // Connect to output (speakers)
      source.connect(bgMusic.context.destination);
      
      // Play the empty buffer
      source.start(0);
      
      // Setup audio element
      bgMusic.volume = 0.01;
      const promise = bgMusic.play();
      
      if (promise !== undefined) {
        promise.then(() => {
          // Audio is playing
          bgMusic.pause();
          bgMusic.currentTime = 0;
          bgMusic.volume = 1;
        }).catch(error => {
          console.log('iOS audio unlock failed:', error);
        });
      }
      
      // Remove touch listeners
      document.removeEventListener('touchstart', unlockAudio, false);
      document.removeEventListener('touchend', unlockAudio, false);
    }
    
    // Add touch listeners
    document.addEventListener('touchstart', unlockAudio, false);
    document.addEventListener('touchend', unlockAudio, false);
  }

  // Music toggle with iOS compatibility
  if (musicToggle && bgMusic) {
    // Initialize audio context for iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      try {
        // Fix for iOS audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        bgMusic.context = new AudioContext();
        initAudioForIOS();
      } catch (e) {
        console.log('Web Audio API not supported', e);
      }
    }

    musicToggle.addEventListener('click', function() {
      if (bgMusic.paused) {
        // Play music with improved error handling
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            musicToggle.querySelector('.music-text').textContent = 'Pause Music';
            musicToggle.classList.add('active');
          }).catch(error => {
            console.log('Playback failed:', error);
            // Show user they need to interact
            musicToggle.querySelector('.music-text').textContent = 'Tap Again';
            musicToggle.classList.remove('active');
            
            // For iOS, we need to initialize on first failed attempt
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
              initAudioForIOS();
            }
          });
        }
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

  // Add loadedmetadata event for better iOS handling
  if (bgMusic) {
    bgMusic.addEventListener('loadedmetadata', function() {
      // iOS sometimes needs this to properly load the audio
      bgMusic.volume = 0;
      bgMusic.play().then(() => {
        bgMusic.pause();
        bgMusic.currentTime = 0;
        bgMusic.volume = 1;
      }).catch(e => console.log('Audio preload error:', e));
    });
  }
});