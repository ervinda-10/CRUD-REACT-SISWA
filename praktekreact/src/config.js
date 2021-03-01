const mysql = require("mysql") 

//inisialisasi database yang digunakan
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pegawai"
})

//lakukan koneksi database
db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

//export konfigurasi database
module.exports = db
