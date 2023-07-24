// src/index.js
const libphonenumber = require('libphonenumber-js');

document.getElementById('parseButton').addEventListener('click', () => {
    const phoneNumberInput = document.getElementById('phoneInput').value;
    const parsedNumber = libphonenumber.parsePhoneNumberFromString(phoneNumberInput);

    if (parsedNumber) {
        const internationalFormat = parsedNumber.format('INTERNATIONAL');
        const nationalFormat = parsedNumber.format('NATIONAL');

        document.getElementById('internationalFormat').textContent = internationalFormat;
        document.getElementById('nationalFormat').textContent = nationalFormat;
    } else {
        document.getElementById('internationalFormat').textContent = 'Invalid phone number';
        document.getElementById('nationalFormat').textContent = '';
    }
});
