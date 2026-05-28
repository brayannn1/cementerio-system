const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'brayancementerio123',
    database: 'cementerio_db',
    
});

module.exports = pool;