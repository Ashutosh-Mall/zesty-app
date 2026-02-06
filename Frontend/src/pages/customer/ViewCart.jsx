import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineWave } from "react-loader-spinner";

const apiUrl = import.meta.env.VITE_API_URL;

const ViewCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/cart`, {
        withCredentials: true,
      });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (foodId) => {
    try {
      await axios.post(
        `${apiUrl}/api/cart/remove`,
        { foodId },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      alert("Please enter your delivery address");
      return;
    }

    try {
      setCheckoutLoading(true);
      await axios.post(
        `${apiUrl}/api/order/create`,
        { deliveryAddress },
        { withCredentials: true }
      );
      alert("Order placed successfully!");
      setDeliveryAddress("");
      fetchCart();
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Checkout failed. Try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LineWave height="100" width="100" color="#f97316" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-25">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Your Cart
        </h2>

        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 bg-gray-700 rounded-lg p-4"
            >
              <img
                src={item.food.image}
                alt={item.food.name}
                className="w-20 h-20 rounded-md object-cover"
              />

              <div className="flex-1">
                <h3 className="text-white font-medium">
                  {item.food.name}
                </h3>
                <p className="text-sm text-gray-400">
                  ₹{item.price} × {item.quantity}
                </p>
                <p className="text-orange-400 font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.food._id)}
                className="text-sm text-red-400 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 my-6" />

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-2">
            Delivery Address
          </label>
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter your delivery address"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg text-white font-medium">
            Total
          </span>
          <span className="text-xl text-orange-400 font-semibold">
            ₹{cart.totalAmount}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className={`w-full py-2 rounded-md font-medium transition ${
            checkoutLoading
              ? "bg-gray-700 text-gray-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {checkoutLoading ? "Placing Order..." : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default ViewCart;
