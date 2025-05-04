const axios = require('axios');

module.exports = function(app) {
    app.get('/download/ytmp4', async (req, res) => {
        try {
            const { apikey, url, quality = '720' } = req.query;

            if (!global.apikey.includes(apikey)) {
                return res.status(400).json({ status: false, error: 'Apikey invalid' });
            }

            if (!url) {
                return res.status(400).json({ status: false, error: 'Parameter "url" is required' });
            }

            const response = await axios.get(`https://fastrestapis.fasturl.cloud/downup/ytmp4`, {
                params: {
                    url: decodeURIComponent(url),
                    quality,
                    server: 'auto'
                }
            });

            const result = response.data;

            if (!result || result.status !== 200) {
                return res.status(500).json({ status: false, error: 'Failed to retrieve video data' });
            }

            res.status(200).json({
                status: 200,
                content: "Success",
                result: result.result,
                creator: "ubed bot"
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, error: error.message });
        }
    });
}