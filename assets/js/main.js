document.addEventListener("DOMContentLoaded", function () {
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navItems = document.querySelectorAll(".has-mega-menu");

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("show");
        });
    }

    navItems.forEach((item) => {
        const trigger = item.querySelector(".nav-trigger");

        if (!trigger) return;

        trigger.addEventListener("click", function (e) {
            if (window.innerWidth > 1200) {
                e.preventDefault();

                navItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("open");
                    }
                });

                item.classList.toggle("open");
            }
        });
    });

    document.addEventListener("click", function (e) {
        const clickedInsideNav = e.target.closest(".has-mega-menu");

        if (!clickedInsideNav) {
            navItems.forEach((item) => item.classList.remove("open"));
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1200 && mobileMenu) {
            mobileMenu.classList.remove("show");
        }
    });
});