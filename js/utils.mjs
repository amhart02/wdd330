export function loadHeader() {
    const html = `
        <a href="index.html"><h1>GameScape</h1></a>
        <a href="wishList.html">Wish List</a>`;
    let header = document.createElement("header");
    header.innerHTML = html;
    document.querySelector("body").insertAdjacentElement("afterbegin", header)
}

export function loadFooter() {
    const html = `
        <p>Explore games by genre. Build your wishlist.</p>
        <a href="https://github.com/amhart02"><img src="images/github-mark-white.png" alt="gitHub Icon" width: 2.5rem height: auto/></a>`;
    let footer = document.createElement("footer");
    footer.innerHTML = html;
    document.querySelector("body").insertAdjacentElement("beforeend", footer)
}

export function scrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition > 0 && scrollPosition + windowHeight < documentHeight - 1) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
    });

    scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
