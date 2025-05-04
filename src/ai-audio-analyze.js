const fetch = require("node-fetch");

module.exports = function (app) {

  // UI INTERAKTIF
  app.get('/ai/audio-analyze-ui', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Audio Analyzer</title>
          <style>
            body { font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto; }
            input, button { margin: 5px 0; padding: 8px; width: 100%; }
            textarea { width: 100%; height: 200px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h2>Audio Analyzer UI</h2>
          <input type="text" id="apikey" placeholder="Masukkan API Key Anda" />
          <input type="text" id="q" placeholder="Pertanyaan (contoh: Audio apa ini?)" />
          <input type="text" id="url" placeholder="URL Audio (contoh: https://...mp3)" />
          <button onclick="analyze()">Execute</button>
          <textarea id="output" readonly placeholder="Hasil akan muncul di sini..."></textarea>

          <script>
            async function analyze() {
              const apikey = document.getElementById("apikey").value;
              const q = document.getElementById("q").value;
              const url = document.getElementById("url").value;
              const output = document.getElementById("output");

              output.value = "Processing...";

              try {
                const res = await fetch(\`/ai/audio-analyze?apikey=\${apikey}&q=\${encodeURIComponent(q)}&url=\${encodeURIComponent(url)}\`);
                const data = await res.json();
                output.value = JSON.stringify(data, null, 2);
              } catch (err) {
                output.value = "Error: " + err.message;
              }
            }
          </script>
        </body>
      </html>
    `);
  });

  // ENDPOINT API
  app.get('/ai/audio-analyze', async (req, res) => {
    const { apikey, q, url } = req.query;

    if (!global.apikey.includes(apikey)) {
      return res.status(403).json({ status: false, error: 'Apikey invalid' });
    }

    if (!q || !url) {
      return res.status(400).json({ status: false, error: 'Parameter q dan url wajib diisi.' });
    }

    try {
      const response = await fetch(`https://api.maelyn.tech/api/gemini/audio?q=${encodeURIComponent(q)}&url=${encodeURIComponent(url)}&apikey=ubed2407`);
      const data = await response.json();

      if (data.status !== "Success" || data.code !== 200) {
        return res.status(500).json({ status: false, error: 'Gagal menganalisis audio.' });
      }

      res.json({ status: true, result: data.result });

    } catch (error) {
      console.error("Audio Analyze Error:", error);
      res.status(500).json({ status: false, error: 'Internal server error.' });
    }
  });

};