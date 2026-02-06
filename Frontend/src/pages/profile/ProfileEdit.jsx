import React from "react";
import { Navigate } from "react-router-dom";

import CustomerProfileEdit from "./customer/CustomerProfileEdit";
import VendorProfileEdit from "./vendor/VendorProfileEdit";
import DeliveryProfileEdit from "./deliveryBoy/DeliveryProfileEdit";

const ProfileEdit = () => {
  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ Role-based edit profile
  if (user.role === "customer") {
    return <CustomerProfileEdit />;
  } 
  else if (user.role === "vendor") {
    return <VendorProfileEdit />;
  } 
  else if (user.role === "delivery") {
    return <DeliveryProfileEdit />;
  } 
  else {
    return (
      <p className="text-center text-red-400">
        Invalid user role
      </p>
    );
  }
};

export default ProfileEdit;
