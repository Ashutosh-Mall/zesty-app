import React from "react";
import { Navigate } from "react-router-dom";

import CustomerProfile from "./customer/CustomerProfile";
import VendorProfile from "./vendor/VendorProfile";
import DeliveryProfile from "./deliveryBoy/DeliveryProfile";

const Profile = () => {
  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ Role-based profile
  if (user.role === "customer") {
    return <CustomerProfile />;
  } 
  else if (user.role === "vendor") {
    return <VendorProfile />;
  } 
  else if (user.role === "delivery") {
    return <DeliveryProfile />;
  } 
  else {
    return <p className="text-center text-red-400">Invalid user role</p>;
  }
};

export default Profile;
