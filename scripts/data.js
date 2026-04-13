const Data = {
    summaries: null,
    async loadSummaries() {
        try {
            const response = await fetch('data/summaries.json');
            this.summaries = await response.json();
        } catch (error) {
            console.warn("Could not load summaries.json", error);
            this.summaries = {};
        }
    },
    getSummary(countryName) {
        if (!this.summaries) return "A wonderful destination with a lot to explore and discover.";
        const name = countryName.toLowerCase();
        return this.summaries[name] || `Explore the beautiful landscapes and vibrant culture of ${countryName}. A great place for your next adventure.`;
    }
};
