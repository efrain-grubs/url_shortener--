import React, { useState } from 'react'
import customAxios from '../api/customAxios'

function PrivateURL() {
  const [random, setRandom] = useState(false)
  const [custom, setCustom] = useState(true)
  const [customURL, setCustomURL] = useState("")
  const [url, setURL] = useState("")
  const [display, setDisplay] = useState(false)
  const [id, setId] = useState(null)

  const sendURL = async () => {
    try {
      const info = await customAxios.post("/custom", { url, customURL })
      console.log("info", info)
      setDisplay(true)
    } catch (err) {
      console.log("error: ", err)
    }
  }

  const sendRand = async () => {
    try {
      const info = await customAxios.post("/private", { url })
      console.log("info: ", info)
      setId(info.data.urlID)
      setDisplay(true)
    } catch (err) {
      console.log("error: ", err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg space-y-6 text-center">
        <div className="space-x-4">
          <button
            className="font-semibold bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setRandom(true)
              setCustom(false)
            }}
          >
            Random URL
          </button>
          <button
            className="font-semibold bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => {
              setCustom(true)
              setRandom(false)
            }}
          >
            Custom URL
          </button>
        </div>

        {random && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendRand()
            }}
            className="space-y-4"
          >
            <input
              value={url}
              onChange={(e) => setURL(e.target.value)}
              placeholder="Enter URL..."
              className="border p-2 rounded w-full"
            />
            <button type="submit" className="bg-gray-300 px-4 py-2 rounded font-semibold w-full">
              Shorten
            </button>

            {display && (
              <div className="space-y-2">
                <input
                  readOnly
                  className="border p-2 rounded w-full text-center"
                  value={`https://url-shortener-tdrd.onrender.com/${id}`}
                />
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(`https://url-shortener-tdrd.onrender.com/${id}`)}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => {
                      setURL("")
                      setDisplay(false)
                    }}
                    className="bg-gray-500 text-white px-4 py-1 rounded"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        {custom && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendURL()
            }}
            className="space-y-4"
          >
            <input
              value={url}
              onChange={(e) => setURL(e.target.value)}
              placeholder="Enter URL..."
              className="border p-2 rounded w-full"
            />
            <p className="text-gray-600">Convert URL to:</p>
            <input
              value={customURL}
              onChange={(e) => setCustomURL(e.target.value)}
              placeholder="Enter custom URL..."
              className="border p-2 rounded w-full"
            />
            <button
              type="submit"
              className="bg-gray-600 text-white px-4 py-2 rounded w-full font-semibold"
            >
              Shorten URL
            </button>

            {display && customURL && url && (
              <div className="space-y-2">
                <input
                  readOnly
                  value={`https://url-shortener-tdrd.onrender.com/${customURL}`}
                  className="border p-2 rounded w-full text-center"
                />
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(`https://url-shortener-tdrd.onrender.com/${customURL}`)
                  }
                  className="bg-blue-500 text-white px-4 py-1 rounded w-full"
                >
                  Copy
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setURL("")
                setCustomURL("")
              }}
              className="bg-gray-400 text-white px-4 py-1 rounded w-full"
            >
              Clear
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default PrivateURL
