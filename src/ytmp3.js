const fetch = require('node-fetch');

module.exports = function(app) {
  app.get('/download/ytmp3', async (req, res) => {
    try {
      const { url, apikey } = req.query;

      if (!apikey || !global.apikey.includes(apikey)) {
        return res.status(403).json({
          status: false,
          creator: "UbedApi",
          developer: "ubed bot",
          error: "Apikey invalid",
          message: "https://your-api-url/ytmp3/json?url=YouTube_URL&apikey=your-apikey"
        });
      }

      if (!url) {
        return res.status(400).json({
          status: false,
          creator: "UbedApi",
          developer: "ubed bot",
          error: "Parameter 'url' tidak ditemukan"
        });
      }

      const response = await fetch(`https://beforelife.me/api/download/ytmp3?url=${encodeURIComponent(url)}&apikey=ubed2407`);
      const data = await response.json();

      if (!data.status || !data.result?.url) {
        return res.status(502).json({
          status: false,
          creator: "UbedApi",
          developer: "ubed bot",
          error: "Gagal mengambil data dari beforelife.me"
        });
      }

      res.json({
        status: true,
        processed: data.processed,
        creator: "UbedApi",
        developer: "ubed bot",
        result: data.result
      });

    } catch (err) {
      res.status(500).json({
        status: false,
        creator: "UbedApi",
        developer: "ubed bot",
        error: err.message
      });
    }
  });
};