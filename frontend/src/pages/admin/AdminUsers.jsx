import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Edit, Eye, Search} from 'lucide-react';
import UserLogo from '../../assets/user.jpg'

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getAllUsers = async () => {
        const accessToken = localStorage.getItem("accessToken")
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/all-user`, {
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                setUsers(res.data.users)
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    console.log(users);

   return (
  <div className="pt-25 min-h-screen bg-[#0f172a] text-white py-16 px-4 lg:pl-[350px]">
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl md:text-3xl">
          👥 User Management
        </h1>
        <p className="text-gray-400">
          View and manage registered users
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
        <Input
          className="pl-9 bg-[#1e293b] border-gray-700 text-white placeholder:text-gray-400"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-gray-400 mt-10">
          No users found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-[#1e293b] border border-gray-700 p-5 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={user?.profilePic || UserLogo}
                  alt=""
                  className="rounded-full w-16 h-16 object-cover border-2 border-indigo-500"
                />

                <div>
                  <h2 className="font-semibold text-white">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-sm text-gray-400 break-all">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-5">

                <Button
                  onClick={() =>
                    navigate(`/dashboard/users/${user?._id}`)
                  }
                  className="flex gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>

                <Button
                  onClick={() =>
                    navigate(`/dashboard/users/orders/${user?._id}`)
                  }
                  className="flex gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Eye className="w-4 h-4" />
                  Orders
                </Button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  </div>
);

}

export default AdminUsers