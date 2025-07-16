document.addEventListener('DOMContentLoaded', function() {
    // ===== MENU SHOW/HIDE =====
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId);

        if(toggle && nav){
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show');
                // Toggle aria-expanded for accessibility
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
            });
        }
    }
    showMenu('nav-toggle','nav-menu');

    // ===== REMOVE MENU MOBILE =====
    const navLink = document.querySelectorAll('.nav__link');
    function linkAction(){
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('show');
        // Reset aria-expanded when menu is closed
        document.getElementById('nav-toggle').setAttribute('aria-expanded', 'false');
    }
    navLink.forEach(n => n.addEventListener('click', linkAction));

    // ===== SCROLL SECTIONS ACTIVE LINK =====
    const sections = document.querySelectorAll('section[id]');
    const scrollActive = () => {
        const scrollDown = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                  sectionTop = current.offsetTop - 58,
                  sectionId = current.getAttribute('id'),
                  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
            
            if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }                                                    
        });
    }
    window.addEventListener('scroll', scrollActive);

    // ===== SCROLL REVEAL ANIMATION =====
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
        // reset: true
    });

    sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
    sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
    sr.reveal('.home__social-icon',{ interval: 200}); 
    sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});

    // ===== NEW IMPROVEMENTS =====
    
    // Show current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Typing effect
    if (document.querySelector('.typing-text')) {
        const typed = new Typed('.typing-text', {
            strings: ['Web Designer', 'Data Analyst', 'IT Specialist'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.category__btn');
    const projectItems = document.querySelectorAll('.work__item');

    if (filterButtons.length && projectItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filterValue === '*' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form submission
const contactForm = document.querySelector('.contact__form');
    
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send this to a server
        // For now, we'll use mailto as a fallback
        const subject = encodeURIComponent(data.subject || 'Contact Form Submission');
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage: ${data.message}`);
        
        window.location.href = `mailto:selormdadedzi@gmail.com?subject=${subject}&body=${body}`;
        
        // Optional: Show success message
        alert('Thank you for your message! Your email client will open to send the message.');
        contactForm.reset();
    });
}})