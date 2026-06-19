const API_KEY = "33538faf591156da859e085226f611f8";

const newsContainer = document.getElementById("newsContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function fetchNews(topic = "world") {

    loading.textContent = "Loading...";
    error.textContent = "";
    newsContainer.innerHTML = "";

    try {

        const response = await fetch(
            `https://gnews.io/api/v4/top-headlines?country=in&lang=en&topic=${topic}&token=${API_KEY}`
        );

        const data = await response.json();

        displayNews(data.articles);

    } catch (err) {
        error.textContent = "Failed to load news";
    }

    loading.textContent = "";
}

function displayNews(articles) {

    newsContainer.innerHTML = "";

    articles.forEach(article => {

        const card = document.createElement("div");
        card.className = "news-card";

        card.innerHTML = `
            <img src="${article.image || 'https://via.placeholder.com/300x200'}">
            <h3>${article.title}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;

        newsContainer.appendChild(card);
    });
}

async function searchNews() {

    const keyword = document.getElementById("searchInput").value;

    if (keyword === "") return;

    loading.textContent = "Loading...";
    error.textContent = "";
    newsContainer.innerHTML = "";

    try {

        const response = await fetch(
            `https://gnews.io/api/v4/search?q=${keyword}&lang=en&token=${API_KEY}`
        );

        const data = await response.json();

        displayNews(data.articles);

    } catch (err) {
        error.textContent = "Search failed";
    }

    loading.textContent = "";
}

document.getElementById("searchBtn")
.addEventListener("click", searchNews);

document.querySelectorAll(".category")
.forEach(button => {

    button.addEventListener("click", () => {
        fetchNews(button.dataset.topic);
    });

});

fetchNews();