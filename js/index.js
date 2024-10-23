const navTitle = document.querySelector(".nav-title");
const navList = document.querySelector(".nav-list");

// Открываем меню при клике на заголовок
navTitle.addEventListener('click', (event) => {
    event.stopPropagation(); // Останавливаем распространение события
    navTitle.style.opacity = 0;
    navList.classList.add("show-nav");
});

// Закрываем меню при клике вне меню
document.addEventListener('click', () => {
    navTitle.style.opacity = 1;
    navList.classList.remove("show-nav");
});

// Чтобы предотвратить закрытие меню при клике внутри него
navList.addEventListener('click', (event) => {
    event.stopPropagation(); // Останавливаем клик внутри меню от распространения
});
