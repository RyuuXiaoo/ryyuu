const fetch = require('node-fetch');

module.exports = function(app) {
  app.get('/random/blue-archive', async (req, res) => {
    try {
      const { apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({
          status: false,
          creator: "ubed bot",
          error: "Apikey invalid",
          message: "https://obet-rest-api.vercel.app/random/blue-archive?apikey=your-apikey"
        });
      }

      const response = await fetch('https://api.siputzx.my.id/api/r/blue-archive');
      if (!response.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengambil gambar dari API",
          message: "https://obet-rest-api.vercel.app/random/blue-archive?apikey=your-apikey"
        });
      }

      const buffer = await response.buffer();
      res.set('Content-Type', 'image/jpeg');
      res.send(buffer);
    } catch (err) {
      res.status(500).json({
        status: false,
        creator: "ubed bot",
        error: "Terjadi kesalahan internal pada server",
        message: "https://obet-rest-api.vercel.app/random/blue-archive?apikey=your-apikey"
      });
    }
  });
};