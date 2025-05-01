const fetch = require("node-fetch");
const axios = require("axios");

const getBuffer = async (url, options) => {
  try {
    options ? options : {}
    const res = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

module.exports = function (app) {
  // Menggunakan GET request untuk endpoint /tools/ghibli
  app.get('/tools/ghibli', async (req, res) => {
    const { apikey, url } = req.query;

    // Validasi Apikey
    if (!global.apikey.includes(apikey)) {
      return res.status(400).json({ status: false, error: 'Apikey invalid' });
    }

    // Validasi parameter URL
    if (!url) {
      return res.status(400).json({ status: false, error: 'URL gambar tidak ditemukan. Harap masukkan URL gambar.' });
    }

    try {
      // Memanggil API untuk mengubah gambar ke gaya Ghibli
      let result = await fetch(`https://api.maelyn.tech/api/img2img/ghibli?url=${encodeURIComponent(url)}&apikey=ubed2407`);
      let data = await result.json();

      // Cek apakah data berhasil
      if (data.status !== 'Success' || data.code !== 200) {
        return res.status(500).json({ status: false, error: 'Gagal mengubah gambar ke gaya Ghibli.' });
      }

      // Mendapatkan buffer gambar hasil perubahan
      let buffer = await getBuffer(data.result.url);

      // Mengirimkan gambar hasil ke klien
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': buffer.length,
      });
      res.end(buffer);

    } catch (e) {
      console.log(e);
      res.status(500).json({ status: false, error: 'Internal server error.' });
    }
  });
};
