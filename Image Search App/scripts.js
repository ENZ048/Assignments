const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const showMoreButton = document.getElementById("showMoreButton");
const imageContainer = document.getElementById("imageContainer");
const loadingIndicator = document.getElementById("loading");

const UNSPLASH_API_KEY = "QFtC8aWe-o_W8RDICgEIqzkYLjmZ8hl3pj8v8aAjttw";
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

let query = "";
let page = 1;

const fetchImages = async () => {
    if (!query) return;
    loadingIndicator.classList.remove("hidden");

    try {
        const response = await fetch(
            `${UNSPLASH_API_URL}?query=${query}&page=${page}&per_page=10&client_id=${UNSPLASH_API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch images.");

        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error(error);
        alert("Error fetching images. Please try again.");
    } finally {
        loadingIndicator.classList.add("hidden");
    }
};

const displayImages = (images) => {
    if (page === 1) imageContainer.innerHTML = "";
    images.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description || "Unsplash Image";
        imageContainer.appendChild(imgElement);
    });
    showMoreButton.classList.remove("hidden");
};

searchButton.addEventListener("click", () => {
    query = searchInput.value.trim();
    page = 1;
    if (!query) {
        alert("Please enter a search term.");
        return;
    }
    fetchImages();
});

showMoreButton.addEventListener("click", () => {
    page++;
    fetchImages();
});