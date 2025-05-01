const fetch = require('node-fetch');

module.exports = function(app) {
  app.get('/random/asupan', async (req, res) => {
    try {
      const { apikey } = req.query;

      // Validasi API key
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({
          status: false,
          creator: "ubed bot",
          error: "Apikey invalid",
          message: "Jika Error silahkan report ke ubed ya"
        });
      }

      const response = await fetch('https://api.agatz.xyz/api/asupan');
      if (!response.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengambil data asupan"
        });
      }

      const json = await response.json();
      const videoRes = await fetch(json.data);

      if (!videoRes.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengunduh video asupan"
        });
      }

      const buffer = await videoRes.buffer();
      res.set('Content-Type', 'video/mp4');
      res.send(buffer);
    } catch (err) {
      res.status(500).json({
        status: false,
        creator: "ubed bot",
        error: "Terjadi kesalahan internal pada server"
      });
    }
  });
};