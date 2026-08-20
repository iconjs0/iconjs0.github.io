/* =========================
   ICONS
========================= */

lucide.createIcons();
/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen =
            navLinks.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}


/* CLOSE MOBILE MENU AFTER CLICKING LINK */

const navigationLinks =
    document.querySelectorAll(".nav-link");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar =
    document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        const destination =
            link.getAttribute("href");

        if (
            destination ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================
   BACK TO TOP
========================= */

const backToTop =
    document.getElementById("back-to-top");


window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById(
        "contact-form"
    );

const formStatus =
    document.getElementById(
        "form-status"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    ".contact-submit"
                );


            const originalButtonText =
                submitButton.innerHTML;


            /* LOADING */

            submitButton.disabled = true;

            submitButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Sending...
            `;


            formStatus.textContent =
                "Sending your message...";

            formStatus.className =
                "form-status sending";


            try {

                const formData =
                    new FormData(
                        contactForm
                    );


                const response =
                    await fetch(
                        contactForm.action,
                        {

                            method: "POST",

                            body: formData,

                            headers: {
                                Accept:
                                    "application/json"
                            }

                        }
                    );


                if (response.ok) {

                    formStatus.textContent =
                        "Message sent successfully. I'll get back to you soon.";

                    formStatus.className =
                        "form-status success";


                    contactForm.reset();

                } else {

                    throw new Error(
                        "Form submission failed"
                    );

                }

            } catch (error) {

                formStatus.textContent =
                    "Message could not be sent. Please try again or contact me by email.";

                formStatus.className =
                    "form-status error";

            } finally {

                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    originalButtonText;

            }

        }
    );

}

document.addEventListener("click", function (event) {

    const clickedInsideNav =
        navLinks.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);

    if (
        navLinks.classList.contains("active") &&
        !clickedInsideNav &&
        !clickedMenuButton
    ) {

        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

});

document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        navLinks.classList.contains("active")
    ) {

        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.focus();

    }

});