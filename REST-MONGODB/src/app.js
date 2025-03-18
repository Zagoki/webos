const express = require('express');
const { MongoClient } = require('mongodb');
const { z } = require('zod');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 8000;
const client = new MongoClient('mongodb://localhost:27017');
let db;

// Middleware
app.use(express.json());

// Define the schemas using Zod
const ProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  about: z.string(),
  price: z.number().positive(),
  categoryIds: z.array(z.string())
});
const CreateProductSchema = ProductSchema.omit({ _id: true });

const CategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
});
const CreateCategorySchema = CategorySchema.omit({ _id: true });

// Init MongoDB client connection
client.connect().then(async () => {
    // Select db to use in MongoDB
    db = client.db('myDB');
    console.log('Connected to MongoDB');

    // Create Product endpoint
    app.post('/products', async (req, res) => {
      const result = await CreateProductSchema.safeParse(req.body);

      // If Zod parsed successfully the request body
      if (result.success) {
        const { name, about, price, categoryIds } = result.data;

        const ack = await db.collection('products').insertOne({ name, about, price, categoryIds });

        res.send({ _id: ack.insertedId, name, about, price, categoryIds });
      } else {
        res.status(400).send(result);
      }
    });

    // Create Category endpoint
    app.post('/categories', async (req, res) => {
      const result = await CreateCategorySchema.safeParse(req.body);

      // If Zod parsed successfully the request body
      if (result.success) {
        const { name } = result.data;

        const ack = await db.collection('categories').insertOne({ name });

        res.send({ _id: ack.insertedId, name });
      } else {
        res.status(400).send(result);
      }
    });

    // Aggregation endpoint to join Products with Categories
    app.get('/products-with-categories', async (req, res) => {
      try {
        const products = await db.collection('products').aggregate([
          {
            $lookup: {
              from: 'categories',
              localField: 'categoryIds',
              foreignField: '_id',
              as: 'categories'
            }
          }
        ]).toArray();

        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving products with categories', error });
      }
    });

    // New aggregation endpoint to get products with categories
    app.get('/products', async (req, res) => {
      try {
        const result = await db.collection('products').aggregate([
          { $match: {} },
          {
            $lookup: {
              from: 'categories',
              localField: 'categoryIds',
              foreignField: '_id',
              as: 'categories',
            },
          },
        ]).toArray();

        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
      }
    });

    // Pass the db instance to the routes
    app.use('/api/products', (req, res, next) => {
        req.db = db;
        next();
    }, productRoutes);

    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});