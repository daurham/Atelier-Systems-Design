// const pool = require('../database/index.js');

// const { Pool } = require('pg')

// const db = new Pool({
//   host: 'localhost',
//   user: 'daurham',
//   database: 'ratings_reviews',
//   port: 5432,
//   password: 'Kippy1212',
//   max: 10,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// module.exports = {
//   getReviews: (id, callback) => {
//     let queryStr = 'select now()';
    // let queryStr = 'SELECT * FROM reviews WHERE id=$1 limit 3';
    // let queryStr = 'SELECT * FROM reviews WHERE id=$1 limit 10';
    //$ indicates which element it's taking in the array starting at 1
    // let queryArg = [id];
    // pool.query('SELECT NOW()', (err, res) => {
    //   console.log(err, res)
    //   pool.end()
    // })
    // pool.query(queryStr, [id], (err, data) => {
    //   if (err) {
    //     console.log('Query Failed: ', err);
    //     callback(err);
    //   } else {
    //     console.log('Query Success: ', data)
    //     callback(null, data)
    //   }
    // })
//   }
// }