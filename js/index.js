import { loadHeader, loadFooter, scrollToTop } from "./utils.mjs";
import { getGamesByGenre, getGameDetails, searchGames } from "./api.mjs";
import { genres } from './genres.mjs'

const menu = document.getElementById("genreMenu");
const searchButton = document.querySelector('.searchButton');
let wishList = JSON.parse(localStorage.getItem('wishlist')) || [];

function loadDropDownMenu (genres) {
    genres.forEach(genre => addMenuItem(genre));
}

function addMenuItem(genre) {
    const html = `<option value="${genre.toLowerCase()}">${genre}</option>`;
    menu.insertAdjacentHTML("beforeend", html);
}

async function renderGames(event) {
    let loadingScreen = document.querySelector('.loading-screen');
    let gamesSection =  document.querySelector('.games');
    const genre = event.target.value;
    document.querySelector('.games').innerHTML = "";
    try {
        loadingScreen.style.display = 'block';
        const result = await getGamesByGenre(genre);
        const games = result.results;
        games.forEach(game => renderGame(game));
    } catch (error) {
        console.log(error);
    } finally {
        loadingScreen.style.display = 'none';
        gamesSection.style.display= 'grid'
    }
};

async function renderGamesFromSearch(event) {
    const searchBar = document.querySelector('.searchBar')
    let loadingScreen = document.querySelector('.loading-screen');
    let gamesSection =  document.querySelector('.games');
    const query = searchBar.value;
    console.log(query);
    document.querySelector('.games').innerHTML = "";
    try {
        loadingScreen.style.display = 'block';
        const result = await searchGames(query);
        const games = result.results;
        games.forEach(game => renderGame(game));
    } catch (error) {
        console.log(error);
    } finally {
        loadingScreen.style.display = 'none';
        gamesSection.style.display= 'grid';
    }
}

function renderDialog(game, gameDetails) {
    const dialog = document.querySelector(".gameDialog");
    const dialogContent = dialog.querySelector(".dialog-content");

    const paragraphs = gameDetails.description_raw.split('\n').filter(paragraph => paragraph.trim() !== "").map(paragraph => `<p>${paragraph.trim()}</p>`).join("");

    dialogContent.innerHTML = `
    <h2>${game.name}</h2>
    <img src="${game.background_image}" alt="${game.name}"/>
    <h3>Rating: <span>${game.rating}</span></h3>
    ${paragraphs}
    `;

    const closeButton = dialog.querySelector("#closeButton")

    if (!dialog.open) {
        dialog.showModal();
    }
    closeButton.addEventListener("click", () => {
        dialog.close();
    })
}

function gameTemplate(game) {
    return `
        <h2>${game.name}</h2>
        <img src="${game.background_image}" loading="lazy" alt="${game.name} Background Image"/>
        <h3 class="viewDetails">View Details</h3>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="heart" d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"/>
        </svg>
    `;
}

async function renderGame(game) {
    const content = document.createElement('div');
    content.classList.add("gameCard")
    const gameDetails = await getGameDetails(game.slug);
    content.innerHTML = gameTemplate(game,gameDetails);

    const heart = content.querySelector(".heart");
    const gamesContainer = document.querySelector(".games");
    gamesContainer.insertAdjacentElement('beforeend', content);

    if (isInList(game)) {
        heart.classList.add("filled");
    }
    heart.addEventListener("click", () => {
        toggleGameInList(game);
        heart.classList.toggle("filled");
    })

    const viewDetailsButton = content.querySelector(".viewDetails");
    viewDetailsButton.addEventListener("click", () => renderDialog(game, gameDetails));
}

function isInList(game) {
    return wishList.some(g => g.id === game.id);
}

function removeGame(game) {
    wishList = wishList.filter(g => g.id !== game.id);
    localStorage.setItem("wishlist", JSON.stringify(wishList));
}

function toggleGameInList(game) {
    if (isInList(game)) {
        removeGame(game);
    } else {
        wishList.push(game);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishList));
}

function init (genres) {
    loadHeader();
    loadFooter();
    loadDropDownMenu(genres);
    scrollToTop();
}

init(genres)
menu.addEventListener("change", renderGames);
searchButton.addEventListener("click", renderGamesFromSearch);