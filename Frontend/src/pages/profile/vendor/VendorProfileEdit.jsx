import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

const apiUrl = import.meta.env.VITE_API_URL;

const VendorProfileEdit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    profileImage: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    shopName: "",
    restaurantName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
    panNumber: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/vendor/profile`, {
          withCredentials: true,
        });

        setFormData({
          profileImage: res.data.profileImage || "",
          image1: res.data.image1 || "",
          image2: res.data.image2 || "",
          image3: res.data.image3 || "",
          image4: res.data.image4 || "",
          shopName: res.data.shopName || "",
          restaurantName: res.data.restaurantName || "",
          address: res.data.address || "",
          city: res.data.city || "",
          state: res.data.state || "",
          pincode: res.data.pincode || "",
          gstNumber: res.data.gstNumber || "",
          panNumber: res.data.panNumber || "",
        });
      } catch {
        console.error("Failed to load vendor profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(`${apiUrl}/api/vendor/profile`, formData, {
        withCredentials: true,
      });
      navigate("/profile");
    } catch {
      console.error("Vendor profile update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LineWave height="100" width="100" color="#f97316" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-25">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl p-6 sm:p-8 text-white">

        <h2 className="text-2xl font-semibold mb-6">
          Edit Vendor Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Images</h3>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Profile Image URL
              </label>
              <input
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["image1", "image2", "image3", "image4"].map((key, i) => (
                <div key={key}>
                  <label className="block text-sm text-gray-400 mb-1">
                    Image {i + 1}
                  </label>
                  <input
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Business Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Information</h3>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Shop Name
              </label>
              <input
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Restaurant Name
              </label>
              <input
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address</h3>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Address
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["city", "state", "pincode"].map((key) => (
                <div key={key}>
                  <label className="block text-sm text-gray-400 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal Information</h3>

            {["gstNumber", "panNumber"].map((key) => (
              <div key={key}>
                <label className="block text-sm text-gray-400 mb-1">
                  {key === "gstNumber" ? "GST Number" : "PAN Number"}
                </label>
                <input
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-5 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 font-medium disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default VendorProfileEdit;
