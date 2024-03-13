import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

const dbConfig = {
  connection: connection,
  createDatabaseAndTable: function () {
    // Connect to MySQL server
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL server: ' + err.stack);
            return;
        }
        console.log('Connected to MySQL server.');
    });
  }
};

export { dbConfig };
      