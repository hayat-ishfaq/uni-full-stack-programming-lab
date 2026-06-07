let currentPage = 0;
let itemsPerPage = 6;
let currentDataType = 'posts';
let allData = [];

const dataContainer = document.getElementById('dataContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const refreshBtn = document.getElementById('refreshBtn');
const dataTypeSelect = document.getElementById('dataType');
const loadingSpinner = document.getElementById('loadingSpinner');
const loadedCountElement = document.getElementById('loadedCount');
const totalCountElement = document.getElementById('totalCount');

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

async function fetchData(type, start, limit) {
    try {
        loadingSpinner.classList.add('active');
        loadMoreBtn.disabled = true;

        const response = await fetch(`${API_BASE_URL}/${type}?_start=${start}&_limit=${limit}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        loadingSpinner.classList.remove('active');
        loadMoreBtn.disabled = false;

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        loadingSpinner.classList.remove('active');
        loadMoreBtn.disabled = false;
        
        displayError(error.message);
        return [];
    }
}

function displayError(message) {
    const errorCard = document.createElement('div');
    errorCard.className = 'data-card';
    errorCard.style.background = '#ffe0e0';
    errorCard.innerHTML = `
        <h3 style="color: #d32f2f;">⚠️ Error</h3>
        <p style="color: #d32f2f;">${message}</p>
    `;
    dataContainer.appendChild(errorCard);
}

function displayPost(post) {
    const card = document.createElement('div');
    card.className = 'data-card';
    
    card.innerHTML = `
        <h3>
            <span class="id-badge">#${post.id}</span>
            ${capitalizeFirst(post.title)}
        </h3>
        <p>${post.body}</p>
        <div class="info-line">
            <strong>User ID:</strong> ${post.userId}
        </div>
    `;
    
    dataContainer.appendChild(card);
}

function displayUser(user) {
    const card = document.createElement('div');
    card.className = 'data-card';
    
    card.innerHTML = `
        <h3>
            <span class="id-badge">#${user.id}</span>
            ${user.name}
        </h3>
        <div class="info-line">
            <strong>👤 Username:</strong> ${user.username}
        </div>
        <div class="info-line">
            <strong>📧 Email:</strong> ${user.email}
        </div>
        <div class="info-line">
            <strong>📱 Phone:</strong> ${user.phone}
        </div>
        <div class="info-line">
            <strong>🌐 Website:</strong> ${user.website}
        </div>
        <div class="info-line">
            <strong>🏢 Company:</strong> ${user.company.name}
        </div>
        <div class="info-line">
            <strong>📍 City:</strong> ${user.address.city}
        </div>
    `;
    
    dataContainer.appendChild(card);
}

function displayComment(comment) {
    const card = document.createElement('div');
    card.className = 'data-card';
    
    card.innerHTML = `
        <h3>
            <span class="id-badge">#${comment.id}</span>
            ${capitalizeFirst(comment.name)}
        </h3>
        <div class="info-line">
            <strong>📧 Email:</strong> ${comment.email}
        </div>
        <p>${comment.body}</p>
        <div class="info-line">
            <strong>Post ID:</strong> ${comment.postId}
        </div>
    `;
    
    dataContainer.appendChild(card);
}

function displayData(data) {
    data.forEach(item => {
        switch(currentDataType) {
            case 'posts':
                displayPost(item);
                break;
            case 'users':
                displayUser(item);
                break;
            case 'comments':
                displayComment(item);
                break;
        }
    });

    allData = [...allData, ...data];
    updateStats();
}

function updateStats() {
    loadedCountElement.textContent = `Loaded: ${allData.length}`;
    
    const totalCounts = {
        posts: 100,
        users: 10,
        comments: 500
    };
    
    totalCountElement.textContent = `Total: ${totalCounts[currentDataType]}`;
    
    if (allData.length >= totalCounts[currentDataType]) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'All Data Loaded';
    } else {
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Load More';
    }
}

function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(0, 60) + (str.length > 60 ? '...' : '');
}

async function loadMore() {
    const newData = await fetchData(currentDataType, currentPage * itemsPerPage, itemsPerPage);
    
    if (newData.length > 0) {
        displayData(newData);
        currentPage++;
    } else {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'No More Data';
    }
}

function resetData() {
    currentPage = 0;
    allData = [];
    dataContainer.innerHTML = '';
    updateStats();
}

function changeDataType() {
    currentDataType = dataTypeSelect.value;
    resetData();
    loadMore();
}

function refresh() {
    resetData();
    loadMore();
}

loadMoreBtn.addEventListener('click', loadMore);
refreshBtn.addEventListener('click', refresh);
dataTypeSelect.addEventListener('change', changeDataType);

loadMore();