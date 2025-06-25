import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Public() {
  const [url, setURL] = useState("")
  const [shorten, setShorten] = useState("")

  const sendUrl = async () => {
    try {
      const info = await axios.post("https://url-shortener-tdrd.onrender.com/public", { url })
      console.log("info", info)
      console.log("information", info.data.shortURL)
      setShorten(info.data.urlID)
    } catch (err) {
      console.log("error: ", err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center space-y-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendUrl()
            setURL("")
          }}
          className="space-y-4"
        >
          <input
            value={url}
            onChange={(e) => setURL(e.target.value)}
            placeholder="Paste your URL here"
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="w-full font-bold bg-red-500 text-white px-4 py-2 rounded"
          >
            Shorten
          </button>
        </form>

        <div className="space-y-2">
          <p className="font-semibold">Your shortened link</p>
          <input
            type="text"
            value={`https://url-shortener-tdrd.onrender.com/${shorten}`}
            readOnly
            className="border p-2 rounded w-full text-center"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(`https://url-shortener-tdrd.onrender.com/${shorten}`)
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Copy
          </button>
        </div>

        <div className="pt-4 space-y-2">
          <h1 className="text-lg font-semibold">Want to make your own custom URL?</h1>
          <h2>Create an account with us</h2>
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <button className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
            </Link>
            <Link to="/login">
              <button className="bg-gray-700 text-white px-4 py-2 rounded">Log In</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Public

