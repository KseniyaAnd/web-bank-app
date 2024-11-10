'use strict';

let Users = new Map([
    ['Jonas Schmedtmann', {
        username: 'JS',
        movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
        pin: 1111,
    }],
    ['Jessica Davis', {
        username: 'JD',
        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
        pin: 2222,
    }],
    ['Steven Thomas Williams', {
        username: 'STW',
        movements: [200, -200, 340, -300, -20, 50, 400, -460],
        pin: 3333,
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

let currentAccount;

const clearInput = (input) => {
    input.value = '';
};

const toggleFormsVisibility = (activeForm, inactiveForm, usernameInput, pinInput) => {
    hideForm(inactiveForm);
    showForm(activeForm);

    clearInput(usernameInput);
    clearInput(pinInput);
};

const showForm = (form) => {
    form.classList.remove('opacity-zero');
    form.classList.add('opacity-one', 'z-index-1');
};

const hideForm = (form) => {
    form.classList.add('opacity-zero');
    form.classList.remove('opacity-one', 'z-index-1');
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
        hideForm(signupForm);
        toggleHeader();
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
                    hideForm(loginForm);
                    toggleHeader();
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
    showForm(loginForm);
});
