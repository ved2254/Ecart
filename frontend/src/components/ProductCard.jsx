import React from 'react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '@/redux/productSlice'
import { Skeleton } from './ui/skeleton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { ShoppingCart } from 'lucide-react'

const ProductCard = ({ product, loading }) => {
    // const { carts } = useSelector(store => store.cart)
    const { cart } = useSelector(store => store.product)
    const { productImg, productPrice, productName } = product
    const accessToken = localStorage.getItem('accessToken')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addToCart = async (productId) => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/cart/add', { productId }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if(res.data.success){
                // console.log("CART RESPONSE:", res.data);
                toast.success('Product added to cart')
                dispatch(setCart(res.data.cart));
                // console.log("Redux Cart:", res.data.cart);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
  <div className="group bg-[#1e293b] border border-gray-800 hover:border-[#9CD5FF] transition-all duration-300 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl h-max">

    {/* Image */}
    <div className="w-full aspect-square overflow-hidden bg-[#0f172a]">
      {
        loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img
            onClick={() => navigate(`/products/${product._id}`)}
            src={productImg[0]?.url}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
          />
        )
      }
    </div>

    {/* Content */}
    {
      loading ? (
        <div className="p-4 space-y-3">
          <Skeleton className="w-[70%] h-4 bg-gray-700" />
          <Skeleton className="w-[40%] h-4 bg-gray-700" />
          <Skeleton className="w-full h-10 bg-gray-700 rounded-lg" />
        </div>
      ) : (
        <div className="p-4 space-y-3">

          <h1 className="text-gray-200 font-semibold line-clamp-2 h-12">
            {productName}
          </h1>

          <h2 className="text-[#9CD5FF] font-bold text-lg">
            ₹{productPrice}
          </h2>

          <Button
            onClick={() => addToCart(product._id)}
            className="w-full bg-[#9CD5FF] text-black hover:bg-[#7cc4f5] transition-all duration-300 rounded-xl flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </Button>

        </div>
      )
    }

  </div>
)

}

export default ProductCard