function initThemeToggle() {
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeButton.textContent = 'Light Mode';
    } else {
        themeButton.textContent = 'Dark Mode';
    }

    themeButton.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeButton.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    });
}

function initDateTime() {
    const dateRadio = document.getElementById('date-radio');
    const button = document.getElementById('date-time-button');
    const output = document.getElementById('date-time-output');

    button.addEventListener('click', () => {
        const now = new Date();
        if (dateRadio.checked) {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            output.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
        } else {
            output.textContent = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    if (document.getElementById('date-time-button')) {
        initDateTime();
    }
});