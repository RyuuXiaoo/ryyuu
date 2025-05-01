const fetch = require('node-fetch');

module.exports = function(app) {
  app.get('/random/waifu', async (req, res) => {
    try {
      const { apikey } = req.query;
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({
          status: false,
          creator: "ubed bot",
          error: "Apikey invalid",
          message: "https://obet-rest-api.vercel.app/random/waifu?apikey=your-apikey"
        });
      }

      const response = await fetch('https://api.siputzx.my.id/api/r/waifu');
      if (!response.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengambil gambar waifu"
        });
      }

      const buffer = await response.buffer();
      res.set('Content-Type', 'image/jpeg');
      res.send(buffer);
    } catch (err) {
      res.status(500).json({
        status: false,
        creator: "ubed bot",
        error: err.message
      });
    }
  });
};