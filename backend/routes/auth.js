const express = require('express');
const router = express.Router();
const Sellerregister = require('../models/sellerregister');
const Userregister = require('../models/userregister');
const Product = require('../models/products');
const Contact = require('../models/contact');
const bcrypt = require('bcryptjs');


router.post("/sellerregister", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "please fill all the fields" });
    }

    try {

        const userexist = await Sellerregister.findOne({ email: email, password: password });

        if (userexist) {
            return res.status(401).json({ error: "user already exists" });
        } else {
            const user = new Sellerregister({ name, email, password });

            const saveuser = await user.save();

            if (saveuser) {
                return res.status(201).json({ message: "user registered successfully" });
            } else {
                return res.status(401).json({ error: "user registration failed" });
            }
        }

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

})


router.post("/userregister", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "please fill all the fields" });
    }

    try {

        const userexist = await Userregister.findOne({ email: email });

        if (userexist) {
            return res.status(401).json({ error: "user already exists" });
        } else {
            const user = new Userregister({ name, email, password });

            const saveuser = await user.save();

            if (saveuser) {
                return res.status(201).json({ message: "user registered successfully" });
            } else {
                return res.status(401).json({ error: "user registration failed" });
            }
        }

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

})


router.get("/sellerregister", async (req, res) => {

    try {
        const user = await Sellerregister.find();
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})


router.get("/sellerregister/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await Sellerregister.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.get("/userregister", async (req, res) => {
    try {
        const user = await Userregister.find();
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.get("/userregister/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await Userregister.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
            console.log(user);
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.post("/userlogin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "please fill all the fields properly" });
    } else {
        try {
            const user = await Userregister.findOne({ email: email });

            if (user) {
                const ismatch = await bcrypt.compare(password, user.password);

                if (ismatch) {
                    const token = await user.generateAuthToken();
                    console.log(token);
                    return res.status(201).json({ token, message: "login successfully" });
                } else {
                    return res.status(404).json({ error: "Invalid credentials" });
                }

            } else {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server side error occurs" });
        }

    }
})


router.post("/sellerlogin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "please fill all the fields" });
    } else {
        try {
            const user = await Sellerregister.findOne({ email: email });

            if (user) {
                const ismatch = await bcrypt.compare(password, user.password);

                if (ismatch) {
                    const token = await user.generateAuthToken();
                    console.log(token);
                    return res.status(201).json({ token, message: "login successfully" });
                } else {
                    return res.status(404).json({ error: "Invalid credentials" });
                }

            } else {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Server side error occurs" });
        }
    }
})


router.get("/products", async (req, res) => {
    try {
        const prod = await Product.find();
        res.send(prod);
    } catch (error) {
        console.log(error);
    }
})


router.get("/products/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const prod = await Product.findById(_id);
        res.send(prod);
    } catch (error) {
        console.log(error);
    }
})


router.post("/contact", async (req, res) => {

    const { name, email, contact, message } = req.body;

    if (!name || !email || !contact || !message) {
        return res.status(422).json({ error: "please fill all the fields properly" });
    }

    try {

        const detail = new Contact({ name, email, contact, message });

        const detailssaved = await detail.save();

        if (detailssaved) {
            return res.status(201).json({ message: "your contact details received successfully" });
        } else {
            return res.status(500).json({ error: "error occurs please try again later" });
        }

    } catch (error) {
        console.log(error);
    }

})


router.post("/product", async (req, res) => {

    const { name, price, catagory, color, image, desc } = req.body;

    if (!name || !price || !catagory || !color || !image || !desc) {
        return res.status(422).json({ error: "please fill all the fields properly" });
    }

    try {

        const product = new Product({ name, price, catagory, color, image, desc })

        const productsaved = await product.save();

        if (productsaved) {
            return res.status(201).json({ message: "your product saved successfully" });
        } else {
            return res.status(500).json({ error: "error occurs please try again later" });
        }

    } catch (error) {
        console.log(error);
    }

})


module.exports = router;
