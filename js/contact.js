// Contact.js

$(document).ready(function () {

    $('#contact-form').on('submit', function (e) {
        e.preventDefault();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();
        const status = $('#form-status');

        // Simple validation
        if (name === '' || email === '' || message === '') {
            status.removeClass('hidden text-green-500').addClass('text-red-500').text('Please fill in all fields.');
            return;
        }

        // Simulate AJAX Submission
        const btn = $(this).find('button');
        const originalText = btn.html();

        btn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin"></i> Sending...');

        setTimeout(function () {
            // Success Mock
            status.removeClass('hidden text-red-500').addClass('text-green-500').text('Message sent successfully! We will get back to you soon.');

            // Reset Form
            $('#contact-form')[0].reset();
            btn.prop('disabled', false).html(originalText);

            // Auto-hide success message
            setTimeout(() => {
                status.addClass('hidden');
            }, 5000);

        }, 2000); // 2 second delay for realism
    });

});
