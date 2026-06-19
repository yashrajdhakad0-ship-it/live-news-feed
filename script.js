const API_KEY = "pub_fd84672bb41f4d8cbd62231010a8cd14";

const newsContainer = document.getElementById("newsContainer");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function fetchNews(category = "top") {
    loading.textContent = "Loading...";
    error.textContent = "";
    newsContainer.innerHTML = "";

    try {
        // NewsData.io uses country=in and category parameters
        const response = await fetch(
            `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en&category=${category}`
        );
        const data = await response.json();
        
        if (data.results) {
            displayNews(data.results);
        } else {
            error.textContent = "No articles found";
        }
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

        // NewsData.io uses image_url and link
        card.innerHTML = `
            <img src="${article.image_url || 'https://via.placeholder.com/300x200'}" alt="News Image">
            <h3>${article.title || 'No Title Available'}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.link}" target="_blank">Read More</a>
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
        // NewsData.io uses q= for keywords
        const response = await fetch(
            `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=en&q=${encodeURIComponent(keyword)}`
        );
        const data = await response.json();

        if (data.results) {
            displayNews(data.results);
        } else {
            error.textContent = "No matches found";
        }
    } catch (err) {
        error.textContent = "Search failed";
    }
    loading.textContent = "";
}

document.getElementById("searchBtn").addEventListener("click", searchNews);

document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
        fetchNews(button.dataset.topic);
    });
});

// "top" fetches general breaking news on NewsData.io
fetchNews("top");
