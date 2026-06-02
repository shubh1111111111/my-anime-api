import express from 'express';
import cors from 'cors';
import consumetPkg from '@consumet/extensions';

const app = express();
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Welcome to Shubh's Official AnimePahe Server" });
});

// AnimePahe Search Route
app.get('/anime/animepahe/:query', async (req, res) => {
    try {
        // Log ke mutabik 'AnimePahe' ekdam sahi aur active provider hai
        const animeProvider = new consumetPkg.ANIME.AnimePahe();
        const results = await animeProvider.search(req.params.query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "AnimePahe se data nikalne mein dikkat hui", details: err.message });
    }
});

export default app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
