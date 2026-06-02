const express = require('express');
const cors = require('cors');
const { ANIME } = require('@consumet/extensions');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Welcome to Shubh's Anime Server" });
});

app.get('/anime/gogoanime/:query', async (req, res) => {
    try {
        const gogoanime = new ANIME.Gogoanime();
        const results = await gogoanime.search(req.params.query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
