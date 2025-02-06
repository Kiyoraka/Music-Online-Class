document.addEventListener('DOMContentLoaded', () => {
    // Create floating music notes
    const noteSymbols = ['♪', '♫', '♩', '♬', '♭', '♮', '♯'];
    const notesContainer = document.getElementById('floatingNotes');
    
    function createNote() {
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
        note.style.left = Math.random() * 100 + 'vw';
        note.style.animationDuration = 15 + Math.random() * 10 + 's';
        note.style.opacity = '0';
        notesContainer.appendChild(note);
        
        // Remove note after animation
        note.addEventListener('animationend', () => {
            note.remove();
        });
    }
    
    // Create initial notes
    for (let i = 0; i < 20; i++) {
        createNote();
    }
    
    // Continue creating notes
    setInterval(createNote, 2000);
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});