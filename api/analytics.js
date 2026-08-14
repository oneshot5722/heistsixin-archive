export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const data = req.body || {};

        /* ===========================
           GET VISITOR IP
        =========================== */

        const forwarded =
            req.headers["x-forwarded-for"];

        const ip =
            forwarded
                ? forwarded.split(",")[0].trim()
                : req.socket?.remoteAddress || null;


        /* ===========================
           IP GEOLOCATION
        =========================== */

        let geo = null;

        if (ip) {

            try {

                const response = await fetch(
                    `https://ipwho.is/${encodeURIComponent(ip)}`
                );

                if (response.ok) {

                    const location =
                        await response.json();

                    if (location.success !== false) {

                        geo = {

                            country:
                                location.country || null,

                            countryCode:
                                location.country_code || null,

                            region:
                                location.region || null,

                            city:
                                location.city || null,

                            postal:
                                location.postal || null,

                            latitude:
                                location.latitude || null,

                            longitude:
                                location.longitude || null,

                            timezone:
                                location.timezone?.id || null,

                            isp:
                                location.connection?.isp || null,

                            organization:
                                location.connection?.org || null,

                            asn:
                                location.connection?.asn || null,

                            domain:
                                location.connection?.domain || null,

                            connectionType:
                                location.type || null

                        };

                    }

                }

            } catch (geoError) {

                console.error(
                    "Geolocation lookup failed:",
                    geoError
                );

            }

        }


        /* ===========================
           ANALYTICS EVENT
        =========================== */

        const visitor = {

            timestamp:
                new Date().toISOString(),

            ip: ip,

            visitorId:
                data.visitorId || null,

            page:
                data.page || null,

            title:
                data.title || null,

            referrer:
                data.referrer || null,

            language:
                data.language || null,

            languages:
                data.languages || null,

            screenWidth:
                data.screenWidth || null,

            screenHeight:
                data.screenHeight || null,

            viewportWidth:
                data.viewportWidth || null,

            viewportHeight:
                data.viewportHeight || null,

            timezone:
                data.timezone || null,

            platform:
                data.platform || null,

            userAgent:
                data.userAgent || null,

            geo: geo

        };


        /* ===========================
           TEMPORARY RESPONSE
        =========================== */

        return res.status(200).json({

            success: true,

            visitor: visitor

        });


    } catch (error) {

        console.error(
            "Analytics error:",
            error
        );

        return res.status(500).json({

            success: false,

            error: "Analytics server error"

        });

    }

}
