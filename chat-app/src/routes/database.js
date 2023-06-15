const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'Uly5535',
  server: 'ATH-SQLDEV-001',
  database: 'BOSPSe',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed - ', err))

module.exports = {
  sql, poolPromise
}
