import '../../scripts/lib/globalEvents.js';

const link = document.querySelector('#link');

link.array.forEach(element => {
    console.log(element);
});

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isEven(number) {
    return number % 2 === 0;
}

