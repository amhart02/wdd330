const baseURL = 'https://api.rawg.io/api/games'
const apiKey = "d3b7a060b1d04892b8f6825b12900755";

export async function getGamesByGenre (genre) {
    let data = {};
    const response = await fetch(baseURL + `?key=${apiKey}&genres=${genre}&page_size=30`);
    if (response.ok) 
    {
        data = await response.json();
    } else throw new Error ("Response Not Ok");
    return data;
}

export async function getGameDetails (gameSlug) {
    let data = {};
    const response = await fetch(baseURL + `/${gameSlug}?key=${apiKey}`);
    if (response.ok) {
        data = await response.json();
    } else throw new Error ("Response Not Ok");
    return data;
}

export async function searchGames (query) {
    let data = {};
    const response = await fetch(baseURL + `?key=${apiKey}&search=${encodeURIComponent(query)}&page_size=30`);
    console.log(response);
    if (response.ok) {
        data = await response.json();
    } else throw new Error ('Response Not Ok');
    return data;
}