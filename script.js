/* ===================================
   HEISTSIXIN V5
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       LOADER
    =========================== */

    const loader = document.getElementById("loader");

    if (loader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                loader.style.opacity = "0";
                loader.style.visibility = "hidden";

            }, 2200);

        });

    }


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
       SCROLL REVEAL
    =========================== */

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    document
        .querySelectorAll(
            ".section,.book-card,.featured-book"
        )
        .forEach((el) => {

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

    const hero =
        document.querySelector(".hero-gradient");

    if (hero) {

        document.addEventListener("mousemove", (e) => {

            const x =
                (e.clientX / window.innerWidth - 0.5) * 30;

            const y =
                (e.clientY / window.innerHeight - 0.5) * 30;

            hero.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }


    /* ===========================
       FLOATING PARTICLES
    =========================== */

    const particleContainer =
        document.getElementById("particles");

    if (particleContainer) {

        for (let i = 0; i < 60; i++) {

            const particle =
                document.createElement("div");

            particle.className = "particle";

            particle.style.left =
                Math.random() * 100 + "%";

            const size =
                Math.random() * 3 + 1;

            particle.style.width =
                size + "px";

            particle.style.height =
                size + "px";

            particle.style.animationDuration =
                (15 + Math.random() * 20) + "s";

            particle.style.animationDelay =
                (-Math.random() * 20) + "s";

            particle.style.opacity =
                Math.random() * 0.8 + 0.2;

            particleContainer.appendChild(
                particle
            );

        }

    }


    /* ===========================
       MOUSE SPOTLIGHT
    =========================== */

    document.addEventListener("mousemove", (e) => {

        document.body.style.setProperty(
            "--mouse-x",
            e.clientX + "px"
        );

        document.body.style.setProperty(
            "--mouse-y",
            e.clientY + "px"
        );

    });


    /* ===========================
       BOOK OPENING
    =========================== */

    const openBook =
        document.getElementById("openBook");

    const pageTransition =
        document.getElementById("pageTransition");

    if (openBook) {

        openBook.addEventListener("click", (e) => {

            e.preventDefault();

            openBook.classList.add("opening");

            if (pageTransition) {

                pageTransition.classList.add("active");

            }

            setTimeout(() => {

                window.location.href =
                    openBook.href;

            }, 850);

        });

    }


    /* =================================================
       HEISTSIXIN ANALYTICS
    ================================================= */


    /* ===========================
       ANONYMOUS VISITOR ID
    =========================== */

    const visitorIdKey =
        "heistsixin_visitor_id";

    let visitorId =
        localStorage.getItem(visitorIdKey);


    if (!visitorId) {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID ===
                "function"
        ) {

            visitorId =
                window.crypto.randomUUID();

        } else {

            visitorId =
                Date.now().toString(36) +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(2);

        }

        localStorage.setItem(
            visitorIdKey,
            visitorId
        );

    }


    /* ===========================
       URL / CAMPAIGN DATA
    =========================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const utm = {

        source:
            params.get("utm_source"),

        medium:
            params.get("utm_medium"),

        campaign:
            params.get("utm_campaign"),

        term:
            params.get("utm_term"),

        content:
            params.get("utm_content")

    };


    /* ===========================
       NETWORK INFORMATION
    =========================== */

    let connection = null;

    if (navigator.connection) {

        connection = {

            effectiveType:
                navigator.connection
                    .effectiveType || null,

            downlink:
                navigator.connection
                    .downlink ?? null,

            rtt:
                navigator.connection
                    .rtt ?? null,

            saveData:
                navigator.connection
                    .saveData ?? null

        };

    }


    /* ===========================
       ANALYTICS DATA
    =========================== */

    const analyticsData = {

        /* Visitor */

        visitorId:
            visitorId,


        /* Page */

        page:
            window.location.pathname,

        title:
            document.title,


        /* Traffic */

        referrer:
            document.referrer || "direct",

        utm:
            utm,


        /* Language */

        language:
            navigator.language || null,

        languages:
            navigator.languages
                ? navigator.languages.join(",")
                : null,


        /* Display */

        screenWidth:
            window.screen.width,

        screenHeight:
            window.screen.height,

        viewportWidth:
            window.innerWidth,

        viewportHeight:
            window.innerHeight,

        pixelRatio:
            window.devicePixelRatio || 1,


        /* Device */

        platform:
            navigator.platform || null,

        maxTouchPoints:
            navigator.maxTouchPoints || 0,

        hardwareConcurrency:
            navigator.hardwareConcurrency ||
            null,

        deviceMemory:
            navigator.deviceMemory ||
            null,


        /* Browser */

        userAgent:
            navigator.userAgent ||
            null,


        /* Browser capabilities */

        cookieEnabled:
            navigator.cookieEnabled,

        online:
            navigator.onLine,


        /* Network */

        connection:
            connection,


        /* Timezone */

        timezone:
            Intl.DateTimeFormat()
                .resolvedOptions()
                .timeZone || null,


        /* Timestamp */

        timestamp:
            new Date().toISOString()

    };


    /* ===========================
       SEND ANALYTICS
    =========================== */

    fetch("/api/analytics", {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(
                analyticsData
            ),

        keepalive: true

    }).catch(() => {

        /*
         * Analytics should NEVER
         * break the main website.
         */

    });


});
