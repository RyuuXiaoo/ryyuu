const fetch = require("node-fetch");

module.exports = function(app) {
  app.get('/info/cuaca', async (req, res) => {
    try {
      const { apikey, query } = req.query;

      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({
          status: false,
          creator: "ubed bot",
          error: "Apikey invalid"
        });
      }

      if (!query) {
        return res.status(400).json({
          status: false,
          creator: "ubed bot",
          error: "Parameter 'query' dibutuhkan"
        });
      }

      const url = `https://beforelife.me/api/info/cuaca?query=${encodeURIComponent(query)}&apikey=ubed2407`;
      const response = await fetch(url);

      if (!response.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengambil data cuaca"
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