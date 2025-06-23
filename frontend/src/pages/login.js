import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import customAxios from '../api/customAxios'

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const[errors,setError] = useState("")
  const navigate = useNavigate()

  const sendInfo = async () => {
    try {
      const info = await customAxios.post("/user/login", { username, password })
      localStorage.setItem('token', info.data.token)
      console.log("info", info)
      if (info) {
        navigate("/private")
      }
    } catch (err) {
      console.log("error: ", err)
      setError(err.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6 text-center">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendInfo()
            setUsername("")
            setPassword("")
          }}
          className="space-y-4"
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter username"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <p className = "font-bold text-red-500">{errors}</p>
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded w-full font-semibold"
          >
            Log In
          </button>
        </form>

        <div className="space-y-2">
          <h1 className="text-gray-700">Don’t have an account?</h1>
          <Link to="/register">
            <button className="bg-gray-400 text-white px-4 py-2 rounded w-full font-semibold">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
