import React from "react";
import { CheckCircle } from "lucide-react"; // success icon
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
    <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">

      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="bg-green-500/10 p-6 rounded-full">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mt-6 text-white">
        Payment Successful 🎉
      </h1>

      {/* Message */}
      <p className="text-slate-400 mt-3">
        Thank you for your purchase!  
        Your order has been placed successfully.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-4">
        <button
          onClick={() => navigate("/products")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition font-semibold"
        >
          Continue Shopping
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="w-full border border-purple-500 text-purple-400 py-3 rounded-xl hover:bg-purple-500/10 transition"
        >
          View My Orders
        </button>
      </div>

      {/* Extra small note */}
      <p className="text-xs text-slate-500 mt-6">
        A confirmation email has been sent to your registered email address.
      </p>

    </div>
  </div>
);

};

export default OrderSuccess;