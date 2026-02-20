import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-200'>
      
      <div className='max-w-7xl mx-auto px-4 py-12'>
        
        {/* Grid Layout */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>

          {/* Company Info */}
          <div>
            <Link to='/'>
              <img src='/Ekart.png' alt="Ekart Logo" className='w-32 mb-4'/>
            </Link>
            <p className='text-sm text-gray-400'>
              Powering Your World with the Best in Electronics.
            </p>
            <p className='mt-3 text-sm text-gray-400'>
              123 Electronics St, Style City, NY 10001
            </p>
            <p className='text-sm text-gray-400'>
              Email: support@Zaptro.com
            </p>
            <p className='text-sm text-gray-400'>
              Phone: (123) 456-7890
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Customer Service</h3>
            <ul className='space-y-2 text-sm text-gray-400'>
              <li className='hover:text-white cursor-pointer'>Contact Us</li>
              <li className='hover:text-white cursor-pointer'>Shipping & Returns</li>
              <li className='hover:text-white cursor-pointer'>FAQs</li>
              <li className='hover:text-white cursor-pointer'>Order Tracking</li>
              <li className='hover:text-white cursor-pointer'>Size Guide</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Follow Us</h3>
            <div className='flex space-x-4 text-2xl'>
              <FaFacebook className='hover:text-blue-500 cursor-pointer transition'/>
              <FaInstagram className='hover:text-pink-500 cursor-pointer transition'/>
              <FaTwitterSquare className='hover:text-sky-500 cursor-pointer transition'/>
              <FaPinterest className='hover:text-red-500 cursor-pointer transition'/>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Stay in the Loop</h3>
            <p className='text-sm text-gray-400'>
              Subscribe to get special offers and updates.
            </p>
            <form className='mt-4 flex flex-col sm:flex-row'>
              <input
                type="email"
                placeholder='Your email address'
                className='w-full p-3 rounded-md sm:rounded-l-md sm:rounded-r-none bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500'
              />
              <button
                type='submit'
                className='mt-3 sm:mt-0 sm:ml-0 bg-pink-600 text-white px-5 py-3 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-pink-700 transition'
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className='mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400'>
          <p>
            &copy; {new Date().getFullYear()} 
            <span className='text-pink-500 font-semibold'> EKart</span>. 
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
