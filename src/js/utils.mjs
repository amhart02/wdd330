export function loadHeader() {
    const html = `
        <a href="index.html"><h1>WishTrip</h1></a>
        <a href="bucketList.html">Bucket List</a>`;
    let header = document.createElement("header");
    header.innerHTML = html;
    document.querySelector("body").insertAdjacentElement("afterbegin", header)
}

export function loadFooter() {
    const html = `
        <p>Explore more. Dream bigger.</p>
        <a href="https://github.com/amhart02"><img src="images/iconmonstr-github-1.svg" alt="gitHub Icon"/></a>`;
    let footer = document.createElement("footer");
    footer.innerHTML = html;
    document.querySelector("body").insertAdjacentElement("beforeend", footer)
}
