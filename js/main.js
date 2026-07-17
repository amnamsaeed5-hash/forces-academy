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
    // 2. CONTACT FORM SUBMISSION VALIDATION (NEW)
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
});