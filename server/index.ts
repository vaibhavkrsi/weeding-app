import path from 'path';
import dotenv from 'dotenv';

// Load .env from root (local dev) or fall back to process env (Render/production)
dotenv.config({ path: path.join(__dirname, '../../.env') }); // compiled: dist/ -> server/ -> root
dotenv.config({ path: path.join(__dirname, '../.env') });    // fallback for ts-node dev
dotenv.config();                                              // final fallback (Render injects vars)


import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';


const app = express();
const PORT = process.env.PORT || 5000;

import authRoutes from './routes/authRoutes';
import assignmentRoutes from './routes/assignmentRoutes';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Wedding Planner API is running');
});

// Start Server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
