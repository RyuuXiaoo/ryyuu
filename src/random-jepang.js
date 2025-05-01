const fetch = require("node-fetch");

module.exports = function(app) {
  app.get('/random/japan', async (req, res) => {
    try {
      const { apikey } = req.query;

      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({
          status: false,
          creator: "ubed bot",
          error: "Apikey invalid"
        });
      }

      const response = await fetch('https://api.agatz.xyz/api/japan');
      if (!response.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengambil gambar"
        });
      }

      const data = await response.json();
      const img = await fetch(data.data.url);

      if (!img.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengunduh gambar"
        });
      }

      const buffer = await img.buffer();
      res.set('Content-Type', 'image/jpeg');
      res.send(buffer);
    } catch (err) {
      res.status(500).json({
        status: false,
        creator: "ubed bot",
        error: "Gagal mengambil gambar"
      });
    }
  });
};