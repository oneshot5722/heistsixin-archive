/*
=========================================================
 HEISTSIXIN — ANALYTICS ENGINE
 V1.0
=========================================================

 Collects normal website analytics:

 SERVER-SIDE
 - Public IP
 - Country
 - Region
 - City
 - Postal code
 - Latitude / longitude
 - Timezone
 - Vercel region
 - Host
 - Protocol
 - Referrer
 - User-Agent
 - Request ID / Vercel ID

 CLIENT-SIDE
 - Anonymous visitor ID
 - Page
 - Page title
 - Referrer
 - Language
 - Languages
 - Screen size
 - Viewport size
 - Timezone
 - Platform
 - User-Agent
 - Online status
 - Cookies enabled
 - Touch points
 - Hardware concurrency
 - Device memory where available
 - Network information where available
 - Timestamp

 NOTE:
 This endpoint does NOT request GPS location,
 camera, microphone, contacts, files, passwords,
 or other private device data.
=========================================================
*/

export default async function handler(req, res) {

    /* =====================================================
       METHOD CHECK
    ===================================================== */

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            error: "Method not allowed"
        });

    }


    try {

        /* =================================================
           REQUEST HEADERS
        ================================================= */

        const headers = req.headers || {};


        /* =================================================
           PUBLIC IP

           Vercel documents x-forwarded-for as the
           public IP of the client.
        ================================================= */

        const forwardedFor =
            headers["x-forwarded-for"];

        const ip =
            forwardedFor
                ? forwardedFor.split(",")[0].trim()
                : null;


        /* =================================================
           VERCEL GEOLOCATION

           These are IP-derived and therefore approximate.
        ================================================= */

        const geo = {

            country:
                headers["x-vercel-ip-country"] || null,

            region:
                headers["x-vercel-ip-country-region"] || null,

            city:
                headers["x-vercel-ip-city"] || null,

            postalCode:
                headers["x-vercel-ip-postal-code"] || null,

            latitude:
                headers["x-vercel-ip-latitude"] || null,

            longitude:
                headers["x-vercel-ip-longitude"] || null,

            timezone:
                headers["x-vercel-ip-timezone"] || null,

            continent:
                headers["x-vercel-ip-continent"] || null

        };


        /* =================================================
           VERCEL REQUEST INFORMATION
        ================================================= */

        const infrastructure = {

            vercelId:
                headers["x-vercel-id"] || null,

            deploymentUrl:
                headers["x-vercel-deployment-url"] || null,

            host:
                headers["host"] || null,

            forwardedHost:
                headers["x-forwarded-host"] || null,

            protocol:
                headers["x-forwarded-proto"] || null,

            vercelRegion:
                headers["x-vercel-region"] || null

        };


        /* =================================================
           USER AGENT

           Browser sends this automatically.
        ================================================= */

        const userAgent =
            headers["user-agent"] || null;


        /* =================================================
           CLIENT DATA
        ================================================= */

        const data = req.body || {};


        /* =================================================
           ANALYTICS RECORD
        ================================================= */

        const visitor = {

            /* ---------------------------------------------
               IDENTITY / SESSION
            --------------------------------------------- */

            visitorId:
                data.visitorId || null,


            /* ---------------------------------------------
               TIME
            --------------------------------------------- */

            timestamp:
                new Date().toISOString(),

            clientTimestamp:
                data.timestamp || null,


            /* ---------------------------------------------
               PAGE
            --------------------------------------------- */

            page:
                data.page || null,

            title:
                data.title || null,


            /* ---------------------------------------------
               TRAFFIC SOURCE
            --------------------------------------------- */

            referrer:
                data.referrer || null,

            utm:
                data.utm || null,


            /* ---------------------------------------------
               NETWORK
            --------------------------------------------- */

            ip:
                ip,


            /* ---------------------------------------------
               GEO
            --------------------------------------------- */

            geo:
                geo,


            /* ---------------------------------------------
               BROWSER
            --------------------------------------------- */

            browser: {

                userAgent:
                    userAgent,

                platform:
                    data.platform || null,

                language:
                    data.language || null,

                languages:
                    data.languages || null

            },


            /* ---------------------------------------------
               DISPLAY
            --------------------------------------------- */

            display: {

                screenWidth:
                    data.screenWidth || null,

                screenHeight:
                    data.screenHeight || null,

                viewportWidth:
                    data.viewportWidth || null,

                viewportHeight:
                    data.viewportHeight || null,

                pixelRatio:
                    data.pixelRatio || null

            },


            /* ---------------------------------------------
               DEVICE CAPABILITIES
            --------------------------------------------- */

            device: {

                touchPoints:
                    data.maxTouchPoints ?? null,

                hardwareConcurrency:
                    data.hardwareConcurrency ?? null,

                deviceMemory:
                    data.deviceMemory ?? null,

                cookieEnabled:
                    data.cookieEnabled ?? null,

                online:
                    data.online ?? null

            },


            /* ---------------------------------------------
               TIMEZONE
            --------------------------------------------- */

            clientTimezone:
                data.timezone || null,


            /* ---------------------------------------------
               NETWORK API
            --------------------------------------------- */

            connection: {

                effectiveType:
                    data.connection?.effectiveType || null,

                downlink:
                    data.connection?.downlink ?? null,

                rtt:
                    data.connection?.rtt ?? null,

                saveData:
                    data.connection?.saveData ?? null

            },


            /* ---------------------------------------------
               VERCEL INFRASTRUCTURE
            --------------------------------------------- */

            infrastructure:
                infrastructure

        };


        /* =================================================
           LOG EVERYTHING

           Vercel Runtime Logs can display console output.
        ================================================= */

        console.log(
            "========== HEISTSIXIN VISITOR =========="
        );

        console.log(
            JSON.stringify(visitor, null, 2)
        );

        console.log(
            "========================================="
        );


        /* =================================================
           RESPONSE
        ================================================= */

        return res.status(200).json({

            success: true,

            received: true

        });


    } catch (error) {

        console.error(
            "HEISTSIXIN ANALYTICS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            error: "Analytics server error"

        });

    }

}
