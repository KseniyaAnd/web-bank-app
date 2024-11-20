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
                    '2024-07-26T17:01:17.194Z',
                    '2024-08-22T18:49:59.371Z',
                    '2024-08-24T12:01:20.894Z',
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
const transactionsSectionHeaderWelcomeTimer = document.querySelector('.transactions-header-welcome-timer');
const transactionsSectionHeaderDate = document.querySelector('.transactions-header-date');
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
const transactionsMovments = document.querySelector('.transactions-movements');
const btnOpTransfer = document.querySelector('.form__btn--transfer');
const btnOpClose = document.querySelector('.form__btn--close');

const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let labelTimer = document.querySelector('.timer');


let currentAccount, timer;

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

const findUserByCardNumber = (cardNumber) => {
    let foundUser = null;

    // Проходим по каждому пользователю в Users
    Users.forEach((userData, username) => {
        // Проверяем каждую карту пользователя
        const card = userData.cards.find(card => card.cardNumber === cardNumber);

        if (card) {
            foundUser = {fullname: username, ...userData}; // Если карта найдена, возвращаем пользователя
        }
    });

    return foundUser; // Возвращаем найденного пользователя или null, если не найдено
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

                if (timer) clearInterval(timer);
                timer = startLogOutTimer();
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

                    if (timer) clearInterval(timer);
                    timer = startLogOutTimer();

                } else {
                    showError(inputLoginUsername, 'Wrong username or PIN.');
                }
            }
        }
    }
});

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    clearInterval(timer);
    currentAccount = undefined;
    toggleHeader();
    showElement(loginForm);
    hideElement(transactionsSection)

    currentSlideIndex = 0
    moveSlide(0);
});

const displayDate = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
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
        displayMovements(currentAccount);

        showElement(transactionsSection);
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

    // Обновляем карты текущего пользователя в Map
    const accountData = Users.get(currentAccount.fullname);

    if (accountData) {
        accountData.cards.push(newCard);
        Users.set(currentAccount.fullname, accountData); // Сохраняем изменения
        console.log('Card added:', newCard);
        updateUI(currentAccount); // Обновляем интерфейс
    } else {
        console.error('Current account not found in Users map.');
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
                <p>**** **** **** ${String(card.cardNumber).slice(-4)}</p>
                <p>${card.expiryDate}</p>
                <p>${card.balance}$</p>
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
    displayMovements(currentAccount);
}

addCardFormCardNumber.addEventListener('input', (event) => {
    let input = event.target.value.replace(/\s+/g, '');
    if (isNaN(input)) {
        input = input.slice(0, -1);
    }

    event.target.value = input.replace(/(\d{4})(?=\d)/g, '$1 ');
});


const handleAddCardFormSubmit = () => {
    if (validateNotEmpty(addCardFormCardHolder) && validateFullname(addCardFormCardHolder)) {
        if (validateNotEmpty(addCardFormCardNumber) && validateCardNumber(addCardFormCardNumber)) {
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

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
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

const formatMovementDate = (date, locale) => {
    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);
    console.log(daysPassed);

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
    transactionsMovments.innerHTML = ''; // Очищаем существующие транзакции

    // Проверяем наличие карт у пользователя
    account?.cards.forEach((card, index) => {
        if (index == currentSlideIndex) {
            const {movements, movementsDates} = card;
            console.log(card)

            if (movements?.length === 0) {
                const emptyMessage = `
                <div class="movement__row-nomov">
                    <p>No movements available</p>
                </div>
            `;
                transactionsMovments.insertAdjacentHTML('beforeend', emptyMessage);
                return;
            }

            // Перебираем все движения для карты
            movements
                ?.slice() // Создаем копию массива, чтобы не изменить оригинальный
                .reverse()
                .forEach((movement, i) => {
                const movementDate = new Date(movementsDates[movements.length - 1 - i]);
                const formattedDate = `${String(movementDate.getDate()).padStart(2, '0')}.${String(movementDate.getMonth() + 1).padStart(2, '0')}.${movementDate.getFullYear()}`;
                const movementType = movement > 0 ? 'deposit' : 'withdrawal';

                const movementRow = `
                    <div class="movements__row">
                        <div class="movements__type movements__type--${movementType}">
                            ${movementType.toUpperCase()} 
                        </div>
                        <div class="movements__date">${formattedDate}</div>
                        <div class="movements__amount">${movement.toFixed(2)} ${account.currency}</div>
                    </div>
            `;
                transactionsMovments.insertAdjacentHTML('beforeend', movementRow);
            });
        }

    });
};


btnOpTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    removeErValText(inputTransferAmount);
    removeErValText(inputTransferTo);
    const amount = Number(inputTransferAmount.value);
    const receiverUser = findUserByCardNumber(inputTransferTo.value)
    const receiverCard = findCardByUserAndNumber(receiverUser.fullname, inputTransferTo.value)

    console.log(receiverUser)
    console.log(receiverCard)

    if (validateNotEmpty(inputTransferTo)) {
        if (validateNotEmpty(inputTransferAmount)) {
            if (receiverUser) {
                if (validateCardNumber(inputTransferTo)) {
                    if (amount > 0) {
                        if (currentAccount.cards[currentSlideIndex].balance >= amount) {
                            if (currentAccount.cards[currentSlideIndex].cardNumber != inputTransferTo.value) {
                                currentAccount.cards[currentSlideIndex].movements.push(-amount);
                                currentAccount.cards[currentSlideIndex].movementsDates.push(new Date().toISOString());
                                currentAccount.cards[currentSlideIndex].balance -= amount;;
                                receiverCard.movements.push(amount);
                                receiverCard.movementsDates.push(new Date().toISOString());
                                receiverCard.balance += amount;
                                inputTransferAmount.value = inputTransferTo.value = '';

                                updateUICards()
                                updateUI(currentAccount);

                                if (timer) clearInterval(timer);
                                timer = startLogOutTimer();
                            } else {
                                showError(inputTransferAmount, 'You can not trasfer to trasfering card.');
                            }
                        } else {
                            showError(inputTransferAmount, 'No enough money.');
                        }
                    } else {
                        showError(inputTransferAmount, 'Wrong amount.');
                    }
                }
            } else {
                showError(inputTransferAmount, 'This card does not exist.');
            }
        }
    }
});

const findCardByUserAndNumber = (username, cardNumber) => {
    // Ищем данные пользователя в Map
    const user = Users.get(username);

    if (!user) {
        console.error('User not found.');
        return null; // Пользователь не найден
    }

    // Ищем карту в массиве cards
    const card = user.cards.find(card => card.cardNumber === cardNumber);

    if (!card) {
        console.error('Card not found for this user.');
        return null; // Карта не найдена
    }

    return card; // Возвращаем найденную карту
};


btnOpClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        Users.delete(currentAccount.fullname);
        currentAccount = undefined;
        toggleHeader();
        showElement(loginForm);
        hideElement(transactionsSection)

        console.log('deleted')
        if (timer) clearInterval(timer);
        inputCloseUsername.value = inputClosePin.value = '';

    }
});

inputTransferTo.addEventListener('input', (event) => {
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
            showElement(loginForm);
            hideElement(transactionsSection)
        }

        console.log(time)

        time--;
    };

    let time = 300;

    tick();
    const timer = setInterval(tick, 1000);

    return timer;
};

