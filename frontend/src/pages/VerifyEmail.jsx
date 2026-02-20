import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast } from "sonner";

const VerifyEmail = () => {
    const { token } = useParams(); // token from URL
    const [status, setStatus] = useState("Verifying...");
    const navigate = useNavigate();

    const verifyEmail = async()=>{
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/verify',{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            if(res.data.success){
                setStatus('✅ Email Verified Successfully!')
                setTimeout(()=>{
                    navigate('/login')
                },2000)
            } else {
                setStatus('❌ Invalid or Expired Token."')
            }
            
        } catch (error) {
            console.log(error);           
            setStatus("❌ Verification Failed. Please try again.");
        }
    }

    useEffect(()=>{
        verifyEmail()
    },[token])

   return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
    
    <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl text-center w-full max-w-md">
      
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center animate-pulse">
          <span className="text-2xl">
            {status.includes("Verified") ? "✅" : status.includes("Failed") || status.includes("Invalid") ? "❌" : "⏳"}
          </span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-2">
        {status}
      </h2>

      {status.includes("Verified") && (
        <p className="text-slate-400 text-sm">
          Redirecting you to login page...
        </p>
      )}

    </div>
  </div>
);

}

export default VerifyEmail