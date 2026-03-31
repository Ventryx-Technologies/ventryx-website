document.addEventListener("DOMContentLoaded", function () {
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navItems = document.querySelectorAll(".has-mega-menu");

    /* =========================
       MOBILE MENU TOGGLE
    ========================= */
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("show");
        });
    }

    /* =========================
       DESKTOP MEGA MENU (CLICK TO OPEN)
    ========================= */
    navItems.forEach((item) => {
        const trigger = item.querySelector(".nav-trigger");

        if (!trigger) return;

        trigger.addEventListener("click", function (e) {
            if (window.innerWidth > 980) {
                e.preventDefault();

                const isOpen = item.classList.contains("open");

                navItems.forEach((otherItem) => {
                    otherItem.classList.remove("open");
                });

                if (!isOpen) {
                    item.classList.add("open");
                }
            }
        });
    });

    /* =========================
       CLOSE MENUS WHEN CLICKING OUTSIDE
    ========================= */
    document.addEventListener("click", function (e) {
        const clickedInsideMegaMenu = e.target.closest(".has-mega-menu");
        const clickedMobileToggle = e.target.closest(".mobile-menu-toggle");
        const clickedMobileMenu = e.target.closest(".mobile-menu");

        if (!clickedInsideMegaMenu) {
            navItems.forEach((item) => item.classList.remove("open"));
        }

        if (!clickedMobileToggle && !clickedMobileMenu && mobileMenu) {
            mobileMenu.classList.remove("show");
        }
    });

    /* =========================
       CLOSE MENUS ON RESIZE
    ========================= */
    window.addEventListener("resize", function () {
        if (window.innerWidth > 980 && mobileMenu) {
            mobileMenu.classList.remove("show");
        }

        if (window.innerWidth <= 980) {
            navItems.forEach((item) => item.classList.remove("open"));
        }
    });

    /* =========================
       ESC KEY CLOSE
    ========================= */
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            navItems.forEach((item) => item.classList.remove("open"));
            if (mobileMenu) {
                mobileMenu.classList.remove("show");
            }
        }
    });
});