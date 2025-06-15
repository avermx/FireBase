import { useState } from 'react'
import { Mail, Lock } from "lucide-react";
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';


const SignIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      console.log(res)
    
      toast.success('User Logged In Successfully', {
        position: 'top-center'
      })
    } catch (error) {
      if(error.code == 'auth/invalid-credential'){
        toast.error('Email or Password Does Not Exist')
        return;
      }
      console.log(error.code)
      
      toast.error(error.message, {
        position: 'top-center'
      })
    }


  }


  return (
    <div className="min-h-screen bg-[#f0f5ff] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">
          Todo Manager
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in to your account to get started
        </p>

        {/* Sign In Form */}
        <form className="space-y-4" onSubmit={handlesubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white font-medium rounded hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>

        <Link to={'/'}>
          SignUp
        </Link>
      </div>
    </div>
  );
}

export default SignIn