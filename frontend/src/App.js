import React,{ lazy,Suspense } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserAcess from "./components/access";
import NavBar from "./components/navbar";

function App() {

  
  const Register = React.lazy(() => import("./pages/register"))
  const Private = React.lazy(() => import("./pages/privateURL"))
  const Login = React.lazy(() => import("./pages/login"))
  const Public = React.lazy(() => import('./pages/publicURL'))
  const MyURL = React.lazy(() => import('./pages/myURL'))
  const Stats = React.lazy(() => import('./pages/statistics'))
  return (
    <div>

<Suspense fallback = {<h1>Loading...</h1>}>

<BrowserRouter>
<Routes>



  <Route path = "/register" element = {<Register/>}/>
  <Route path = "/private" element = {<UserAcess><NavBar/><Private/></UserAcess>}/>
  <Route path = "/login" element = {<Login/>}/>
  <Route path = "/" element = {<Public/>}/>
  <Route path = "/myURL" element = {<UserAcess><NavBar/><MyURL/></UserAcess>}/>
  <Route path = "/myURL/:id" element = {<UserAcess><NavBar/><Stats/></UserAcess>}/>
</Routes>




</BrowserRouter>

</Suspense>


      
    </div>
   
  )
}

export default App;

