import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";


function Register(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");


const register = async()=>{

try{

const user = await createUserWithEmailAndPassword(
auth,
email,
password
);


await setDoc(doc(db,"Users",user.user.uid),{

email: email,
role:"user",
wallet:0

});


alert("Account Created");

}catch(error){

alert(error.message);

}

};


return(
<div className="p-5">

<h1 className="text-2xl">
Create Account
</h1>


<input
className="bg-zinc-900 p-3 mt-4 w-full"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>


<input
className="bg-zinc-900 p-3 mt-3 w-full"
placeholder="Password"
type="password"
onChange={(e)=>setPassword(e.target.value)}
/>


<button
className="bg-yellow-500 text-black p-3 mt-5 w-full"
onClick={register}
>
Register
</button>


</div>
)

}


export default Register;