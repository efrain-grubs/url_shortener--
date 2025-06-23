import React, { useEffect, useState } from 'react'
import customAxios from '../api/customAxios'
import { Link } from 'react-router-dom'

function MyURL() {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const getURL = await customAxios.get("/")
        setUrl(getURL.data)
        console.log("urls: ", getURL)
      } catch (err) {
        console.log("err: ", err)
      }
    }

    fetchInfo()
  }, [])

  function DeleteURL(id) { 


const deletion = url.findUser?.filter((info) => { 

 
return (info._id !== id)

})


setUrl((prev) => ({...prev,findUser: deletion}))


const sendDeletion = async() => { 
  

  try { 

    const deleteItem = await customAxios.delete(`/${id}`)

    console.log("item to delete: ",deleteItem)

  }catch(err) { 

    console.log("error: ",err)
  }
}
sendDeletion()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-2xl space-y-4">
        <h1 className="text-2xl font-semibold text-center mb-4">Your Shortened URLs</h1>

        {url?.findUser?.length === 0 && (
          <p className="text-center text-gray-500">You haven’t shortened any URLs yet.</p>
        )}

        {url?.findUser?.map((info) => (
         <div
         key={info._id}
         className="flex items-center justify-between border-b border-gray-200 py-2">
      
         <a
           href={`http://localhost:5050/${info.shortURL}`}
           className="text-blue-600 hover:underline break-all"
           target="_blank"
           rel="noopener noreferrer">
           {`http://localhost:5050/${info.shortURL}`}
         </a>
       
 
         <div className="flex gap-2">
           <Link
             to={`${info._id}`}
             state={{ urlID: info._id }}
             className="bg-gray-400 text-white px-3 py-1 rounded text-sm hover:bg-gray-500 transition">
             Statistics
           </Link>
           <button
             onClick={() => DeleteURL(info._id)}
             className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition" >
             Delete
           </button>
         </div>
       </div>
       
        
        ))}


      </div>
    </div>
  )
}

export default MyURL
