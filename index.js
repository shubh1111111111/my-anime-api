import express from 'express';
import cors from 'cors';

// 🚨 Sabse direct tarika: Bina kisi beech wale bundle ke, seedha Zoro extension ko nikaalo!
import { Zoro } from '@consumet/extensions/dist/providers/anime/zoro.js';

const app = express();
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Welcome to Shubh's Direct Anime Server" });
});

// Anime Search Route
app.get('/anime/zoro/:query', async (req, res) => {
    try {
        // Direct object create karo kyunki humne seedha file hi import kar li hai
        const zoroProvider = new Zoro();
        const results = await zoroProvider.search(req.params.query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Zoro se data nikalne mein dikkat hui", details: err.message });
    }
});

export default app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
