class ProductController {
    constructor(db) {
        this.collection = db.collection('products');
    }

    async createProduct(req, res) {
        try {
            const product = req.body;
            const result = await this.collection.insertOne(product);
            res.status(201).json(result.ops[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error });
        }
    }

    async getProducts(req, res) {
        try {
            const products = await this.collection.find().toArray();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products', error });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await this.collection.findOne({ _id: new require('mongodb').ObjectID(id) });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product', error });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const updatedProduct = req.body;
            const result = await this.collection.updateOne(
                { _id: new require('mongodb').ObjectID(id) },
                { $set: updatedProduct }
            );
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const result = await this.collection.deleteOne({ _id: new require('mongodb').ObjectID(id) });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }
}

module.exports = ProductController;