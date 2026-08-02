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

  // Closes the mobile menu after a navigation link is selected.
  primaryNavigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNavigation.classList.remove('is-open');
      updateNavigationButton(false);
    });
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