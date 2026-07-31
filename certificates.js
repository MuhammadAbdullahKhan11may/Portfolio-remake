// ============ CERTIFICATE CATEGORY FILTER (via navbar links) ============
var filterLinks = document.querySelectorAll('.nav-link[data-filter]');
var certCards = document.querySelectorAll('.cert-card');
var emptyMsg = document.getElementById('cert-empty');

var counterNum = document.getElementById('cert-counter-num');

function updateCertCounter(count) {
  if (counterNum) counterNum.textContent = count;
}

filterLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    filterLinks.forEach(function (l) { l.classList.remove('active'); });
    link.classList.add('active');

    var filter = link.getAttribute('data-filter');
    var visibleCount = 0;

    certCards.forEach(function (card) {
      var match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.classList.toggle('hidden-card', !match);
      if (match) visibleCount++;
    });

    emptyMsg.classList.toggle('visible', visibleCount === 0);
    updateCertCounter(visibleCount);
  });
});

// initial count on page load (shows total, since "All" is active by default)
updateCertCounter(certCards.length);

// ============ MOBILE NAV TOGGLE ============
var navToggle = document.getElementById('nav-toggle');
var navLinksMenu = document.getElementById('nav-links');

if (navToggle && navLinksMenu) {
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navLinksMenu.classList.toggle('open');
  });

  // close menu after tapping a link/filter (but not before the filter click handler above runs)
  navLinksMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navLinksMenu.classList.remove('open');
    });
  });
}
// ============ CERTIFICATE MODAL ============
var modalOverlay = document.getElementById('cert-modal-overlay');
var modalImg = document.getElementById('cert-modal-img');
var modalTitle = document.getElementById('cert-modal-title');
var modalIssuer = document.getElementById('cert-modal-issuer');
var modalDate = document.getElementById('cert-modal-date');
var modalDesc = document.getElementById('cert-modal-desc');
var modalClose = document.getElementById('cert-modal-close');

document.querySelectorAll('.cert-card').forEach(function (card) {
  card.addEventListener('click', function () {
    var img = card.querySelector('.cert-photo');
    modalImg.src = img ? img.src : '';
    modalImg.alt = img ? img.alt : '';

    modalTitle.textContent = card.getAttribute('data-title') || '';
    modalIssuer.textContent = card.getAttribute('data-issuer') || '';
    modalDate.textContent = card.getAttribute('data-date') || '';
    modalDesc.textContent = card.getAttribute('data-desc') || '';

    modalOverlay.classList.add('open');
  });
});

function closeCertModal() {
  modalOverlay.classList.remove('open');
}

modalClose.addEventListener('click', closeCertModal);

modalOverlay.addEventListener('click', function (e) {
  if (e.target === modalOverlay) closeCertModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeCertModal();
});
