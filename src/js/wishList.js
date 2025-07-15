import { loadHeader, loadFooter, scrollToTop } from "./utils.mjs"
let wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
let wishListContainer = document.querySelector(".wishList");


function initWishList () {
    if (wishList.length === 0) {
        wishListContainer.innerHTML = "<p>No games in your wishlist yet!</p>";
    } 

    wishList.forEach(game => {
        const div = document.createElement("div");
        div.classList.add("gameCard");
        div.classList.add("wishListGame");

        div.innerHTML = gameTemplate(game);

        const removeBtn = div.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            removeGame(game)
            div.remove();
        });

        wishListContainer.appendChild(div);
    });
}

function removeGame(game) {
    wishList = wishList.filter(g => g.id !== game.id);
    localStorage.setItem("wishlist", JSON.stringify(wishList));
    if (wishList.length === 0) {
        wishListContainer.innerHTML = "<p>No games in your wishlist yet!</p>";
    } 
}

function gameTemplate(game) {
    return `
            <h2>${game.name}</h2>
            <img src="${game.background_image}" alt="${game.name}" />
            <h3 class="remove-btn">Remove</h3>
    `;
}

loadFooter();
loadHeader();
initWishList();
scrollToTop();
