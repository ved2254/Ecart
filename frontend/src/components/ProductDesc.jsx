import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useDispatch } from 'react-redux'
import { setCart } from '@/redux/productSlice'
import { toast } from 'sonner'
import { ShoppingCart } from 'lucide-react'
import axios from 'axios'

const ProductDesc = ({ product }) => {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('accessToken')
  const addToCart = async (productId) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/cart/add', { productId }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.data.success) {
        toast.success('Product added to cart')
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
  <div className="flex flex-col gap-6
  bg-slate-800/60 backdrop-blur-lg
  border border-slate-700
  rounded-2xl p-6 md:p-10 shadow-xl">

    {/* Product Name */}
    <h1 className="font-bold text-2xl md:text-4xl text-white">
      {product.productName}
    </h1>

    {/* Category + Brand */}
    <p className="text-slate-400 text-sm md:text-base">
      {product.category} | {product.brand}
    </p>

    {/* Price */}
    <h2 className="text-purple-400 font-bold text-2xl md:text-3xl">
      ₹{product.productPrice}
    </h2>

    {/* Description */}
    <p className="text-slate-300 leading-relaxed line-clamp-6 md:line-clamp-none">
      {product.productDesc}
    </p>

    {/* Quantity */}
    <div className="flex items-center gap-4 mt-2">
      <p className="text-slate-300 font-medium">Quantity:</p>
      <Input
        type="number"
        min="1"
        defaultValue={1}
        className="w-20 bg-slate-900 border-slate-700 text-white"
      />
    </div>

    {/* Add to Cart Button */}
    <Button
      onClick={() => addToCart(product._id)}
      className="bg-purple-600 hover:bg-purple-700
      w-full md:w-max
      flex items-center gap-2
      text-white font-semibold
      py-3 rounded-xl transition
      shadow-lg shadow-purple-500/20"
    >
      <ShoppingCart size={18} />
      Add to Cart
    </Button>

  </div>
);

}

export default ProductDesc