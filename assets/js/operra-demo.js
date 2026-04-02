document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       VIEW SWITCHING
    ========================= */
    const sidebarLinks = document.querySelectorAll(".sidebar-link[data-view]");
    const panelLinks   = document.querySelectorAll(".panel-link[data-view]");
    const views        = document.querySelectorAll(".view");

    function showView(viewId) {
        views.forEach(function (v) {
            v.classList.toggle("view--hidden", v.id !== "view-" + viewId);
        });

        sidebarLinks.forEach(function (link) {
            link.classList.toggle("active", link.dataset.view === viewId);
        });

        // Scroll content to top
        const content = document.querySelector(".app-content");
        if (content) content.scrollTop = 0;
    }

    sidebarLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            showView(link.dataset.view);

            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 900) {
                sidebar.classList.remove("sidebar--open");
            }
        });
    });

    // Panel "View all →" links
    panelLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            showView(link.dataset.view);
        });
    });

    /* =========================
       MOBILE SIDEBAR TOGGLE
    ========================= */
    const sidebar       = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", function () {
            sidebar.classList.toggle("sidebar--open");
        });

        // Close sidebar on outside click
        document.addEventListener("click", function (e) {
            if (
                window.innerWidth <= 900 &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target)
            ) {
                sidebar.classList.remove("sidebar--open");
            }
        });
    }

    /* =========================
       APPROVAL ACTION BUTTONS
    ========================= */
    document.addEventListener("click", function (e) {
        const approveBtn = e.target.closest(".action-btn--approve");
        const rejectBtn  = e.target.closest(".action-btn--reject");

        if (approveBtn) {
            const row = approveBtn.closest("tr");
            if (row) {
                const name = row.querySelector(".td-name");
                showToast("Approved: " + (name ? name.textContent : "Request"), "success");
                row.style.opacity = "0.4";
                row.style.pointerEvents = "none";
            }
        }

        if (rejectBtn) {
            const row = rejectBtn.closest("tr");
            if (row) {
                const name = row.querySelector(".td-name");
                showToast("Rejected: " + (name ? name.textContent : "Request"), "error");
                row.style.opacity = "0.4";
                row.style.pointerEvents = "none";
            }
        }
    });

    /* =========================
       TOAST NOTIFICATIONS
    ========================= */
    function showToast(message, type) {
        const existing = document.querySelector(".demo-toast");
        if (existing) existing.remove();

        const toast = document.createElement("div");
        toast.className = "demo-toast demo-toast--" + type;
        toast.textContent = message;
        toast.style.cssText = [
            "position:fixed",
            "bottom:28px",
            "right:28px",
            "z-index:9999",
            "padding:12px 20px",
            "border-radius:10px",
            "font-size:0.875rem",
            "font-weight:600",
            "font-family:Inter,system-ui,sans-serif",
            "box-shadow:0 8px 24px rgba(0,0,0,0.14)",
            "animation:slideInToast 0.25s ease",
            type === "success"
                ? "background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0"
                : "background:#fef2f2;color:#dc2626;border:1px solid #fecaca"
        ].join(";");

        document.body.appendChild(toast);

        setTimeout(function () {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.3s";
            setTimeout(function () { toast.remove(); }, 300);
        }, 3500);
    }

    // Inject toast animation keyframe
    const style = document.createElement("style");
    style.textContent = "@keyframes slideInToast{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}";
    document.head.appendChild(style);

    /* =========================
       SEARCH (demo — no-op filter)
    ========================= */
    const searchInput = document.querySelector(".topbar-search input");
    if (searchInput) {
        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && searchInput.value.trim()) {
                showToast("Search is disabled in demo mode", "error");
                searchInput.value = "";
            }
        });
    }

    /* =========================
       NEW WORKFLOW / NEW RULE BUTTONS
    ========================= */
    document.addEventListener("click", function (e) {
        const actionBtn = e.target.closest(".btn-action:not(.btn-action--outline)");
        if (actionBtn && (actionBtn.textContent.includes("New Workflow") || actionBtn.textContent.includes("New Rule"))) {
            showToast("Creating new items is disabled in demo mode", "error");
        }
    });

});
