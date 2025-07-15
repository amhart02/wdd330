import { loadHeader, loadFooter } from "./utils.mjs";
import { getGamesByGenre, getGameDetails } from "./api.mjs";
import { genres } from './genres.mjs'

const menu = document.getElementById("cityMenu");
let wishList = JSON.parse(localStorage.getItem('wishlist')) || [];


function loadDropDownMenu (genres) {
    genres.forEach(genre => addMenuItem(genre));
}

function addMenuItem(genre) {
    const html = `<option value="${genre.toLowerCase()}">${genre}</option>`;
    menu.insertAdjacentHTML("beforeend", html);
}

async function renderGames(event) {
    const genre = event.target.value;

    const result = await getGamesByGenre(genre);
    const games = result.results;
    games.forEach(game => renderGame(game));
};

async function renderGame(game) {
    const content = document.createElement('div');
    const gameDetails = await getGameDetails(game.slug);
    content.innerHTML = `
        <h2>${game.name}</h2>
        <img src="${game.background_image}" loading="lazy" alt="${game.name} Background Image"/>
        <p>${gameDetails.description_raw}</p>
        <svg class="heart" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
        </svg>
    `;
    const heart = content.querySelector(".heart");
    const destinationContainer = document.querySelector(".destinations");
    destinationContainer.insertAdjacentElement('afterbegin', content);

    if (isInList(game)) {
        heart.classList.add("filled");
    }
    heart.addEventListener("click", () => {
        toggleGameInList(game);
        heart.classList.toggle("filled");
    })

    console.log(wishList);
}

export function isInList(game) {
    return wishList.some(g => g.id === game.id);
}

function toggleGameInList(game) {
    if (isInList(game)) {
        wishList = wishList.filter(g => g.id !== game.id);
    } else {
        wishList.push(game);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishList));
}

loadHeader();
loadFooter();
loadDropDownMenu(genres);

menu.addEventListener("change", renderGames);
