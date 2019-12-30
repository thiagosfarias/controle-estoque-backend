const { productAPI } = require('../api'),
    path = require('path'),
    { wrapAsync }  = require('../infra');

module.exports = app => {

    app.route('/product')
        .post(wrapAsync(userAPI.login));

};