
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Copy the span email into the hidden input
    const spanEmail = document.getElementById('targetEmail').textContent.trim();
    document.getElementById('to_email').value = spanEmail;

    // Get values for the thank-you alert (optional, not used for email sending)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // In a real application, you would send this data to a server
    //alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} shortly.`);

    const formData = new FormData(this);

    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            if (data.trim() === 'success') {
                alert('Thank you! Your message has been sent.');
                this.reset();
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Unexpected error occurred.');
        });

    // Reset the form
    this.reset();
});

// Card flip animation enhancement
const teamCards = document.querySelectorAll('.team-card');

teamCards.forEach(card => {
    // Add touch support for mobile devices
    card.addEventListener('touchstart', function () {
        const cardInner = this.querySelector('.card-inner');
        cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
    });

    // Add focus accessibility
    card.addEventListener('focus', function () {
        this.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
    });

    card.addEventListener('blur', function () {
        this.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});