'use strict'


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


const clearInput = (input) => {
    input.value = '';
}

const toggleForms = (activeForm, inactiveForm, usernameInput, pinInput) => {
    inactiveForm.classList.add('opacity-zero');
    inactiveForm.classList.remove('opacity-one');
    inactiveForm.classList.remove('z-index-1');

    activeForm.classList.remove('opacity-zero');
    activeForm.classList.add('opacity-one');
    activeForm.classList.add('z-index-1');

    clearInput(usernameInput);
    clearInput(pinInput);
}

const toggleHeader = () => {
    if (currentAccount) {
        header.classList.add('opacity-one');
        header.classList.remove('opacity-zero');
    } else {
        header.classList.add('opacity-zero');
        header.classList.remove('opacity-one');
    }
}

const validatePin = (pin) => {
    const pinString = String(pin);
    return pinString.length >= 4 && /^\d+$/.test(pinString);
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
        signupForm.classList.add('opacity-zero');
        signupForm.classList.remove('opacity-one');
        signupForm.classList.remove('z-index-1');
        toggleHeader();

    } else {
        console.log(`Account for ${fullname} already exists.`);
    }
};

const createUsername = (fullname) => {
    return fullname
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
};

let currentAccount;
toggleHeader();
toggleForms(loginForm, signupForm, inputLoginUsername, inputLoginPin);

loginLink.addEventListener('click', () => {
    toggleForms(loginForm, signupForm, inputLoginUsername, inputLoginPin);
});

signupLink.addEventListener('click', () => {
    toggleForms(signupForm, loginForm, inputSignupFullname, inputSignupPin);
});

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const fullname = inputSignupFullname.value;
    const pin = Number(inputSignupPin.value);
    if (validatePin(pin)) {
        addUser(fullname, pin);
    } else {
        inputSignupPin.classList.add('input-error');
        setTimeout(() => {
            inputSignupPin.classList.remove('input-error');
        }, 1000);
    }
});