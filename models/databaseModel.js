const mysql = require("mysql2");

class Database {
    static connect() {
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "todolist",
        });
    }

    static query(sql, callback) {
        const connection = this.connect();

        connection.query(sql, (err, res) => {
            if (err) console.error(err);
            if (callback) callback(res);
        });
    }
}

module.exports = Database;
