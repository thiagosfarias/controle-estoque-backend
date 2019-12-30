const { ProductDao } = require('../infra');

const api = {}

api.register = async (req, res) => {
    const product = req.body;
    const productId = await new ProductDao(req.db).add(product);
    res.status(204).end();
};