import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LineWave } from "react-loader-spinner";

const apiUrl = import.meta.env.VITE_API_URL;

const FoodOrder = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const fetchFood = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/food/${id}`, {
        withCredentials: true,
      });
      setFood(res.data.food);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  const addToCart = async () => {
    try {
      setAdding(true);
      await axios.post(
        `${apiUrl}/api/cart/add`,
        { foodId: food._id, quantity },
        { withCredentials: true }
      );
      alert("Added to cart ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LineWave height="100" width="100" color="#f97316" />
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Food not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-25">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl overflow-hidden">

        <img
          src={food.image}
          alt={food.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {food.name}
            </h2>
            <span className="text-orange-400 font-semibold">
              ₹{food.price}
            </span>
          </div>

          <p className="text-sm text-gray-400">
            {food.description}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Quantity</span>

            <div className="flex items-center bg-gray-700 rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-white"
              >
                −
              </button>
              <span className="px-4 text-white">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-white"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={addToCart}
            disabled={adding}
            className={`w-full py-2 rounded-md font-medium transition ${
              adding
                ? "bg-gray-700 cursor-not-allowed text-gray-300"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodOrder;
