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
const transactionsSectionCardsCarouselWrapper = document.querySelector('.cards-carousel-wrapper');
const transactionsSectionCardsOverlay = document.querySelector('.transactions .modal-overlay');
const transactionsSectionCardsCloseBtn = document.querySelector('.card-form-close-button');
const addCardFormCardHolder = document.getElementById('cardHolder');
const addCardFormCardNumber = document.getElementById('cardNumber');
const addCardFormCVV = document.getElementById('cvv');
const addCardFormExpDate = document.getElementById('expiryDate');
const transactionsSectionCardsAddBtn = document.querySelector('.card-form-button');



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
    el.classList.remove('opacity-zero', 'z-index-min');
    el.classList.add('opacity-one', 'z-index-plus');
};

const hideElement = (el) => {
    el.classList.add('opacity-zero', 'z-index-min');
    el.classList.remove('opacity-one', 'z-index-plus');
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

const validatePin = (pin, input) => {
    const pinString = String(pin);
    if (pinString.length >= 4 && /^\d+$/.test(pinString)) {
        return true;
    } else {
        showError(input, 'PIN must consist of at least four digits and only digits.');
        return false;
    }
};

const validateFullname = (fullname) => {
    const words = fullname.trim().split(/\s+/);
    if (words.length < 2) {
        showError(inputSignupFullname, 'Fullname must contain more than two words.');
        return false;
    }
    for (const word of words) {
        if (!/^[A-ZА-Я][a-zа-я]*$/.test(word)) {
            showError(inputSignupFullname, 'Fullname must consist of only a letter and each word begins with a capital letter.');
            return false;
        }
    }
    return true;
};

const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-zА-Яа-яЁё]+$/;
    if (!usernameRegex.test(username)) {
        showError(inputLoginUsername, 'Username must consist of the first letters of full name.');
        return false;
    }
    return true;
};

const validateNotEmpty = (inputElement) => {
    if (inputElement.value.trim() === '') {
        showError(inputElement, 'Field is empty.');
        return false;
    } else {
        return true;
    }
};

const addUser = (fullname, pin) => {
    const newUser = {
        username: createUsername(fullname),
        movements: [],
        pin: pin,
    };

    if (!Users.has(fullname)) {
        Users.set(fullname, newUser);
        console.log(`Account for ${fullname} has been added.`);
        clearInput(inputSignupFullname);
        clearInput(inputSignupPin);
        currentAccount = newUser;
    } else {
        console.log(`Account for ${fullname} already exists.`);
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
    erText.style.fontSize = '16px';
    erText.style.color = '#f8d7da';
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
    removeErValText(inputSignupPin);
    removeErValText(inputSignupFullname);
    const fullname = inputSignupFullname.value;
    const pin = inputSignupPin.value;
    if (validateNotEmpty(inputSignupFullname)) {
        if (validateFullname(fullname) && validateNotEmpty(inputSignupPin)) {
            if (validatePin(pin, inputSignupPin)) {
                addUser(fullname, pin);

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
    const username = inputLoginUsername.value;
    const pin = inputLoginPin.value;
    const user = findUserByUsername(username);
    if (validateNotEmpty(inputLoginUsername)) {
        if (validateUsername(username) && validateNotEmpty(inputLoginPin)) {
            if (validatePin(pin, inputLoginPin)) {
                if (user && findPinForUser(user, pin)) {
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
});


const checkForCards = () => {
    if (currentAccount) {
        if (!currentAccount.cards || currentAccount.cards.length === 0) {
            const noCardsMessage = document.createElement('p');
            noCardsMessage.textContent = 'No cards available';
            transactionsSection.appendChild(noCardsMessage);
        } else {
            updateUICards();
        }
    }
};

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
    if (currentAccount) {
        const welcomeMessage = `Welcome, ${currentAccount.fullname}!`;
        const welcomeElement = document.createElement('p');
        welcomeElement.textContent = welcomeMessage;
        welcomeElement.style.fontWeight = 'bold';
        transactionsSectionHeader.appendChild(welcomeElement);
    }
};

const updateUI = () => {
    if (currentAccount) {
        checkForCards();

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
        console.log(`Карта добавлена для ${currentAccount.fullname}`);
        updateUICards();  // Обновляем отображение карт
    } else {
        console.log("Нет активного аккаунта для добавления карты.");
    }
};


const updateUICards = () => {
    transactionsSectionCardsCarouselWrapper.innerHTML = '';  // Очищаем существующие карточные элементы

    if (currentAccount && currentAccount.cards.length > 0) {
        currentAccount.cards.forEach((card, i) => {
            const cardElement = document.createElement('div');

            const cardPos = document.createElement('p');
            cardPos.textContent = `Card ${i+1}`;
            cardElement.appendChild(cardPos);
            const cardNumber = document.createElement('p');
            cardNumber.textContent = ` **** **** **** ${String(card[0]).slice(-4)}`;
            cardElement.appendChild(cardNumber);
            const cardExpiry = document.createElement('p');
            cardExpiry.textContent = `${card[1]}`;
            cardElement.appendChild(cardExpiry);
            const cardBalance = document.createElement('p');
            cardBalance.textContent = `${card[4]}$`;
            cardElement.appendChild(cardBalance);

            const cardImg = document.createElement('img');
            cardImg.src = '../assets/img/card-template.png'
            cardElement.appendChild(cardImg);

            cardElement.classList.add('card-element')

            transactionsSectionCardsCarouselWrapper.appendChild(cardElement);
        });
    } else {
        const noCardsMessage = document.createElement('p');
        noCardsMessage.textContent = 'No cards available';
        transactionsSectionCardsCarouselWrapper.appendChild(noCardsMessage);
    }

    createAddCardButton();
};

let currentSlideIndex = 0;

function moveSlide(direction) {
    const totalSlides = document.querySelectorAll('.card-element').length;

    // Обновляем индекс слайда в зависимости от направления
    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1; // Перемещаемся к последнему слайду, если достигнут первый
    } else if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0; // Перемещаемся к первому слайду, если достигнут последний
    }

    // Перемещаем карусель на соответствующий слайд
    transactionsSectionCardsCarouselWrapper.style.transform = `translateX(-${currentSlideIndex * 128}%)`;
}

const handleAddCardFormSubmit = () => {
    const cardNumber = addCardFormCardNumber.value;
    const expiryDate = addCardFormExpDate.value;
    const cvv = addCardFormCVV.value;
    const cardHolder = addCardFormCardHolder.value;
    const balance = 200;

    addCardToCurrentAccount(cardNumber, expiryDate, cvv, cardHolder, balance);
    hideElement(transactionsSectionCardsOverlay);
    clearInput(addCardFormExpDate);
    clearInput(addCardFormCardNumber);
    clearInput(addCardFormCVV);
    clearInput(addCardFormCardHolder);
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

