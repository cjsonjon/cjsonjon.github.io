import mysql from "mysql"

// export const db = mysql.createConnection({
//   host:"localhost",
//   user:"root",
//   password: "pass",
//   port: '3306',
//   database:"blog"
// })

export const db = mysql.createPool({
  connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'blog',
    debug: false
})