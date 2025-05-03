// Particle system for floating elements
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.querySelector('.particles-container');
  
  // Initial particles
  createParticles('hearts', 10);
  
  // Schedule periodic particle creation
  setInterval(() => createParticles('hearts', 5), 10000);
  setInterval(() => createParticles('stars', 5), 15000);
  
  // Create particles function
  function createParticles(type, count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        createParticle(type);
      }, i * 300); // Stagger creation
    }
  }
  
  // Create a single particle
  function createParticle(type) {
    const particle = document.createElement('div');
    
    // Set particle properties
    particle.className = `particle ${type}`;
    
    // Set random position, adjusting for viewport size
    const posX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10; // Start just below viewport
    
    // Set random duration and delay for animation
    const duration = 7 + Math.random() * 7; // 7-14 seconds
    const randomX = (Math.random() - 0.5) * 200; // -100px to 100px
    const randomRotate = Math.random() * 360; // 0-360 degrees
    
    // Apply styles directly
    particle.style.cssText = `
      left: ${posX}px;
      top: ${startY}px;
      --duration: ${duration}s;
      --random-x: ${randomX}px;
      --random-rotate: ${randomRotate}deg;
    `;
    
    // Add specific styling based on type
    if (type === 'confetti') {
      const hue = Math.floor(Math.random() * 360);
      particle.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
      particle.style.width = `${5 + Math.random() * 10}px`;
      particle.style.height = `${5 + Math.random() * 10}px`;
    }
    
    // Add particle to DOM
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
      if (particle.parentNode === particlesContainer) {
        particlesContainer.removeChild(particle);
      }
    }, duration * 1000);
  }
});

// Function to trigger special particle effects
function triggerSpecialEffect(type, count) {
  if (type === 'hearts') {
    createHeartBurst(count);
  } else if (type === 'stars') {
    createStarBurst(count);
  } else if (type === 'confetti') {
    createConfettiBurst(count);
  }
}

// Create a burst of hearts from center
function createHeartBurst(count) {
  const particlesContainer = document.querySelector('.particles-container');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'particle heart';
      
      // Random angle and distance from center
      const angle = Math.random() * Math.PI * 2; // 0 to 2π
      const distance = 50 + Math.random() * 100; // 50-150px from center
      
      // Calculate position using polar coordinates
      const posX = centerX + Math.cos(angle) * distance;
      const posY = centerY + Math.sin(angle) * distance;
      
      // Animation properties
      const duration = 4 + Math.random() * 3; // 4-7 seconds
      const scale = 0.5 + Math.random() * 1.5; // 0.5-2 size
      
      // Set styles
      heart.style.cssText = `
        left: ${posX}px;
        top: ${posY}px;
        transform: scale(${scale});
        --duration: ${duration}s;
        --random-x: ${(Math.random() - 0.5) * 200}px;
        --random-rotate: ${Math.random() * 360}deg;
      `;
      
      // Add to container
      particlesContainer.appendChild(heart);
      
      // Remove after animation
      setTimeout(() => {
        if (heart.parentNode === particlesContainer) {
          particlesContainer.removeChild(heart);
        }
      }, duration * 1000);
    }, i * 50); // Staggered creation
  }
}

// Create a burst of stars
function createStarBurst(count) {
  const particlesContainer = document.querySelector('.particles-container');
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'particle star';
      
      // Random position across whole screen
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      
      // Animation properties
      const duration = 3 + Math.random() * 4; // 3-7 seconds
      const scale = 0.8 + Math.random() * 1.2; // 0.8-2 size
      
      // Set styles
      star.style.cssText = `
        left: ${posX}px;
        top: ${posY}px;
        transform: scale(${scale});
        --duration: ${duration}s;
        --random-x: ${(Math.random() - 0.5) * 300}px;
        --random-rotate: ${Math.random() * 720 - 360}deg;
      `;
      
      // Add to container
      particlesContainer.appendChild(star);
      
      // Remove after animation
      setTimeout(() => {
        if (star.parentNode === particlesContainer) {
          particlesContainer.removeChild(star);
        }
      }, duration * 1000);
    }, i * 80); // Staggered creation
  }
}

// Create confetti burst
function createConfettiBurst(count) {
  const particlesContainer = document.querySelector('.particles-container');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'particle confetti';
      
      // Random position near center
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 20; // Start close together
      const posX = centerX + Math.cos(angle) * distance;
      const posY = centerY + Math.sin(angle) * distance;
      
      // Random color
      const hue = Math.floor(Math.random() * 360);
      const shape = Math.random() > 0.5 ? 'square' : 'rectangle';
      
      // Animation properties
      const duration = 2 + Math.random() * 2; // 2-4 seconds
      
      // Set styles
      confetti.style.cssText = `
        left: ${posX}px;
        top: ${posY}px;
        background-color: hsl(${hue}, 100%, 70%);
        width: ${shape === 'square' ? '8px' : '4px'};
        height: ${shape === 'square' ? '8px' : '12px'};
        --duration: ${duration}s;
        --random-x: ${(Math.random() - 0.5) * 300}px;
        --random-rotate: ${Math.random() * 1080 - 540}deg;
      `;
      
      // Add to container
      particlesContainer.appendChild(confetti);
      
      // Remove after animation
      setTimeout(() => {
        if (confetti.parentNode === particlesContainer) {
          particlesContainer.removeChild(confetti);
        }
      }, duration * 1000);
    }, i * 20); // Faster staggered creation
  }
}

// Function to trigger the birthday celebration effect
function triggerBirthdayCelebration() {
  // Create a big burst of particles
  createHeartBurst(30);
  setTimeout(() => createStarBurst(30), 500);
  setTimeout(() => createConfettiBurst(100), 1000);
  
  // Continue celebration with periodic bursts
  const celebrationInterval = setInterval(() => {
    const randomEffect = Math.random();
    if (randomEffect < 0.33) {
      createHeartBurst(15);
    } else if (randomEffect < 0.66) {
      createStarBurst(15);
    } else {
      createConfettiBurst(30);
    }
  }, 3000);
  
  // Stop after 30 seconds to prevent performance issues
  setTimeout(() => {
    clearInterval(celebrationInterval);
  }, 30000);
  
  // Auto-play music if it's available
  const music = document.getElementById('background-music');
  if (music) {
    music.play().catch(err => {
      console.log('Auto-play prevented by browser. Please use the play button.');
    });
    
    // Update music toggle button
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle) {
      musicToggle.querySelector('.music-text').textContent = 'Pause Music';
    }
  }
}