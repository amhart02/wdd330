import { loadHeader, loadFooter } from "./utils.mjs"
import { removeGame } from './utils.mjs';
const wishList = JSON.parse(localStorage.getItem('wishlist')) || [];

function initWishList () {
    const wishListContainer = document.querySelector(".wishList");
    if (wishList.length === 0) {
        wishListContainer.innerHTML = "<p>No games in your wishlist yet!</p>";
    } 

    wishList.forEach(game => {
        const div = document.createElement("div");
        div.classList.add("wishListGame");

        div.innerHTML = gameTemplate(game);

        const removeBtn = div.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            removeGame(game.id)
            div.remove();
        });

        wishListContainer.appendChild(div);
    });
}

function gameTemplate(game) {
    return `
            <h2>${game.name}</h2>
            <img src="${game.background_image}" alt="${game.name}" />
            <button class="remove-btn">Remove</button>
    `;
}




loadFooter();
loadHeader();
initWishList();
