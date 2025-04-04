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

// Add this to the end of your assets/js/script.js file

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Store affiliate code if present in URL
let affiliateCode = getUrlParameter('affiliate');
if (!affiliateCode) {
    // Check if it's in the path instead of query params
    const pathMatch = window.location.pathname.match(/affiliate=([^\/&]+)/i);
    if (pathMatch) {
        affiliateCode = pathMatch[1];
    }
}

// Create and append the contact form popup to the body
function createContactFormPopup() {
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    popupOverlay.id = 'contactPopup';
    popupOverlay.style.display = 'none';

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content glass-card';

    popupContent.innerHTML = `
        <div class="popup-header">
            <h2>Register for AI Music Class</h2>
            <span class="close-popup">&times;</span>
        </div>
        <form id="contactForm">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="entry.2130727401" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="entry.1224351975" required>
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="entry.1356950233" required>
            </div>
            <div class="form-group">
                <label for="productType">Select Class Type</label>
                <select id="productType" name="entry.1200065748" required>
                    <option value="">-- Select an option --</option>
                    <option value="Group Class">Group Class (RM25)</option>
                    <option value="One-to-One Class">One-to-One Class (RM50)</option>
                    <option value="Song Creation">Song Creation (RM5/song)</option>
                </select>
            </div>
            <input type="hidden" id="affiliate" name="entry.369453213" value="${affiliateCode || 'None'}">
            
            <div class="payment-section">
                <h3>Payment Method</h3>
                <div class="qr-code">
                    <img src="assets/img/payment-QR.jpeg" alt="Payment QR Code">
                    <p>Scan to pay with Touch n Go, Boost, GrabPay, or other e-wallets </p>
                </div>
            </div>
            
            <button type="submit" class="submit-button">Submit Registration</button>
        </form>
        <div id="formStatus" class="form-status"></div>
    `;

    popupOverlay.appendChild(popupContent);
    document.body.appendChild(popupOverlay);

    // Add event listener to close the popup
    const closeBtn = popupOverlay.querySelector('.close-popup');
    closeBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    // Close popup when clicking outside the content
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });

    // Add form submission handler
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleFormSubmit);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formStatus = document.getElementById('formStatus');
    formStatus.innerHTML = '<p>Processing your registration...</p>';
    formStatus.className = 'form-status processing';
    
    // Get the form data
    const formData = new FormData(e.target);
    
    // Create a hidden iframe for the form submission
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden-iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Set form attributes for Google Form submission
    const form = e.target;
    form.action = 'https://docs.google.com/forms/d/e/1FAIpQLSdlwHAbvEBXWI5CiGkuEZYhCFPZivyUYOJ1opscpqHGARE7Vg/formResponse';
    form.method = 'post';
    form.target = 'hidden-iframe';
    
    // Submit the form
    form.submit();
    
    // Display success message
    formStatus.innerHTML = '<p>Thank you for registering! We will contact you shortly.</p>';
    formStatus.className = 'form-status success';
    
    // Reset the form after a delay
    setTimeout(() => {
        form.reset();
        // Close the popup after reset
        setTimeout(() => {
            document.getElementById('contactPopup').style.display = 'none';
        }, 1000);
    }, 2000);
    
    // Remove the iframe after submission
    setTimeout(() => {
        iframe.remove();
    }, 5000);
}

// Add click event listener to Register Now button
document.addEventListener('DOMContentLoaded', () => {
    createContactFormPopup();
    
    const registerButtons = document.querySelectorAll('.register-button');
    registerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('contactPopup').style.display = 'flex';
        });
    });
});