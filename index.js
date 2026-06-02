import express from 'express';
import cors from 'cors';
import { ANIME } from '@consumet/extensions';

const app = express();
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Welcome to Shubh's Anime Server" });
});

// Anime Search Route (Gogoanime)
app.get('/anime/gogoanime/:query', async (req, res) => {
    try {
        // Modern ESM mein yeh constructor ekdam sahi chalega
        const gogoanime = new ANIME.Gogoanime();
        const results = await gogoanime.search(req.params.query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Data nikalne mein dikkat hui", details: err.message });
    }
});

export default app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
