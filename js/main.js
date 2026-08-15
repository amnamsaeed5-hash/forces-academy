document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. AAPKA PURANA GALLERY FILTER CODE
    // ==========================================
    const lightbox = GLightbox({
        selector: '.glightbox',
        loop: true
    });

    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons and add to clicked one
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filterValue === "all" || item.classList.contains(filterValue)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

            // Refresh GLightbox after filtering to ensure hidden images don't slide in preview
            lightbox.reload();
        });
    });

    // ==========================================
    // 2. CONTACT FORM SUBMISSION VALIDATION
    // ==========================================
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("fullName").value.trim();
            const email = document.getElementById("emailAddr").value.trim();
            const phone = document.getElementById("phoneNum").value.trim();
            const subject = document.getElementById("subjectTxt").value.trim();
            const message = document.getElementById("messageBody").value.trim();
            const alertBox = document.getElementById("formAlert");

            // Regular Expressions Patterns
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const namePattern = /^[a-zA-Z\s]+$/;
            const phonePattern = /^[0-9]+$/;

            // 1. Empty Fields Ki Checker
            if (!name || !email || !phone || !subject || !message) {
                alertBox.className = "alert alert-danger";
                alertBox.innerHTML = "<i class='fas fa-exclamation-triangle me-2'></i> Please fill in all fields.";
                alertBox.classList.remove("d-none");
                return;
            }

            // 2. Strict Check Name (Letters only)
            if (!namePattern.test(name)) {
                alertBox.className = "alert alert-danger";
                alertBox.innerHTML = "<i class='fas fa-user-times me-2'></i> Name must contain letters only.";
                alertBox.classList.remove("d-none");
                return;
            }

            // 3. Strict Check Phone (Numbers only)
            if (!phonePattern.test(phone)) {
                alertBox.className = "alert alert-danger";
                alertBox.innerHTML = "<i class='fas fa-phone-slash me-2'></i> Phone number must contain numbers only.";
                alertBox.classList.remove("d-none");
                return;
            }

            // 4. Check Email Format
            if (!emailPattern.test(email)) {
                alertBox.className = "alert alert-danger";
                alertBox.innerHTML = "<i class='fas fa-exclamation-circle me-2'></i> Please enter a valid email address.";
                alertBox.classList.remove("d-none");
                return;
            }

            // Agar sab valid ho to Success Message show hoga
            alertBox.className = "alert alert-success";
            alertBox.innerHTML = "<i class='fas fa-check-circle me-2'></i> Form submitted successfully! Thank you.";
            alertBox.classList.remove("d-none");

            // Form clear karne ke liye
            contactForm.reset();
        });
    }

    // ==========================================
    // 3. WEEK 4: STATS COUNTER ON SCROLL
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats-section');
    let animated = false;

    function startCounting() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 Seconds duration
            const increment = target / (duration / 16);

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    startCounting();
                    animated = true;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // ==========================================
    // 4. WEEK 4: BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('d-none');
            } else {
                backToTopBtn.classList.add('d-none');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
// Dark Mode Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
}

// Back to Top Button Logic
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('d-none');
        } else {
            backToTopBtn.classList.add('d-none');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Stats Counter Logic (Week 4)
const counters = document.querySelectorAll('.counter');
const statsSection = document.getElementById('stats-section');
let started = false;

if (statsSection && counters.length > 0) {
    window.addEventListener('scroll', () => {
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !started) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = target / 100;

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
            });
            started = true;
        }
    });
}
// EmailJS Admission Form Integration
const admissionForm = document.getElementById('admission-form');

if (admissionForm) {
    admissionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const submitBtn = admissionForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';

        emailjs.sendForm('service_054rzsh', 'template_dvpo7vy', this)
            .then(function() {
                alert('Enquiry Submitted Successfully!');
                admissionForm.reset();
                submitBtn.innerText = originalBtnText;
            }, function(error) {
                alert('Failed to send enquiry. Error: ' + JSON.stringify(error));
                submitBtn.innerText = originalBtnText;
            });
    });
}