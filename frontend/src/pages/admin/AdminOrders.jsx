import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/orders/all",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error("❌ Failed to fetch admin orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-gray-400">
        Loading all orders...
      </div>
    );
  }

  return (
    <div className="pt-25 min-h-screen bg-[#0f172a] text-white py-10 px-4 lg:pl-[350px]">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          📦 Admin - All Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">No orders found.</p>
        ) : (
          <div className="bg-[#1e293b] rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              
              <table className="min-w-[900px] w-full text-sm text-left">
                
                <thead className="bg-[#111827] text-gray-400 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Products</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-[#0f172a] transition"
                    >
                      <td className="px-6 py-4 text-xs break-all text-gray-400">
                        {order._id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-medium text-white">
                          {order.user?.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.user?.email}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1 text-gray-300">
                          {order.products.map((p, idx) => (
                            <div key={idx}>
                              {p.productName} × {p.quantity}
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-semibold text-green-400 whitespace-nowrap">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Paid"
                              ? "bg-green-900/40 text-green-400 border border-green-600"
                              : order.status === "Pending"
                              ? "bg-yellow-900/40 text-yellow-400 border border-yellow-600"
                              : "bg-red-900/40 text-red-400 border border-red-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
