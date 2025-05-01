const fetch = require("node-fetch");

module.exports = function(app) {
  app.get('/maker/upscale', async (req, res) => {
    try {
      const { apikey, url } = req.query;
      if (!global.apikey.includes(apikey)) return res.status(400).json({ status: false, error: 'Apikey invalid' });
      if (!url) return res.status(400).json({ status: false, error: 'Image URL is required' });

      // Panggil API Maelyn untuk upscale
      const apiUrl = `https://api.maelyn.tech/api/img2img/upscale?url=${encodeURIComponent(url)}&apikey=ubed2407`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      const imageUrl = data?.result?.url;
      if (!imageUrl) return res.status(500).json({ status: false, error: 'Image URL not found in API response' });

      // Fetch gambar upscale sebagai buffer
      const imageRes = await fetch(imageUrl);
      const contentType = imageRes.headers.get('content-type') || 'image/png';
      const buffer = await imageRes.buffer();

      res.set('Content-Type', contentType);
      res.send(buffer);
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};