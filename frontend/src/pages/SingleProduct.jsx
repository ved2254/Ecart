import Breadcrums from '@/components/Breadcrums'
import ProductDesc from '@/components/ProductDesc'
import ProductImg from '@/components/ProductImg'
import React from 'react'
import { useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'



const SingleProduct = () => {
    const params = useParams()
    const productId = params.id
    const {products} = useSelector(store=>store.product)
    const product = products.find((item)=> item._id === productId)
  return (
  <div className="pt-20 pb-16 bg-slate-950 min-h-screen text-white">
    <div className="max-w-7xl mx-auto px-4">

      {product ? (
        <>
          <Breadcrums product={product} />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Product Images */}
            <div>
              <ProductImg images={product?.productImg} />
            </div>

            {/* Product Description */}
            <div>
              <ProductDesc product={product} />
            </div>

          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-slate-400 text-lg">
            Loading product...
          </p>
        </div>
      )}

    </div>
  </div>
);

}

export default SingleProduct