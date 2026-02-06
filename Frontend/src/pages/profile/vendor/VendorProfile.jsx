import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

const apiUrl = import.meta.env.VITE_API_URL;

const VendorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/vendor/profile`, {
          withCredentials: true,
        });
        setProfile(res.data);
      } catch (error) {
        console.error("Vendor profile fetch failed", error);
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
        Vendor profile not found
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-26">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Card */}
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={
                profile.profileImage ||
                "https://ui-avatars.com/api/?name=Vendor&background=0f172a&color=fff"
              }
              alt="Vendor"
              className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
            />

            <div>
              <h2 className="text-xl font-semibold text-white">
                {profile.userId?.fullName}
              </h2>
              <p className="text-sm text-gray-400">
                {profile.userId?.email}
              </p>
              {profile.shopName && (
                <p className="text-sm text-gray-400">
                  {profile.shopName}
                </p>
              )}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-gray-800 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Account Information
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Shop Name</span>
              <span className="text-gray-200 text-right">
                {profile.shopName || "Not added"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Restaurant Name</span>
              <span className="text-gray-200 text-right">
                {profile.restaurantName || "Not added"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">GST Number</span>
              <span className="text-gray-200 text-right">
                {profile.gstNumber || "Not added"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">PAN Number</span>
              <span className="text-gray-200 text-right">
                {profile.panNumber || "Not added"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Status</span>
              <span className="text-gray-200">
                {profile.status}
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
                {profile.city || "-"}, {profile.state || "-"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Pincode</span>
              <span className="text-gray-200">
                {profile.pincode || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Shop / Restaurant Images
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              profile.image1,
              profile.image2,
              profile.image3,
              profile.image4,
            ].map((img, idx) =>
              img ? (
                <img
                  key={idx}
                  src={img}
                  alt={`Vendor ${idx + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              ) : (
                <div
                  key={idx}
                  className="w-full h-32 rounded-md bg-gray-700 flex items-center justify-center text-gray-500 text-sm"
                >
                  No Image
                </div>
              )
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Link to="/profile/edit" className="w-full sm:w-auto">
            <button className="w-full bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-md font-medium text-white transition">
              Edit Profile
            </button>
          </Link>

          <Link to="/vendor/add" className="w-full sm:w-auto">
            <button className="w-full bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-md font-medium text-white transition">
              Add Food
            </button>
          </Link>

          <Link to="/vendor/food" className="w-full sm:w-auto">
            <button className="w-full bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-md font-medium text-white transition">
              View Food
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default VendorProfile;
