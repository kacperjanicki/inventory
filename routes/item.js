const { AsyncLocalStorage } = require("async_hooks");
const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.get("/new", async (req, res) => {
    var filteredlist = [];
    const categorylist = await Item.find({}, { category: 1, _id: 0 });
    categorylist.map((item) => {
        if (!filteredlist.includes(item.category)) {
            filteredlist.push(item.category);
        }
    });

    res.render("new", { item: new Item(), type: "new", categorylist: filteredlist });
});

router.get("/:id/edit", async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render("new", { item: item, type: "edit" });
});

router.get("/:id", async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render("index", { items: [item] });
});

router.delete("/:id", async (req, res) => {
    const item = await Item.findById(req.params.id);
    await item.remove();
    res.redirect("/");
});

router.post("/:id", async (req, res) => {
    const item = await Item.findById(req.params.id);
    try {
        item.price = req.body.price;
        item.name = req.body.name;
        item.description = req.body.description;
        item.category = req.body.category;
        await item.save();
        res.redirect(`/item/${item.id}`);
    } catch {
        res.render("new", { item: item, errorMessage: "Error updating item", type: "new" });
    }
});

router.post("/", async (req, res) => {
    const item = new Item({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
    });

    try {
        const newItem = await item.save();
        res.redirect("/");
    } catch {
        res.render("new", { item: item, errorMessage: "Error with adding item", type: "new" });
    }
});

module.exports = router;
