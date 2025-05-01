const fetch = require("node-fetch");

module.exports = function (app) {
    app.get("/search/pinterest", async (req, res) => {
        try {
            const { apikey, q } = req.query;

            // Verifikasi API key
            if (!apikey || !global.apikey.includes(apikey))
                return res.status(403).json({ status: false, message: "Invalid apikey" });

            if (!q)
                return res.status(400).json({ status: false, message: "Parameter 'q' (query) is required" });

            // Memanggil API pencarian Pinterest
            const apiUrl = `https://fastrestapis.fasturl.cloud/search/pinterest/simple?name=${encodeURIComponent(q)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status !== 200) {
                return res.status(500).json({ status: false, message: "Error fetching Pinterest data" });
            }

            // Menyusun hasil pencarian
            const result = data.result.map(item => ({
                link: item.link,
                image: item.directLink,
                title: item.title,
                description: item.description || "No description available",
                altText: item.altText
            }));

            // Mengirimkan respon
            res.json({ status: true, result });
        } catch (err) {
            res.status(500).json({ status: false, message: err.message });
        }
    });
};