const axios = require('axios');

module.exports = function(app) {
    app.get('/ai/simi', async (req, res) => {
        try {
            const { apikey, text } = req.query;
            if (!global.apikey.includes(apikey)) {
                return res.status(400).json({ status: false, error: 'Apikey invalid' });
            }
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }

            const response = await axios.get(`https://api.maelyn.tech/api/simi?q=${encodeURIComponent(text)}&apikey=ubed2407`);
            const data = response.data;

            if (data.status !== 'Success') {
                return res.status(500).json({ status: false, error: 'Failed to get response from SimSimi API' });
            }

            res.status(200).json({
                status: true,
                result: data.result,
                message: '/ai/simi?apikey=your_apikey&text=halo apa kabar'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: false, error: error.message });
        }
    });
}