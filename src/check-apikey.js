const fs = require("fs");
const path = require("path");

module.exports = function(app) {
  app.get('/check/apikey', async (req, res) => {
    try {
      // Pastikan jalur file ke setting.json di root direktori
      const settingPath = path.join(__dirname, '..', 'setting.json'); // <-- Pastikan ini sesuai lokasi root
      const settings = JSON.parse(fs.readFileSync(settingPath, 'utf-8'));
      const validApiKeys = settings.apikey;

      const { apikey } = req.query;

      if (!apikey) return res.status(400).json({ status: false, error: 'API key is required' });

      if (validApiKeys.includes(apikey)) {
        return res.status(200).json({ status: true, message: 'API key is valid' });
      } else {
        return res.status(403).json({ status: false, error: 'Invalid API key' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, error: `Error: ${error.message}` });
    }
  });
};