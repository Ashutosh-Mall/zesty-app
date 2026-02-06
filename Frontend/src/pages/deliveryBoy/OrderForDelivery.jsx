import { useEffect, useState } from "react";
import axios from "axios";
import { LineWave } from "react-loader-spinner";

const apiUrl = import.meta.env.VITE_API_URL;

const OrderForDelivery = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/order/orders`,
        { withCredentials: true }
      );
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error while fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LineWave height="100" width="100" color="#f97316" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        No orders available for delivery 🚴‍♂️
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-25 text-white">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-2xl font-semibold mb-6">
          Orders for Delivery
        </h2>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-800 rounded-xl p-5 mb-5"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-400">
                Order ID: {order._id}
              </span>

              <span className="px-3 py-1 rounded-full text-sm bg-orange-500/10 text-orange-400 capitalize">
                {order.orderStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Vendor</p>
                <p className="font-medium">
                  {order.vendor?.shopName || "Vendor"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Customer</p>
                <p className="font-medium">
                  {order.customer?.customerName || "Customer"}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-400">Delivery Address</p>
              <p className="text-gray-200">
                {order.deliveryAddress}
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-orange-400 font-semibold">
                ₹{order.totalAmount}
              </span>
            </div>

            <button
              onClick={() => alert("Accept order feature coming soon")}
              className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-md font-medium transition"
            >
              Accept Order
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default OrderForDelivery;
