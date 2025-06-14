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

  // Form validation and submission handling
  const contactForm = document.getElementById('contactForm');
  const thankYouMessage = document.getElementById('thankYouMessage');
  const backToForm = document.getElementById('backToForm');

  function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

    // Validate name
    if (!name) {
      showError('name', 'Please enter your name');
      isValid = false;
    }

    // Validate email
    if (!email) {
      showError('email', 'Please enter your email');
      isValid = false;
    } else if (!email.includes('@')) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }

    // Validate message
    if (!message) {
      showError('message', 'Please enter your message');
      isValid = false;
    } else {
      const wordCount = message.split(/\s+/).filter(word => word.length > 0).length;
      if (wordCount < 10) {
        showError('message', 'Message must be at least 10 words long');
        isValid = false;
      }
    }

    return isValid;
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!validateForm()) {
        return false;
      }

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
        // Redirect to thank you page after successful submission
        window.location.href = 'thankyou.html';
      })
      .catch(error => {
        alert('Error submitting form. Please try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
      });
    });
  }

  if (backToForm) {
    backToForm.addEventListener('click', function() {
      contactForm.classList.remove('d-none');
      thankYouMessage.classList.add('d-none');
      contactForm.reset();
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