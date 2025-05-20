document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initBoxedLayout();
    initGSAPAnimations();
    initAnimeJSAnimations();
    initPortfolioFilters();
    initTestimonialSlider();
    initClientLogoScroll();
    initContactForm();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        highlightActiveSection();
    });

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
}

function initBoxedLayout() {
    const boxedLayout = document.querySelector('.boxed-layout');
    if (!boxedLayout) return;
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (window.innerWidth > 768) {
            section.style.paddingLeft = '30px';
            section.style.paddingRight = '30px';
        }
    });
    
    window.addEventListener('resize', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.innerWidth > 1950) {
                navbar.style.maxWidth = 'calc(1920px - 30px)';
                navbar.style.left = '50%';
                navbar.style.transform = 'translateX(-50%)';
            } else {
                navbar.style.maxWidth = 'calc(100% - 30px)';
                navbar.style.left = '15px';
                navbar.style.right = '15px';
                navbar.style.transform = 'none';
            }
        }
    });
}

function init3DObject() {
    if (typeof THREE === 'undefined') return;
    
    const container = document.getElementById('hero-3d-object');
    if (!container) return;
    
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
   
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x6366f1,
        metalness: 0.7,
        roughness: 0.2,
    });
    const object = new THREE.Mesh(geometry, material);
    scene.add(object);
    
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    
    function animate() {
        requestAnimationFrame(animate);
        
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    animate();
}

function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    
    
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
        }
    });
    
    aboutTl.from(".about-image", { duration: 1, x: -100, opacity: 0 })
           .from(".about-content", { duration: 1, x: 100, opacity: 0 }, "-=0.8");
    
    
    gsap.from(".education-item", {
        scrollTrigger: {
            trigger: "#education",
            start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
    
    
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
    });
    
   
    gsap.from(".stat-item", {
        scrollTrigger: {
            trigger: "#stats",
            start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
    });
}

function initAnimeJSAnimations() {
    if (typeof anime === 'undefined') return;
    
    
    anime({
        targets: '.experience-line',
        height: '100%',
        duration: 2000,
        easing: 'easeInOutQuad',
        delay: 300
    });
    
    anime({
        targets: '.experience-dot',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(200, {start: 500}),
        easing: 'easeOutElastic(1, .5)'
    });
    
    
    anime({
        targets: '.portfolio-item',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutQuad',
        autoplay: false
    }).play();
    
    
    const contactAnimation = anime.timeline({
        autoplay: false
    });
    
    contactAnimation
        .add({
            targets: '#contact h2',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutQuad'
        })
        .add({
            targets: '.contact-form .form-group',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 500,
            delay: anime.stagger(100),
            easing: 'easeOutQuad'
        }, '-=400');
    
    
    const contactObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            contactAnimation.play();
        }
    }, { threshold: 0.2 });
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
}

function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0 || portfolioItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add('active');
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateX(0)';
            } else {
                testimonial.classList.remove('active');
                testimonial.style.opacity = '0';
                testimonial.style.transform = i < index ? 'translateX(-100px)' : 'translateX(100px)';
            }
        });
    }
    
    
    showTestimonial(currentIndex);
    
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
   
    setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

function initClientLogoScroll() {
    const clientLogos = document.querySelector('.client-logos');
    if (!clientLogos) return;
    
    
    const logoItems = document.querySelectorAll('.client-logo-item');
    logoItems.forEach(item => {
        const clone = item.cloneNode(true);
        clientLogos.appendChild(clone);
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            markInvalid(nameInput, 'Please enter your name');
            isValid = false;
        } else {
            markValid(nameInput);
        }
        
        if (!emailInput.value.trim()) {
            markInvalid(emailInput, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            markInvalid(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            markValid(emailInput);
        }
        
        if (!messageInput.value.trim()) {
            markInvalid(messageInput, 'Please enter your message');
            isValid = false;
        } else {
            markValid(messageInput);
        }
        
        
        if (isValid) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            
            setTimeout(function() {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                
                const successMsg = document.createElement('div');
                successMsg.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4';
                successMsg.innerHTML = '<strong>Success!</strong> Your message has been sent.';
                
                contactForm.appendChild(successMsg);
                
                
                setTimeout(function() {
                    successMsg.remove();
                }, 5000);
            }, 1500);
        }
    });
    
    
    function markInvalid(input, message) {
        input.classList.add('border-red-500');
        
        
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('p');
            errorElement.className = 'text-red-500 text-xs mt-1 error-message';
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        
        errorElement.textContent = message;
    }
    
    function markValid(input) {
        input.classList.remove('border-red-500');
        
        
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
}
