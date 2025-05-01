const fetch = require('node-fetch');

module.exports = function(app) {
  app.get('/random/gore', async (req, res) => {
    try {
      const { apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({
          status: false,
          creator: "ubed bot",
          error: "Apikey invalid"
        });
      }

      const response = await fetch('https://api.agatz.xyz/api/gore');
      if (!response.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengambil data gore"
        });
      }

      const json = await response.json();
      const videoRes = await fetch(json.data.video2);

      if (!videoRes.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengunduh video gore"
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