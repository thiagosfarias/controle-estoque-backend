const UserDao = require('./user-dao'), OrdersDao = require('./orders-dao'), ProductDao = require('./product-dao'), auth = require('./auth'), wrapAsync = require('./async-wrap');

module.exports = {
    UserDao,
    ProductDao,
    OrdersDao,
    wrapAsync,
    auth
}