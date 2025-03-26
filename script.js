const phrases = [
  ["FULL STACK", "DEVELOPER"], 
  ["COMPUTER SCIENCE", "UNDERGRADUATE"], 
  ["WEB", "DEVELOPER"], 
  ["SOFTWARE", "ENGINEER"], 
  ["UI/UX", "DESIGNER"], 
  ["GRAPHIC", "DESIGNER"], 
];

const lineElements = [
  document.getElementById("line1"),
  document.getElementById("line2"),
];

let phraseIndex = 0; 
let lineIndex = 0; 
let charIndex = 0; 
let isTyping = true; 
let speed = 150; 

function animateText() {
  const currentPhrase = phrases[phraseIndex];
  const currentLine = currentPhrase[lineIndex];
  const currentElement = lineElements[lineIndex];

  if (isTyping) {

    if (charIndex <= currentLine.length) {
      currentElement.textContent = currentLine.slice(0, charIndex);
      charIndex++;
      speed = 150; 
    } else {

      if (lineIndex < currentPhrase.length - 1) {
        lineIndex++;
        charIndex = 0;
        speed = 1000; 
      } else {

        isTyping = false;
        speed = 1000; 
      }
    }
  } else {

    if (charIndex >= 0) {
      currentElement.textContent = currentLine.slice(0, charIndex);
      charIndex--;
      speed = 100; 
    } else {

      if (lineIndex > 0) {
        lineIndex--;
        charIndex = currentPhrase[lineIndex].length;
        speed = 1000; 
      } else {

        phraseIndex = (phraseIndex + 1) % phrases.length; 
        lineIndex = 0;
        charIndex = 0;
        isTyping = true;
        speed = 1000; 
      }
    }
  }

  setTimeout(animateText, speed);
}

animateText();

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

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


window.addEventListener('scroll', handleScroll);

window.addEventListener('load', handleScroll);

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {

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

  const skillIcons = document.querySelectorAll('#skills_icon img, #technologies_icon img');
  skillIcons.forEach(icon => {
      icon.style.opacity = '0';
      icon.style.transition = 'opacity 2s ease-out';
  });


  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {

              skillIcons.forEach((icon, index) => {
                  setTimeout(() => {
                      icon.style.opacity = '1';
                  }, index * 300); 
              });
              
              observer.disconnect();
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
  });


  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
      observer.observe(skillsSection);
  }
});