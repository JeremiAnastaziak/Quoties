export default () => {
  const html = document.querySelector('html');
  const windowHeight = window.innerHeight;
  if (windowHeight < 350) {
    html.style.setProperty('--bottom-nav-height', '0px');
    return;
  }
  html.style.setProperty('--bottom-nav-height', '57px');
};
