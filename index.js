import express from 'express';
import cors from 'cors';
import consumetPkg from '@consumet/extensions';

const app = express();
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Welcome to Shubh's Official HiAnime Server" });
});

// Naya Official Search Route (Ab Hianime use karega)
app.get('/anime/hianime/:query', async (req, res) => {
    try {
        // Log ke mutabik 'Hianime' bilkul sahi aur active constructor hai
        const animeProvider = new consumetPkg.ANIME.Hianime();
        const results = await animeProvider.search(req.params.query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "HiAnime se data nikalne mein dikkat hui", details: err.message });
    }
});

export default app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
