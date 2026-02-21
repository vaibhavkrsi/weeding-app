const sql = require('mssql/msnodesqlv8');

const config = {
    database: 'Wedding',
    server: '.\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
    },
};

async function setupEnhancedSchema() {
    try {
        await sql.connect(config);
        console.log('✅ Connected to SQL Server');

        // Add status column to Users table
        console.log('Adding status column to Users...');
        await sql.query(`
            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'Status')
            BEGIN
                ALTER TABLE Users ADD Status NVARCHAR(50) DEFAULT 'Active'
            END
        `);

        // Add preferences column (NVARCHAR for JSON storage)
        console.log('Adding preferences column to Users...');
        await sql.query(`
            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Users' AND COLUMN_NAME = 'Preferences')
            BEGIN
                ALTER TABLE Users ADD Preferences NVARCHAR(MAX) NULL
            END
        `);

        // Create Assignments table
        console.log('Creating Assignments table...');
        await sql.query(`
            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Assignments')
            BEGIN
                CREATE TABLE Assignments (
                    Id INT IDENTITY(1,1) PRIMARY KEY,
                    CustomerId INT NOT NULL,
                    PlannerId INT NULL,
                    Status NVARCHAR(50) DEFAULT 'Pending',
                    WeddingType NVARCHAR(100),
                    SelectedServices NVARCHAR(MAX),
                    CreatedAt DATETIME DEFAULT GETDATE(),
                    UpdatedAt DATETIME DEFAULT GETDATE(),
                    FOREIGN KEY (CustomerId) REFERENCES Users(Id),
                    FOREIGN KEY (PlannerId) REFERENCES Users(Id)
                )
            END
        `);

        // Create Services table
        console.log('Creating Services table...');
        await sql.query(`
            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Services')
            BEGIN
                CREATE TABLE Services (
                    Id INT IDENTITY(1,1) PRIMARY KEY,
                    Name NVARCHAR(255) NOT NULL,
                    Category NVARCHAR(100),
                    Description NVARCHAR(MAX),
                    ImageUrl NVARCHAR(500),
                    CreatedAt DATETIME DEFAULT GETDATE()
                )
            END
        `);

        // Create PlannerAvailability table
        console.log('Creating PlannerAvailability table...');
        await sql.query(`
            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'PlannerAvailability')
            BEGIN
                CREATE TABLE PlannerAvailability (
                    Id INT IDENTITY(1,1) PRIMARY KEY,
                    PlannerId INT NOT NULL,
                    Date DATE NOT NULL,
                    TimeSlot NVARCHAR(50),
                    IsBooked BIT DEFAULT 0,
                    FOREIGN KEY (PlannerId) REFERENCES Users(Id)
                )
            END
        `);

        // Insert sample services
        console.log('Inserting sample services...');
        await sql.query(`
            IF NOT EXISTS (SELECT * FROM Services WHERE Category = 'venue')
            BEGIN
                INSERT INTO Services (Name, Category, Description)
                VALUES 
                    ('Venue Booking', 'venue', 'Premium wedding venues'),
                    ('Decoration', 'decoration', 'Floral and theme decoration'),
                    ('Photography', 'photography', 'Professional wedding photography'),
                    ('Makeup & Styling', 'makeup', 'Bridal makeup and styling'),
                    ('Catering', 'catering', 'Wedding catering services'),
                    ('Guest Stay', 'accommodation', 'Hotel accommodations')
            END
        `);

        console.log('✅ Enhanced schema setup complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Schema setup failed:', err);
        process.exit(1);
    }
}

setupEnhancedSchema();
