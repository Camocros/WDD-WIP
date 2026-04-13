const API = {
    BASE_URL: 'https://restcountries.com/v3.1',

    async getCountryByName(name) {
        try {
            const response = await fetch(`${this.BASE_URL}/name/${name}?fullText=true`);
            if (!response.ok) throw new Error('Country not found');
            const data = await response.json();
            return this.formatCountryData(data[0]);
        } catch (error) {
            console.error("API Error - getCountryByName:", error);
            throw error;
        }
    },

    async getRandomCountry() {
        try {
            const response = await fetch(`${this.BASE_URL}/all?fields=name,capital,region,population,flags`);
            if (!response.ok) throw new Error('Failed to fetch countries');
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            return this.formatCountryData(data[randomIndex]);
        } catch (error) {
            console.error("API Error - getRandomCountry:", error);
            throw error;
        }
    },

    async getCountriesByRegion(region) {
        try {
            const response = await fetch(`${this.BASE_URL}/region/${region}`);
            if (!response.ok) throw new Error('Failed to fetch region');
            const data = await response.json();
            // Pick a random country from this region for simplicity
            const randomIndex = Math.floor(Math.random() * data.length);
            return this.formatCountryData(data[randomIndex]);
        } catch (error) {
            console.error("API Error - getCountriesByRegion:", error);
            throw error;
        }
    },

    formatCountryData(apiData) {
        if (!apiData) return null;
        const name = apiData.name.common;
        return {
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name: name,
            capital: apiData.capital ? apiData.capital[0] : 'N/A',
            region: apiData.region,
            population: new Intl.NumberFormat().format(apiData.population),
            flag: apiData.flags.svg,
            // Generic image using loremflickr
            image: `https://loremflickr.com/800/600/${encodeURIComponent(name)},landscape,travel/all`,
            summary: Data.getSummary(name)
        };
    }
};
