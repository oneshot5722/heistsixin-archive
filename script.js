document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Custom Cursor
    // ==========================

    const cursor = document.getElementById("cursor");

    document.addEventListener("mousemove", (e) => {

        if (cursor) {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        }

    });

    // ==========================
    // Fade-in Animation
    // ==========================

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.animate(

                    [
                        {
                            opacity: 0,
                            transform: "translateY(40px)"
                        },

                        {
                            opacity: 1,
                            transform: "translateY(0px)"
                        }

                    ],

                    {
                        duration: 800,
                        fill: "forwards",
                        easing: "ease-out"
                    }

                );

                observer.unobserve(entry.target);

            }

        });

    });

    document.querySelectorAll(".section, .book").forEach((element) => {
        observer.observe(element);
    });

    // ==========================
    // Book Hover Glow
    // ==========================

    document.querySelectorAll(".book").forEach((book) => {

        book.addEventListener("mouseenter", () => {

            book.style.boxShadow =
                "0 0 35px rgba(217,192,138,0.18)";

        });

        book.addEventListener("mouseleave", () => {

            book.style.boxShadow = "none";

        });

    });

    console.log("HEISTSIXIN ARCHIVE loaded.");

});
