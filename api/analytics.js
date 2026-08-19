export default async function handler(req, res) {

    // Only accept POST requests
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
           ENVIRONMENT
        =========================== */

        const SUPABASE_URL =
            process.env.SUPABASE_URL;

        const SUPABASE_KEY =
            process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!SUPABASE_URL || !SUPABASE_KEY) {

            console.error(
                "Supabase environment variables are missing."
            );

            return res.status(500).json({
                success: false,
                error: "Analytics configuration error"
            });
        }


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
           IP-DERIVED / APPROXIMATE
        =========================== */

        const country =
            headers["x-vercel-ip-country"] || null;

        const region =
            headers["x-vercel-ip-country-region"] || null;

        const city =
            headers["x-vercel-ip-city"]
                ? decodeURIComponent(
                    headers["x-vercel-ip-city"]
                )
                : null;

        const latitude =
            headers["x-vercel-ip-latitude"] || null;

        const longitude =
            headers["x-vercel-ip-longitude"] || null;

        const timezone =
            headers["x-vercel-ip-timezone"] || null;


        /* ===========================
           VISITOR RECORD
        =========================== */

        const visitor = {

            visitor_id:
                data.visitorId || null,

            page:
                data.page || null,

            title:
                data.title || null,

            referrer:
                data.referrer || "direct",

            ip:
                ip,

            country:
                country,

            region:
                region,

            city:
                city,

            latitude:
                latitude
                    ? Number(latitude)
                    : null,

            longitude:
                longitude
                    ? Number(longitude)
                    : null,

            timezone:
                data.timezone ||
                timezone ||
                null,

            user_agent:
                data.userAgent ||
                headers["user-agent"] ||
                null,

            platform:
                data.platform || null,

            language:
                data.language || null,

            screen_width:
                data.screenWidth ?? null,

            screen_height:
                data.screenHeight ?? null
        };


        /* ===========================
           SAVE TO SUPABASE
        =========================== */

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/visitor_events`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "apikey":
                        SUPABASE_KEY,

                    "Authorization":
                        `Bearer ${SUPABASE_KEY}`,

                    "Prefer":
                        "return=minimal"
                },

                body:
                    JSON.stringify(visitor)
            }
        );


        /* ===========================
           SUPABASE ERROR
        =========================== */

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Supabase insert failed:",
                response.status,
                errorText
            );

            return res.status(500).json({
                success: false,
                error: "Database insert failed"
            });
        }


        /* ===========================
           SERVER LOG
        =========================== */

        console.log(
            "========== HEISTSIXIN VISITOR =========="
        );

        console.log(
            JSON.stringify(
                visitor,
                null,
                2
            )
        );

        console.log(
            "========== SAVED TO SUPABASE =========="
        );


        return res.status(200).json({

            success: true,

            received: true,

            stored: true

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
