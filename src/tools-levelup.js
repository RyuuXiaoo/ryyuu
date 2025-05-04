const axios = require('axios');

module.exports = function(app) {
    app.get('/canvas/levelup', async (req, res) => {
        try {
            const { apikey, username, level, level2, avatar, image } = req.query;
            if (!global.apikey.includes(apikey)) {
                return res.status(400).json({ status: false, error: 'Apikey invalid' });
            }

            if (!username || !level || !level2 || !avatar || !image) {
                return res.status(400).json({ status: false, error: 'Semua parameter wajib diisi (username, level, level2, avatar, image)' });
            }

            const apiURL = `https://beforelife.me/api/maker/levelup?username=${encodeURIComponent(username)}&level=${level}&level2=${level2}&avatar=${encodeURIComponent(avatar)}&image=${encodeURIComponent(image)}&apikey=ubed2407`;

            const response = await axios.get(apiURL, { responseType: 'arraybuffer' });

            res.set({
                'Content-Type': 'image/png',
                'Content-Disposition': 'inline; filename="levelup.png"'
            });
            res.send(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, error: 'Gagal mengambil gambar level up' });
        }
    });
};