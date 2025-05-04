const axios = require('axios');

module.exports = function(app) {
    app.get('/ai/imageflux', async (req, res) => {
        const { apikey, prompt, style } = req.query;

        if (!apikey || !global.apikey.includes(apikey)) {
            return res.status(403).json({
                status: false,
                error: 'Apikey invalid atau tidak disertakan'
            });
        }

        if (!prompt || !style) {
            return res.status(400).json({
                status: false,
                error: 'Parameter "prompt" dan "style" wajib diisi'
            });
        }

        try {
            const url = `https://fastrestapis.fasturl.cloud/aiimage/flux/style?prompt=${encodeURIComponent(prompt)}&style=${encodeURIComponent(style)}`;
            const response = await axios.get(url, {
                responseType: 'arraybuffer'
            });

            res.set('Content-Type', 'image/jpeg');
            res.send(response.data);
        } catch (err) {
            console.error('[AI IMAGE FLUX ERROR]', err.message);
            res.status(500).json({
                status: false,
                error: 'Gagal mengambil gambar dari API'
            });
        }
    });
};