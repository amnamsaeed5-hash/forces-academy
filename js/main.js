document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
       1. DARK / LIGHT MODE
       ========================================================= */

    const themeToggleBtn =
        document.getElementById("theme-toggle");

    const themeIcon =
        document.getElementById("theme-icon");


    /* ---------------------------------------------------------
       Update Theme Icon
       --------------------------------------------------------- */

    function updateThemeIcon(isDark) {

        if (!themeIcon) {
            return;
        }


        if (isDark) {

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

        } else {

            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");

        }

    }


    /* ---------------------------------------------------------
       Apply Theme
       --------------------------------------------------------- */

    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add("dark-theme");

            updateThemeIcon(true);

        } else {

            document.body.classList.remove("dark-theme");

            updateThemeIcon(false);

        }

    }


    /* ---------------------------------------------------------
       Get Saved Theme
       --------------------------------------------------------- */

    const savedTheme =
        localStorage.getItem("theme");


    /* ---------------------------------------------------------
       Apply Saved Theme
       --------------------------------------------------------- */

    if (savedTheme === "dark") {

        applyTheme("dark");

    } else {

        applyTheme("light");

    }


    /* ---------------------------------------------------------
       Theme Toggle Button
       --------------------------------------------------------- */

    if (themeToggleBtn) {

        themeToggleBtn.addEventListener(
            "click",
            function () {


                const isDark =
                    document.body.classList.contains("dark-theme");


                if (isDark) {

                    /* Switch to Light */

                    localStorage.setItem(
                        "theme",
                        "light"
                    );

                    applyTheme("light");


                } else {

                    /* Switch to Dark */

                    localStorage.setItem(
                        "theme",
                        "dark"
                    );

                    applyTheme("dark");

                }

            }
        );

    }



    /* =========================================================
       2. GALLERY FILTER
       ========================================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    if (
        filterButtons.length > 0 &&
        galleryItems.length > 0
    ) {

        filterButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {


                    /* Remove active */

                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove("active");

                        }
                    );


                    /* Add active */

                    this.classList.add("active");


                    const filterValue =
                        this.getAttribute("data-filter");


                    galleryItems.forEach(
                        function (item) {


                            if (
                                filterValue === "all" ||
                                item.classList.contains(filterValue)
                            ) {

                                item.style.display = "";

                            } else {

                                item.style.display = "none";

                            }

                        }
                    );

                }
            );

        });

    }



    /* =========================================================
       3. GLIGHTBOX
       ========================================================= */

    if (typeof GLightbox !== "undefined") {

        GLightbox({

            selector: ".glightbox",

            loop: true

        });

    }



    /* =========================================================
       4. CONTACT FORM VALIDATION
       ========================================================= */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const nameElement =
                    document.getElementById("fullName");

                const emailElement =
                    document.getElementById("emailAddr");

                const phoneElement =
                    document.getElementById("phoneNum");

                const subjectElement =
                    document.getElementById("subjectTxt");

                const messageElement =
                    document.getElementById("messageBody");

                const alertBox =
                    document.getElementById("formAlert");


                /* Check elements */

                if (
                    !nameElement ||
                    !emailElement ||
                    !phoneElement ||
                    !subjectElement ||
                    !messageElement ||
                    !alertBox
                ) {

                    return;

                }


                const name =
                    nameElement.value.trim();

                const email =
                    emailElement.value.trim();

                const phone =
                    phoneElement.value.trim();

                const subject =
                    subjectElement.value.trim();

                const message =
                    messageElement.value.trim();


                /* Validation Patterns */

                const namePattern =
                    /^[a-zA-Z\s]+$/;

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                const phonePattern =
                    /^[0-9]+$/;


                /* Empty Fields */

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !subject ||
                    !message
                ) {

                    alertBox.className =
                        "alert alert-danger";

                    alertBox.innerHTML =
                        "<i class='fas fa-exclamation-triangle me-2'></i>" +
                        "Please fill in all fields.";

                    alertBox.classList.remove("d-none");

                    return;

                }


                /* Name Validation */

                if (!namePattern.test(name)) {

                    alertBox.className =
                        "alert alert-danger";

                    alertBox.innerHTML =
                        "<i class='fas fa-user-times me-2'></i>" +
                        "Name must contain letters only.";

                    alertBox.classList.remove("d-none");

                    return;

                }


                /* Phone Validation */

                if (!phonePattern.test(phone)) {

                    alertBox.className =
                        "alert alert-danger";

                    alertBox.innerHTML =
                        "<i class='fas fa-phone-slash me-2'></i>" +
                        "Phone number must contain numbers only.";

                    alertBox.classList.remove("d-none");

                    return;

                }


                /* Email Validation */

                if (!emailPattern.test(email)) {

                    alertBox.className =
                        "alert alert-danger";

                    alertBox.innerHTML =
                        "<i class='fas fa-exclamation-circle me-2'></i>" +
                        "Please enter a valid email address.";

                    alertBox.classList.remove("d-none");

                    return;

                }


                /* Success */

                alertBox.className =
                    "alert alert-success";

                alertBox.innerHTML =
                    "<i class='fas fa-check-circle me-2'></i>" +
                    "Form submitted successfully! Thank you.";

                alertBox.classList.remove("d-none");


                contactForm.reset();

            }
        );

    }



    /* =========================================================
       5. STATS COUNTER
       ========================================================= */

    const counters =
        document.querySelectorAll("[data-target]");

    const statsSection =
        document.getElementById("stats-section");

    let animated = false;


    function startCounting() {

        counters.forEach(function (counter) {


            const target =
                Number(
                    counter.getAttribute("data-target")
                );


            const duration = 2000;


            const increment =
                target / (duration / 16);


            let current = 0;


            function updateCount() {

                current += increment;


                if (current < target) {

                    counter.innerText =
                        Math.ceil(current);

                    requestAnimationFrame(
                        updateCount
                    );

                } else {

                    counter.innerText =
                        target;

                }

            }


            updateCount();

        });

    }


    if (
        statsSection &&
        counters.length > 0
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting &&
                                !animated
                            ) {

                                startCounting();

                                animated = true;

                            }

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        observer.observe(statsSection);

    }



    /* =========================================================
       6. BACK TO TOP BUTTON
       ========================================================= */

    const backToTopBtn =
        document.getElementById("backToTop");


    if (backToTopBtn) {


        window.addEventListener(
            "scroll",
            function () {


                if (window.scrollY > 300) {

                    backToTopBtn.classList.remove(
                        "d-none"
                    );

                } else {

                    backToTopBtn.classList.add(
                        "d-none"
                    );

                }

            }
        );


        backToTopBtn.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }



    /* =========================================================
       7. EMAILJS ADMISSION FORM
       ========================================================= */

    const admissionForm =
        document.getElementById("admission-form");


    if (
        admissionForm &&
        typeof emailjs !== "undefined"
    ) {

        admissionForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const submitBtn =
                    admissionForm.querySelector(
                        'button[type="submit"]'
                    );


                if (!submitBtn) {

                    return;

                }


                const originalBtnText =
                    submitBtn.innerText;


                submitBtn.disabled = true;


                submitBtn.innerText =
                    "Sending...";


                emailjs
                    .sendForm(
                        "service_054rzsh",
                        "template_dvpo7vy",
                        admissionForm
                    )

                    .then(
                        function () {


                            alert(
                                "Enquiry Submitted Successfully!"
                            );


                            admissionForm.reset();


                            submitBtn.disabled =
                                false;


                            submitBtn.innerText =
                                originalBtnText;

                        }
                    )

                    .catch(
                        function (error) {


                            console.error(
                                "EmailJS Error:",
                                error
                            );


                            alert(
                                "Failed to send enquiry. Please try again."
                            );


                            submitBtn.disabled =
                                false;


                            submitBtn.innerText =
                                originalBtnText;

                        }
                    );

            }
        );

    }

});