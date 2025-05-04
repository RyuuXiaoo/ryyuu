const axios = require('axios');

module.exports = function(app) {
    app.get('/download/ytvid', async (req, res) => {
        try {
            const { apikey, url } = req.query;
            if (!global.apikey.includes(apikey)) {
                return res.status(403).json({ status: false, message: 'Apikey invalid' });
            }
            if (!url) {
                return res.status(400).json({ status: false, message: 'Parameter "url" wajib diisi' });
            }

            const response = await axios.get(`https://beforelife.me/api/download/ytmp4?url=${encodeURIComponent(url)}&apikey=ubed2407`, {
                responseType: 'stream'
            });

            res.set({
                'Content-Type': 'video/mp4',
                'Content-Disposition': 'inline; filename="video.mp4"'
            });

            response.data.pipe(res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Gagal mendapatkan video', error: error.message });
        }
    });
}