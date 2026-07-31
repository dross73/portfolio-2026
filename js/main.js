const navToggle = document.querySelector('.nav-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');

if (navToggle && primaryNavigation) {
  // Keeps the button's accessible state in sync with the menu.
  const updateNavigationButton = (isOpen) => {
    navToggle.setAttribute('aria-expanded', String(isOpen));

    navToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation' : 'Open navigation',
    );
  };

  navToggle.addEventListener('click', () => {
    const isOpen = primaryNavigation.classList.toggle('is-open');

    updateNavigationButton(isOpen);
  });

  // Closes the mobile menu and returns focus to the toggle button.
  document.addEventListener('keydown', (event) => {
    const isOpen = primaryNavigation.classList.contains('is-open');

    if (event.key === 'Escape' && isOpen) {
      primaryNavigation.classList.remove('is-open');
      updateNavigationButton(false);
      navToggle.focus();
    }
  });
}

// Prevent unfinished links from jumping to the top of the page.
const comingSoonLinks = document.querySelectorAll('a[href="#"]');

comingSoonLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    window.alert('Coming soon.');
  });
});

// Show the back-to-top link after the visitor scrolls down.
const backToTopLink = document.querySelector('.back-to-top');

const updateBackToTopVisibility = () => {
  backToTopLink.classList.toggle('is-visible', window.scrollY > 500);
};

window.addEventListener('scroll', updateBackToTopVisibility);

updateBackToTopVisibility();
