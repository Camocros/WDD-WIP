const Favorites = {
    STORAGE_KEY: 'travel_favorites',
    
    getFavorites() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    isFavorite(countryId) {
        const favorites = this.getFavorites();
        return favorites.some(fav => fav.id === countryId);
    },

    toggleFavorite(countryData) {
        const favorites = this.getFavorites();
        const existingIndex = favorites.findIndex(fav => fav.id === countryData.id);
        
        if (existingIndex >= 0) {
            favorites.splice(existingIndex, 1);
            this.saveAndNotify(favorites);
            return false; // Removed
        } else {
            favorites.push(countryData);
            this.saveAndNotify(favorites);
            return true; // Added
        }
    },

    saveAndNotify(favorites) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
        // Dispatch custom event for cross-tab or same-page sync
        window.dispatchEvent(new Event('favorites_updated'));
    }
};
