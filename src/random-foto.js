const fetch = require("node-fetch");

module.exports = function(app) {
  const endpoints = ['vietnam', 'korea', 'malaysia', 'thailand'];

  for (const country of endpoints) {
    app.get(`/random/${country}`, async (req, res) => {
      try {
        const { apikey } = req.query;

        if (!global.apikey.includes(apikey)) {
          return res.status(403).json({
            status: false,
            creator: "ubed bot",
            error: "Apikey invalid",
            message: "Pilih country yang tersedia: vietnam, korea, malaysia, thailand"
          });
        }

        const response = await fetch(`https://api.agatz.xyz/api/${country}`);
        if (!response.ok) {
          return res.status(502).json({
            status: false,
            creator: "ubed bot",
            error: `Gagal mengambil gambar dari ${country}`
          });
        }

        const data = await response.json();
        const img = await fetch(data.data.url);

        if (!img.ok) {
          return res.status(502).json({
            status: false,
            creator: "ubed bot",
            error: `Gagal mengunduh gambar ${country}`
          });
        }

        const buffer = await img.buffer();
        res.set('Content-Type', 'image/jpeg');
        res.send(buffer);
      } catch (err) {
        res.status(500).json({
          status: false,
          creator: "ubed bot",
          error: `Gagal mengambil gambar dari ${country}`
        });
      }
    });
  }
};