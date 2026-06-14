const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


router.get('/categories', async(req, res) => {
    try {
        const categories = await Category.find();

        res.json(categories);

    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch categories'
        });
    }
});


module.exports = router;