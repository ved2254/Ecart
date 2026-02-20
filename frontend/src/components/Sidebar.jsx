import { LayoutDashboard, PackagePlus, PackageSearch, Users } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className="hidden md:flex fixed left-0 top-0 h-screen w-[260px] 
    bg-gradient-to-b from-[#0f172a] to-[#0b1120] 
    border-r border-slate-800 
    backdrop-blur-xl z-50">

      <div className="w-full p-6 pt-24 space-y-3">

        {/* Dashboard */}
        <NavLink
          to="/dashboard/sales"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 
            ${
              isActive
                ? "bg-purple-600/20 text-purple-400 border border-purple-500 shadow-lg shadow-purple-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        {/* Add Product */}
        <NavLink
          to="/dashboard/add-product"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 
            ${
              isActive
                ? "bg-purple-600/20 text-purple-400 border border-purple-500 shadow-lg shadow-purple-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <PackagePlus size={20} />
          <span>Add Product</span>
        </NavLink>

        {/* Products */}
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 
            ${
              isActive
                ? "bg-purple-600/20 text-purple-400 border border-purple-500 shadow-lg shadow-purple-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <PackageSearch size={20} />
          <span>Products</span>
        </NavLink>

        {/* Users */}
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 
            ${
              isActive
                ? "bg-purple-600/20 text-purple-400 border border-purple-500 shadow-lg shadow-purple-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <Users size={20} />
          <span>Users</span>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 
            ${
              isActive
                ? "bg-purple-600/20 text-purple-400 border border-purple-500 shadow-lg shadow-purple-500/10"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <FaRegEdit size={18} />
          <span>Orders</span>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
