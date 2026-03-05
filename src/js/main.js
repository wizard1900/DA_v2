import './_vendor';
import vars from './_vars';
// import './_functions';
import './_components';

let prevY = pageYOffset;
let animElement = document.querySelector('.hero__logo')
window.addEventListener('scroll', function () {

  if (pageYOffset <= 30 && pageYOffset < prevY) {
    animElement.classList.add('hero__logo--active');

  } else {
    if (pageYOffset - prevY > 80) {
      animElement.classList.remove('hero__logo--active');
    }
  }
  prevY = pageYOffset;
});

