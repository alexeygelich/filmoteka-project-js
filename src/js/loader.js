const loader = document.querySelector('.loader');

const spinner = function () {
  loader.classList.add('is-hidden');
  loader.classList.remove('is-hidden');
};

spinner();
