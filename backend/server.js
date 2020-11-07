import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute'
dotenv.config();

//Mongo db connection
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch(error => console.log(error.reason))

const app = express();

app.use("/api/users", userRoute)

app.get("/api/products/", (req, res) => {
    res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id == productId);
    if (product)
        res.send(product);
    else
        res.status(404).send({ msg: "Product Not Found" })
});

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000")
})