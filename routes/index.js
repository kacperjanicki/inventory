const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.get("/", async (req, res) => {
    const items = await Item.find();
    res.render("index", { items: items });
});
router.get("/category/:name", async (req, res) => {
    const itemsByCat = await Item.find({ category: req.params.name });
    res.render("byCategory", { items: itemsByCat, name: req.params.name });
});

module.exports = router;
