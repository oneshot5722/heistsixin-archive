/* ===================================
   HEISTSIXIN V3
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       LOADER
    =========================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
            }, 2200);
        }
    });

    /* ===========================
       CUSTOM CURSOR
    =========================== */

    const cursor = document.getElementById("cursor");

    if (cursor) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });
    }

    /* ===========================
       SCROLL ANIMATIONS
    =========================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll(".section,.book-card,.featured-book").forEach(el => {
        el.classList.add("hidden-section");
        observer.observe(el);
    });

    /* ===========================
       NAVBAR
    =========================== */

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {

        if (!nav) return;

        if (window.scrollY > 40) {
            nav.classList.add("nav-scrolled");
        } else {
            nav.classList.remove("nav-scrolled");
        }

    });

    /* ===========================
       HERO PARALLAX
    =========================== */

    const hero = document.querySelector(".hero-gradient");

    document.addEventListener("mousemove", (e) => {

        if (!hero) return;

        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        hero.style.transform = `translate(${x}px, ${y}px)`;

    });

    /* ===========================
       FLOATING PARTICLES
    =========================== */

    const particleContainer = document.getElementById("particles");

    if (particleContainer) {

        for (let i = 0; i < 60; i++) {

            const p = document.createElement("div");

            p.className = "particle";

            p.style.left = Math.random() * 100 + "%";

            const size = Math.random() * 3 + 1;

            p.style.width = size + "px";
            p.style.height = size + "px";

            p.style.animationDuration = (15 + Math.random() * 20) + "s";
            p.style.animationDelay = (-Math.random() * 20) + "s";
            p.style.opacity = Math.random() * 0.8 + 0.2;

            particleContainer.appendChild(p);

        }

    }

});
