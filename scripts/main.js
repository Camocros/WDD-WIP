document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize data summaries if on main page
    if (document.getElementById('search-btn')) {
        await Data.loadSummaries();
        
        // 2. DOM Elements
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const randomBtn = document.getElementById('random-btn');
        const regionFilter = document.getElementById('region-filter');

        // 3. Helper to Fetch and Render
        async function fetchAndRenderCountry(action, useNameNotFound = false) {
            try {
                UI.showLoading();
                const country = await action();
                UI.renderCountryCard(country);
            } catch (error) {
                if (useNameNotFound && error.message === 'Country not found') {
                    UI.showError("Country not found");
                } else if (!useNameNotFound && error.message === 'Failed to fetch region') {
                    UI.showError("Something went wrong loading this region.");
                } else {
                    UI.showError("Image not available or something went wrong. Please try again.");
                }
            }
        }

        // 4. Search Form Handler
        const handleSearch = () => {
            const val = searchInput.value.trim();
            if (val) {
                fetchAndRenderCountry(() => API.getCountryByName(val), true);
            }
        };

        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });

        // 5. Random Button Handler
        randomBtn.addEventListener('click', () => {
            searchInput.value = '';
            regionFilter.value = '';
            fetchAndRenderCountry(() => API.getRandomCountry());
        });

        // 6. Region Filter Handler
        regionFilter.addEventListener('change', (e) => {
            const region = e.target.value;
            searchInput.value = '';
            if (region) {
                fetchAndRenderCountry(() => API.getCountriesByRegion(region));
            }
        });
        
        // Optional: Trigger a random destination on initial load to make it vibrant right away!
        // fetchAndRenderCountry(() => API.getRandomCountry());
    }
});
