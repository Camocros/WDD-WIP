const UI = {
    container: document.getElementById('destination-container'),
    errorMsg: document.getElementById('error-message'),
    
    showError(message) {
        if (this.errorMsg) {
            this.errorMsg.textContent = message;
            this.errorMsg.classList.remove('hidden');
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    },

    clearError() {
        if (this.errorMsg) {
            this.errorMsg.classList.add('hidden');
        }
    },

    showLoading() {
        this.clearError();
        if (this.container) {
            this.container.innerHTML = `
                <div class="placeholder-text">
                    <p>Loading destination...</p>
                </div>
            `;
        }
    },

    renderCountryCard(country) {
        this.clearError();
        if (!this.container) return;

        const isFav = Favorites.isFavorite(country.id);
        const heartIcon = isFav ? 
            `<svg class="icon icon-heart-filled" viewBox="0 0 24 24" fill="#e63946" stroke="#e63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>` : 
            `<img src="images/icon-heart.svg" class="icon" alt="Favorite">`;

        const html = `
            <div class="destination-card">
                <div class="card-image-wrap">
                    <img src="${country.image}" alt="${country.name}" class="card-image" onerror="this.src='images/placeholder-country.png'" />
                    <img src="${country.flag}" alt="Flag of ${country.name}" class="card-flag" />
                    <button class="btn-icon card-fav-btn ${isFav ? 'active' : ''}" data-id="${country.id}" aria-label="Favorite">
                        ${heartIcon}
                    </button>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="card-title">${country.name}</h3>
                        <span class="card-region">${country.region}</span>
                    </div>
                    <p class="card-summary">${country.summary}</p>
                    <div class="card-stats">
                        <div class="stat">
                            <div class="stat-icon"><img src="images/icon-location.svg" class="icon" alt="Capital"></div>
                            <div class="stat-info">
                                <span>Capital</span>
                                <strong>${country.capital}</strong>
                            </div>
                        </div>
                        <div class="stat">
                            <div class="stat-icon"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                            <div class="stat-info">
                                <span>Population</span>
                                <strong>${country.population}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = html;
        this.attachFavListener(country);
    },

    attachFavListener(country) {
        const btn = this.container.querySelector('.card-fav-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                Favorites.toggleFavorite(country);
                this.renderCountryCard(country); // Re-render to update icon state
            });
        }
    },

    renderFavoritesList() {
        const listContainer = document.getElementById('favorites-list');
        const emptyMsg = document.getElementById('no-favorites-msg');
        
        if (!listContainer) return;
        
        const favorites = Favorites.getFavorites();
        
        if (favorites.length === 0) {
            listContainer.innerHTML = '';
            emptyMsg.classList.remove('hidden');
            return;
        }
        
        emptyMsg.classList.add('hidden');
        listContainer.innerHTML = '';
        
        favorites.forEach(country => {
            const heartIcon = `<svg class="icon icon-heart-filled" viewBox="0 0 24 24" fill="#e63946" stroke="#e63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
            
            const card = document.createElement('div');
            card.className = 'destination-card favorite-card';
            card.innerHTML = `
                <div class="card-image-wrap">
                    <img src="${country.image}" alt="${country.name}" class="card-image" onerror="this.src='images/placeholder-country.png'" />
                    <img src="${country.flag}" alt="Flag of ${country.name}" class="card-flag" />
                    <button class="btn-icon card-fav-btn active" data-id="${country.id}">
                        ${heartIcon}
                    </button>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="card-title">${country.name}</h3>
                        <span class="card-region">${country.region}</span>
                    </div>
                </div>
            `;
            
            const btn = card.querySelector('.card-fav-btn');
            btn.addEventListener('click', () => {
                Favorites.toggleFavorite(country);
                this.renderFavoritesList(); // Re-render list
            });
            
            listContainer.appendChild(card);
        });
    }
};
