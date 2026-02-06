import { useEffect, useState } from "react";
import axios from "axios";
import { LineWave } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const FoodItems = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchFoods = async () => {
    try {
      const res = await api.get("/api/food/vendor/me");
      setFoods(res.data.foods || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load food items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this food item?"
    );
    if (!ok) return;

    try {
      await api.delete(`/api/food/${id}`);
      setFoods((prev) => prev.filter((food) => food._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete food item");
    }
  };

  const handleEdit = (id) => {
    navigate(`/food/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <LineWave height="100" width="100" color="#f97316" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Your Food Items
          </h2>
        </div>

        {error && <p className="text-orange-400 mb-4">{error}</p>}

        {foods.length === 0 ? (
          <p className="text-gray-400">No food items available</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">
                      {food.name}
                    </h3>
                    <span className="text-orange-400 font-bold">
                      ₹{food.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 line-clamp-2">
                    {food.description}
                  </p>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300">
                      {food.category}
                    </span>

                    {food.isAvailable ? (
                      <span className="text-xs text-green-400">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs text-red-400">
                        Unavailable
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleEdit(food._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(food._id)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItems;
