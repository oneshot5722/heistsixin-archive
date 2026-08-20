export default async function handler(req, res) {

    /* ==========================================
       HEISTSIXIN TELEMETRY + TRAFFIC CLASSIFIER
    ========================================== */

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            error: "Method not allowed"
        });
    }

    try {

        const headers = req.headers || {};

        const data =
            typeof req.body === "string"
                ? JSON.parse(req.body || "{}")
                : (req.body || {});

        /* ==========================================
           ENVIRONMENT
        ========================================== */

        const SUPABASE_URL =
            process.env.SUPABASE_URL;

        const SUPABASE_SECRET =
            process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!SUPABASE_URL || !SUPABASE_SECRET) {
            console.error(
                "Missing Supabase environment variables."
            );

            return res.status(500).json({
                success: false,
                error: "Analytics configuration error"
            });
        }

        /* ==========================================
           PAYLOAD VALIDATION
        ========================================== */

        const serialized =
            JSON.stringify(data);

        if (serialized.length > 100000) {
            return res.status(413).json({
                success: false,
                error: "Telemetry payload too large"
            });
        }

        /* ==========================================
           CLIENT IP
        ========================================== */

        const forwardedFor =
            headers["x-forwarded-for"];

        const ip =
            forwardedFor
                ? forwardedFor
                    .split(",")[0]
                    .trim()
                : (
                    headers["x-real-ip"] ||
                    null
                );

        /* ==========================================
           USER AGENT
        ========================================== */

        const userAgent =
            String(
                data.userAgent ||
                headers["user-agent"] ||
                ""
            );

        const ua =
            userAgent.toLowerCase();

        /* ==========================================
           AUTOMATION SIGNALS
        ========================================== */

        const detectionSignals = [];

        let isHeadless = false;
        let isBot = false;
        let isAutomated = false;

        if (
            ua.includes("headlesschrome") ||
            ua.includes("headless")
        ) {
            isHeadless = true;
            isAutomated = true;

            detectionSignals.push(
                "headless-user-agent"
            );
        }

        const botPatterns = [
            "bot",
            "crawler",
            "spider",
            "slurp",
            "bingpreview",
            "facebookexternalhit",
            "linkedinbot",
            "twitterbot",
            "discordbot",
            "telegrambot",
            "google-inspectiontool"
        ];

        for (const pattern of botPatterns) {

            if (ua.includes(pattern)) {

                isBot = true;
                isAutomated = true;

                detectionSignals.push(
                    `ua:${pattern}`
                );

            }

        }

        /* ==========================================
           CLIENT-SIDE AUTOMATION SIGNALS
        ========================================== */

        if (
            data.webdriver === true ||
            data.automation === true
        ) {

            isAutomated = true;

            detectionSignals.push(
                "client-automation-flag"
            );

        }

        if (
            data.navigatorWebdriver === true
        ) {

            isAutomated = true;

            detectionSignals.push(
                "navigator-webdriver"
            );

        }

        /* ==========================================
           SUSPICIOUS DISPLAY / HEADLESS SIGNALS
        ========================================== */

        const screenWidth =
            Number.isFinite(
                Number(data.screenWidth)
            )
                ? Number(data.screenWidth)
                : null;

        const screenHeight =
            Number.isFinite(
                Number(data.screenHeight)
            )
                ? Number(data.screenHeight)
                : null;

        const viewportWidth =
            Number.isFinite(
                Number(data.viewportWidth)
            )
                ? Number(data.viewportWidth)
                : null;

        const viewportHeight =
            Number.isFinite(
                Number(data.viewportHeight)
            )
                ? Number(data.viewportHeight)
                : null;

        if (
            screenWidth === 800 &&
            screenHeight === 600 &&
            viewportWidth === 1280 &&
            viewportHeight === 800
        ) {

            detectionSignals.push(
                "automation-like-display-profile"
            );

        }

        /* ==========================================
           TRAFFIC CLASSIFICATION
        ========================================== */

        let trafficType = "human";

        if (isHeadless) {
            trafficType = "automated";
        }
        else if (isBot) {
            trafficType = "bot";
        }
        else if (isAutomated) {
            trafficType = "automated";
        }

        /* ==========================================
           VERCEL GEO
        ========================================== */

        const vercelGeo = {

            country:
                headers["x-vercel-ip-country"] ||
                null,

            region:
                headers["x-vercel-ip-country-region"] ||
                null,

            city:
                headers["x-vercel-ip-city"]
                    ? decodeURIComponent(
                        headers["x-vercel-ip-city"]
                    )
                    : null,

            postalCode:
                headers["x-vercel-ip-postal-code"] ||
                null,

            latitude:
                headers["x-vercel-ip-latitude"] ||
                null,

            longitude:
                headers["x-vercel-ip-longitude"] ||
                null,

            timezone:
                headers["x-vercel-ip-timezone"] ||
                null,

            continent:
                headers["x-vercel-ip-continent"] ||
                null
        };

        /* ==========================================
           IPINFO
        ========================================== */

        let network = null;

        const ipinfoToken =
            process.env.IPINFO_TOKEN;

        if (ip && ipinfoToken) {

            try {

                const response = await fetch(
                    `https://api.ipinfo.io/lite/${encodeURIComponent(ip)}?token=${encodeURIComponent(ipinfoToken)}`
                );

                if (response.ok) {

                    const info =
                        await response.json();

                    network = {

                        ip:
                            info.ip ||
                            ip,

                        asn:
                            info.asn ||
                            null,

                        organization:
                            info.as_name ||
                            null,

                        domain:
                            info.as_domain ||
                            null,

                        country:
                            info.country ||
                            null,

                        countryCode:
                            info.country_code ||
                            null,

                        continent:
                            info.continent ||
                            null,

                        continentCode:
                            info.continent_code ||
                            null

                    };

                } else {

                    console.error(
                        "IPinfo request failed:",
                        response.status
                    );

                }

            } catch (error) {

                console.error(
                    "IPinfo error:",
                    error.message
                );

            }

        }

        /* ==========================================
           GEO OBJECT
        ========================================== */

        const geo = {

            source:
                "ip-derived",

            country:
                vercelGeo.country ||
                network?.countryCode ||
                null,

            region:
                vercelGeo.region ||
                null,

            city:
                vercelGeo.city ||
                null,

            postalCode:
                vercelGeo.postalCode ||
                null,

            latitude:
                vercelGeo.latitude !== null
                    ? Number(vercelGeo.latitude)
                    : null,

            longitude:
                vercelGeo.longitude !== null
                    ? Number(vercelGeo.longitude)
                    : null,

            timezone:
                data.timezone ||
                vercelGeo.timezone ||
                null,

            continent:
                vercelGeo.continent ||
                network?.continent ||
                null

        };

        /* ==========================================
           BROWSER
        ========================================== */

        const browser = {

            userAgent:
                userAgent ||
                null,

            platform:
                data.platform ||
                null,

            language:
                data.language ||
                null,

            languages:
                Array.isArray(
                    data.languages
                )
                    ? data.languages
                    : null

        };

        /* ==========================================
           DISPLAY
        ========================================== */

        const pixelRatio =
            Number.isFinite(
                Number(data.pixelRatio)
            )
                ? Number(data.pixelRatio)
                : null;

        const display = {

            screenWidth,

            screenHeight,

            viewportWidth,

            viewportHeight,

            pixelRatio

        };

        /* ==========================================
           DEVICE
        ========================================== */

        const touchPoints =
            Number.isFinite(
                Number(data.maxTouchPoints)
            )
                ? Number(data.maxTouchPoints)
                : null;

        const hardwareConcurrency =
            Number.isFinite(
                Number(data.hardwareConcurrency)
            )
                ? Number(data.hardwareConcurrency)
                : null;

        const deviceMemory =
            Number.isFinite(
                Number(data.deviceMemory)
            )
                ? Number(data.deviceMemory)
                : null;

        const device = {

            touchPoints,

            hardwareConcurrency,

            deviceMemory,

            cookieEnabled:
                typeof data.cookieEnabled === "boolean"
                    ? data.cookieEnabled
                    : null

        };

        /* ==========================================
           OPTIONAL STRUCTURED DATA
        ========================================== */

        const connection =
            data.connection &&
            typeof data.connection === "object"
                ? data.connection
                : null;

        const clientHints =
            data.clientHints &&
            typeof data.clientHints === "object"
                ? data.clientHints
                : null;

        const performance =
            data.performance &&
            typeof data.performance === "object"
                ? data.performance
                : null;

        const preferences =
            data.preferences &&
            typeof data.preferences === "object"
                ? data.preferences
                : null;

        const consent =
            data.consent &&
            typeof data.consent === "object"
                ? data.consent
                : null;

        /* ==========================================
           INFRASTRUCTURE
        ========================================== */

        const infrastructure = {

            vercelId:
                headers["x-vercel-id"] ||
                null,

            host:
                headers["host"] ||
                null,

            protocol:
                headers["x-forwarded-proto"] ||
                null

        };

        /* ==========================================
           REQUEST DATA
        ========================================== */

        const visitorId =
            typeof data.visitorId === "string"
                ? data.visitorId.slice(0, 200)
                : null;

        const sessionId =
            typeof data.sessionId === "string"
                ? data.sessionId.slice(0, 200)
                : null;

        const page =
            typeof data.page === "string"
                ? data.page.slice(0, 2000)
                : null;

        const title =
            typeof data.title === "string"
                ? data.title.slice(0, 500)
                : null;

        const referrer =
            typeof data.referrer === "string"
                ? data.referrer.slice(0, 2000)
                : "direct";

        /* ==========================================
           DATABASE ROW
        ========================================== */

        const databaseRow = {

            visitor_id:
                visitorId,

            session_id:
                sessionId,

            page,

            title,

            referrer,

            ip,

            country:
                geo.country,

            region:
                geo.region,

            city:
                geo.city,

            latitude:
                geo.latitude,

            longitude:
                geo.longitude,

            timezone:
                geo.timezone,

            postal_code:
                geo.postalCode,

            country_code:
                network?.countryCode ||
                null,

            continent:
                network?.continent ||
                geo.continent ||
                null,

            continent_code:
                network?.continentCode ||
                null,

            asn:
                network?.asn ||
                null,

            organization:
                network?.organization ||
                null,

            domain:
                network?.domain ||
                null,

            user_agent:
                browser.userAgent,

            platform:
                browser.platform,

            language:
                browser.language,

            languages:
                browser.languages,

            screen_width:
                display.screenWidth,

            screen_height:
                display.screenHeight,

            viewport_width:
                display.viewportWidth,

            viewport_height:
                display.viewportHeight,

            pixel_ratio:
                display.pixelRatio,

            touch_points:
                device.touchPoints,

            hardware_concurrency:
                device.hardwareConcurrency,

            device_memory:
                device.deviceMemory,

            cookie_enabled:
                device.cookieEnabled,

            connection,

            client_hints:
                clientHints,

            performance,

            preferences,

            consent,

            network,

            geo,

            browser,

            display,

            device,

            infrastructure,

            traffic_type:
                trafficType,

            is_bot:
                isBot,

            is_headless:
                isHeadless,

            is_automated:
                isAutomated,

            detection_signals:
                detectionSignals,

            raw_event: {

                receivedAt:
                    new Date().toISOString(),

                traffic: {

                    trafficType,

                    isBot,

                    isHeadless,

                    isAutomated,

                    detectionSignals

                },

                request: {

                    method:
                        req.method,

                    page,

                    title,

                    referrer,

                    visitorId,

                    sessionId

                },

                network,

                geo,

                browser,

                display,

                device,

                connection,

                clientHints,

                performance,

                preferences,

                consent,

                infrastructure

            }

        };

        /* ==========================================
           WRITE TO SUPABASE
        ========================================== */

        const supabaseResponse =
            await fetch(
                `${SUPABASE_URL}/rest/v1/visitor_events`,
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "apikey":
                            SUPABASE_SECRET,

                        "Authorization":
                            `Bearer ${SUPABASE_SECRET}`,

                        "Prefer":
                            "return=minimal"

                    },

                    body:
                        JSON.stringify(
                            databaseRow
                        )
                }
            );

        if (!supabaseResponse.ok) {

            const errorText =
                await supabaseResponse.text();

            console.error(
                "Supabase insert failed:",
                supabaseResponse.status,
                errorText
            );

            return res.status(500).json({

                success: false,

                error:
                    "Database insert failed"

            });

        }

        /* ==========================================
           SERVER LOG
        ========================================== */

        console.log(
            "========== HEISTSIXIN TELEMETRY =========="
        );

        console.log(
            JSON.stringify(
                databaseRow,
                null,
                2
            )
        );

        console.log(
            "=========================================="
        );

        return res.status(200).json({

            success: true,

            received: true,

            stored: true,

            trafficType,

            isBot,

            isHeadless,

            isAutomated

        });

    } catch (error) {

        console.error(
            "HEISTSIXIN ANALYTICS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            error:
                "Analytics server error"

        });

    }

}
