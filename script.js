/* ===================================
   HEISTSIXIN V6
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
       SESSION ID
    =========================== */

    const sessionIdKey =
        "heistsixin_session_id";

    let sessionId =
        sessionStorage.getItem(sessionIdKey);

    if (!sessionId) {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID ===
                "function"
        ) {

            sessionId =
                window.crypto.randomUUID();

        } else {

            sessionId =
                Date.now().toString(36) +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(2);

        }

        sessionStorage.setItem(
            sessionIdKey,
            sessionId
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
       BROWSER PREFERENCES
    =========================== */

    const preferences = {

        colorScheme:

            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light",

        reducedMotion:

            window.matchMedia
                ? window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                : null,

        reducedTransparency:

            window.matchMedia
                ? window.matchMedia(
                    "(prefers-reduced-transparency: reduce)"
                ).matches
                : null

    };


    /* ===========================
       NAVIGATOR / AUTOMATION
    =========================== */

    const navigatorWebdriver =
        navigator.webdriver === true;

    const automationSignals = {

        webdriver:
            navigatorWebdriver,

        languageCount:
            Array.isArray(
                navigator.languages
            )
                ? navigator.languages.length
                : null,

        hardwareConcurrency:
            navigator.hardwareConcurrency ||
            null,

        maxTouchPoints:
            navigator.maxTouchPoints ||
            0

    };


    /* ===========================
       PERFORMANCE
    =========================== */

    const getPerformanceData = () => {

        if (!window.performance) {
            return null;
        }

        const navigation =
            performance.getEntriesByType(
                "navigation"
            )[0];

        if (!navigation) {
            return null;
        }

        return {

            type:
                navigation.type || null,

            startTime:
                navigation.startTime ?? null,

            duration:
                navigation.duration ?? null,

            domInteractive:
                navigation.domInteractive ?? null,

            domContentLoaded:
                navigation.domContentLoadedEventEnd ?? null,

            loadEventEnd:
                navigation.loadEventEnd ?? null,

            responseStart:
                navigation.responseStart ?? null,

            responseEnd:
                navigation.responseEnd ?? null,

            transferSize:
                navigation.transferSize ?? null,

            encodedBodySize:
                navigation.encodedBodySize ?? null,

            decodedBodySize:
                navigation.decodedBodySize ?? null

        };

    };


    /* ===========================
       PRECISE LOCATION
       =========================== */

    const locationData = {

        preciseLatitude:
            null,

        preciseLongitude:
            null,

        locationAccuracy:
            null,

        locationSource:
            "not-requested",

        locationPermission:
            "unknown"

    };


    const requestPreciseLocation = () => {

        return new Promise((resolve) => {

            if (!navigator.geolocation) {

                locationData.locationSource =
                    "unsupported";

                locationData.locationPermission =
                    "unsupported";

                resolve();

                return;

            }

            navigator.geolocation.getCurrentPosition(

                (position) => {

                    locationData.preciseLatitude =
                        position.coords.latitude;

                    locationData.preciseLongitude =
                        position.coords.longitude;

                    locationData.locationAccuracy =
                        position.coords.accuracy;

                    locationData.locationSource =
                        "browser-geolocation";

                    locationData.locationPermission =
                        "granted";

                    resolve();

                },

                (error) => {

                    locationData.locationSource =
                        "unavailable";

                    if (
                        error.code === 1
                    ) {

                        locationData.locationPermission =
                            "denied";

                    }
                    else if (
                        error.code === 2
                    ) {

                        locationData.locationPermission =
                            "unavailable";

                    }
                    else if (
                        error.code === 3
                    ) {

                        locationData.locationPermission =
                            "timeout";

                    }

                    resolve();

                },

                {

                    enableHighAccuracy:
                        true,

                    timeout:
                        10000,

                    maximumAge:
                        0

                }

            );

        });

    };


    /* =================================================
       SEND ANALYTICS
    ================================================= */

    const sendAnalytics = async () => {

        const analyticsData = {

            /* Visitor */

            visitorId:
                visitorId,

            sessionId:
                sessionId,


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
                    ? Array.from(
                        navigator.languages
                    )
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


            /* Automation */

            navigatorWebdriver:
                navigatorWebdriver,

            webdriver:
                navigatorWebdriver,

            automation:
                navigatorWebdriver,

            automationSignals:
                automationSignals,


            /* Network */

            connection:
                connection,


            /* Preferences */

            preferences:
                preferences,


            /* Performance */

            performance:
                getPerformanceData(),


            /* Precise location */

            preciseLatitude:
                locationData.preciseLatitude,

            preciseLongitude:
                locationData.preciseLongitude,

            locationAccuracy:
                locationData.locationAccuracy,

            locationSource:
                locationData.locationSource,

            locationPermission:
                locationData.locationPermission,


            /* Timezone */

            timezone:
                Intl.DateTimeFormat()
                    .resolvedOptions()
                    .timeZone || null,


            /* Timestamp */

            timestamp:
                new Date().toISOString()

        };


        try {

            await fetch(
                "/api/analytics",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            analyticsData
                        ),

                    keepalive:
                        true

                }
            );

        } catch (error) {

            /*
             * Analytics should NEVER
             * break the website.
             */

        }

    };


    /* ===========================
       LOCATION + ANALYTICS START
    =========================== */

    requestPreciseLocation()
        .finally(() => {

            sendAnalytics();

        });

});
