import { Headphones, Shield, Truck } from 'lucide-react'
import React from 'react'

const Features = () => {
    return (
  <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Feature 1 */}
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
          <div className="h-12 w-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
            <Truck className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">
              Free Shipping
            </h3>
            <p className="text-slate-400 text-sm">
              On orders over $50
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
          <div className="h-12 w-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">
              Secure Payment
            </h3>
            <p className="text-slate-400 text-sm">
              100% secure transactions
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
          <div className="h-12 w-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
            <Headphones className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">
              24/7 Support
            </h3>
            <p className="text-slate-400 text-sm">
              Always here to help
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
);

}

export default Features