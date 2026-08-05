// ===============================
// HEISTSIXIN ARCHIVE V2
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------
    // Custom Cursor
    // -------------------------------

    const cursor = document.getElementById("cursor");

    document.addEventListener("mousemove", (e) => {

        if (cursor) {

            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";

        }

    });

    // -------------------------------
    // Scroll Reveal
    // -------------------------------

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0px)";

            }

        });

    }, {

        threshold: 0.15

    });

    document.querySelectorAll(".section, .book").forEach((element) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(40px)";
        element.style.transition = "0.8s ease";

        observer.observe(element);

    });

    // -------------------------------
    // Smooth Hover Glow
    // -------------------------------

    document.querySelectorAll(".book").forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.style.boxShadow =
                "0 20px 40px rgba(212,176,106,.18)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.boxShadow = "none";

        });

    });

    console.log("HEISTSIXIN ARCHIVE V2 Loaded");

});
