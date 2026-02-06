import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import FoodItem from "../models/foodItem.model.js";

export const createOrder = async (req, res) => {
  try {
    const { deliveryAddress } = req.body;

    if (!deliveryAddress) {
      return res.status(400).json({ message: "Delivery address is required" });
    }

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // get vendor from first food item
    const firstItem = cart.items[0];
    const food = await FoodItem.findById(firstItem.food);
    if (!food) {
      return res.status(400).json({ message: "Food item not found" });
    }

    const vendorId = food.vendor;

    // create order (NO payment logic)
    const order = new Order({
      customer: req.userId,
      vendor: vendorId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      deliveryAddress,
      orderStatus: "placed"
    });

    await order.save();

    // clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create order"
    });
  }
};

export const showAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      orderStatus: {
        $in: ["placed", "accepted", "preparing", "out_for_delivery"]
      }
    }).populate("customer").populate("vendor")

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders
    });
  } catch (err) {
    console.error("Error fetching orders for delivery boy:", err);
    res.status(500).json({
      success: false,
      message: "Unable to fetch orders"
    });
  }
};
