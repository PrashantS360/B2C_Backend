const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Service = require('../models/Service');
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Get loggedin User Cart details using: GET "/api/auth/getorders". login required
router.get('/getservicable', fetchuser, async (req, res) => {
    try {
        // const user = await User.findById(req.user.id);
        const orders = await Service.find({ user: req.user.id });
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


router.get('/getallitems', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        // console.log(user);
        let orders = [];
        if (user.email==="prashant5aug@gmail.com"){
            orders = await Service.find();
        }
        let success = true;
        if (orders.length==0) {
            success = false;
        }
        res.json({orders,success});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 2: Add new Item using : POST "api/auth/order". Login required
router.post('/service', fetchuser, async (req, res) => {
    try {
        const { itemCode, title, imgLink, owner,used, price, delivered } = req.body;
        // If there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newItem = new Service({
            user: req.user.id,
            itemCode,
            title,
            imgLink,
            owner,
            used,
            price,
            delivered,
        })
        const savedItem = await newItem.save();
        res.json(savedItem);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router