const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
}

const changeTheme = document.querySelector('#theme-switch-toggle');

changeTheme.addEventListener('change', savedChangeTheme);
const themeShow = document.querySelector('body');


const darkFooter = document.querySelector('.footer');


if (localStorage.getItem('Theme') === 'dark-theme') {
    themeShow.classList.add(Theme.DARK);
    darkFooter.classList.add('footer-dark');
    changeTheme.checked = true;
}


function defaultTheme() {
    if (localStorage.getItem('Theme') === Theme.DARK) {
        themeShow.classList.add(Theme.DARK);

        changeTheme.checked = true;
        themeShow.classList.remove(Theme.LIGHT);
        darkFooter.classList.remove('footer-light')
    } else {
        localStorage.setItem('Theme', 'light-theme');
        themeShow.classList.add(Theme.LIGHT);
    }
}

function savedChangeTheme(e) {
    if (e.target.checked) {
        themeShow.classList.add(Theme.DARK);
        darkFooter.classList.add('footer-dark');
        darkFooter.classList.remove('footer-light')

        themeShow.classList.remove(Theme.LIGHT);
        localStorage.setItem('Theme', 'dark-theme');
    } else if (!e.target.checked) {
        themeShow.classList.add(Theme.LIGHT);
        themeShow.classList.remove(Theme.DARK);
        darkFooter.classList.remove('footer-dark')
        darkFooter.classList.add('footer-light')
        localStorage.setItem('Theme', 'light-theme');
    }
}