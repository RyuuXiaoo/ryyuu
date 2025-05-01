const fetch = require('node-fetch');

module.exports = function(app) {
  app.get('/download/ytmp4', async (req, res) => {
    try {
      const { apikey, url, quality = '720', server = 'auto' } = req.query;

      // Validasi API key
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({
          status: false,
          creator: "ubed bot",
          error: "Apikey invalid",
          message: "Jika Error silahkan report ke ubed ya"
        });
      }

      if (!url) {
        return res.status(400).json({
          status: false,
          creator: "ubed bot",
          error: "Parameter url tidak ditemukan"
        });
      }

      const apiUrl = `https://fastrestapis.fasturl.cloud/downup/ytmp4?url=${encodeURIComponent(url)}&quality=${quality}&server=${server}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status !== 200 || !data.result?.media) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengambil link media video"
        });
      }

      const videoRes = await fetch(data.result.media, {
        headers: { 'User-Agent': 'okhttp/4.5.0' }
      });

      if (!videoRes.ok) {
        return res.status(502).json({
          status: false,
          creator: "ubed bot",
          error: "Gagal mengunduh video"
        });
      }

      const buffer = await videoRes.buffer();
      res.set('Content-Type', 'video/mp4');
      res.set('Content-Disposition', `inline; filename="${data.result.title}.mp4"`);
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