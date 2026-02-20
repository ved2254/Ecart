import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(formData);
        try {
            setLoading(true)
            const res = await axios.post(' http://localhost:8000/api/v1/user/register', formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                navigate('/verify')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

   
    return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
    <Card className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-2xl">
      
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold text-white">
          Create your account
        </CardTitle>
        <CardDescription className="text-slate-400">
          Enter details below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="m@example.com"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 pr-10"
              />

              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(false)}
                  className="w-5 h-5 text-slate-400 absolute right-3 top-3 cursor-pointer hover:text-white transition"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(true)}
                  className="w-5 h-5 text-slate-400 absolute right-3 top-3 cursor-pointer hover:text-white transition"
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3">
        <Button
          type="submit"
          onClick={submitHandler}
          className="w-full bg-indigo-600 hover:bg-indigo-500  font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/40"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Please wait
            </>
          ) : (
            "Signup"
          )}
        </Button>

        <p className="text-slate-400 text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-indigo-400 hover:text-indigo-300 hover:underline transition"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
);

}

export default Signup