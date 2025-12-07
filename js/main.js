// Main.js - Global Logic

$(document).ready(function () {

    // Mobile Menu Toggle (ID based)
    $('#mobile-menu-btn').click(function () {
        $('#mobile-menu').toggleClass('hidden');
    });

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Preloader Logic
    $(window).on('load', function () {
    });

    // Scroll to Top Button Logic
    $('body').append('<button id="scrollTop" class="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg transform translate-y-20 transition-all duration-300 z-50 hover:bg-sky-600 focus:outline-none"><i class="fa-solid fa-arrow-up"></i></button>');

    $(window).scroll(function () {
        // Scroll to Top Logic
        if ($(this).scrollTop() > 300) {
            $('#scrollTop').removeClass('translate-y-20');
        } else {
            $('#scrollTop').addClass('translate-y-20');
        }

        // Navbar Scroll Logic
        const navbar = $('#navbar');
        if ($(this).scrollTop() > 50) {
            navbar.addClass('bg-white shadow-md py-2').removeClass('py-4');
            // Change text color to dark
            navbar.find('a, button').removeClass('text-white').addClass('text-gray-800');
            // Mobile menu button specific
            $('#mobile-menu-btn').removeClass('text-white').addClass('text-gray-800');
        } else {
            navbar.removeClass('bg-white shadow-md py-2').addClass('py-4');
            // Revert text color to white
            navbar.find('a, button').removeClass('text-gray-800').addClass('text-white');
            // Mobile menu button specific
            $('#mobile-menu-btn').removeClass('text-gray-800').addClass('text-white');
        }
    });

    $('#scrollTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

});
