import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function UserAcess({children}) { 
const navigate = useNavigate()
  

  useEffect(() => { 
    const userPermission = localStorage.getItem('token')
    if(!userPermission) { 

        navigate("/")
        
            }
        


  },[navigate])

    return (<div> 


{children || <h1>welcome</h1>}



    </div>)
}

export default UserAcess