/* Progressive enhancements: the project pages and contact links work without JavaScript. */
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
if (menuButton && navigation) {
  menuButton.hidden = false;
  const closeMenu = () => { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); };
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('open', !expanded);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 481px)').addEventListener('change', closeMenu);
}
const filterBar = document.querySelector('[data-filters]');
if (filterBar) {
  filterBar.hidden = false;
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  const count = document.querySelector('.project-count');
  function applyFilter(category) {
    let visible = 0;
    cards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) visible++;
    });
    filters.forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    count.textContent = visible + (visible === 1 ? ' project' : ' projects');
  }
  filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
}
const lightbox = document.querySelector('.lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const original = lightbox.querySelector('.lightbox-original');
  let opener;
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      caption.textContent = image.alt;
      original.href = link.href;
      lightbox.showModal();
      document.body.classList.add('modal-open');
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target !== lightbox) return;
    const box = lightbox.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (opener) opener.focus({ preventScroll: true });
  });
}
document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
