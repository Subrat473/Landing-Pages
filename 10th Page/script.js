
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


const header = document.querySelector('#header');
const stickyOffset = header.offsetTop;

window.onscroll = function () {
  if (window.pageYOffset > stickyOffset) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
};


const menuBtn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
