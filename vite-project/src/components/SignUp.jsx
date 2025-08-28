import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { useState } from "react"
import { toast } from 'react-hot-toast'
import { Link, Navigate, useNavigate } from "react-router"
import app from '../Firebase'



const SignUp = () => {

  const auth = getAuth(app)
  const [fullname, setFullname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password).then((currentUser) => {
      const user = currentUser.user
      console.log(user)
    }).catch((error) => {
      console.log(error)
    })

  }





  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit}

        className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>

        <div>
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setFullname(e.target.value)}
            required
            className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setemail(e.target.value)}
            required
            className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            required
            className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={'/signin'} className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
export default SignUp