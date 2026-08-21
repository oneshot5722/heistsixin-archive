/* ===================================
   HEISTSIXIN V7
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

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.15 }
        );

        document
            .querySelectorAll(".section,.book-card,.featured-book")
            .forEach((el) => {
                el.classList.add("hidden-section");
                observer.observe(el);
            });
    }


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

            particleContainer.appendChild(particle);
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
                window.location.href = openBook.href;
            }, 850);

        });

    }


    /* =================================================
       HEISTSIXIN ANALYTICS
    ================================================= */

    /* ===========================
       VISITOR ID
    =========================== */

    const visitorIdKey =
        "heistsixin_visitor_id";

    let visitorId =
        localStorage.getItem(visitorIdKey);

    if (!visitorId) {

        visitorId =
            window.crypto &&
            typeof window.crypto.randomUUID === "function"
                ? window.crypto.randomUUID()
                : Date.now().toString(36) +
                  "-" +
                  Math.random().toString(36).substring(2);

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

        sessionId =
            window.crypto &&
            typeof window.crypto.randomUUID === "function"
                ? window.crypto.randomUUID()
                : Date.now().toString(36) +
                  "-" +
                  Math.random().toString(36).substring(2);

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
        source: params.get("utm_source"),
        medium: params.get("utm_medium"),
        campaign: params.get("utm_campaign"),
        term: params.get("utm_term"),
        content: params.get("utm_content")
    };


    /* ===========================
       CONNECTION
    =========================== */

    let connection = null;

    if (navigator.connection) {

        connection = {
            effectiveType:
                navigator.connection.effectiveType || null,

            downlink:
                navigator.connection.downlink ?? null,

            rtt:
                navigator.connection.rtt ?? null,

            saveData:
                navigator.connection.saveData ?? null
        };
    }


    /* ===========================
       DISPLAY
    =========================== */

    const screenWidth =
        Number.isFinite(window.screen.width)
            ? window.screen.width
            : null;

    const screenHeight =
        Number.isFinite(window.screen.height)
            ? window.screen.height
            : null;

    const viewportWidth =
        Number.isFinite(window.innerWidth)
            ? window.innerWidth
            : null;

    const viewportHeight =
        Number.isFinite(window.innerHeight)
            ? window.innerHeight
            : null;

    const pixelRatio =
        Number.isFinite(window.devicePixelRatio)
            ? window.devicePixelRatio
            : null;

    const colorDepth =
        Number.isFinite(window.screen.colorDepth)
            ? window.screen.colorDepth
            : null;

    const pixelDepth =
        Number.isFinite(window.screen.pixelDepth)
            ? window.screen.pixelDepth
            : null;


    /* ===========================
       ORIENTATION
    =========================== */

    let orientation = null;

    if (screen.orientation) {
        orientation =
            screen.orientation.type || null;
    } else if (window.orientation !== undefined) {
        orientation =
            String(window.orientation);
    }


    /* ===========================
       LANGUAGE
    =========================== */

    const language =
        navigator.language || null;

    const languageList =
        Array.isArray(navigator.languages)
            ? Array.from(navigator.languages)
            : null;


    /* ===========================
       TIME / LOCALE
    =========================== */

    const intlOptions =
        Intl.DateTimeFormat().resolvedOptions();

    const timezone =
        intlOptions.timeZone || null;

    const dateTimeLocale =
        intlOptions.locale || null;

    const timezoneOffsetMinutes =
        -new Date().getTimezoneOffset();


    /* ===========================
       DO NOT TRACK
    =========================== */

    const doNotTrack =
        navigator.doNotTrack ??
        window.doNotTrack ??
        null;


    /* ===========================
       PLATFORM / BROWSER
    =========================== */

    const platform =
        navigator.platform || null;

    const vendor =
        navigator.vendor || null;

    const product =
        navigator.product || null;

    const appName =
        navigator.appName || null;

    const appVersion =
        navigator.appVersion || null;


    /* ===========================
       DEVICE
    =========================== */

    const maxTouchPoints =
        Number.isFinite(navigator.maxTouchPoints)
            ? navigator.maxTouchPoints
            : 0;

    const hardwareConcurrency =
        Number.isFinite(
            navigator.hardwareConcurrency
        )
            ? navigator.hardwareConcurrency
            : null;

    const deviceMemory =
        Number.isFinite(
            navigator.deviceMemory
        )
            ? navigator.deviceMemory
            : null;

    const cookieEnabled =
        typeof navigator.cookieEnabled === "boolean"
            ? navigator.cookieEnabled
            : null;

    const onlineStatus =
        typeof navigator.onLine === "boolean"
            ? navigator.onLine
            : null;

    const touchSupport =
        maxTouchPoints > 0;


    /* ===========================
       DEVICE TYPE
    =========================== */

    let deviceType = "desktop";

    if (maxTouchPoints > 0) {

        const shortestSide =
            Math.min(
                window.screen.width,
                window.screen.height
            );

        if (shortestSide <= 600) {
            deviceType = "mobile";
        } else {
            deviceType = "tablet";
        }
    }


    /* ===========================
       HARDWARE ARCHITECTURE
    =========================== */

    const hardwareArchitecture =
        navigator.userAgentData &&
        navigator.userAgentData.getHighEntropyValues
            ? null
            : null;


    /* ===========================
       BROWSER CAPABILITIES
    =========================== */

    const canvasSupport = (() => {

        try {
            const canvas =
                document.createElement("canvas");

            return !!(
                canvas &&
                canvas.getContext
            );
        } catch {
            return false;
        }

    })();


    const webglSupport = (() => {

        try {

            const canvas =
                document.createElement("canvas");

            return !!(
                canvas.getContext("webgl") ||
                canvas.getContext("experimental-webgl")
            );

        } catch {
            return false;
        }

    })();


    /* ===========================
       BROWSER / AUTOMATION
    =========================== */

    const navigatorWebdriver =
        navigator.webdriver === true;

    const automationSignals = {

        webdriver:
            navigatorWebdriver,

        languageCount:
            languageList
                ? languageList.length
                : null,

        hardwareConcurrency,

        maxTouchPoints

    };


    /* ===========================
       PREFERENCES
    =========================== */

    const prefersDark =
        window.matchMedia
            ? window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
            : null;

    const prefersReducedMotion =
        window.matchMedia
            ? window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
            : null;

    const prefersReducedTransparency =
        window.matchMedia
            ? window.matchMedia(
                "(prefers-reduced-transparency: reduce)"
            ).matches
            : null;

    const preferences = {

        colorScheme:
            prefersDark === null
                ? null
                : prefersDark
                    ? "dark"
                    : "light",

        reducedMotion:
            prefersReducedMotion,

        reducedTransparency:
            prefersReducedTransparency
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

        preciseLatitude: null,
        preciseLongitude: null,
        locationAccuracy: null,
        locationSource: "not-requested",
        locationPermission: "unknown"
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

                    if (error.code === 1) {
                        locationData.locationPermission =
                            "denied";
                    } else if (error.code === 2) {
                        locationData.locationPermission =
                            "unavailable";
                    } else if (error.code === 3) {
                        locationData.locationPermission =
                            "timeout";
                    }

                    resolve();
                },

                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    };


    /* ===========================
       FINAL CLIENT PAYLOAD
    =========================== */

    const buildAnalyticsData = () => {

        return {

            visitorId,
            sessionId,

            page:
                window.location.pathname,

            title:
                document.title,

            referrer:
                document.referrer || "direct",

            utm,

            language,

            languages:
                languageList,

            screenWidth,
            screenHeight,
            viewportWidth,
            viewportHeight,
            pixelRatio,

            colorDepth,
            pixelDepth,
            orientation,

            platform,

            maxTouchPoints,
            hardwareConcurrency,
            deviceMemory,

            cookieEnabled,
            online: onlineStatus,

            touchSupport,
            deviceType,

            timezone,
            timezoneOffsetMinutes,
            dateTimeLocale,

            doNotTrack,

            browserVendor: vendor,
            browserProduct: product,
            browserAppName: appName,
            browserAppVersion: appVersion,

            hardwareArchitecture,

            canvasSupport,
            webglSupport,

            navigatorWebdriver,
            webdriver: navigatorWebdriver,
            automation: navigatorWebdriver,

            automationSignals,

            connection,

            preferences,

            performance:
                getPerformanceData(),

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

            consent: {
                preciseLocation:
                    locationData.locationPermission === "granted"
            },

            timestamp:
                new Date().toISOString()
        };
    };


    /* ===========================
       SEND ANALYTICS
    =========================== */

    const sendAnalytics = async () => {

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
                            buildAnalyticsData()
                        ),

                    keepalive:
                        true
                }
            );

        } catch {
            /*
             * Analytics must never
             * break the website.
             */
        }
    };


    /* ===========================
       START TELEMETRY
    =========================== */

    requestPreciseLocation()
        .finally(() => {
            sendAnalytics();
        });

});
