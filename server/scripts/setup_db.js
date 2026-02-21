const sql = require('mssql/msnodesqlv8');

const config = {
    server: '.\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
    },
};

const createDB = async () => {
    try {
        // Connect to master to create DB
        const pool = await sql.connect(config);
        
        // Create Database if not exists
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Wedding')
            BEGIN
                CREATE DATABASE Wedding;
            END
        `);
        console.log('✅ Database "Wedding" check/creation complete.');
        
        await pool.close();

        // Connect to Wedding DB to create tables
        const dbConfig = { ...config, database: 'Wedding' };
        const dbPool = await sql.connect(dbConfig);

        // Create Users Table
        await dbPool.request().query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
            BEGIN
                CREATE TABLE Users (
                    Id INT PRIMARY KEY IDENTITY(1,1),
                    Name NVARCHAR(100) NOT NULL,
                    Email NVARCHAR(100) NOT NULL UNIQUE,
                    PasswordHash NVARCHAR(255) NOT NULL,
                    Role NVARCHAR(20) NOT NULL CHECK (Role IN ('Customer', 'Planner')),
                    PhoneNumber NVARCHAR(20) NULL,
                    CreatedAt DATETIME DEFAULT GETDATE()
                );
            END
        `);
        console.log('✅ Table "Users" check/creation complete.');

        await dbPool.close();
        console.log('🚀 Database setup finished successfully.');

    } catch (err) {
        console.error('❌ Database setup failed:', err);
    }
};

createDB();
