var filterLinks = document.querySelectorAll('.filter-link');
var projectCards = document.querySelectorAll('.project-card');

filterLinks.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var isAlreadyActive = btn.classList.contains('active');

    filterLinks.forEach(function (b) { b.classList.remove('active'); });

    if (isAlreadyActive) {
      // clicking the active filter again resets to show all
      projectCards.forEach(function (card) { card.style.display = ''; });
      return;
    }

    btn.classList.add('active');
    var filter = btn.getAttribute('data-filter');

    projectCards.forEach(function (card) {
      card.style.display = (card.getAttribute('data-category') === filter) ? '' : 'none';
    });
  });
});
// ============ PROJECT MODAL ============
var projectModalOverlay = document.getElementById('project-modal-overlay');
var projectModalImg = document.getElementById('project-modal-img');
var projectModalTitle = document.getElementById('project-modal-title');
var projectModalDesc = document.getElementById('project-modal-desc');
var projectModalBadges = document.getElementById('project-modal-badges');
var projectModalTags = document.getElementById('project-modal-tags');
var projectModalLink = document.getElementById('project-modal-link');
var projectModalClose = document.getElementById('project-modal-close');

document.querySelectorAll('.project-card[data-title]').forEach(function (card) {
  card.addEventListener('click', function () {
    var img = card.querySelector('.project-card-img img');
    projectModalImg.src = img ? img.src : '';
    projectModalImg.alt = img ? img.alt : '';

    projectModalTitle.textContent = card.getAttribute('data-title') || '';
    projectModalDesc.textContent = card.getAttribute('data-desc') || '';
    projectModalLink.href = card.getAttribute('data-link') || '#';

    projectModalBadges.innerHTML = '';
    [card.getAttribute('data-badge1'), card.getAttribute('data-badge2')].forEach(function (badge, i) {
      if (!badge) return;
      var span = document.createElement('span');
      span.className = 'project-badge' + (i === 1 ? ' project-badge-status' : '');
      span.textContent = badge;
      projectModalBadges.appendChild(span);
    });

    projectModalTags.innerHTML = '';
    (card.getAttribute('data-tags') || '').split(',').forEach(function (tag) {
      tag = tag.trim();
      if (!tag) return;
      var span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = tag;
      projectModalTags.appendChild(span);
    });

    projectModalOverlay.classList.add('open');
  });
});
// ============ MOBILE NAV TOGGLE ============
var navToggle = document.getElementById('nav-toggle');
var navLinksMenu = document.getElementById('nav-links');

if (navToggle && navLinksMenu) {
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navLinksMenu.classList.toggle('open');
  });

  navLinksMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navLinksMenu.classList.remove('open');
    });
  });
}
function closeProjectModal() {
  projectModalOverlay.classList.remove('open');
}

projectModalClose.addEventListener('click', closeProjectModal);

projectModalOverlay.addEventListener('click', function (e) {
  if (e.target === projectModalOverlay) closeProjectModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeProjectModal();
});
