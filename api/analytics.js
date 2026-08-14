export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed"
        });

    }

    try {

        const data = req.body || {};

        /*
         * Vercel provides the connecting IP through
         * the request headers.
         */

        const forwarded =
            req.headers["x-forwarded-for"];

        const ip =
            forwarded
                ? forwarded.split(",")[0].trim()
                : req.socket?.remoteAddress || null;


        /*
         * Basic visitor information
         */

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
                data.userAgent || null

        };


        /*
         * For now we return the event.
         *
         * Later we can connect this to
         * persistent storage + your private
         * analytics dashboard.
         */

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
