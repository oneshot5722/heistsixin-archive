export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            error: "Method not allowed"
        });
    }

    try {

        const headers = req.headers || {};
        const data = req.body || {};

        /* ===========================
           CLIENT IP
        =========================== */

        const forwarded =
            headers["x-forwarded-for"];

        const ip = forwarded
            ? forwarded.split(",")[0].trim()
            : null;


        /* ===========================
           VERCEL GEO
           IP-derived and approximate
        =========================== */

        const geo = {

            country:
                headers["x-vercel-ip-country"] || null,

            region:
                headers["x-vercel-ip-country-region"] || null,

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


        /* ===========================
           IPINFO LITE
        =========================== */

        let network = null;

        const token =
            process.env.IPINFO_TOKEN;

        if (ip && token) {

            try {

                const response = await fetch(
                    `https://api.ipinfo.io/lite/${encodeURIComponent(ip)}?token=${encodeURIComponent(token)}`
                );

                if (response.ok) {

                    const info =
                        await response.json();

                    network = {

                        ip:
                            info.ip || ip,

                        asn:
                            info.asn || null,

                        organization:
                            info.as_name || null,

                        domain:
                            info.as_domain || null,

                        country:
                            info.country || null,

                        countryCode:
                            info.country_code || null,

                        continent:
                            info.continent || null,

                        continentCode:
                            info.continent_code || null

                    };

                } else {

                    console.error(
                        "IPinfo error:",
                        response.status
                    );

                }

            } catch (error) {

                console.error(
                    "IPinfo request failed:",
                    error.message
                );

            }

        }


        /* ===========================
           VISITOR RECORD
        =========================== */

        const visitor = {

            visitorId:
                data.visitorId || null,

            timestamp:
                new Date().toISOString(),

            page:
                data.page || null,

            title:
                data.title || null,

            referrer:
                data.referrer || "direct",

            ip:
                ip,

            network:
                network,

            geo:
                geo,

            browser: {

                userAgent:
                    data.userAgent ||
                    headers["user-agent"] ||
                    null,

                platform:
                    data.platform || null,

                language:
                    data.language || null,

                languages:
                    data.languages || null

            },

            display: {

                screenWidth:
                    data.screenWidth ?? null,

                screenHeight:
                    data.screenHeight ?? null,

                viewportWidth:
                    data.viewportWidth ?? null,

                viewportHeight:
                    data.viewportHeight ?? null,

                pixelRatio:
                    data.pixelRatio ?? null

            },

            device: {

                touchPoints:
                    data.maxTouchPoints ?? null,

                hardwareConcurrency:
                    data.hardwareConcurrency ??
                    null,

                deviceMemory:
                    data.deviceMemory ??
                    null,

                cookieEnabled:
                    data.cookieEnabled ??
                    null

            },

            connection:
                data.connection || null,

            timezone:
                data.timezone || null,

            infrastructure: {

                vercelId:
                    headers["x-vercel-id"] || null,

                host:
                    headers["host"] || null,

                protocol:
                    headers["x-forwarded-proto"] ||
                    null

            }

        };


        /* ===========================
           VERCEL LOG
        =========================== */

        console.log(
            "========== HEISTSIXIN VISITOR =========="
        );

        console.log(
            JSON.stringify(visitor, null, 2)
        );

        console.log(
            "========================================="
        );


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
