import express from 'express';
import cors from 'cors';
import consumetPkg from '@consumet/extensions';

const app = express();
app.use(cors());

// Default Route
app.get('/', (req, res) => {
    res.json({ status: "🟢 Live", message: "Debugging Consumet..." });
});

// Debug Route
app.get('/anime/zoro/:query', async (req, res) => {
    try {
        // Yeh line Vercel ke log mein poori library ka sach baahar nikaal degi
        console.log("--- CONSUMET PACKAGE KEYS ---", Object.keys(consumetPkg));
        
        if (consumetPkg.ANIME) {
            console.log("--- ANIME KEYS ---", Object.keys(consumetPkg.ANIME));
        }

        res.json({ message: "Check your Vercel logs now!" });
    } catch (err) {
        res.status(500).json({ error: "Debug fail", details: err.message });
    }
});

export default app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
