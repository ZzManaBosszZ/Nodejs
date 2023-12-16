const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sem3'
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến MySQL: ', err);
    return;
  }
  console.log('Đã kết nối đến cơ sở dữ liệu MySQL');
});

module.exports = connection;


