import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/userSlice'
import { toast } from 'sonner' // or wherever your toast comes from




const Navbar = () => {


    const { user } = useSelector((state) => state.user)
    const { cart } = useSelector((state) => state.product)

    const accessToken = localStorage.getItem('accessToken')
    const admin = user?.role === 'admin' ? true : false
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/logout', {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                dispatch(setUser(null))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className="fixed w-full z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-4">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="/Ekart.png" alt="Ekart Logo" className="w-[90px] md:w-[100px]" />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">

                    <ul className="flex gap-8 items-center text-sm font-medium text-slate-300">
                        <Link to="/" className="hover:text-white transition">
                            <li>Home
                                {/* {user?.firstName ? `, ${user.firstName}` : ""} */}
                                </li>
                        </Link>

                        <Link to="/products" className="hover:text-white transition">
                            <li>Products</li>
                        </Link>

                        {
                            user && <Link to={`/profile/${user._id}`}><li>Profile</li></Link>
                        }
                        {
                            admin && <Link to={'/dashboard/sales'}><li>Dashboard</li></Link>
                        }
                    </ul>

                    {/* Cart */}
                    <Link to="/cart" className="relative text-slate-300 hover:text-white transition">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                           {cart?.items?.length || 0}

                        </span>

                    </Link>

                    {/* Auth Button */}
                    {user ? (
                        <Button
                            onClick={logoutHandler}
                            className="bg-red-600 hover:bg-red-500 text-white"
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            onClick={() => navigate("/login")}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white"
                        >
                            Login
                        </Button>
                    )}
                </nav>

                {/* Mobile Cart + Login */}
                <div className="flex md:hidden items-center gap-4">

                    <Link to="/cart" className="relative text-slate-300">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                           {cart?.items?.length || 0}

                        </span>
                    </Link>

                    {user ? (
                        <Button
                            onClick={logoutHandler}
                            size="sm"
                            className="bg-red-600 text-white"
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            onClick={() => navigate("/login")}
                            size="sm"
                            className="bg-indigo-600 text-white"
                        >
                            Login
                        </Button>
                    )}
                </div>

            </div>
        </header>
    );


}


export default Navbar
