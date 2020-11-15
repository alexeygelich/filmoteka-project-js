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
        darkFooter.classList.remove('footer-light');
        document.querySelector('.modal-section').style.backgroundColor = "#252525";
        document.querySelector('.modal-section').style.color = "#818181"


    } else {
        localStorage.setItem('Theme', 'light-theme');
        themeShow.classList.add(Theme.LIGHT);
        // document.querySelector('.modal-section').style.backgroundColor = "#fff";

    }
}

function savedChangeTheme(e) {
    if (e.target.checked) {
        themeShow.classList.add(Theme.DARK);
        darkFooter.classList.add('footer-dark');
        darkFooter.classList.remove('footer-light')
        document.querySelector('.modal-section').style.backgroundColor = "#252525";
        document.querySelector('.modal-section').style.color = "#818181"

        themeShow.classList.remove(Theme.LIGHT);
        localStorage.setItem('Theme', 'dark-theme');
    } else if (!e.target.checked) {
        themeShow.classList.add(Theme.LIGHT);
        themeShow.classList.remove(Theme.DARK);
        darkFooter.classList.remove('footer-dark')
        darkFooter.classList.add('footer-light')
        document.querySelector('.modal-section').style.backgroundColor = "#fff";
        document.querySelector('.modal-section').style.color = "#000"

        localStorage.setItem('Theme', 'light-theme');
    }
}