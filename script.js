const phrases = [
  ["FULL STACK", "DEVELOPER"], // Phrase 1
  ["COMPUTER SCIENCE", "UNDERGRADUATE"], // Phrase 2
  ["WEB", "DEVELOPER"], // Phrase 3
  ["SOFTWARE", "ENGINEER"], // Phrase 4
  ["UI/UX", "DESIGNER"], // Phrase 5
  ["GRAPHIC", "DESIGNER"], // Phrase 6
];

const lineElements = [
  document.getElementById("line1"),
  document.getElementById("line2"),
];

let phraseIndex = 0; // Track which phrase is being animated
let lineIndex = 0; // Track which line is being animated
let charIndex = 0; // Current character index
let isTyping = true; // Track if we're typing or erasing
let speed = 150; // Typing/erasing speed in milliseconds

function animateText() {
  const currentPhrase = phrases[phraseIndex];
  const currentLine = currentPhrase[lineIndex];
  const currentElement = lineElements[lineIndex];

  if (isTyping) {
    // Typing: Add one character to the current line
    if (charIndex <= currentLine.length) {
      currentElement.textContent = currentLine.slice(0, charIndex);
      charIndex++;
      speed = 150; // Typing speed
    } else {
      // Move to the next line after typing is complete
      if (lineIndex < currentPhrase.length - 1) {
        lineIndex++;
        charIndex = 0;
        speed = 1000; // Pause before typing the next line
      } else {
        // Switch to erasing after all lines are typed
        isTyping = false;
        speed = 1000; // Pause before erasing
      }
    }
  } else {
    // Erasing: Remove one character from the current line
    if (charIndex >= 0) {
      currentElement.textContent = currentLine.slice(0, charIndex);
      charIndex--;
      speed = 100; // Erasing speed
    } else {
      // Move to the previous line after erasing is complete
      if (lineIndex > 0) {
        lineIndex--;
        charIndex = currentPhrase[lineIndex].length;
        speed = 1000; // Pause before erasing the next line
      } else {
        // Move to the next phrase after all lines are erased
        phraseIndex = (phraseIndex + 1) % phrases.length; // Loop back to the first phrase
        lineIndex = 0;
        charIndex = 0;
        isTyping = true;
        speed = 1000; // Pause before typing the first line
      }
    }
  }

  setTimeout(animateText, speed);
}

// Start the animation
animateText();

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Function to handle scroll events
function handleScroll() {
    const servicesContainer = document.querySelector('.services-container');
    const educationContainer = document.querySelector('.education-container');

    if (servicesContainer && isInViewport(servicesContainer)) {
        servicesContainer.classList.add('in-view');
    }

    if (educationContainer && isInViewport(educationContainer)) {
        educationContainer.classList.add('in-view');
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Trigger the check on page load in case the section is already in view
window.addEventListener('load', handleScroll);

// Project filtering functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          const filter = button.getAttribute('data-filter');

          projectCards.forEach(card => {
              const category = card.getAttribute('data-category');
              
              if (filter === 'all' || category === filter) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // 1. Set initial state (opacity: 0)
  const skillIcons = document.querySelectorAll('#skills_icon img, #technologies_icon img');
  skillIcons.forEach(icon => {
      icon.style.opacity = '0';
      icon.style.transition = 'opacity 2s ease-out';
  });

  // 2. Configure intersection observer
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // 3. Animate icons one by one when section is visible
              skillIcons.forEach((icon, index) => {
                  setTimeout(() => {
                      icon.style.opacity = '1';
                  }, index * 300); // 300ms delay between each icon
              });
              
              // Stop observing after animation triggers
              observer.disconnect();
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
  });

  // 4. Observe the skills section
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
      observer.observe(skillsSection);
  }
});