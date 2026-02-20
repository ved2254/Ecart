import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setUser } from '@/redux/userSlice';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import userLogo from '../assets/user.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyOrder from './MyOrder';

const Profile = () => {
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const params = useParams()
     const [loading, setLoading] = useState(false)
    const userId = params.userId
    const [updateUser, setUpdateUser] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phoneNo: user?.phoneNo,
        address: user?.address,
        city: user?.city,
        zipCode: user?.zipCode,
        profilePic: user?.profilePic,
        role: user?.role
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(selectedFile) }); // preview only
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        const accessToken = localStorage.getItem("accessToken");

        try {
            // Use FormData for text + file
            const formData = new FormData();
            formData.append("firstName", updateUser.firstName);
            formData.append("lastName", updateUser.lastName);
            formData.append("email", updateUser.email);
            formData.append("phoneNo", updateUser.phoneNo);
            formData.append("address", updateUser.address);
            formData.append("city", updateUser.city);
            formData.append("zipCode", updateUser.zipCode);
            formData.append("role", updateUser.role);

            if (file) {
                formData.append("file", file); // image file for backend multer
            }

            const res = await axios.put(
                `http://localhost:8000/api/v1/user/update/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(res.data.user));
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile");
        } finally {
        setLoading(false);   
    }
    };

    return (
  <div className="pt-24 min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] px-4">

    <Tabs defaultValue="profile" className="max-w-6xl mx-auto">

      {/* Tabs */}
      <TabsList className="grid w-full grid-cols-2 mb-10 bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-xl text-white ">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-xl p-6 md:p-10">

          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            Update Profile
          </h1>

          <div className="flex flex-col lg:flex-row gap-12">

            {/* Profile Image */}
            <div className="flex flex-col items-center w-full lg:w-1/3">
              <img
                src={updateUser?.profilePic || userLogo}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-500 shadow-lg"
              />

              <Label className="mt-6 cursor-pointer bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                Change Picture
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Label>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="w-full lg:w-2/3 space-y-6"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-slate-300">First Name</Label>
                  <Input
                    name="firstName"
                    value={updateUser.firstName}
                    onChange={handleChange}
                    className="mt-2 bg-slate-900 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-slate-300">Last Name</Label>
                  <Input
                    name="lastName"
                    value={updateUser.lastName}
                    onChange={handleChange}
                    className="mt-2 bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Email</Label>
                <Input
                  name="email"
                  value={updateUser.email}
                  disabled
                  className="mt-2 bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <Label className="text-slate-300">Phone Number</Label>
                <Input
                  name="phoneNo"
                  value={updateUser.phoneNo}
                  onChange={handleChange}
                  className="mt-2 bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div>
                <Label className="text-slate-300">Address</Label>
                <Input
                  name="address"
                  value={updateUser.address}
                  onChange={handleChange}
                  className="mt-2 bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-slate-300">City</Label>
                  <Input
                    name="city"
                    value={updateUser.city}
                    onChange={handleChange}
                    className="mt-2 bg-slate-900 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-slate-300">Zip Code</Label>
                  <Input
                    name="zipCode"
                    value={updateUser.zipCode}
                    onChange={handleChange}
                    className="mt-2 bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition"
              >
                Update Profile
              </Button>

            </form>

          </div>
        </div>
      </TabsContent>
         <TabsContent value="orders">
            <MyOrder/>
        </TabsContent>
    </Tabs>
  </div>
);

}

export default Profile