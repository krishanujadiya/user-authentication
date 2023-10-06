var express = require('express');
var router = express.Router();


const product_controller = require("../controllers/ProductController");

router.get("/products", product_controller.get_products);
router.post("/products", product_controller.store_products);
router.put("/products/:productId", product_controller.update_products);
router.delete("/products/:productId", product_controller.delete_products);

module.exports = router;
