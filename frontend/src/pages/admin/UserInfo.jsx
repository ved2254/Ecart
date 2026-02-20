import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import userLogo from '..//../assets/user.jpg'
import { toast } from 'sonner'
import { setUser } from '@/redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft } from 'lucide-react'

const UserInfo = () => {
    const [userDetails, setUserDetails] = useState(null)
    const [updateUser, setUpdateUser] = useState(null);
    const [file, setFile] = useState(null);
    const { user } = useSelector(store => store.user);
    const params = useParams()
    const userId = params.id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(userId);

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
                // Only update store if user is editing their own profile
                const loggedInUserId = user?._id; // get from Redux
                if (userId === loggedInUserId) {
                    dispatch(setUser(res.data.user));

                    // Step 2: Redirect if role changed
                    if (res.data.user.role !== "admin") {
                        navigate("/"); // Go to home if role changed from admin
                    }
                }
                
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile");
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/get-user/${userId}`)
            if (res.data.success) {
                setUserDetails(res.data.user)
                setUpdateUser(res.data.user)  // ✅ set form values after fetch
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getUserDetails()
    }, [])

    console.log(userDetails);

    // Wait until data is loaded
    if (!updateUser) {
        return <p className="text-center mt-10 pt-5 min-h-screen flex items-center justify-center">Loading...</p>
    }

   return (
  <div className="pt-25 min-h-screen bg-[#0f172a] text-white py-16 px-4 lg:pl-[350px]">
    <div className="max-w-6xl mx-auto space-y-10">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#1e293b] hover:bg-[#334155]"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold">
          👤 Update Profile
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Profile Image Section */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-6 flex flex-col items-center shadow-2xl">
          <img
            src={updateUser?.profilePic || userLogo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
          />

          <Label className="mt-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
            Change Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 bg-[#1e293b] border border-gray-700 rounded-2xl p-8 shadow-2xl space-y-6"
        >

          {/* Name Fields */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label>First Name</Label>
              <Input
                type="text"
                name="firstName"
                value={updateUser?.firstName}
                onChange={handleChange}
                className="mt-2 bg-[#0f172a] border-gray-700 text-white"
              />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={updateUser?.lastName}
                onChange={handleChange}
                className="mt-2 bg-[#0f172a] border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={updateUser?.email}
              disabled
              className="mt-2 bg-[#111827] border-gray-700 text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNo"
              value={updateUser?.phoneNo}
              onChange={handleChange}
              className="mt-2 bg-[#0f172a] border-gray-700 text-white"
            />
          </div>

          {/* Address */}
          <div>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={updateUser?.address}
              onChange={handleChange}
              className="mt-2 bg-[#0f172a] border-gray-700 text-white"
            />
          </div>

          {/* City & Zip */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                value={updateUser?.city}
                onChange={handleChange}
                className="mt-2 bg-[#0f172a] border-gray-700 text-white"
              />
            </div>

            <div>
              <Label>Zip Code</Label>
              <Input
                type="text"
                name="zipCode"
                value={updateUser?.zipCode}
                onChange={handleChange}
                className="mt-2 bg-[#0f172a] border-gray-700 text-white"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <Label className="mb-3 block">Role</Label>
            <RadioGroup
              value={updateUser?.role}
              onValueChange={(value) =>
                setUpdateUser({ ...updateUser, role: value })
              }
              className="flex gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">User</Label>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
          >
            Update Profile
          </Button>

        </form>
      </div>
    </div>
  </div>
);

}

export default UserInfo