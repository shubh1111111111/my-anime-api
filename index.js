import express from 'express';
import cors from 'cors';
// Yeh hai official tarika saare providers ko ek sath nikalne ka
import { PROVIDERS } from '@consumet/extensions';

const app = express();
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Welcome to Shubh's Official Anime Server" });
});

// Official Anime Search Route
app.get('/anime/zoro/:query', async (req, res) => {
    try {
        // Official docs ke mutabik: PROVIDERS.anime.Zoro se hi constructor banta hai
        const zoroProvider = new PROVIDERS.anime.Zoro();
        const results = await zoroProvider.search(req.params.query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Zoro se data nikalne mein dikkat hui", details: err.message });
    }
});

export default app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
