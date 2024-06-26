const API_KEY = 'MD7j0Aq1PBrGaTQ3MOGY9B1bndNPaejH';
let currentPage = 0;
const limit = 12;
let currentQuery = '';

async function searchGiphy(event, page = 0) {
    if (event) event.preventDefault();
    
    const searchQuery = document.getElementById('search').value || currentQuery;
    currentQuery = searchQuery;
    currentPage = page;

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchQuery}&limit=${limit}&offset=${page * limit}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.data);
        updatePaginationControls(data.pagination.total_count);
    } catch (error) {
        console.error('Error fetching data from Giphy API:', error);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    document.getElementById("results-container").style.display = "flex";
    document.getElementById("page-container").style.display = "block";


    results.forEach(result => {
        const img = document.createElement('img');
        img.src = result.images.fixed_height.url;
        img.alt = result.title;
        img.classList.add('img-fluid', 'm-2');
        resultsContainer.appendChild(img);
    });
}

function updatePaginationControls(totalCount) {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = (currentPage + 1) * limit >= totalCount;

    prevButton.onclick = () => searchGiphy(null, currentPage - 1);
    nextButton.onclick = () => searchGiphy(null, currentPage + 1);
}

document.getElementById('search-bar').addEventListener('submit', searchGiphy);