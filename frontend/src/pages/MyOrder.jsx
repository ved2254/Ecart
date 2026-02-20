import OrderCard from '@/components/OrderCard'
// import { Button } from '@/components/ui/button'
import axios from 'axios'
// import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const MyOrder = () => {
//   const navigate = useNavigate()
  const [userOrder, setUserOrder] = useState([])

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const res = await axios.get(`http://localhost:8000/api/v1/orders/myorder`, {
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
    <OrderCard userOrder={userOrder}/>
  )
}

export default MyOrder