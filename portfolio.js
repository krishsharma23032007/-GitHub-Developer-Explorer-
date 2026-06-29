/* ==========================================
   API SETTINGS
========================================== */

const API_KEY = "YOUR_API_KEY";

const BASE_URL = "https://gnews.io/api/v4/top-headlines";

/* ==========================================
   DOM ELEMENTS
========================================== */

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const categorySelect = document.getElementById("category");
const countrySelect = document.getElementById("country");

const newsContainer = document.getElementById("newsContainer");

const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");

const loadMoreBtn = document.getElementById("loadMoreBtn");

/* ==========================================
   GLOBAL VARIABLES
========================================== */

let currentCategory = "general";
let currentCountry = "in";
let currentSearch = "";

let page = 1;

/* ==========================================
   LOAD NEWS WHEN PAGE OPENS
========================================== */

window.addEventListener("load", function () {

    loadNews();

});

/* ==========================================
   BUTTON EVENTS
========================================== */

searchBtn.addEventListener("click", function () {

    currentSearch = searchInput.value.trim();

    page = 1;

    loadNews();

});

categorySelect.addEventListener("change", function () {

    currentCategory = categorySelect.value;

    page = 1;

    loadNews();

});

countrySelect.addEventListener("change", function () {

    currentCountry = countrySelect.value;

    page = 1;

    loadNews();

});

loadMoreBtn.addEventListener("click", function () {

    page++;

    loadNews(true);

});

/* ==========================================
   FETCH NEWS
========================================== */

async function loadNews(loadMore = false) {

    showLoader();

    hideError();

    let url = "";

    if (currentSearch === "") {

        url =
            `${BASE_URL}?category=${currentCategory}&country=${currentCountry}&max=10&page=${page}&apikey=${API_KEY}`;

    }

    else {

        url =
            `https://gnews.io/api/v4/search?q=${currentSearch}&country=${currentCountry}&max=10&page=${page}&apikey=${API_KEY}`;

    }

    try {

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error("Unable to fetch news.");

        }

        const data = await response.json();

        if (!loadMore) {

            newsContainer.innerHTML = "";

        }

        displayNews(data.articles);

    }

    catch (error) {

        showError(error.message);

    }

    finally {

        hideLoader();

    }

}

/* ==========================================
   DISPLAY NEWS
========================================== */

function displayNews(articles) {

    if (articles.length === 0) {

        showError("No News Found");

        return;

    }

    articles.forEach(function (article) {

        createNewsCard(article);

    });

}

/* ==========================================
   CREATE SINGLE CARD
========================================== */

function createNewsCard(article) {

    const card = document.createElement("div");

    card.className = "news-card";

    const image =
        article.image
            ? article.image
            : "https://via.placeholder.com/400x220?text=No+Image";

    const title =
        article.title
            ? article.title
            : "No Title";

    const description =
        article.description
            ? article.description
            : "No Description Available";

    const source =
        article.source.name;

    const date =
        new Date(article.publishedAt).toLocaleDateString();

    const link =
        article.url;

    card.innerHTML = `

        <img src="${image}" alt="News Image">

        <div class="news-content">

            <h2>${title}</h2>

            <p>${description}</p>

            <div class="news-info">

                <span>${source}</span>

                <span>${date}</span>

            </div>

            <a
                href="${link}"
                target="_blank"
                class="read-btn">

                Read More

            </a>

        </div>

    `;

    newsContainer.appendChild(card);

}

/* ==========================================
   SHOW LOADER
========================================== */

function showLoader() {

    loader.style.display = "block";

}

/* ==========================================
   HIDE LOADER
========================================== */

function hideLoader() {

    loader.style.display = "none";

}

/* ==========================================
   SHOW ERROR
========================================== */

function showError(message) {

    errorMessage.innerText = message;

    errorMessage.style.display = "block";

}

/* ==========================================
   HIDE ERROR
========================================== */

function hideError() {

    errorMessage.style.display = "none";

}