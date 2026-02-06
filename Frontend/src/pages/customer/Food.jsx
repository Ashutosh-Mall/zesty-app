import { useEffect, useState } from "react";
import axios from "axios";
import { LineWave } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchAllFoods = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/food`, {
        withCredentials: true,
      });

      setFoods(res.data.foods || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load food items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFoods();
  }, []);

  const handleOrderNow = (id) => {
    navigate(`/food/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LineWave height="100" width="100" color="#f97316" />
      </div>
    );
  }

  const availableFoods = foods.filter((food) => food.isAvailable);

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-16">
      <div className="max-w-6xl mx-auto">

        <div className="bg-gray-800 rounded-xl p-5 mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Explore Food
          </h2>
        </div>

        {error && (
          <p className="text-orange-400 mb-4">
            {error}
          </p>
        )}

        {availableFoods.length === 0 ? (
          <p className="text-gray-400">
            No food available right now. Please check back later.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableFoods.map((food) => (
              <div
                key={food._id}
                className="bg-gray-800 rounded-xl overflow-hidden"
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
                    <span className="text-orange-400 font-semibold">
                      ₹{food.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 line-clamp-2">
                    {food.description}
                  </p>

                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-300">
                    {food.category}
                  </span>

                  <button
                    onClick={() => handleOrderNow(food._id)}
                    className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md text-sm font-medium transition"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Food;
