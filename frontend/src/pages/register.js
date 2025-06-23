import React, { useState } from 'react'
import customAxios from '../api/customAxios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const[errors,setErrors] = useState(null)
  const navigate = useNavigate()

  const register = async () => {
    try {
      const sendUserInfo = await customAxios.post("/user/register", {
        name,
        username,
        password
      })
      console.log("userInfo: ", sendUserInfo)
      if (sendUserInfo) {
        navigate('/login')
      }
    } catch (err) {
      console.log("error: ", err)
      console.log("info", name)
      setErrors(err.response.data.errors[0].msg)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6 text-center">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            register()
            setName("")
            setPassword("")
            setUsername("")
          }}
          className="space-y-4"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name..."
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username..."
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password..."
            className="border border-gray-300 p-2 rounded w-full"
          />
          <p className = "font-bold text-red-500">{errors}</p>
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded w-full font-semibold"
          >
            Register
          </button>
        </form>

        <div className="space-y-2">
          <h1 className="text-gray-700">Have an account?</h1>
          <Link to="/login">
            <button className="bg-gray-400 text-white px-4 py-2 rounded w-full font-semibold">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
