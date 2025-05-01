const fetch = require("node-fetch");

module.exports = function(app) {
  app.get('/info/distance', async (req, res) => {
    try {
      const { apikey, from, to } = req.query;

      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({
          status: false,
          creator: "ubed bot",
          error: "Apikey invalid"
        });
      }

      if (!from || !to) {
        return res.status(400).json({
          status: false,
          creator: "ubed bot",
          error: "Parameter 'from' dan 'to' dibutuhkan"
        });
      }

      const url = `https://beforelife.me/api/info/distance?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&apikey=ubed2407`;
      const response = await fetch(url);

      if (!response.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengambil data jarak"
        });
      }

      const data = await response.json();

      res.json({
        status: true,
        creator: "ubed bot",
        processed: data.processed,
        result: data.result
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        creator: "ubed bot",
        error: err.message
      });
    }
  });
};