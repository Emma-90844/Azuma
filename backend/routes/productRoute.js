import express from 'express';
import Product from '../models/productModel';
import {isAuth, isAdmin} from '../util';


const router = express.Router();
//Route to get list of all products
router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products)
});
//Route to create a product
router.post("/", async(req, res) => {
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
    console.log(newProduct)
        if (newProduct){
            return res
                .status(201)
                .send({ message: "New Product Created", data: newProduct })
        }
     
        return res.status(500).send({ message: ' Error in Creating Product.' });

})

//Delete
router.delete("/:id", async(req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message:"Product Deleted"})
    } else{
        res.send("Error in deleting product")
    }
})


//Route to Update a product
router.put("/:id", isAdmin, async(req, res) => {

    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.catergory= req.body.catergory;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
   //Save updated product to the database
   const updatedProduct = await product.save();
   if (updatedProduct){
       return res
           .status(200)
           .send({ message: "Product Updated", data: updatedProduct })
   }
    }
    return res.status(500).send({ message: ' Error in updating Product.' });
})

export default router;