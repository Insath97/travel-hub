// Destinations.js

$(document).ready(function () {

    let allDestinations = [];
    const itemsPerPage = 6;
    let currentPage = 1;
    let currentFilter = 'all';
    let currentSearch = '';
    let currentPrice = 'all';

    // Fetch Destinations
    $.ajax({
        url: 'data/destinations.json',
        dataType: 'json',
        success: function (data) {
            allDestinations = data;
            applyFilters();
        },
        error: function (xhr, status, error) {
            console.warn('AJAX failed, using fallback data:', error);
            // Fallback Data
            allDestinations = [
                { "id": "paris", "name": "Paris", "country": "France", "category": "City", "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop", "price": "$1,200", "rating": 4.8 },
                { "id": "bali", "name": "Bali", "country": "Indonesia", "category": "Beach", "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop", "price": "$800", "rating": 4.9 },
                { "id": "kyoto", "name": "Kyoto", "country": "Japan", "category": "Culture", "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop", "price": "$1,500", "rating": 4.7 },
                { "id": "swiss", "name": "Swiss Alps", "country": "Switzerland", "category": "Mountain", "image": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop", "price": "$2,000", "rating": 4.9 },
                { "id": "nyc", "name": "New York City", "country": "USA", "category": "City", "image": "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=2070&auto=format&fit=crop", "price": "$1,800", "rating": 4.6 },
                { "id": "phuket", "name": "Phuket", "country": "Thailand", "category": "Beach", "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=2001&auto=format&fit=crop", "price": "$700", "rating": 4.5 }
            ];
            applyFilters();
        }
    });

    // Render Function
    function renderDestinations(items) {
        const grid = $('#destinations-grid');
        grid.empty();

        if (items.length === 0) {
            grid.html('<div class="col-span-full text-center text-gray-500 py-10 flex flex-col items-center"><i class="fa-regular fa-folder-open text-4xl mb-4 text-gray-300"></i><p class="text-xl">No destinations found matching your criteria.</p></div>');
            return;
        }

        // Pagination Logic
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = items.slice(start, end);

        paginatedItems.forEach((item, index) => {
            const delay = index * 100;
            // Use the real image from the data
            const displayImg = item.image;

            const card = `
                <div class="destination-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group cursor-pointer" 
                     data-id="${item.id}" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="relative h-64 overflow-hidden">
                        <img src="${displayImg}" alt="${item.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700">
                        <div class="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-primary">
                            ${item.category}
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-2xl font-bold mb-2 flex justify-between items-center text-contrast">
                            ${item.name} <span class="text-lg font-light text-gray-400">${item.country}</span>
                        </h3>
                        <p class="text-gray-600 mb-4 line-clamp-2">Experience the magic of ${item.name}. Discover hidden gems and unforgettable moments.</p>
                        <div class="flex justify-between items-center mt-4 border-t pt-4">
                            <span class="text-accent font-bold text-lg">${item.price}</span>
                            <span class="text-yellow-500"><i class="fa-solid fa-star"></i> ${item.rating}</span>
                        </div>
                    </div>
                </div>
            `;
            grid.append(card);
        });

        renderPagination(items.length);
    }

    // Render Pagination Controls
    function renderPagination(totalItems) {
        const container = $('#pagination-container');
        container.empty();

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (totalPages <= 1) return;

        // Prev Button
        if (currentPage > 1) {
            container.append(`<button class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm text-gray-600" onclick="window.changePage(${currentPage - 1})"><i class="fa-solid fa-chevron-left"></i></button>`);
        }

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === currentPage ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 shadow-sm';
            container.append(`<button class="px-4 py-2 border rounded-lg ${activeClass} transition font-bold" onclick="window.changePage(${i})">${i}</button>`);
        }

        // Next Button
        if (currentPage < totalPages) {
            container.append(`<button class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm text-gray-600" onclick="window.changePage(${currentPage + 1})"><i class="fa-solid fa-chevron-right"></i></button>`);
        }
    }

    // Global scoping for onclick
    window.changePage = function (page) {
        currentPage = page;
        applyFilters();
        $('html, body').animate({
            scrollTop: $("#destinations-grid").offset().top - 250
        }, 500);
    };

    // Unified Filter Logic
    function applyFilters() {
        let filtered = allDestinations;

        // 1. Category Filter
        if (currentFilter !== 'all') {
            filtered = filtered.filter(d => d.category === currentFilter || (d.category && d.category.includes(currentFilter)));
        }

        // 2. Search Filter
        if (currentSearch) {
            const term = currentSearch.toLowerCase();
            filtered = filtered.filter(d =>
                d.name.toLowerCase().includes(term) ||
                d.country.toLowerCase().includes(term)
            );
        }

        // 3. Price Filter
        if (currentPrice !== 'all') {
            filtered = filtered.filter(d => {
                // Remove '$' and ',' then parse
                const priceVal = parseInt(d.price.replace(/[$,]/g, ''));
                if (currentPrice === 'low') return priceVal < 1000;
                if (currentPrice === 'medium') return priceVal >= 1000 && priceVal <= 2000;
                if (currentPrice === 'high') return priceVal > 2000;
                return true;
            });
        }

        renderDestinations(filtered);
    }

    // Event Listeners
    $('.filter-btn').click(function () {
        $('.filter-btn').removeClass('active bg-primary text-white').addClass('bg-gray-100 text-gray-600 hover:bg-gray-200');
        $(this).removeClass('bg-gray-100 text-gray-600 hover:bg-gray-200').addClass('active bg-primary text-white');

        currentFilter = $(this).data('filter');
        currentPage = 1;
        applyFilters();
    });

    $('#search-input').on('keyup', function () {
        currentSearch = $(this).val();
        currentPage = 1;
        applyFilters();
    });

    $('#price-filter').on('change', function () {
        currentPrice = $(this).val();
        currentPage = 1;
        applyFilters();
    });

    // Modal Logic
    $(document).on('click', '.destination-card', function () {
        const id = $(this).data('id');
        const item = allDestinations.find(d => d.id === id);

        if (!item) return;

        // Mock Weather Data (AJAX Simulation)
        const mockTemp = Math.floor(Math.random() * (30 - 20) + 20);
        const mockCondition = ['Sunny', 'Cloudy', 'Partly Cloudy'][Math.floor(Math.random() * 3)];

        // Use the REAL image for the modal too!
        const displayImg = item.image;

        const content = `
            <div class="h-64 md:h-full bg-gray-200 relative">
                <img src="${displayImg}" class="w-full h-full object-cover">
                <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
                    <span class="text-white bg-primary px-3 py-1 rounded-full text-sm font-bold shadow-lg">${item.category}</span>
                </div>
            </div>
            <div class="p-8">
                <h2 class="text-4xl font-bold mb-2 font-heading text-contrast">${item.name}</h2>
                <p class="text-xl text-gray-500 mb-6 flex items-center gap-2"><i class="fa-solid fa-map-marker-alt text-accent"></i> ${item.country}</p>
                
                <div class="bg-blue-50 p-4 rounded-xl mb-6 flex items-center gap-4">
                    <i class="fa-solid fa-cloud-sun text-4xl text-primary"></i>
                    <div>
                        <p class="font-bold text-contrast">Current Weather</p>
                        <p class="text-primary">${mockTemp}°C, ${mockCondition}</p>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                    <h4 class="font-bold mb-2 text-contrast">Overview</h4>
                    <p class="text-gray-600 leading-relaxed text-sm">
                        Experience the breathtaking beauty of ${item.name}. From its iconic landmarks to its hidden cultural treasures, 
                        this destination offers an unforgettable journey. Ideal for those seeking both adventure and relaxation.
                    </p>
                </div>

                <div class="space-y-3 mb-8 border-t border-b border-gray-100 py-4">
                    <div class="flex items-center justify-between text-gray-700">
                        <span class="flex items-center gap-2"><i class="fa-solid fa-language text-accent w-5"></i> Language</span>
                        <span class="font-semibold">English, Local</span>
                    </div>
                    <div class="flex items-center justify-between text-gray-700">
                        <span class="flex items-center gap-2"><i class="fa-solid fa-money-bill-wave text-accent w-5"></i> Currency</span>
                        <span class="font-semibold">USD / Local</span>
                    </div>
                     <div class="flex items-center justify-between text-gray-700">
                        <span class="flex items-center gap-2"><i class="fa-solid fa-tag text-accent w-5"></i> Cost</span>
                        <span class="font-bold text-primary text-lg">${item.price}</span>
                    </div>
                </div>

                <button class="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-sky-600 transition shadow-lg transform hover:-translate-y-1">
                    Book This Trip
                </button>
            </div>
        `;

        $('#modal-content').html(content);
        $('#destination-modal').removeClass('hidden').addClass('flex');
    });

    $('#close-modal').click(function () {
        $('#destination-modal').addClass('hidden').removeClass('flex');
    });

    // Close on outside click
    $('#destination-modal').click(function (e) {
        if (e.target.id === 'destination-modal') {
            $(this).addClass('hidden').removeClass('flex');
        }
    });

});
