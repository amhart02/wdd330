import { getGameDetails } from "./api.mjs";
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

        const viewDetailsButton = div.querySelector(".viewDetails");
        viewDetailsButton.addEventListener("click", async () => {
            const gameDetails = await getGameDetails(game.id);
            renderDialog(game, gameDetails);
        });
    });
}

function renderDialog(game, gameDetails) {
    const dialog = document.querySelector(".gameDialog");
    const dialogContent = dialog.querySelector(".dialog-content");

    dialogContent.innerHTML = `
    <h2>${game.name}</h2>
    <img src="${game.background_image}" alt="${game.name}"/>
    <p>${gameDetails.description_raw}</p>
    <h3>Rating: <span>${game.rating}</span></h3>
    `;

    const closeButton = dialog.querySelector("#closeButton")

    if (!dialog.open) {
        dialog.showModal();
    }
    closeButton.addEventListener("click", () => {
        dialog.close();
    })
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
            <h3 class="viewDetails">View Details</h3>
            <h5 class="remove-btn">Remove</h5>
    `;
}

loadFooter();
loadHeader();
await initWishList();
scrollToTop();
