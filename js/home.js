// Home.js - Home Page Logic

$(document).ready(function () {

    // Audio Toggle Removed


    // AJAX News Loader via Fake JSON
    function loadNews() {
        $.ajax({
            url: 'data/news.json',
            dataType: 'json',
            success: function (data) {
                renderNews(data.slice(0, 6));
            },
            error: function (xhr, status, error) {
                console.warn('AJAX failed, using fallback data:', error);
                // Fallback Data
                const fallbackData = [
                    { "date": "2024-10-25", "title": "Top 10 Hidden Gems", "snippet": "Discover the untouched beauty..." },
                    { "date": "2024-10-22", "title": "New Visa Policies", "snippet": "Several countries are launching new visa programs..." },
                    { "date": "2024-10-20", "title": "Sustainable Travel", "snippet": "Eco-friendly travel is on the rise..." },
                    { "date": "2024-10-18", "title": "Street Food 2024", "snippet": "Best street food guide..." },
                    { "date": "2024-10-15", "title": "Baggage Fees", "snippet": "New airline policies..." },
                    { "date": "2024-10-12", "title": "Solo Travel Safety", "snippet": "Tips for beginners..." }
                ];
                renderNews(fallbackData);
            }
        });
    }

    function renderNews(data) {
        const container = $('#news-container');
        container.empty();
        data.forEach((news, index) => {
            const delay = index * 100;
            const card = `
                <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="text-sm text-primary font-bold mb-2">${news.date}</div>
                    <h3 class="text-xl font-bold mb-3 text-contrast">${news.title}</h3>
                    <p class="text-gray-600 mb-4">${news.snippet}</p>
                    <a href="#" class="text-accent font-semibold hover:underline">Read more &rarr;</a>
                </div>
            `;
            container.append(card);
        });
    }

    // Call AJAX function
    loadNews();

    // GSAP Animation for Hero Text
    gsap.from(".hero-content h1", { duration: 1, y: 50, opacity: 0, ease: "power3.out" });
    gsap.from(".hero-content p", { duration: 1, y: 30, opacity: 0, delay: 0.3, ease: "power3.out" });

});
