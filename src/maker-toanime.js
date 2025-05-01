const fetch = require("node-fetch");

module.exports = function(app) {
  app.get('/maker/toanime', async (req, res) => {
    try {
      const { apikey, url, text } = req.query;
      if (!global.apikey.includes(apikey)) return res.status(400).json({ status: false, error: 'Apikey invalid' });
      if (!url) return res.status(400).json({ status: false, error: 'Image URL is required' });

      const prompt = text || 'Anime 2d';
      const apiUrl = `https://fastrestapis.fasturl.cloud/aiimage/toanime?imageUrl=${encodeURIComponent(url)}&specificPrompt=${encodeURIComponent(prompt)}`;

      const imageRes = await fetch(apiUrl);
      if (!imageRes.ok) return res.status(500).json({ status: false, error: 'Failed to generate anime image' });

      const contentType = imageRes.headers.get('content-type') || 'image/png';
      const buffer = await imageRes.buffer();

      res.set('Content-Type', contentType);
      res.send(buffer);
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};