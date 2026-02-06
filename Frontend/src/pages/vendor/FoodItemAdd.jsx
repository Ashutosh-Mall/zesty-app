import { useState } from "react";
import axios from "axios";
import { LineWave } from "react-loader-spinner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const FoodItemAdd = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    image: "",
    name: "",
    price: "",
    category: "",
    description: "",
    isAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...form,
        price: Number(form.price), // important
      };

      await api.post("/api/food/create", payload);

      setMessage("Food item added successfully!");

      // optional: reset form
      setForm({
        image: "",
        name: "",
        price: "",
        category: "",
        description: "",
        isAvailable: true,
      });

    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <LineWave height="100" width="100" color="#f97316" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 pt-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Add Food Item
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4"
        >
          {message && (
            <p className="text-sm text-orange-400">{message}</p>
          )}

          <input
            placeholder="Image URL"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            required
          />

          <input
            placeholder="Food name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            required
          />

          <input
            placeholder="Price (₹)"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            required
          />

          <input
            placeholder="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            required
          />

          <textarea
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            required
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
            />
            Available for order
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold text-white"
            >
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodItemAdd;
