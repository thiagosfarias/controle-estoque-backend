const productConverter = row => ({
    id: row.product_id,
    name: row.product_name,
});

class ProductDao {
    constructor(db) {
        this._db = db;
    }

    findByName(productName) {

        return new Promise((resolve, reject) => this._db.get(
            `SELECT * FROM product WHERE product_name = ?`,
            [productName],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find product');
                }
                 
                if(row) resolve(productConverter(row));
                resolve(null);
            }
        ));
    }

    add(product) {
        return new Promise((resolve, reject) => {
            
            this._db.run(`
                INSERT INTO product (
                    product_name,
                    product_price,
                    product_create_date
                ) values (?,?,?)
            `,
                [
                    product.productName,
                    product.productPrice, 
                    new Date()
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Can`t register new product');
                    }
                    console.log(`Product ${product.productName} registered!`)
                    resolve();
                });
        });
    }

}

module.exports = ProductDao;