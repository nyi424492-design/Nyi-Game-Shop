import { useState } from "react";
import { db, storage } from "../firebase";

import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";


function Order(){

const [game,setGame] = useState("");
const [packageName,setPackageName] = useState("");
const [gameId,setGameId] = useState("");
const [file,setFile] = useState(null);


const submitOrder = async()=>{

try{

let imageURL = "";

// Upload Payment Screenshot
if(file){

const imageRef = ref(
storage,
`payments/${Date.now()}-${file.name}`
);


await uploadBytes(imageRef,file);


imageURL = await getDownloadURL(imageRef);

}


// Save Order Database

await addDoc(
collection(db,"Orders"),
{

game: game,
package: packageName,
gameId: gameId,
paymentImage: imageURL,

status:"Pending",

createdAt:serverTimestamp()

}

);


alert("Order Success");


}catch(error){

alert(error.message);

}


};



return(

<div className="p-5">


<h1 className="text-3xl font-bold">
Create Order
</h1>


<select
className="bg-zinc-900 p-3 w-full mt-5"
onChange={(e)=>setGame(e.target.value)}
>

<option>
Select Game
</option>

<option>
Mobile Legends
</option>

<option>
PUBG Mobile
</option>

<option>
Free Fire
</option>

<option>
Honor of Kings
</option>

<option>
Blood Strike
</option>

<option>
Telegram
</option>

</select>



<input
className="bg-zinc-900 p-3 w-full mt-3"
placeholder="Package (Example: 86 Diamond)"
onChange={(e)=>setPackageName(e.target.value)}
/>



<input
className="bg-zinc-900 p-3 w-full mt-3"
placeholder="Game ID"
onChange={(e)=>setGameId(e.target.value)}
/>



<input
type="file"
className="mt-3"
onChange={(e)=>setFile(e.target.files[0])}
/>



<button

className="bg-yellow-500 text-black p-3 w-full mt-5 rounded"

onClick={submitOrder}

>

Submit Order

</button>


</div>

)

}


export default Order;