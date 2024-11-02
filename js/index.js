'use strict'


let Users = new Map([
    ['Jonas Schmedtmann', {
        movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
        pin: 1111,
    }],
    ['Jessica Davis', {
        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
        pin: 2222,
    }],
    ['Steven Thomas Williams', {
        movements: [200, -200, 340, -300, -20, 50, 400, -460],
        pin: 3333,
    }]
]);


const header = document.querySelector('.header');
const labelWelcome = document.querySelector('.welcome');
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

function toggleForms(activeForm, inactiveForm, usernameInput, pinInput) {
    activeForm.classList.toggle('opacity-zero');
    activeForm.classList.toggle('z-index-1');
    inactiveForm.classList.toggle('opacity-one');
    inactiveForm.classList.toggle('z-index-1');
    clearInput(usernameInput);
    clearInput(pinInput);
}

const addUser = (fullname, pin) => {
    const newUser = {
        movements: [],
        pin: pin,
    };

    if (!Users.has(fullname)) {
        Users.set(fullname, newUser);
        console.log(`Account for ${fullname} has been added.`);
        clearInput(inputSignupFullname);
        clearInput(inputSignupPin);
    } else {
        console.log(`Account for ${fullname} already exists.`);
    }
};

const createUsernames = function (users) {
    users.forEach(function (users) {
        users.fullname = users.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};

let currentAccount;

if (!currentAccount) {
    header.classList.add('opacity-zero');
    loginForm.classList.add('opacity-one');
    loginForm.classList.add('z-index-1');
    signupForm.classList.add('opacity-zero');
}

if (currentAccount) {
    loginForm.classList.add('opacity-zero');
    signupForm.classList.add('opacity-zero');
    header.classList.add('opacity-one');
    labelWelcome.classList.add('opacity-one');
    labelWelcome.textContent = `Welcome back`;
}

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
    addUser(fullname, pin);
});