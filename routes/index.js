const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.get("/", async (req, res) => {
    const items = await Item.find();
    var filteredlist = [];
    const categorylist = await Item.find({}, { category: 1, _id: 0 });
    categorylist.map((item) => {
        if (!filteredlist.includes(item.category)) {
            filteredlist.push(item.category);
        }
        console.log(item.category);
    });
    console.log(filteredlist);
    res.render("index", { items: items, categorylist: filteredlist });
});
router.get("/category/:name", async (req, res) => {
    const itemsByCat = await Item.find({ category: req.params.name });
    res.render("byCategory", { items: itemsByCat, name: req.params.name });
});

module.exports = router;
