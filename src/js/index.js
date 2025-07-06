import { loadHeader, loadFooter } from "./utils.mjs";
import { cities } from "./cities.mjs";

const menu = document.getElementById("cityMenu");

function loadDropDownMenu (cities) {
    cities.forEach(city => addMenuItem(city));
}

function addMenuItem(city) {
    const html = `<option value="${city.coordinates}">${city.name}</option>`;
    menu.insertAdjacentHTML("beforeend", html);
}

function addDestinationsByCoordinates(coordinates) {
    //grab the coordinates value from drop down menu choice and use the api to display results
};

loadHeader();
loadFooter();
loadDropDownMenu(cities);

menu.addEventListener("change", addDestinationsByCoordinates);
