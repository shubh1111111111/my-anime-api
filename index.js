import express from 'express';
import cors from 'cors';

// 🚨 Vercel ke log ke mutabik official fix:
import consumetPkg from '@consumet/extensions';
const { PROVIDERS } = consumetPkg;

const app = express();
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Welcome to Shubh's Fixed Anime Server" });
});

// Zoro Anime Search Route
app.get('/anime/zoro/:query', async (req, res) => {
    try {
        // Ab PROVIDERS sahi se load ho jayega bina kisi crash ke
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
