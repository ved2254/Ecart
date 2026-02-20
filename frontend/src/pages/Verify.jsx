import React from 'react'

const Verify = () => {
    return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
    
    <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
      
      <h2 className="text-2xl font-bold text-indigo-400 mb-4">
        ✅ Check Your Email
      </h2>

      <p className="text-slate-400 text-sm leading-relaxed">
        We've sent you a verification email.  
        Please check your inbox and click the link to activate your account.
      </p>

      <div className="mt-6">
        <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500/20 flex items-center justify-center animate-pulse">
          <span className="text-indigo-400 text-xl">📩</span>
        </div>
      </div>

    </div>
  </div>
);

}

export default Verify