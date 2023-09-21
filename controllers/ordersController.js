const Order = require("../models/Order");

module.exports = {
  getUserOrders: async (req, res) => {
    const userId = req.params.id;

    try {
      const userOrders = await Order.find({ userId })
      .populate();
    } catch (error) {}
  },
};
