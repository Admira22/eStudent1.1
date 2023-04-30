const pg = require('pg');

const config = {
    user: 'avpvaepo',
    database: 'avpvaepo',
    password: '7m0EcMZO52X4gZq1--nn2gci-OwkSVw2',
    host: 'trumpet.db.elephantsql.com',
    port: 5432,
    max: 100,
    idleTimeoutMillis: 30000,
}
const pool = new pg.Pool(config);
module.exports = pool;