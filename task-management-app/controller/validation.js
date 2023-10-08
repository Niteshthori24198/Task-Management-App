
const emailValidator = (email) => {
    const pattren = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattren.test(email);
}

const nameValidator = (name) => {
    const pattren = /^[A-Za-z ]+$/;
    return pattren.test(name);
}

const passwordValidator = (password) => {
    const pattren = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{6,}$/;
    return pattren.test(password);
}

module.exports = { emailValidator, nameValidator, passwordValidator }