import React, { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ProductImg = ({ images }) => {
    const [mainImg, setMainImg] = useState(images[0].url)
    return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
        {images.map((img, index) => (
          <img
            key={index}
            onClick={() => setMainImg(img.url)}
            src={img.url}
            alt=""
            className={`cursor-pointer w-20 h-20 object-cover rounded-xl border-2 transition-all duration-300
              ${
                mainImg === img.url
                  ? "border-[#9CD5FF] scale-105"
                  : "border-gray-700 hover:border-gray-500"
              }`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="bg-[#1e293b] rounded-2xl p-4 shadow-2xl order-1 lg:order-2 flex justify-center items-center">
        <Zoom>
          <img
            src={mainImg}
            alt=""
            className="w-full max-w-[450px] rounded-xl object-contain"
          />
        </Zoom>
      </div>

    </div>
  );
}

export default ProductImg