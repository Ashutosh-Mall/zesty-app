import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

const apiUrl = import.meta.env.VITE_API_URL;

const CustomerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/customer/profile`, {
          withCredentials: true,
        });
        setProfile(res.data);
      } catch {
        console.error("Profile fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LineWave height="100" width="100" color="#f97316" />
      </div>
    );
  }

  if (!profile) {
    return (
      <p className="mt-24 text-center text-gray-400">
        Profile not found
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-20">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={
                profile.profileImage ||
                "https://ui-avatars.com/api/?name=User&background=0f172a&color=fff"
              }
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
            />

            <div>
              <h2 className="text-xl font-semibold text-white">
                {profile.userId?.fullName}
              </h2>
              <p className="text-sm text-gray-400">
                {profile.userId?.email}
              </p>
            </div>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              profile.isActive
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {profile.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gray-800 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Account Information
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Bio</span>
              <span className="text-gray-200 text-right">
                {profile.bio || "No bio added"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Orders</span>
              <span className="text-gray-200">
                {profile.orderCount}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Default Address</span>
              <span className="text-gray-200">
                {profile.defaultAddress ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Address Details
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Address</span>
              <span className="text-gray-200 text-right">
                {profile.address || "Not added"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">City / State</span>
              <span className="text-gray-200 text-right">
                {profile.city}, {profile.state}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Pincode</span>
              <span className="text-gray-200">
                {profile.pincode}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Link to="/profile/edit">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium transition">
              Edit Profile
            </button>
          </Link>

          <Link to="/food">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium transition">
              Order Now
            </button>
          </Link>

          <Link to="/cart">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium transition">
              Cart
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CustomerProfile;
