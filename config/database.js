const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USER_SCHEMA = `CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_password VARCAHR(255) NOT NULL, 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)`

const PRODUCT_SCHEMA = `CREATE TABLE IF NOT EXISTS product (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name VARCHAR(30) NOT NULL,
    product_price DOUBLE,
    product_create_date TIMESTAMP DEFAULT current_timestamp
)`

const ORDER_SCHEMA = `CREATE TABLE IF NOT EXISTS orders (
   orders_id INTEGER PRIMARY KEY AUTOINCREMENT,
   orders_number INTEGER NOT NULL,
   fk_user INTEGER,
   fk_product INTEGER,
   orders_total DOUBLE NOT NULL,
   orders_date TIMESTAMP DEFAULT current_timestamp,
   FOREIGN KEY(fk_user) REFERENCES user(user_id),
   FOREIGN KEY(fk_product) REFERENCES product(product_id)
)`







db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USER_SCHEMA);
    db.run(PRODUCT_SCHEMA);
    db.run(ORDER_SCHEMA);

    db.each("SELECT * FROM user", (err, user) => {
        console.log('Users');
        console.log(user);
    });
    db.each("SELECT * FROM product", (err, product) => {
        console.log('Products');
        console.log(product);
    });
    db.each("SELECT * FROM orders", (err, orders) => {
        console.log('Orders');
        console.log(orders);
    });

});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db