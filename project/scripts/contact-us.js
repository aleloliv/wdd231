const currentyear = document.querySelector("#currentyear");

const today = new Date();

currentyear.textContent = today.getFullYear();

let oLastModif = new Date(document.lastModified);

const lastModified = document.querySelector("#lastModified");

function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.navigation');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show-navigation');
    });
});