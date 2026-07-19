const Pool = require('pg').Pool;

const pool = new Pool ({

    user:'postgres',
    password:'0728',
    host:'localhost',
    port:5432,
    database:'captainscrabdatabase'

});

module.exports = pool;