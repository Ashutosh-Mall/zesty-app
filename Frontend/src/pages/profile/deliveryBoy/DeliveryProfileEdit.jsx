import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const DeliveryProfileEdit = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
    status: "offline",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(
        `${apiUrl}/api/delivery/profile`,
        { withCredentials: true }
      );

      setForm({
        vehicleType: res.data.vehicleType || "",
        vehicleNumber: res.data.vehicleNumber || "",
        licenseNumber: res.data.licenseNumber || "",
        status: res.data.status || "offline",
      });
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `${apiUrl}/api/delivery/profile/update`,
        form,
        { withCredentials: true }
      );
      alert("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 rounded-xl p-6 text-white"
      >
        <h2 className="text-xl font-semibold mb-5">
          Edit Profile
        </h2>

        <input
          name="vehicleType"
          placeholder="Vehicle Type"
          value={form.vehicleType}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={form.vehicleNumber}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          name="licenseNumber"
          placeholder="License Number"
          value={form.licenseNumber}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="available">Available</option>
          <option value="busy">Busy</option>
          <option value="offline">Offline</option>
        </select>

        <button
          disabled={loading}
          className={`w-full py-2 rounded-md font-medium transition ${
            loading
              ? "bg-gray-700 text-gray-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default DeliveryProfileEdit;
