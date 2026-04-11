document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Insights Slider
    if (document.querySelector('.insights-slider')) {
        new Swiper('.insights-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // 2. Load Maritime Intel (GDELT)
    if (document.getElementById("gdelt-container")) {
        loadMaritimeIntel();
        setInterval(loadMaritimeIntel, 15 * 60 * 1000);
    }

    // 3. Load Market Stats (Vercel API)
    if (document.getElementById("gold-price")) {
        loadMarketStats();
    }
});

async function loadMaritimeIntel() {
    const q = '("Suez Canal" OR "Red Sea" OR "Hormuz") AND (attack OR "war risk")';
    try {
        const res = await fetch(`https://api.gdeltproject.org/api/v2/doc/doc?query=${q}&mode=ArtList&maxrecords=5&format=json`);
        const data = await res.json();
        document.getElementById("gdelt-container").innerHTML = data.articles.map(a => `
            <div class="card">
                <div class="live-dot"></div>
                <h3>${a.title}</h3>
                <a href="${a.url}" target="_blank" class="btn-sm">View Intel</a>
            </div>`).join('');
    } catch (e) { console.error(e); }
}

async function loadMarketStats() {
    try {
        const res = await fetch('/api/market-data');
        const data = await res.json();
        document.getElementById("gold-price").innerText = `$${parseFloat(data.gold).toFixed(2)}`;
        document.getElementById("forex-rate").innerText = `₹${parseFloat(data.forex).toFixed(2)}`;
    } catch (e) { console.warn("API throttled, using cache."); }
}