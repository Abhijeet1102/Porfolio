document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-bs-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', function() {
    const currentTheme = document.body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  const thankYouMessage = document.getElementById('thankYouMessage');
  const backToForm = document.getElementById('backToForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

      // Using FormSubmit.co
      const formData = new FormData(this);
      fetch('https://formsubmit.co/ajax/abhijeetrai920@gmail.com', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        contactForm.classList.add('d-none');
        thankYouMessage.classList.remove('d-none');
      })
      .catch(error => {
        alert('Error submitting form. Please try again.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
      });
    });
  }

  if (backToForm) {
    backToForm.addEventListener('click', function() {
      contactForm.classList.remove('d-none');
      thankYouMessage.classList.add('d-none');
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
});