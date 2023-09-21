const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  database: 'subnautica_helper',
  port: 5432
})

const getParts = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM parts ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    })
  })
}

module.exports = {
  getParts
}