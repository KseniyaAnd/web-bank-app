'use strict';

let Users = new Map([
    ['Jonas Schmedtmann', {
        username: 'JS',
        movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
        pin: 1111,
        cards: [
            [5531_8796_4321_8765, '02/27', '346', 'Jonas Schmedtmann', 200],
            [4276_1234_5678_9102, '05/27', '246', 'Jonas Schmedtmann', 500]
        ]
    }],
    ['Jessica Davis', {
        username: 'JD',
        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
        pin: 2222,
        cards: [
            [5398_7643_2109_8765, '03/33', '563', 'Jessica Davis', 332]
        ]
    }],
    ['Steven Thomas Williams', {
        username: 'STW',
        movements: [200, -200, 340, -300, -20, 50, 400, -460],
        pin: 3333,
        cards: [
            [6011_3456_7890_1234, '09/31', '212', 'Steven Thomas Williams', 621]
        ]
    }]
]);

const header = document.querySelector('.header');
const loginForm = document.querySelector('.login');
const signupForm = document.querySelector('.signup');
const loginLink = document.querySelector('.login-link');
const signupLink = document.querySelector('.signup-link');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputSignupFullname = document.querySelector('.signup__input--fullname');
const inputSignupPin = document.querySelector('.signup__input--pin');
const signupBtn = document.querySelector(".signup-btn");
const loginBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout-btn");
const transactionsSection = document.querySelector('.transactions');
const transactionsSectionHeader = document.querySelector('.transactions-header');
const transactionsSectionCards = document.querySelector('.transactions-cards');
const transactionsSectionCardsCarouselContainer = document.querySelector('.cards-carousel-container');
const transactionsSectionCardsCarouselWrapper = document.querySelector('.cards-carousel-wrapper');
const transactionsSectionCardsOverlay = document.querySelector('.transactions .modal-overlay');
const transactionsSectionCardsCloseBtn = document.querySelector('.card-form-close-button');
const addCardFormCardHolder = document.getElementById('cardHolder');
const addCardFormCardNumber = document.getElementById('cardNumber');
const addCardFormCVV = document.getElementById('cvv');
const addCardFormExpDate = document.getElementById('expiryDate');
const transactionsSectionCardsAddBtn = document.querySelector('.card-form-button');
const transactionsSectionCardsCarouselArrow = document.querySelectorAll('.cards-carousel-arrow');


let currentAccount;

const clearInput = (input) => {
    input.value = '';
};

const toggleFormsVisibility = (activeForm, inactiveForm, usernameInput, pinInput) => {
    hideElement(inactiveForm);
    showElement(activeForm);

    clearInput(usernameInput);
    clearInput(pinInput);
};

const showElement = (el) => {
    if (el) {
        const elements = Array.isArray(el) || el instanceof NodeList ? el : [el];
        elements.forEach(e => {
            e.classList.remove('opacity-zero', 'z-index-min');
            e.classList.add('opacity-one', 'z-index-plus');
        });
    }
};


const hideElement = (el) => {
    if (el) {
        const elements = Array.isArray(el) || el instanceof NodeList ? el : [el];
        elements.forEach(e => {
            e.classList.add('opacity-zero', 'z-index-min');
            e.classList.remove('opacity-one', 'z-index-plus');
        });
    }
};


const toggleHeader = () => {
    if (currentAccount) {
        header.classList.add('opacity-one');
        header.classList.remove('opacity-zero');
    } else {
        header.classList.add('opacity-zero');
        header.classList.remove('opacity-one');
    }
};

const validatePin = (inputElement) => {
    removeErValText(inputElement);
    const pin = inputElement.value;
    if (pin.length >= 4 && /^\d+$/.test(pin)) {
        return true;
    } else {
        showError(inputElement, 'PIN должен состоять минимум из четырех цифр и только из цифр.');
        return false;
    }
};

const validateFullname = (inputElement) => {
    removeErValText(inputElement);
    const fullname = inputElement.value.trim();
    const words = fullname.split(/\s+/);
    if (words.length < 2) {
        showError(inputElement, 'Полное имя должно содержать больше двух слов.');
        return false;
    }
    for (const word of words) {
        if (!/^[A-ZА-Я][a-zа-я]*$/.test(word)) {
            showError(inputElement, 'Полное имя должно состоять из букв, и каждое слово должно начинаться с заглавной буквы.');
            return false;
        }
    }
    return true;
};

const validateUsername = (inputElement) => {
    removeErValText(inputElement);
    const username = inputElement.value;
    const usernameRegex = /^[A-Za-zА-Яа-яЁё]+$/;
    if (!usernameRegex.test(username)) {
        showError(inputElement, 'Имя пользователя должно состоять из первых букв полного имени.');
        return false;
    }
    return true;
};

const validateNotEmpty = (inputElement) => {
    removeErValText(inputElement);
    if (inputElement.value.trim() === '') {
        showError(inputElement, 'Поле не может быть пустым.');
        return false;
    } else {
        return true;
    }
};

const validateCardNumber = (inputElement) => {
    removeErValText(inputElement);
    const cardNumber = inputElement.value.replace(/\s/g, ''); // Удаляем пробелы
    const regex = /^\d{16}$/;
    if (!regex.test(cardNumber)) {
        showError(inputElement, 'Номер карты должен состоять из 16 цифр.');
        return false;
    }
    return true;
};

const validateExpiryDate = (inputElement) => {
    removeErValText(inputElement);
    const expiryDate = inputElement.value;
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiryDate)) {
        showError(inputElement, 'Срок действия карты должен быть в формате MM/YY.');
        return false;
    }

    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        showError(inputElement, 'Срок действия карты уже истек.');
        return false;
    }
    return true;
};

const validateCVV = (inputElement) => {
    removeErValText(inputElement);
    const cvv = inputElement.value;
    const regex = /^\d{3}$/;
    if (!regex.test(cvv)) {
        showError(inputElement, 'CVV должен состоять из 3 цифр.');
        return false;
    }
    return true;
};



const addUser = (fullname, pin) => {
    if (!validateFullname(fullname) || !validatePin(pin, inputSignupPin)) {
        return; // Прекращаем выполнение, если полное имя или PIN не валидны
    }

    const username = createUsername(fullname);
    const newUser = {
        fullname: fullname, // Добавляем full name
        username: username,
        movements: [],
        pin: Number(pin),
        cards: []  // Добавляем пустой массив карт
    };

    if (!Users.has(fullname)) {
        Users.set(fullname, newUser);
        console.log(`Account for ${fullname} has been added.`);
        clearInput(inputSignupFullname);
        clearInput(inputSignupPin);
        currentAccount = newUser;
    } else {
        showError(inputSignupFullname, `Account for ${fullname} already exists.`);
    }
};


const findUserByUsername = (username) => {
    let foundUser = null;
    Users.forEach((value, key) => {
        if (value.username === username.toUpperCase()) {
            foundUser = {fullname: key, ...value};
        }
    });
    return foundUser;
};

const findPinForUser = (user, pin) => {
    return user && user.pin === Number(pin);
};

const createUsername = (fullname) => {
    return fullname
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
};

const createErValText = (text, referenceElement) => {
    const erText = document.createElement('p');
    erText.classList.add('input-error-text')
    erText.textContent = text;
    referenceElement.after(erText);
};

const removeErValText = (referenceElement) => {
    const nextElement = referenceElement.nextElementSibling;
    if (nextElement && nextElement.tagName === 'P') {
        nextElement.remove();
    }
};

const showError = (input, message) => {
    input.classList.add('input-error');
    createErValText(message, input);
    setTimeout(() => {
        input.classList.remove('input-error');
    }, 1000);
};

toggleHeader();
toggleFormsVisibility(loginForm, signupForm, inputLoginUsername, inputLoginPin);

loginLink.addEventListener('click', () => {
    toggleFormsVisibility(loginForm, signupForm, inputLoginUsername, inputLoginPin);
});

signupLink.addEventListener('click', () => {
    toggleFormsVisibility(signupForm, loginForm, inputSignupFullname, inputSignupPin);
});

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateNotEmpty(inputSignupFullname)) {
        if (validateFullname(inputSignupFullname) && validateNotEmpty(inputSignupPin)) {
            if (validatePin(inputSignupPin)) {
                addUser(inputSignupFullname.value, inputSignupPin.value);

                updateUI();
                hideElement(signupForm);
                showElement(transactionsSection);
                toggleHeader();
            }
        }
    }
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    removeErValText(inputLoginPin);
    removeErValText(inputLoginUsername);
    const user = findUserByUsername(inputLoginUsername.value);

    if (validateNotEmpty(inputLoginUsername)) {
        if (validateUsername(inputLoginUsername) && validateNotEmpty(inputLoginPin)) {
            if (validatePin(inputLoginPin)) {
                if (user && findPinForUser(user, inputLoginPin.value)) {
                    currentAccount = user;
                    clearInput(inputLoginUsername);
                    clearInput(inputLoginPin);
                    hideElement(loginForm);
                    toggleHeader();
                    showElement(transactionsSection);
                    updateUI();
                } else {
                    showError(inputLoginUsername, 'Wrong username or PIN.');
                }
            }
        }
    }
});

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentAccount = undefined;
    toggleHeader();
    showElement(loginForm);
    hideElement(transactionsSection)
});

const displayDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = currentDate.getFullYear();

    const dateText = `Date: ${day}.${month}.${year}`;
    const dateElement = document.createElement('p');
    dateElement.textContent = dateText;
    transactionsSectionHeader.appendChild(dateElement);
};

const displayWelcomeMessage = () => {

    const welcomeMessage = `Welcome, ${currentAccount.fullname}!`;
    const welcomeElement = document.createElement('p');
    welcomeElement.textContent = welcomeMessage;
    welcomeElement.style.fontWeight = 'bold';
    transactionsSectionHeader.appendChild(welcomeElement);
};

const updateUI = () => {
    if (currentAccount) {
        updateUICards();

        showElement(transactionsSection);
        transactionsSectionHeader.innerHTML = '';
        displayWelcomeMessage();
        displayDate();
    }
};

transactionsSectionCardsCloseBtn.addEventListener("click", () => {
    hideElement(transactionsSectionCardsOverlay)
    clearInput(addCardFormExpDate)
    clearInput(addCardFormCardNumber)
    clearInput(addCardFormCVV)
    clearInput(addCardFormCardHolder)
});

transactionsSectionCardsOverlay.addEventListener("click", (e) => {
    if (e.target === transactionsSectionCardsOverlay) {
        hideElement(transactionsSectionCardsOverlay);
        clearInput(addCardFormExpDate);
        clearInput(addCardFormCardNumber);
        clearInput(addCardFormCVV);
        clearInput(addCardFormCardHolder);
    }
});

const addCardToCurrentAccount = (cardNumber, expiryDate, cvv, cardHolder, balance) => {
    if (currentAccount) {
        const newCard = [cardNumber, expiryDate, cvv, cardHolder, balance];
        if (!currentAccount.cards) currentAccount.cards = [];  // Создаем массив карт, если его еще нет
        currentAccount.cards.push(newCard);
        updateUICards();
    }
};


const updateUICards = () => {
    transactionsSectionCardsCarouselWrapper.innerHTML = '';  // Очищаем существующие карточные элементы

    if (currentAccount && currentAccount.cards?.length > 0) {
        showElement(transactionsSectionCardsCarouselArrow);

        currentAccount.cards.forEach((card, i) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card-element');
            cardElement.innerHTML = `
                <p>Card ${i + 1}</p>
                <p>**** **** **** ${String(card[0]).slice(-4)}</p>
                <p>${card[1]}</p>
                <p>${card[4]}$</p>
                <img src="../assets/img/card-template.png" alt="Card Image">
            `;
            transactionsSectionCardsCarouselWrapper.appendChild(cardElement);
        });
    } else {
        hideElement(transactionsSectionCardsCarouselArrow);
        transactionsSectionCardsCarouselWrapper.innerHTML = '<p>No cards available</p>';
    }

    createAddCardButton();
};


let currentSlideIndex = 0;

function moveSlide(direction) {
    const totalSlides = document.querySelectorAll('.card-element').length;

    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1; // Перемещаемся к последнему слайду, если достигнут первый
    } else if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0; // Перемещаемся к первому слайду, если достигнут последний
    }

    transactionsSectionCardsCarouselWrapper.style.transform = `translateX(-${currentSlideIndex * 128}%)`;
}

addCardFormCardNumber.addEventListener('input', (event) => {
    let input = event.target.value.replace(/\s+/g, ''); // Удаляем все пробелы
    if (isNaN(input)) {
        input = input.slice(0, -1); // Удаляем последний символ, если это не цифра
    }

    // Добавляем пробелы после каждых 4 цифр
    event.target.value = input.replace(/(\d{4})(?=\d)/g, '$1 ');
});


const handleAddCardFormSubmit = () => {
    if (validateNotEmpty(addCardFormCardHolder) && validateFullname(addCardFormCardHolder)) {
        if (validateNotEmpty(addCardFormCardNumber) &&  validateCardNumber(addCardFormCardNumber)) {
            if (validateNotEmpty(addCardFormCVV) && validateCVV(addCardFormCVV)) {
                if (validateNotEmpty(addCardFormExpDate) && validateExpiryDate(addCardFormExpDate)) {
                    addCardToCurrentAccount(addCardFormCardNumber.value, addCardFormExpDate.value, addCardFormCVV.value, addCardFormCardHolder.value, 200);
                    hideElement(transactionsSectionCardsOverlay);
                    clearInput(addCardFormExpDate);
                    clearInput(addCardFormCardNumber);
                    clearInput(addCardFormCVV);
                    clearInput(addCardFormCardHolder);
                }
            }
        }
    }
};


transactionsSectionCardsAddBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleAddCardFormSubmit();
});

const createAddCardButton = () => {
    // Удаляем уже существующую кнопку, если она есть
    const existingButton = transactionsSectionCards.querySelector(".button");
    if (existingButton) {
        transactionsSectionCards.removeChild(existingButton);
    }

    // Создаем новую кнопку для добавления карты
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add("button");

    const button = document.createElement('button');
    button.textContent = 'Add card';

    button.addEventListener('click', () => {
        console.log('Кнопка добавления карты нажата');
        showElement(transactionsSectionCardsOverlay);
    });

    buttonDiv.appendChild(button);
    transactionsSectionCards.appendChild(buttonDiv);
};

