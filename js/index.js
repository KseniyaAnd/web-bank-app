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
const loginBtn = document.querySelector(".login-btn");


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

const validatePin = (pin, input) => {
    const pinString = String(pin);

    if (pinString.length >= 4 && /^\d+$/.test(pinString)) {
        return true;
    } else {
        input.classList.add('input-error');
        createErValText('PIN must consist of at least four digits and only digits.', input);

        setTimeout(() => {
            input.classList.remove('input-error');
        }, 1000);

        return false;
    }
};


function validateFullname(fullname) {
    const words = fullname.trim().split(/\s+/);
    if (words.length < 2) {
        inputSignupFullname.classList.add('input-error');
        createErValText('Fullname must contain more than two words.', inputSignupFullname)

        setTimeout(() => {
            inputSignupFullname.classList.remove('input-error');
        }, 1000);

        return false;
    }

    for (const word of words) {
        if (!/^[A-ZА-Я][a-zа-я]*$/.test(word)) {
            inputSignupFullname.classList.add('input-error');
            createErValText('Fullname must consist of only a letter and each word begins with a capital letter.', inputSignupFullname)

            setTimeout(() => {
                inputSignupFullname.classList.remove('input-error');
            }, 1000);

            return false;
        }
    }

    return true;
}

const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-zА-Яа-яЁё]+$/;

    if (!usernameRegex.test(username)) {
        inputLoginUsername.classList.add('input-error');
        createErValText('Username must consist of the first letters of full name.', inputLoginUsername);

        setTimeout(() => {
            inputLoginUsername.classList.remove('input-error');
            removeErValText(inputLoginUsername);
        }, 1000);

        return false;
    }
    return true;
};


const validateNotEmpty = (inputElement) => {
    if (inputElement.value.trim() === '') {
        inputElement.classList.add('input-error');
        createErValText('Field id empty.', inputElement);
        setTimeout(() => {
            inputElement.classList.remove('input-error');
        }, 1000);

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
        signupForm.classList.add('opacity-zero');
        signupForm.classList.remove('opacity-one');
        signupForm.classList.remove('z-index-1');
        toggleHeader();

    } else {
        console.log(`Account for ${fullname} already exists.`);
    }
};

const findUserByUsername = (username) => {
    let foundUser = null;

    Users.forEach((value, key) => {
        if (value.username === username.toUpperCase()) {
            foundUser = { fullname: key, ...value };
        }
    });

    return foundUser;
};

const findPinForUser = (user, pin) => {
    if (user && user.pin === Number(pin)) {
        return true;
    } else {
        return false;
    }
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
    erText.style.color = '#f8d7da;';
    erText.textContent = text;
    referenceElement.after(erText);
}

const removeErValText = (referenceElement) => {
    const nextElement = referenceElement.nextElementSibling;

    if (nextElement && nextElement.tagName === 'P') {
        nextElement.remove();
    }
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
    }
);

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
                        loginForm.classList.add('opacity-zero');
                        loginForm.classList.remove('opacity-one');
                        loginForm.classList.remove('z-index-1');
                        toggleHeader();
                    } else {
                        inputLoginUsername.classList.add('input-error');
                        inputLoginPin.classList.add('input-error');
                        createErValText('Wrong username or PIN.', inputLoginPin);

                        setTimeout(() => {
                            inputLoginUsername.classList.remove('input-error');
                            inputLoginPin.classList.remove('input-error');
                            removeErValText(inputLoginPin);
                        }, 1000);
                    }
                }
            }
        }
    }
);