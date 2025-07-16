// Typing animation
const text = "“Code. Create. Contribute.”";
let index = 0;

function type() {
  const typing = document.getElementById("typing");
  if (index < text.length) {
    typing.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 80);
  }
}
window.onload = type;

// Toggle nav menu for mobile
function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("hidden");
}

// --- Contact Form Enhancements ---
document.addEventListener('DOMContentLoaded', function() {
  // Auto-expanding textarea
  const messageTextarea = document.getElementById('contact-message');
  if (messageTextarea) {
    messageTextarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }

  // Real-time validation with icons
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const nameIcon = document.getElementById('name-icon');
  const emailIcon = document.getElementById('email-icon');
  const messageIcon = document.getElementById('message-icon');

  function setIcon(iconElem, valid) {
    if (!iconElem) return;
    iconElem.innerHTML = valid === null ? '' : valid
      ? '<svg class="input-icon valid" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>'
      : '<svg class="input-icon invalid" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
  }

  function validateName() {
    const valid = nameInput.value.trim().length > 1;
    setIcon(nameIcon, nameInput.value ? valid : null);
    return valid;
  }
  function validateEmail() {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = re.test(emailInput.value.trim());
    setIcon(emailIcon, emailInput.value ? valid : null);
    return valid;
  }
  function validateMessage() {
    const valid = messageInput.value.trim().length > 5;
    setIcon(messageIcon, messageInput.value ? valid : null);
    return valid;
  }

  if (nameInput) nameInput.addEventListener('input', validateName);
  if (emailInput) emailInput.addEventListener('input', validateEmail);
  if (messageInput) messageInput.addEventListener('input', validateMessage);

  // Enhance focus/blur micro-interactions
  [nameInput, emailInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('ring-2', 'ring-blue-400');
    });
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('ring-2', 'ring-blue-400');
    });
  });

  // Contact form submit logic (with animated checkmark)
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  const contactAnother = document.getElementById('contact-another');
  const successCheckmark = document.getElementById('success-checkmark');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      // Validate before submit
      const valid = validateName() & validateEmail() & validateMessage();
      if (!valid) return;
      const formData = new FormData(contactForm);
      const action = contactForm.getAttribute('action');
      try {
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          contactForm.style.display = 'none';
          contactSuccess.classList.remove('hidden');
          // Animate checkmark
          if (successCheckmark) {
            successCheckmark.querySelector('path').setAttribute('stroke-dasharray', '40,0');
            successCheckmark.querySelector('path').style.strokeDasharray = '0,40';
            setTimeout(() => {
              successCheckmark.querySelector('path').style.transition = 'stroke-dasharray 0.6s';
              successCheckmark.querySelector('path').style.strokeDasharray = '40,0';
            }, 50);
          }
        } else {
          alert('There was a problem submitting your message. Please try again later.');
        }
      } catch (err) {
        alert('There was a problem submitting your message. Please try again later.');
      }
    });
  }

  if (contactAnother && contactForm && contactSuccess) {
    contactAnother.addEventListener('click', function() {
      contactForm.reset();
      contactForm.style.display = '';
      contactSuccess.classList.add('hidden');
      setIcon(nameIcon, null);
      setIcon(emailIcon, null);
      setIcon(messageIcon, null);
    });
  }
});
