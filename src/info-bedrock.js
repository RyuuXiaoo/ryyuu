const fetch = require("node-fetch");

module.exports = function(app) {
  app.get('/info/bedrock', async (req, res) => {
    try {
      const { apikey, query } = req.query;
      if (!global.apikey.includes(apikey)) return res.status(403).send('Invalid API key');
      if (!query) return res.status(400).send('Query is required');

      const url = `https://beforelife.me/api/info/bedrock?query=${encodeURIComponent(query)}&apikey=ubed2407`;
      const response = await fetch(url);

      if (!response.ok) return res.status(502).send('Failed to fetch server status');

      const data = await response.json();

      res.json({
        query,
        status: data.status || 'Unknown'
      });
    } catch (err) {
      res.status(500).send(`Error: ${err.message}`);
    }
  });
};