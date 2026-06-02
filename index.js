import express from 'express';
import cors from 'cors';
import { ANIME } from '@consumet/extensions';

const app = express();
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Welcome to Shubh's Zoro Anime Server" });
});

// Naya Anime Search Route (Ab Zoro use karega)
app.get('/anime/zoro/:query', async (req, res) => {
    try {
        // Yahan humne Zoro provider call kiya hai
        const zoro = new ANIME.Zoro();
        const results = await zoro.search(req.params.query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Zoro se data nikalne mein dikkat hui", details: err.message });
    }
});

export default app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
