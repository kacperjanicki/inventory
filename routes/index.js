const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.get("/", async (req, res) => {
    const items = await Item.find({}).sort({ price: -1 });
    var filteredlist = [];
    const categorylist = await Item.find({}, { category: 1, _id: 0 });
    categorylist.map((item) => {
        if (!filteredlist.includes(item.category)) {
            filteredlist.push(item.category);
        }
    });
    res.render("index", { items: items, categorylist: filteredlist });
});
router.get("/category/:name", async (req, res) => {
    let searchOptions = {};
    if ((req.params.name != null) & (req.params.name !== "")) {
        searchOptions.name = new RegExp(req.params.name, "i");
    }
    try {
        const itemsByCat = await Item.find({ category: searchOptions.name });
        res.render("byCategory", { items: itemsByCat, name: req.params.name, searchOptions: searchOptions });
    } catch {
        res.redirect("/");
    }
});

module.exports = router;
