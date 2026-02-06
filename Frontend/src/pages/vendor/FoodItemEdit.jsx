import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LineWave } from "react-loader-spinner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const FoodItemEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    image: "",
    name: "",
    price: "",
    category: "",
    description: "",
    isAvailable: true,
  });

  /* ===== FETCH FOOD ITEM ===== */
  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const res = await api.get(`/api/food/${id}`);
        setForm(res.data.food);
      } catch {
        setError("Failed to load food item");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItem();
  }, [id]);

  /* ===== HANDLERS ===== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.put(`/api/food/${id}`, form);
      navigate("/vendor/food");
    } catch {
      setError("Failed to update food item");
    } finally {
      setSaving(false);
    }
  };

  /* ===== LOADER ===== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <LineWave height="90" width="90" color="#f97316" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 pt-20">
      <div className="max-w-lg mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-xl font-semibold text-white">Edit Food Item</h2>

        {error && (
          <p className="text-sm text-orange-400 bg-orange-500/10 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">

          {/* Image */}
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Name */}
          <input
            name="name"
            placeholder="Food Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Price */}
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Category */}
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Description */}
          <textarea
            name="description"
            rows={3}
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Availability */}
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={() =>
                setForm({ ...form, isAvailable: !form.isAvailable })
              }
              className="accent-orange-500"
            />
            Available for order
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FoodItemEdit;
