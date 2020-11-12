import express from 'express';
import Product from '../models/productModel'


const router = express.Router();
//Route to get list of all products
router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products)
});
//Route to create a product
router.post("/", async(req, res) => {
    console.log(req.body);
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        catergory: req.body.catergory,
        description: req.body.description,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });
    //Save products to the database
    const newProduct = await product.save();
        if (newProduct){
            return res
                .status(201)
                .send({ message: "New Product Created", data: newProduct })
        }
     
        return res.status(500).send({ message: ' Error in Creating Product.' });

})

export default router;