import express from 'express';
import cors from 'cors';
import consumetPkg from '@consumet/extensions';

const app = express();
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Welcome to Shubh's Permanent Anime Server" });
});

// Gogoanime Search Route (Bina Tute Constructor Ke)
app.get('/anime/gogoanime/:query', async (req, res) => {
    try {
        // 🚨 Yeh hai sabse safe raasta: Consumet ke bne-bnae instance ko call karna
        const gogoanimeProvider = consumetPkg.gogoanime; 
        
        if (!gogoanimeProvider) {
            // Agar default instance na mile, toh naya bana lo (Naye versions ke liye safe guard)
            const results = await consumetPkg.ANIME.Gogoanime.search(req.params.query);
            return res.json(results);
        }

        const results = await gogoanimeProvider.search(req.params.query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Gogoanime se data nikalne mein dikkat hui", details: err.message });
    }
});

export default app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
