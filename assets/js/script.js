document.addEventListener('DOMContentLoaded', () => {
    // Create floating music notes
    const noteSymbols = ['♪', '♫', '♩', '♬', '♭', '♮', '♯'];
    const notesContainer = document.getElementById('floatingNotes');
    
    function createNote() {
        if (!notesContainer) return;
        
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
        note.style.left = `${Math.random() * 100}%`;
        note.style.top = `${Math.random() * 100}%`;
        note.style.animationDuration = `${15 + Math.random() * 10}s`;
        notesContainer.appendChild(note);
        
        // Remove note after animation
        note.addEventListener('animationend', () => {
            note.remove();
        });
    }
    
    // Create initial notes
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createNote(), i * 100); // Stagger the creation of initial notes
    }
    
    // Continue creating notes
    setInterval(createNote, 2000);

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
});