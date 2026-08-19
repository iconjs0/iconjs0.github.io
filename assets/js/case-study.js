/* =========================
   ICONS
========================= */

lucide.createIcons();



/* =========================
   NAVBAR
========================= */

const navbar =
    document.getElementById("navbar");


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 40) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);



/* =========================
   MOBILE MENU
========================= */

const menuToggle =
    document.getElementById(
        "menu-toggle"
    );

const navLinks =
    document.getElementById(
        "nav-links"
    );


menuToggle.addEventListener(
    "click",
    function () {

        menuToggle.classList.toggle(
            "active"
        );

        navLinks.classList.toggle(
            "active"
        );

    }
);



/* =========================
   BACK TO TOP
========================= */

const backToTop =
    document.getElementById(
        "back-to-top"
    );


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);

/* =========================
   EVIDENCE LIGHTBOX
========================= */

const evidenceButtons =
    document.querySelectorAll(
        ".evidence-view"
    );

const lightbox =
    document.getElementById(
        "image-lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightbox-image"
    );

const lightboxCaption =
    document.getElementById(
        "lightbox-caption"
    );

const lightboxClose =
    document.getElementById(
        "lightbox-close"
    );


function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


evidenceButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const evidenceCard =
                    button.closest(
                        ".evidence-card"
                    );

                const image =
                    evidenceCard.querySelector(
                        "img"
                    );

                const title =
                    evidenceCard.querySelector(
                        "h3"
                    );

                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt;

                lightboxCaption.textContent =
                    title.textContent;

                lightbox.classList.add(
                    "active"
                );

                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains(
                "active"
            )
        ) {

            closeLightbox();

        }

    }
);

/* =========================
   MISSING EVIDENCE HANDLING
========================= */

const evidenceImages =
    document.querySelectorAll(
        ".evidence-image img"
    );


evidenceImages.forEach(function (image) {

    image.addEventListener(
        "error",
        function () {

            const imageContainer =
                image.closest(
                    ".evidence-image"
                );

            imageContainer.classList.add(
                "evidence-missing"
            );

            imageContainer.innerHTML = `
                <div class="evidence-placeholder">

                    <i data-lucide="image-off"></i>

                    <span>
                        Evidence image coming soon
                    </span>

                </div>
            `;

            lucide.createIcons();

        }
    );

});