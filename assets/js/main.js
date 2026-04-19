document.addEventListener("DOMContentLoaded", function () {
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navItems = document.querySelectorAll(".has-mega-menu");

    function setMegaMenuState(item, isOpen) {
        item.classList.toggle("open", isOpen);

        const trigger = item.querySelector(".nav-trigger");
        if (trigger) {
            trigger.setAttribute("aria-expanded", String(isOpen));
        }
    }

    function closeAllMegaMenus() {
        navItems.forEach(function (item) {
            setMegaMenuState(item, false);
        });
    }

    function setMobileMenuState(isOpen) {
        if (!mobileMenu || !mobileToggle) return;

        mobileMenu.classList.toggle("show", isOpen);
        if (window.innerWidth <= 980) {
            mobileMenu.style.display = isOpen ? "block" : "none";
        } else {
            mobileMenu.style.display = "";
        }
        mobileToggle.setAttribute("aria-expanded", String(isOpen));
        mobileToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    }

    /* =========================
       MOBILE MENU TOGGLE
    ========================= */
    if (mobileToggle && mobileMenu) {
        mobileToggle.setAttribute("aria-expanded", "false");
        setMobileMenuState(false);
        mobileToggle.addEventListener("click", function () {
            setMobileMenuState(!mobileMenu.classList.contains("show"));
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

                closeAllMegaMenus();

                if (!isOpen) {
                    setMegaMenuState(item, true);
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
            closeAllMegaMenus();
        }

        if (!clickedMobileToggle && !clickedMobileMenu && mobileMenu) {
            setMobileMenuState(false);
        }
    });

    /* =========================
       CLOSE MENUS ON RESIZE
    ========================= */
    window.addEventListener("resize", function () {
        if (window.innerWidth > 980 && mobileMenu) {
            setMobileMenuState(false);
        }

        if (window.innerWidth <= 980) {
            closeAllMegaMenus();
            if (mobileMenu) {
                mobileMenu.style.display = mobileMenu.classList.contains("show") ? "block" : "none";
            }
        }
    });

    /* =========================
       ESC KEY CLOSE
    ========================= */
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeAllMegaMenus();
            if (mobileMenu) {
                setMobileMenuState(false);
            }
        }
    });

    /* =========================
       CONTACT FORM
    ========================= */
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = contactForm.querySelector("[name='name']").value.trim();
            const email = contactForm.querySelector("[name='email']").value.trim();
            const message = contactForm.querySelector("[name='message']").value.trim();

            if (!name || !email || !message) {
                showFormMessage(contactForm, "Please fill in all required fields.", "error");
                return;
            }

            showFormMessage(contactForm, "Thanks for reaching out — we'll be in touch soon.", "success");
            contactForm.reset();
        });
    }

    /* =========================
       LOGIN FORM
    ========================= */
    const loginForm = document.querySelector(".login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email    = loginForm.querySelector("[name='email']").value.trim();
            const password = loginForm.querySelector("[name='password']").value.trim();

            if (!email || !password) {
                showFormMessage(loginForm, "Please enter your email and password.", "error");
                return;
            }

            if (email === "demo@ventryx.com" && password === "demo") {
                showFormMessage(loginForm, "Loading your demo workspace…", "success");
                setTimeout(function () {
                    window.location.href = "operra-demo.html";
                }, 800);
                return;
            }

            showFormMessage(loginForm, "Invalid credentials. Try the demo account above.", "error");
        });
    }

    /* =========================
       DEMO AUTOFILL BUTTON
    ========================= */
    const demoFillBtn = document.getElementById("demoFillBtn");
    if (demoFillBtn) {
        demoFillBtn.addEventListener("click", function () {
            const emailInput    = document.getElementById("email");
            const passwordInput = document.getElementById("password");
            if (emailInput)    emailInput.value    = "demo@ventryx.com";
            if (passwordInput) passwordInput.value = "demo";
            emailInput && emailInput.focus();
        });
    }

    /* =========================
       FORM MESSAGE HELPER
    ========================= */
    function showFormMessage(form, text, type) {
        const existing = form.querySelector(".form-message");
        if (existing) existing.remove();

        const msg = document.createElement("p");
        msg.className = "form-message form-message--" + type;
        msg.textContent = text;
        msg.style.cssText =
            "margin-top:12px;padding:10px 14px;border-radius:8px;font-size:0.88rem;font-weight:500;" +
            (type === "success"
                ? "background:rgba(34,197,94,0.1);color:#15803d;border:1px solid rgba(34,197,94,0.25);"
                : "background:rgba(239,68,68,0.1);color:#dc2626;border:1px solid rgba(239,68,68,0.25);");

        form.appendChild(msg);

        if (type === "success") {
            setTimeout(function () {
                msg.remove();
            }, 5000);
        }
    }
});
