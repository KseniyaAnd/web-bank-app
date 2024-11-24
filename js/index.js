'use strict';

let Users = new Map([
    ['Jonas Schmedtmann', {
        username: 'JS',
        pin: 1111,
        cards: [
            {
                cardNumber: '5531 8796 4321 8765',
                expiryDate: '02/27',
                cvv: '346',
                cardHolder: 'Jonas Schmedtmann',
                balance: 200,
                movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
                movementsDates: [
                    '2019-11-18T21:31:17.178Z',
                    '2019-12-23T07:42:02.383Z',
                    '2020-01-28T09:15:04.904Z',
                    '2020-04-01T10:17:24.185Z',
                    '2020-05-08T14:11:59.604Z',
                    '2024-11-20T17:01:17.194Z',
                    '2024-11-23T18:49:59.371Z',
                    '2024-11-24T12:01:20.894Z',
                ]
            },
            {
                cardNumber: '4276 1234 5678 9102',
                expiryDate: '05/27',
                cvv: '246',
                cardHolder: 'Jonas Schmedtmann',
                balance: 500,
                movements: [-200, 350, -400, 3000, -650, -130, 70, 1300],
                movementsDates: [
                    '2019-11-18T21:31:17.178Z',
                    '2019-12-23T07:42:02.383Z',
                    '2020-01-28T09:15:04.904Z',
                    '2020-04-01T10:17:24.185Z',
                    '2020-05-08T14:11:59.604Z',
                    '2024-07-26T17:01:17.194Z',
                    '2024-08-22T18:49:59.371Z',
                    '2024-08-24T12:01:20.894Z',
                ]
            }
        ],
        currency: 'EUR',
        locale: 'pt-PT',
    }],
    ['Jessica Davis', {
        username: 'JD',
        pin: 2222,
        cards: [
            {
                cardNumber: '5398 7643 2109 8765',
                expiryDate: '03/33',
                cvv: '563',
                cardHolder: 'Jessica Davis',
                balance: 332,
                movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
                movementsDates: [
                    '2019-11-18T21:31:17.178Z',
                    '2019-12-23T07:42:02.383Z',
                    '2020-01-28T09:15:04.904Z',
                    '2020-04-01T10:17:24.185Z',
                    '2020-05-08T14:11:59.604Z',
                    '2024-07-26T17:01:17.194Z',
                    '2024-08-22T18:49:59.371Z',
                    '2024-08-24T12:01:20.894Z',
                ]
            }
        ],
        currency: 'USD',
        locale: 'en-US',
    }],
    ['Steven Thomas Williams', {
        username: 'STW',
        pin: 3333,
        cards: [
            {
                cardNumber: '6011 3456 7890 1234',
                expiryDate: '09/31',
                cvv: '212',
                cardHolder: 'Steven Thomas Williams',
                balance: 621,
                movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
                movementsDates: [
                    '2019-11-18T21:31:17.178Z',
                    '2019-12-23T07:42:02.383Z',
                    '2020-01-28T09:15:04.904Z',
                    '2020-04-01T10:17:24.185Z',
                    '2020-05-08T14:11:59.604Z',
                    '2024-07-26T17:01:17.194Z',
                    '2024-08-22T18:49:59.371Z',
                    '2024-08-24T12:01:20.894Z',
                ]
            }
        ],
        currency: 'USD',
        locale: 'en-US',
    }]
]);


const header = document.querySelector('.header');
const headerLogoutButton = document.querySelector(".header__logout-button");

// Login Form
const authorizationFormLogin = document.querySelector('.authorization__form-login');
const authorizationFormLoginInputUser = document.querySelector('.authorization__form-login-input--user');
const authorizationFormLoginInputPin = document.querySelector('.authorization__form-login-input--pin');
const authorizationFormLoginButton = document.querySelector(".authorization__form-login-button");
const toggleToSignup = document.querySelector('.authorization__form-toggle-to-signup');

// SignUp Form
const authorizationFormSignup = document.querySelector('.authorization__form-signup');
const authorizationFormSignupInputFullname = document.querySelector('.authorization__form-signup-input--fullname');
const authorizationFormSignupInputPin = document.querySelector('.authorization__form-signup-input--pin');
const authorizationFormSignupButton = document.querySelector(".authorization__form-signup-button");
const toggleToLogin = document.querySelector('.authorization__form-toggle-to-login');

// Transactions Header
const transactionsSectionHeaderWelcomeTimer = document.querySelector('.transactions-header__welcome-timer');
const transactionsSectionHeaderDate = document.querySelector('.transactions-header__date');

// Transactions
const transactions = document.querySelector('.transactions');

// Transactions: Movements
const transactionsMainMovements = document.querySelector('.transactions-main__movements');

// Transactions: Cards
const transactionsMainCards = document.querySelector('.transactions-main__cards');
const transactionsMainCardsCarouselContainer = document.querySelector('.transactions-main__cards-carousel-container');
const transactionsMainCardsCarouselArrows = document.querySelectorAll('.transactions-main__cards-carousel-arrow');
const transactionsMainCardsCarouselArrowLeft = document.querySelector('.transactions-main__cards-carousel-arrow-left');
const transactionsMainCardsCarouselArrowRight = document.querySelector('.transactions-main__cards-carousel-arrow-right');

// Transactions: Add Card Form
const transactionsMainAddCardModalOverlay = document.querySelector('.transactions_main__add-card-modal-overlay');
const transactionsMainAddCardFormInputCardHolder = document.getElementById('cardHolder');
const transactionsMainAddCardFormInputCardNumber = document.getElementById('cardNumber');
const transactionsMainAddCardFormInputCVV = document.getElementById('cvv');
const transactionsMainAddCardFormInputExpiryDate = document.getElementById('expiryDate');
const transactionsMainAddCardFormAddCardButton = document.querySelector('.transactions-main__add-card-form-add-card-button');
const transactionsMainAddCardFormCloseButton = document.querySelector('.transactions-main__add-card-form-close-button');

// Transactions: Transfer to
const transactionsMainOperationFormInputTo = document.querySelector('.transactions-main__operation-form-input--to');
const transactionsMainOperationFormInputAmount = document.querySelector('.transactions-main__operation-form-input--amount');
const transactionsMainOperationFormButtonTransfer = document.querySelector('.transactions-main__operation-form-button--transfer');

// Transactions: Close account
const transactionsMainOperationFormInputUser = document.querySelector('.transactions-main__operation-form-input--user');
const transactionsMainOperationFormInputPin = document.querySelector('.transactions-main__operation-form-input--pin');
const transactionsMainOperationFormButtonClose = document.querySelector('.transactions-main__operation-form-button--close');


let labelTimer = document.querySelector('.timer');
let currentAccount, timer;

const clearInputs = (...inputs) => {
    inputs.forEach(input => input.value = '');
};

const toggleFormsVisibility = (activeForm, inactiveForm, usernameInput, pinInput) => {
    hideElement(inactiveForm);
    showElement(activeForm);

    clearInputs(
        usernameInput,
        pinInput
    );
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
        showError(inputElement, 'The PIN must be a minimum of four digits and numbers only.');
        return false;
    }
};

const validateFullname = (inputElement) => {
    removeErValText(inputElement);
    const fullname = inputElement.value;
    const words = fullname.trim().split(/\s+/);
    if (words.length < 2) {
        showError(inputElement, 'The full name must contain more than two words.');
        return false;
    }
    for (const word of words) {
        if (!/^[A-ZА-Я][a-zа-я]*$/.test(word)) {
            showError(inputElement, 'The full name must consist of letters, and each word must begin with a capital letter.');
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
        showError(inputElement, 'The username must consist of the first letters of the full name.');
        return false;
    }
    return true;
};

const validateNotEmpty = (inputElement) => {
    removeErValText(inputElement);
    if (inputElement.value.trim() === '') {
        showError(inputElement, 'The field cannot be empty.');
        return false;
    } else {
        return true;
    }
};

const validateCardNumber = (inputElement) => {
    removeErValText(inputElement);
    const cardNumber = inputElement.value.replace(/\s/g, '');
    const regex = /^\d{16}$/;
    if (!regex.test(cardNumber)) {
        showError(inputElement, 'The card number must consist of 16 digits.');
        return false;
    }
    return true;
};

const validateExpiryDate = (inputElement) => {
    removeErValText(inputElement);
    const expiryDate = inputElement.value;
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(expiryDate)) {
        showError(inputElement, 'The card expiration date must be in MM/YY format.');
        return false;
    }

    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        showError(inputElement, 'The card has already expired.');
        return false;
    }
    return true;
};

const validateCVV = (inputElement) => {
    removeErValText(inputElement);
    const cvv = inputElement.value;
    const regex = /^\d{3}$/;
    if (!regex.test(cvv)) {
        showError(inputElement, 'CVV must consist of 3 digits.');
        return false;
    }
    return true;
};

const addUser = (fullname, pin) => {
    if (!fullname || !pin) {
        return;
    }

    const username = createUsername(fullname);

    const newUser = {
        fullname: fullname.trim(),
        username: username,
        movements: [],
        pin: Number(pin),
        cards: [],
        currency: 'USD',
        locale: navigator.language,
    };

    if (!Users.has(fullname)) {
        Users.set(fullname, newUser);

        clearInputs(
            authorizationFormSignupInputFullname,
            authorizationFormSignupInputPin
        );

        currentAccount = newUser;
    } else {
        showError(authorizationFormSignupInputFullname, `Account for ${fullname} already exists.`);
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

const findUserByCardNumber = (cardNumber) => {
    let foundUser = null;

    Users.forEach((userData, username) => {
        const card = userData.cards.find(card => card.cardNumber === cardNumber);

        if (card) {
            foundUser = {fullname: username, ...userData};
        }
    });

    return foundUser;
};

const findPinForUser = (user, pin) => {
    return user && user.pin === Number(pin);
};

const createUsername = (fullname) => {
    return fullname
        .toUpperCase()
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
toggleFormsVisibility(authorizationFormLogin, authorizationFormSignup, authorizationFormLoginInputUser, authorizationFormLoginInputPin);

toggleToLogin.addEventListener('click', () => {
    toggleFormsVisibility(authorizationFormLogin, authorizationFormSignup, authorizationFormLoginInputUser, authorizationFormLoginInputPin);
});

toggleToSignup.addEventListener('click', () => {
   toggleFormsVisibility(authorizationFormSignup, authorizationFormLogin, authorizationFormSignupInputFullname, authorizationFormSignupInputPin);
});

authorizationFormSignupButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateNotEmpty(authorizationFormSignupInputFullname)) {
        if (validateFullname(authorizationFormSignupInputFullname) && validateNotEmpty(authorizationFormSignupInputPin)) {
            if (validatePin(authorizationFormSignupInputPin)) {
                addUser(authorizationFormSignupInputFullname.value, authorizationFormSignupInputPin.value);

                updateUI();
                hideElement(authorizationFormSignup);
                showElement(transactions);
                toggleHeader();

                if (timer) clearInterval(timer);
                timer = startLogOutTimer();
            }
        }
    }
});

authorizationFormLoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeErValText(authorizationFormLoginInputPin);
    removeErValText(authorizationFormLoginInputUser);
    const user = findUserByUsername(authorizationFormLoginInputUser.value);

    if (validateNotEmpty(authorizationFormLoginInputUser)) {
        if (validateUsername(authorizationFormLoginInputUser) && validateNotEmpty(authorizationFormLoginInputPin)) {
            if (validatePin(authorizationFormLoginInputPin)) {
                if (user && findPinForUser(user, authorizationFormLoginInputPin.value)) {
                    currentAccount = user;
                    clearInputs(
                        authorizationFormLoginInputUser, authorizationFormLoginInputPin
                    );
                    hideElement(authorizationFormLogin);
                    toggleHeader();
                    showElement(transactions);
                    updateUI();

                    if (timer) clearInterval(timer);
                    timer = startLogOutTimer();

                } else {
                    showError(authorizationFormLoginInputUser, 'Wrong username or PIN.');
                }
            }
        }
    }
});

headerLogoutButton.addEventListener('click', (e) => {
    e.preventDefault();

    clearInterval(timer);
    currentAccount = undefined;
    toggleHeader();
    showElement(authorizationFormLogin);
    hideElement(transactions)

    currentSlideIndex = 0
    moveSlide(0);
});

const displayDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    const dateText = `Date: ${day}.${month}.${year}`;
    transactionsSectionHeaderDate.innerHTML = `<p style="width: 100%; color: white">
        ${dateText}
    </p>`
}
;

const displayWelcomeMessage = () => {
    transactionsSectionHeaderWelcomeTimer.innerHTML = `
        <p style="flex: 1"> Welcome, ${currentAccount.fullname}! </p>
        <p class="logout-timer">
            You will be logged out in <span class="timer">05:00</span>
        </p>
    `

    labelTimer = document.querySelector('.timer');
};

const updateUI = () => {
    if (currentAccount) {
        updateUICards();


        showElement(transactions);
        displayWelcomeMessage();
        displayDate();

        displayMovements(currentAccount);
    }
};

transactionsMainAddCardFormCloseButton.addEventListener("click", () => {
    hideElement(transactionsMainAddCardModalOverlay)
    clearInputs(
        transactionsMainAddCardFormInputExpiryDate,
        transactionsMainAddCardFormInputCardNumber,
        transactionsMainAddCardFormInputCVV,
        transactionsMainAddCardFormInputCardHolder
    )
});

transactionsMainAddCardModalOverlay.addEventListener("click", (e) => {
    if (e.target === transactionsMainAddCardModalOverlay) {
        hideElement(transactionsMainAddCardModalOverlay);
        clearInputs(
            transactionsMainAddCardFormInputExpiryDate,
            transactionsMainAddCardFormInputCardNumber,
            transactionsMainAddCardFormInputCVV,
            transactionsMainAddCardFormInputCardHolder
        )
    }
});

const addCardToCurrentAccount = (cardNumber, expiryDate, cvv, cardHolder, balance) => {
    if (!currentAccount) return;

    const newCard = {
        cardNumber,
        expiryDate,
        cvv,
        cardHolder,
        balance: balance,
        movements: [],
        movementsDates: []
    };

    const accountData = Users.get(currentAccount.fullname);

    if (accountData) {
        accountData.cards.push(newCard);
        Users.set(currentAccount.fullname, accountData);
        updateUI(currentAccount);
    }
};


const updateUICards = () => {
    transactionsMainCardsCarouselContainer.innerHTML = '';

    if (currentAccount && currentAccount.cards?.length > 0) {
        showElement(transactionsMainCardsCarouselArrows);

        currentAccount.cards.forEach((card, i) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('transactions-main__cards-carousel-card-element');
            cardElement.innerHTML = `
                <p>Card ${i + 1}</p>
                <p>**** **** **** ${String(card.cardNumber).slice(-4)}</p>
                <p>${card.expiryDate}</p>
                <p>${card.balance}$</p>
                <img src="../assets/img/card-template.png" alt="Card Image">
            `;
            transactionsMainCardsCarouselContainer.appendChild(cardElement);
        });
    } else {
        hideElement(transactionsMainCardsCarouselArrows);
        transactionsMainCardsCarouselContainer.innerHTML = '<p style="height: 150px; width: 100%; text-align: center;">No cards available</p>';
    }

    createAddCardButton();
};


let currentSlideIndex = 0;


transactionsMainAddCardFormInputCardNumber.addEventListener('input', (event) => {
    let input = event.target.value.replace(/\s+/g, '');
    if (isNaN(input)) {
        input = input.slice(0, -1);
    }

    event.target.value = input.replace(/(\d{4})(?=\d)/g, '$1 ');
});


const handleAddCardFormSubmit = () => {
    if (validateNotEmpty(transactionsMainAddCardFormInputCardHolder) && validateFullname(transactionsMainAddCardFormInputCardHolder)) {
        if (validateNotEmpty(transactionsMainAddCardFormInputCardNumber) && validateCardNumber(transactionsMainAddCardFormInputCardNumber)) {
            if (validateNotEmpty(transactionsMainAddCardFormInputCVV) && validateCVV(transactionsMainAddCardFormInputCVV)) {
                if (validateNotEmpty(transactionsMainAddCardFormInputExpiryDate) && validateExpiryDate(transactionsMainAddCardFormInputExpiryDate)) {
                    addCardToCurrentAccount(transactionsMainAddCardFormInputCardNumber.value, transactionsMainAddCardFormInputExpiryDate.value, transactionsMainAddCardFormInputCVV.value, transactionsMainAddCardFormInputCardHolder.value, 200);
                    hideElement(transactionsMainAddCardModalOverlay);
                    clearInputs(
                        transactionsMainAddCardFormInputExpiryDate,
                        transactionsMainAddCardFormInputCardNumber,
                        transactionsMainAddCardFormInputCVV,
                        transactionsMainAddCardFormInputCardHolder
                    )
                }
            }
        }
    }
};

function formatExpDate(input) {
    let value = input.value.replace(/\D/g, ''); // Убираем все нецифровые символы
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4); // Добавляем слэш после первых двух цифр
    }
    input.value = value; // Обновляем значение в поле ввода
}

transactionsMainAddCardFormInputExpiryDate.addEventListener('input', () => {
    formatExpDate(transactionsMainAddCardFormInputExpiryDate);
});

transactionsMainAddCardFormAddCardButton.addEventListener('click', (e) => {
    e.preventDefault();
    handleAddCardFormSubmit();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
});

const createAddCardButton = () => {
    const existingButton = transactionsMainCards.querySelector(".transactions-main__cards-button");
    if (existingButton) {
        transactionsMainCards.removeChild(existingButton);
    }


    const button = document.createElement('button');
    button.classList.add("transactions-main__cards-button");
    button.addEventListener('click', () => {
        showElement(transactionsMainAddCardModalOverlay);
    });

    button.textContent = 'Add card';
    transactionsMainCards.appendChild(button);
};

const formatMovementDate = (date, locale) => {
    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, curr) => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: curr,
    }).format(value);
};

const displayMovements = (account) => {
    transactionsMainMovements.innerHTML = '';

    if (account?.cards.length === 0) {
        const emptyMessage = `
                <div class="movement__row-nomov">
                    <p>No movements available</p>
                </div>
            `;
        transactionsMainMovements.insertAdjacentHTML('beforeend', emptyMessage);
    }


    account?.cards.forEach((card, index) => {
        if (index === currentSlideIndex) {
            const {movements, movementsDates} = card;

            if (movements?.length === 0) {
                const emptyMessage = `
                <div class="transactions-main__movements-row--no-movements">
                    <p>No movements available</p>
                </div>
            `;
                transactionsMainMovements.insertAdjacentHTML('beforeend', emptyMessage);
                return;
            }

            movements
                ?.slice()
                .reverse()
                .forEach((movement, i) => {
                const movementDate = new Date(movementsDates[movements.length - 1 - i]);
                const formattedDate = formatMovementDate(movementDate, currentAccount.locale);
                const formattedMov = formatCur(movement, currentAccount.locale, currentAccount.currency);
                const movementType = movement > 0 ? 'deposit' : 'withdrawal';

                const movementRow = `
                    <div class="transactions-main__movements-row">
                        <div class="transactions-main__movements-row-type transactions-main__movements-row-type--${movementType}">
                            ${movementType.toUpperCase()} 
                        </div>
                        <div class="transactions-main__movements-row-date">${formattedDate}</div>
                        <div class="transactions-main__movements-row-value">${formattedMov}</div>
                    </div>
            `;
                transactionsMainMovements.insertAdjacentHTML('beforeend', movementRow);
            });
        }

    });
};

function moveSlide(direction) {
    const totalSlides = document.querySelectorAll('.transactions-main__cards-carousel-card-element').length;

    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    } else if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    }

    transactionsMainCardsCarouselContainer.style.transform = `translateX(-${currentSlideIndex * 128}%)`;
    displayMovements(currentAccount);
}


transactionsMainOperationFormButtonTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    removeErValText(transactionsMainOperationFormInputAmount);
    removeErValText(transactionsMainOperationFormInputTo);
    const amount = Number(transactionsMainOperationFormInputAmount.value);
    const receiverUser = findUserByCardNumber(transactionsMainOperationFormInputTo.value)
    const receiverCard = findCardByUserAndNumber(receiverUser?.fullname, transactionsMainOperationFormInputTo.value)

    if (validateNotEmpty(transactionsMainOperationFormInputTo)) {
        if (validateNotEmpty(transactionsMainOperationFormInputAmount)) {
            if (receiverUser) {
                if (validateCardNumber(transactionsMainOperationFormInputTo)) {
                    if (amount > 0) {
                        if (currentAccount.cards[currentSlideIndex].balance >= amount) {
                            if (currentAccount.cards[currentSlideIndex].cardNumber !== transactionsMainOperationFormInputTo.value) {
                                currentAccount.cards[currentSlideIndex].movements.push(-amount);
                                currentAccount.cards[currentSlideIndex].movementsDates.push(new Date().toISOString());
                                currentAccount.cards[currentSlideIndex].balance -= amount;
                                receiverCard.movements.push(amount);
                                receiverCard.movementsDates.push(new Date().toISOString());
                                receiverCard.balance += amount;
                                transactionsMainOperationFormInputAmount.value = transactionsMainOperationFormInputTo.value = '';

                                updateUICards()
                                updateUI(currentAccount);

                                if (timer) clearInterval(timer);
                                timer = startLogOutTimer();
                            } else {
                                showError(transactionsMainOperationFormInputAmount, 'You can not trasfer to trasfering card.');
                            }
                        } else {
                            showError(transactionsMainOperationFormInputAmount, 'No enough money.');
                        }
                    } else {
                        showError(transactionsMainOperationFormInputAmount, 'Wrong amount.');
                    }
                }
            } else {
                showError(transactionsMainOperationFormInputAmount, 'This card does not exist.');
            }
        }
    }
});

const findCardByUserAndNumber = (username, cardNumber) => {
    const user = Users.get(username);

    if (!user) {
        return null;
    }

    const card = user.cards.find(card => card.cardNumber === cardNumber);

    if (!card) {
        return null;
    }

    return card;
};


transactionsMainOperationFormButtonClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
        transactionsMainOperationFormInputUser.value === currentAccount.username &&
        Number(transactionsMainOperationFormInputPin.value) === currentAccount.pin
    ) {
        Users.delete(currentAccount.fullname);
        currentAccount = undefined;
        toggleHeader();
        showElement(authorizationFormLogin);
        hideElement(transactions)

        if (timer) clearInterval(timer);
        transactionsMainOperationFormInputUser.value = transactionsMainOperationFormInputPin.value = '';

    }
});

transactionsMainOperationFormInputTo.addEventListener('input', (event) => {
    let input = event.target.value.replace(/\s+/g, '');
    if (isNaN(input)) {
        input = input.slice(0, -1);
    }

    event.target.value = input.replace(/(\d{4})(?=\d)/g, '$1 ');
});

const startLogOutTimer = () => {
    const tick = () => {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);

        labelTimer.textContent = `${min}:${sec}`;

        if (time === 0) {
            clearInterval(timer);

            currentAccount = undefined;
            toggleHeader();
            showElement(authorizationFormLogin);
            hideElement(transactions)
        }

        time--;
    };

    let time = 600;

    tick();
    const timer = setInterval(tick, 1000);

    return timer;
};

transactionsMainCardsCarouselArrowLeft.addEventListener ('click', () => moveSlide(-1));
transactionsMainCardsCarouselArrowRight.addEventListener ('click', () => moveSlide(1));

