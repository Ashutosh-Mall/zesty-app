import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

const apiUrl = import.meta.env.VITE_API_URL;

const DeliveryProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/api/delivery/profile`,
          { withCredentials: true }
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Profile fetch failed", err);
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
    <div className="min-h-screen bg-gray-900 px-4 py-25">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Top Card */}
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {profile.userId?.fullName}
            </h2>
            <p className="text-sm text-gray-400">
              {profile.userId?.email}
            </p>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
              profile.status === "available"
                ? "bg-green-500/10 text-green-400"
                : profile.status === "busy"
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {profile.status}
          </span>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gray-800 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Vehicle Information
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Vehicle Type</span>
              <span className="text-gray-200">
                {profile.vehicleType || "Not added"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Vehicle Number</span>
              <span className="text-gray-200">
                {profile.vehicleNumber || "Not added"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">License Number</span>
              <span className="text-gray-200">
                {profile.licenseNumber || "Not added"}
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Account Status
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Availability</span>
              <span className="text-gray-200 capitalize">
                {profile.status}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Verified</span>
              <span className="text-gray-200">
                {profile.isVerified ? "Yes" : "No"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Account Active</span>
              <span className="text-gray-200">
                {profile.isActive ? "Yes" : "No"}
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

          <Link to="/delivery/orders">
            <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md font-medium transition">
              Available Orders
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DeliveryProfile;
