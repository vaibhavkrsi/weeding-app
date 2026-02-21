import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Connected to PostgreSQL (Wedding DB)');
        client.release();
    } catch (err) {
        console.error('❌ Database connection failed:', err);
        process.exit(1);
    }
};

// Generic query helper: query(text, params?)
export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;
