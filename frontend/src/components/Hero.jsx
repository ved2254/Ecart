import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
  <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Latest Electronics <br className="hidden sm:block" />
            <span className="text-indigo-400">at Best Prices</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-lg mx-auto md:mx-0">
            Discover cutting-edge technology with unbeatable deals on
            smartphones, laptops, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/40 transition-all duration-300"
              onClick={() => window.location.href = '/products'}
            >
              Shop Now
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-white hover:bg-white hover:text-slate-900 transition"
                onClick={() => window.location.href = '/products'}
            >
              View Deals
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">
          <div className="absolute w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

          <img
            src="/ekart-hero1.png"
            alt="Electronics Hero"
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl shadow-2xl"
          />
        </div>

      </div>
    </div>
  </section>
);

}

export default Hero