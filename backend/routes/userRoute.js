import express from 'express';
import User from '../models/userModel'

const router = express.Router();


router.get("/createadmin", async(req, res) => {
    try {  
        const user = new User({
            name: "Polycarp",
            email: "policarp@gmail.com",
            password: "123456",
            isAdmin: false
        });
        const newUser = await user.save();
        console.log(newUser)
        res.send(user)
    } catch (error) {
        res.send({ msg: error.message })
    }

})

export default router;