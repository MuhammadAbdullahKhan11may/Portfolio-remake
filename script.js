// ============ TYPEWRITER EFFECT (hero subtitle roles) ============
(function () {
  var roles = ["Full Stack Developer", "AI Enthusiast", "Physics Educator", "Cybersecurity Engineer"];
  var el = document.getElementById('typed-role');
  if (!el) return;

  var roleIndex = 0;
  var charIndex = 0;
  var typingSpeed = 90;
  var deletingSpeed = 45;
  var pauseAfterTyping = 1400;
  var pauseAfterDeleting = 300;

  function type() {
    var current = roles[roleIndex];

    if (charIndex <= current.length) {
      el.textContent = current.slice(0, charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, pauseAfterTyping);
    }
  }

  function erase() {
    var current = roles[roleIndex];

    if (charIndex >= 0) {
      el.textContent = current.slice(0, charIndex);
      charIndex--;
      setTimeout(erase, deletingSpeed);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, pauseAfterDeleting);
    }
  }

  type();
})();

// ============ SMOOTH SCROLL (nav links, buttons) ============
document.querySelectorAll('[data-target]').forEach(function (el) {
  el.addEventListener('click', function (e) {
    var targetId = this.getAttribute('data-target');
    var targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      var navHeight = document.getElementById('navbar').offsetHeight;
      var top = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

// ============ ACTIVE NAV LINK ON SCROLL ============
var sections = document.querySelectorAll('.section');
var navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  var navHeight = document.getElementById('navbar').offsetHeight;
  var scrollPos = window.pageYOffset + navHeight + 10;

  sections.forEach(function (sec) {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      var matching = document.querySelector('.nav-link[data-target="' + sec.id + '"]');
      if (matching) matching.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll);
// ============ SKILL CARD FLIP (only one open at a time) ============
var allSkillCards = document.querySelectorAll('.skill-card');

function toggleSkillCard(card) {
  var wasFlipped = card.classList.contains('flipped');
  allSkillCards.forEach(function (c) { c.classList.remove('flipped'); });
  if (!wasFlipped) {
    card.classList.add('flipped');
  }
}

allSkillCards.forEach(function (card) {
  card.addEventListener('click', function () {
    toggleSkillCard(card);
  });
  card.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSkillCard(card);
    }
  });
});

// ============ EMAIL CARD FLIP ============
var emailCard = document.getElementById('email-card');

if (emailCard) {
  emailCard.addEventListener('click', function () {
    emailCard.classList.toggle('flipped');
  });

  emailCard.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      emailCard.classList.toggle('flipped');
    }
  });

  // clicking anywhere outside the email card (including the other contact cards) unflips it
  document.addEventListener('click', function (e) {
    if (!emailCard.contains(e.target)) {
      emailCard.classList.remove('flipped');
    }
  });
}