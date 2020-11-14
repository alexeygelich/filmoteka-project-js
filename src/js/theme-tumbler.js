const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
}

const changeTheme = document.querySelector('#theme-switch-toggle');

changeTheme.addEventListener('change', savedChangeTheme);
const themeShow = document.querySelector('body');


const darkFooter = document.querySelector('.footer');
console.log(darkFooter);



function defaultTheme() {
    if (localStorage.getItem('Theme') === Theme.DARK) {
        themeShow.classList.add(Theme.DARK);

        darkFooter.classList.add('footer-dark')

        changeTheme.checked = true;
        themeShow.classList.remove(Theme.LIGHT);
        darkFooter.classList.remove('footer-light')
    } else {
        localStorage.setItem('Theme', 'light-theme');
        themeShow.classList.add(Theme.LIGHT);
    }
}

function savedChangeTheme(e) {
    console.log(e);
    if (e.target.checked) {

        console.log(e.target);
        themeShow.classList.add(Theme.DARK);
        themeShow.classList.remove(Theme.LIGHT);
        localStorage.setItem('Theme', 'dark-theme');
    } else if (!e.target.checked) {
        themeShow.classList.add(Theme.LIGHT);
        themeShow.classList.remove(Theme.DARK);
        localStorage.setItem('Theme', 'light-theme');
    }
}