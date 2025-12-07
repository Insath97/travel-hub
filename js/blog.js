// Blog.js - Blog Page Logic

$(document).ready(function () {
    let allNews = [];

    // Fetch News Data
    $.ajax({
        url: 'data/news.json',
        dataType: 'json',
        success: function (data) {
            allNews = data;
            renderBlog(allNews);
        },
        error: function (xhr, status, error) {
            console.error('Failed to load news:', error);
            $('#blog-grid').html('<div class="col-span-full text-center text-red-500">Failed to load articles. Please try again later.</div>');
        }
    });

    // Render Function
    function renderBlog(data) {
        const container = $('#blog-grid');
        container.empty();

        if (data.length === 0) {
            container.html('<div class="col-span-full text-center text-gray-500 py-10">No articles found matching your criteria.</div>');
            return;
        }

        data.forEach((news, index) => {
            // Determine category color for badge
            let badgeColor = 'bg-gray-100 text-gray-800';
            if (news.category === 'Destinations') badgeColor = 'bg-blue-100 text-blue-800';
            if (news.category === 'Tips') badgeColor = 'bg-green-100 text-green-800';
            if (news.category === 'News') badgeColor = 'bg-purple-100 text-purple-800';
            if (news.category === 'Gear') badgeColor = 'bg-orange-100 text-orange-800';
            if (news.category === 'Budget') badgeColor = 'bg-yellow-100 text-yellow-800';

            const card = `
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col h-full" data-aos="fade-up" data-aos-delay="${index * 50}">
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="flex justify-between items-start mb-4">
                            <span class="${badgeColor} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">${news.category || 'General'}</span>
                            <span class="text-sm text-gray-400"><i class="fa-regular fa-calendar mr-1"></i> ${news.date}</span>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-contrast hover:text-primary transition cursor-pointer">${news.title}</h3>
                        <p class="text-gray-600 mb-6 flex-grow line-clamp-3">${news.snippet}</p>
                        <a href="#" class="inline-flex items-center text-primary font-semibold hover:text-sky-700 transition mt-auto">
                            Read Article <i class="fa-solid fa-arrow-right ml-2 text-sm"></i>
                        </a>
                    </div>
                </div>
            `;
            container.append(card);
        });
    }

    // Filter Logic
    $('.filter-btn').click(function () {
        $('.filter-btn').removeClass('active bg-primary text-white').addClass('bg-white text-gray-600');
        $(this).removeClass('bg-white text-gray-600').addClass('active bg-primary text-white');

        const filter = $(this).data('filter');
        const searchTerm = $('#search-input').val().toLowerCase();

        filterAndSearch(filter, searchTerm);
    });

    // Search Logic
    $('#search-input').on('keyup', function () {
        const searchTerm = $(this).val().toLowerCase();
        const activeFilter = $('.filter-btn.active').data('filter');

        filterAndSearch(activeFilter, searchTerm);
    });

    function filterAndSearch(category, term) {
        const filtered = allNews.filter(item => {
            const matchesCategory = category === 'all' || item.category === category;
            const matchesSearch = item.title.toLowerCase().includes(term) || item.snippet.toLowerCase().includes(term);
            return matchesCategory && matchesSearch;
        });
        renderBlog(filtered);
    }

    // Modal Logic
    const modal = $('#blog-modal');
    const modalContent = $('#modal-content');

    function openModal(article) {
        // Placeholder full content since we only have snippets
        const fullContent = `
            <div class="mb-6">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">${article.category || 'General'}</span>
                <span class="text-gray-400 ml-3 text-sm"><i class="fa-regular fa-calendar mr-1"></i> ${article.date}</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold mb-6 text-contrast font-heading">${article.title}</h2>
            
            <div class="prose max-w-none text-gray-700 leading-relaxed font-body">
                <p class="text-xl mb-6 font-light text-gray-800 border-l-4 border-primary pl-4">${article.snippet}</p>
                
                <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                
                <h3 class="text-2xl font-bold mt-8 mb-4">Why This Matters</h3>
                <p class="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" class="w-full h-64 object-cover rounded-xl my-8 shadow-lg" alt="Article Image">

                <h3 class="text-2xl font-bold mt-8 mb-4">Key Takeaways</h3>
                <ul class="list-disc pl-5 space-y-2 mb-6">
                    <li>Understanding local customs is crucial.</li>
                    <li>Planning ahead saves time and money.</li>
                    <li>Sustainability should be a priority for every traveler.</li>
                </ul>
                
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
            </div>
        `;

        modalContent.html(fullContent);
        modal.removeClass('hidden').addClass('flex');
        $('body').addClass('overflow-hidden'); // Prevent background scrolling
    }

    function closeModal() {
        modal.addClass('hidden').removeClass('flex');
        $('body').removeClass('overflow-hidden');
    }

    // Close Listeners
    $('#close-modal-btn, #close-modal-overlay').click(closeModal);
    $(document).keydown(function (e) {
        if (e.key === "Escape") closeModal();
    });

    // Update Render Function to attach CLICK listener
    function renderBlog(data) {
        const container = $('#blog-grid');
        container.empty();

        if (data.length === 0) {
            container.html('<div class="col-span-full text-center text-gray-500 py-10">No articles found matching your criteria.</div>');
            return;
        }

        data.forEach((news, index) => {
            // Determine category color for badge
            let badgeColor = 'bg-gray-100 text-gray-800';
            if (news.category === 'Destinations') badgeColor = 'bg-blue-100 text-blue-800';
            if (news.category === 'Tips') badgeColor = 'bg-green-100 text-green-800';
            if (news.category === 'News') badgeColor = 'bg-purple-100 text-purple-800';
            if (news.category === 'Gear') badgeColor = 'bg-orange-100 text-orange-800';
            if (news.category === 'Budget') badgeColor = 'bg-yellow-100 text-yellow-800';

            const card = $(`
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2 flex flex-col h-full cursor-pointer group" data-aos="fade-up" data-aos-delay="${index * 50}">
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="flex justify-between items-start mb-4">
                            <span class="${badgeColor} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">${news.category || 'General'}</span>
                            <span class="text-sm text-gray-400"><i class="fa-regular fa-calendar mr-1"></i> ${news.date}</span>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-contrast group-hover:text-primary transition">${news.title}</h3>
                        <p class="text-gray-600 mb-6 flex-grow line-clamp-3">${news.snippet}</p>
                        <button class="inline-flex items-center text-primary font-semibold hover:text-sky-700 transition mt-auto text-left">
                            Read Article <i class="fa-solid fa-arrow-right ml-2 text-sm group-hover:translate-x-1 transition"></i>
                        </button>
                    </div>
                </div>
            `);

            // Attach Click Event
            card.click(function () {
                openModal(news);
            });

            container.append(card);
        });
    }

});
