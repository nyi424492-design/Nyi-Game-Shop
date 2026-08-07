import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";


function Register(){

const [phone,setPhone] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();


const register = async()=>{


const {data:existUser} = await supabase
.from("users")
.select("*")
.eq("phone", phone)
.single();


if(existUser){

alert("ဒီဖုန်းနံပါတ်နဲ့ Account ရှိပြီးသားပါ");
return;

}


const {error} = await supabase
.from("users")
.insert([
{
phone: phone,
password: password,
role: "user",
wallet: 0
}
]);


if(error){

alert(error.message);

}else{

alert("Account Created");

navigate("/login");

}

};



return(

<div className="p-5">

<h1 className="text-3xl font-bold">
NYI GAME SHOP Register
</h1>


<input

className="bg-zinc-900 p-3 mt-5 w-full rounded"

placeholder="Phone Number"

onChange={(e)=>setPhone(e.target.value)}