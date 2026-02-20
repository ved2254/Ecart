import OrderCard from '@/components/OrderCard'
// import { Button } from '@/components/ui/button'
import axios from 'axios'
// import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ShowUserOrders = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [userOrder, setUserOrder] = useState(null)

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const res = await axios.get(`http://localhost:8000/api/v1/orders/user-order/${params.userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (res.data.success) {
      setUserOrder(res.data.orders)
    }
  }

  useEffect(() => {
    getUserOrders()
  }, [])

  console.log(userOrder);

 return (
  <div className=" pt-25 min-h-screen bg-[#0f172a] text-white py-16 px-4 lg:pl-[350px]">
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          📦 User Orders
        </h1>
        <p className="text-gray-400">
          View all orders placed by this user
        </p>
      </div>

      {/* Orders Section */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-6 shadow-2xl">
        <OrderCard userOrder={userOrder} />
      </div>

    </div>
  </div>
);

}

export default ShowUserOrders