const currentyear = document.querySelector("#currentyear");
const today = new Date();
currentyear.textContent = today.getFullYear();

let oLastModif = new Date(document.lastModified);
const lastModified = document.querySelector("#lastModified");

function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}

let formattedDate = addLeadingZero(oLastModif.getMonth() + 1) + '/' +
    addLeadingZero(oLastModif.getDate()) + '/' +
    oLastModif.getFullYear() + ' ' +
    addLeadingZero(oLastModif.getHours()) + ':' +
    addLeadingZero(oLastModif.getMinutes()) + ':' +
    addLeadingZero(oLastModif.getSeconds());

lastModified.textContent = "Last Modification: " + formattedDate;
