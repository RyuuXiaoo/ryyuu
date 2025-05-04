const axios = require('axios');

module.exports = function(app) {
    app.get('/tool/htmltoimage', async (req, res) => {
        try {
            const { apikey, html } = req.query;
            if (!global.apikey.includes(apikey)) {
                return res.status(400).json({ status: false, error: 'Apikey invalid' });
            }
            if (!html) {
                return res.status(400).json({ status: false, error: 'Parameter "html" wajib diisi' });
            }

            const url = `https://fastrestapis.fasturl.cloud/tool/htmltoimage?html=${encodeURIComponent(html)}`;
            const response = await axios.get(url, { responseType: 'arraybuffer' });

            res.set({
                'Content-Type': 'image/png',
                'Content-Disposition': 'inline; filename="result.png"'
            });
            res.send(response.data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: false, error: 'Gagal menghasilkan gambar dari HTML' });
        }
    });
};