import Cart from "../models/cart.model.js";
import FoodItem from "../models/foodItem.model.js";

export const viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({user: req.userId}).populate("items.food");

    if (!cart) {
      return res.status(200).json({items: [], totalAmount: 0});
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({message: "Failed to fetch cart"});
  }
};

export const addToCart = async (req, res) => {
  try {
    const {foodId, quantity = 1} = req.body;

    const food = await FoodItem.findById(foodId);
    if (!food || !food.isAvailable) {
      return res.status(400).json({message: "Food not available"});
    }

    const price = food.price;

    let cart = await Cart.findOne({user: req.userId});

    if (!cart) {
      cart = new Cart({
        user: req.userId,
        items: [
          {
            food: foodId,
            quantity,
            price,
          },
        ],
        totalAmount: price * quantity,
      });
    } else {
      const givenitem = cart.items.find(
        (item) => item.food.toString() === foodId
      );
      if (!givenitem) {
        cart.items.push({
          food: foodId,
          quantity,
          price,
        });
      } else {
        givenitem.quantity += quantity;
      }

      cart.totalAmount = cart.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    }
    await cart.save();
    return res.status(200).json({message: "Successfully added to cart",cart});
  } catch (err) {
    res.status(500).json({message: "Failed to add to cart"});
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const {foodId} = req.body;

    const cart = await Cart.findOne({user: req.userId});
    if (!cart) {
      return res.status(404).json({message: "Cart not found"});
    }

    cart.items = cart.items.filter((item) => item.food.toString() !== foodId);

    cart.totalAmount = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Item removed from cart",
      cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Failed to remove item"});
  }
};
