const router = require("express").Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.addToCart);
router.post("/find/:id", cartController.getCart);
router.delete("/:cartItemId", cartController.deleteCartItem);
router.post("/quantity", cartController.decrementCartItem);

module.exports = router;
