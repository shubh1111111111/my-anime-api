const express = require('express');
const cors = require('cors');
// Ab hum direct Gogoanime ko hi nikal rahe hain bina kisi beech wale naam ke
const { Gogoanime } = require('@consumet/extensions');

const app = express();
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Welcome to Shubh's Anime Server" });
});

// Anime Search Route (Gogoanime)
app.get('/anime/gogoanime/:query', async (req, res) => {
    try {
        // Direct constructor call bina kisi jhanjhat ke
        const gogoanime = new Gogoanime();
        const results = await gogoanime.search(req.params.query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Data nikalne mein dikkat hui", details: err.message });
    }
});

module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
