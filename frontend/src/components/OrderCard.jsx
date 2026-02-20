import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const OrderCard = ({userOrder}) => {
     const navigate = useNavigate()
    return (
  <div className="pt-24 min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] px-4">

    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Button
          onClick={() => navigate(-1)}
          className="bg-slate-800 border border-slate-700 hover:bg-slate-700"
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-3xl font-bold text-white">Orders</h1>
      </div>

      {/* No Orders */}
      {userOrder?.length === 0 ? (
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-2xl p-10 text-center text-slate-400 text-xl">
          No orders found for this user.
        </div>
      ) : (
        <div className="space-y-8">

          {userOrder?.map((order) => (
            <div
              key={order._id}
              className="bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-xl p-6"
            >

              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Order ID:
                    <span className="text-slate-400 ml-2 break-all">
                      {order._id}
                    </span>
                  </h2>

                  <p className="text-slate-400 text-sm mt-1">
                    {order.user?.firstName} {order.user?.lastName}
                  </p>

                  <p className="text-slate-500 text-sm">
                    {order.user?.email}
                  </p>
                </div>

                <div className="flex items-center gap-4">

                  <p className="text-white font-semibold">
                    {order.currency} {order.amount.toFixed(2)}
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Paid"
                        ? "bg-green-500/20 text-green-400 border border-green-500"
                        : order.status === "Failed"
                        ? "bg-red-500/20 text-red-400 border border-red-500"
                        : "bg-orange-500/20 text-orange-400 border border-orange-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-4">
                <h3 className="text-slate-300 font-medium">Products</h3>

                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/70 border border-slate-700 rounded-xl p-4 hover:border-purple-500 transition"
                  >

                    {/* Left Side */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        onClick={() =>
                          navigate(`/products/${product?.productId?._id}`)
                        }
                        src={product.productId?.productImg?.[0]?.url}
                        alt=""
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                      />

                      <div>
                        <p className="text-white font-medium line-clamp-1">
                          {product.productId?.productName}
                        </p>
                        <p className="text-slate-500 text-sm break-all">
                          {product?.productId?._id}
                        </p>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex justify-between sm:justify-end items-center gap-6 w-full sm:w-auto">
                      <span className="text-slate-400 text-sm">
                        ₹{product.productId?.productPrice}
                      </span>
                      <span className="text-white font-medium">
                        x {product.quantity}
                      </span>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  </div>
);

}

export default OrderCard
