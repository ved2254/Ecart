import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { setCart } from '@/redux/productSlice'
import { ShoppingCart, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import userLogo from '../assets/user.jpg'
import { toast } from 'sonner'

const Cart = () => {
  const { cart } = useSelector(store => store.product)
  const dispatch = useDispatch()
  const navigate = useNavigate()
const subtotal = cart?.totalPrice || 0;
const shipping = subtotal > 50 ? 0 : 10;
const tax = subtotal * 0.05;
const total = subtotal + shipping + tax;


  const API = "http://localhost:8000/api/v1/cart";
  const accessToken = localStorage.getItem("accessToken");

  const loadCart = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);

    }
  };

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(`${API}/update`, { productId, type },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);

    }
  };

const handleRemove = async (productId) => {
  try {
    const res = await axios.delete(`${API}/remove`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { productId }   // ✅ use productId, not id
    });
    if (res.data.success) {
      dispatch(setCart(res.data.cart));
      toast.success('Product removed from cart');
    }
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    loadCart();
  }, [dispatch]);


  console.log(cart);

  return (
  <div className="pt-20 bg-slate-950 min-h-screen text-white">
    {cart?.items?.length > 0 ? (
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cart?.items?.map((product) => (
              <Card key={product.productId._id} className="bg-slate-800 border-slate-700 p-4">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  {/* Product Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={product?.productId?.productImg?.[0]?.url || userLogo}
                      alt=""
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div>
                      <h2 className="font-semibold text-lg">
                        {product?.productId?.productName}
                      </h2>
                      <p className="text-slate-400">
                        ₹{product?.productId?.productPrice}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() =>
                        handleUpdateQuantity(product.productId._id, "decrease")
                      }
                      variant="outline"
                    >
                      -
                    </Button>

                    <span className="font-medium">
                      {product.quantity}
                    </span>

                    <Button
                      onClick={() =>
                        handleUpdateQuantity(product.productId._id, "increase")
                      }
                      variant="outline"
                    >
                      +
                    </Button>
                  </div>

                  {/* Price */}
                  <div className="font-semibold text-lg">
                    ₹
                    {(product?.productId?.productPrice * product?.quantity)
                      .toLocaleString("en-IN")}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      handleRemove(product?.productId?._id)
                    }
                    className="flex items-center gap-1 text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>

              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-[400px] w-full">
            <Card className="bg-slate-800 border-slate-700 sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="flex justify-between">
                  <span>Subtotal ({cart?.items?.length} items)</span>
                  <span>₹{subtotal?.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping?.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>₹{tax?.toLocaleString("en-IN")}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>₹{total?.toLocaleString("en-IN")}</span>
                </div>

                <Button
                  onClick={() => navigate("/address")}
                  size="lg"
                  className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
                >
                  Place Order
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to="/products">Continue Shopping</Link>
                </Button>

                <div className="text-sm text-slate-400 pt-4 space-y-1">
                  <p>• Free shipping on orders over ₹50</p>
                  <p>• 30-day return policy</p>
                  <p>• Secure checkout</p>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    ) : (
      /* Empty Cart */
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-slate-800 p-6 rounded-full">
          <ShoppingCart className="w-16 h-16 text-purple-500" />
        </div>

        <h2 className="mt-6 text-2xl font-bold">
          Your Cart is Empty
        </h2>

        <p className="mt-2 text-slate-400">
          Looks like you haven’t added anything yet.
        </p>

        <Button
          onClick={() => navigate("/products")}
          className="mt-6 bg-purple-600 hover:bg-purple-700"
        >
          Start Shopping
        </Button>
      </div>
    )}
  </div>
);

}

export default Cart