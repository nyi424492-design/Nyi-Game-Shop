import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();


const login = async()=>{

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Login Success");

navigate("/");

}catch(error){

alert(error.message);

}

};


return(

<div className="p-5">

<h1 className="text-3xl font-bold">
NYI GAME SHOP Login
</h1>


<input
className="bg-zinc-900 p-3 mt-5 w-full rounded"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>


<input
className="bg-zinc-900 p-3 mt-3 w-full rounded"
placeholder="Password"
type="password"
onChange={(e)=>setPassword(e.target.value)}
/>


<button
className="bg-yellow-500 text-black p-3 mt-5 w-full rounded"
onClick={login}
>
Login
</button>


<button
className="mt-3 text-yellow-400"
onClick={()=>navigate("/register")}
>
Create Account
</button>


</div>

)

}


export default Login;