const fetch = require("node-fetch");

module.exports = function(app) {
  app.get('/random/vietnam', async (req, res) => {
    try {
      const { apikey } = req.query;

      // Validasi API key
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({
          status: false,
          creator: "ubed bot",
          error: "Apikey invalid",
          message: "Pilih country yang tersedia: vietnam, korea, malaysia, thailand"
        });
      }

      // Ambil gambar dari API Vietnam
      const response = await fetch('https://api.agatz.xyz/api/vietnam');
      if (!response.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengambil gambar dari vietnam"
        });
      }

      const data = await response.json();
      const img = await fetch(data.data.url);

      if (!img.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengunduh gambar vietnam"
        });
      }

      const buffer = await img.buffer();
      res.set('Content-Type', 'image/jpeg');
      res.send(buffer); // Kirim gambar
    } catch (err) {
      res.status(500).json({
        status: false,
        creator: "ubed bot",
        error: "Gagal mengambil gambar dari vietnam"
      });
    }
  });
};