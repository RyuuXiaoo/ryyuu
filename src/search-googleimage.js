const axios = require('axios');

module.exports = function(app) {
    app.get('/search/image', async (req, res) => {
        try {
            const { apikey, query } = req.query;
            if (!global.apikey.includes(apikey)) {
                return res.status(403).json({ status: false, message: 'Apikey invalid' });
            }
            if (!query) {
                return res.status(400).json({ status: false, message: 'Parameter "query" wajib diisi' });
            }

            const response = await axios.get(`https://beforelife.me/api/search/image?query=${encodeURIComponent(query)}&apikey=ubed2407`);
            const data = response.data;

            // Cek apakah ada hasil
            if (!data.status || !data.result || data.result.length === 0) {
                return res.status(404).json({ status: false, message: 'Gambar tidak ditemukan' });
            }

            // Menampilkan seluruh respon dari API, bukan hanya URL gambar pertama
            res.status(200).json({
                status: true,
                message: 'Gambar ditemukan',
                data: data.result // Mengirimkan seluruh hasil pencarian gambar
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: 'Terjadi kesalahan saat mencari gambar', error: error.message });
        }
    });
}