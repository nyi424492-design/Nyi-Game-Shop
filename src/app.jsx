import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import BottomNav from "./components/BottomNav";


function App(){

return(

<BrowserRouter>

<div className="min-h-screen bg-black text-white">


<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>


</Routes>


<BottomNav/>


</div>

</BrowserRouter>

)

}


export default App;