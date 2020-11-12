import express from 'express';
import User from '../models/userModel'
import { getToken } from '../util';

const router = express.Router();
//Sign in route
router.post("/signin", async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)

        })
    } else {
        res.status(401).send({ msg: "Invalid Email or Password" })
    }
})


//Register route
router.post("/register", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();
    //if new user exist
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    } else {
        res.status(401).send({ msg: "Invalid User Data" })
    }
});



//Create user route
router.get("/createadmin", async (req, res) => {
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