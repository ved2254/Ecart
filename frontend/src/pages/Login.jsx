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
import { setUser } from "@/redux/userSlice"
import axios from "axios"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler = async(e) => {
        e.preventDefault()
        console.log(formData);
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8000/api/v1/user/login', formData, {
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(res.data.success){
               navigate('/')
               dispatch(setUser(res.data.user))
               localStorage.setItem("accessToken", res.data.accessToken)
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
          Login to your account
        </CardTitle>
        <CardDescription className="text-slate-400">
          Enter your email below to login
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-5">
          
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="m@example.com"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Link
                to="#"
                className="ml-auto text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10 focus:ring-2 focus:ring-indigo-500"
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
          onClick={submitHandler}
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/40"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Please wait
            </>
          ) : (
            "Login"
          )}
        </Button>

        <p className="text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 hover:underline transition"
          >
            Signup
          </Link>
        </p>
      </CardFooter>

    </Card>
  </div>
);

}

export default Login



