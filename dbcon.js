var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_barbaca',
  password        : '6130',
  database        : 'cs340_barbaca'
});
module.exports.pool = pool;