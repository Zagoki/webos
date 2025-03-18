const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.post('/', (req, res) => {
    const productController = new ProductController(req.db);
    productController.createProduct(req, res);
});

router.get('/', (req, res) => {
    const productController = new ProductController(req.db);
    productController.getProducts(req, res);
});

router.get('/:id', (req, res) => {
    const productController = new ProductController(req.db);
    productController.getProductById(req, res);
});

router.put('/:id', (req, res) => {
    const productController = new ProductController(req.db);
    productController.updateProduct(req, res);
});

router.delete('/:id', (req, res) => {
    const productController = new ProductController(req.db);
    productController.deleteProduct(req, res);
});

module.exports = router;