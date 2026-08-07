import { Link } from "react-router-dom";

function BottomNav(){

return(
<div className="fixed bottom-0 left-0 right-0 bg-zinc-900 p-3 flex justify-around text-sm">

<Link to="/">
🏠 Home
</Link>

<Link to="/order">
📦 အော်ဒါ
</Link>

<Link to="/deposit">
💰 ငွေဖြည့်
</Link>

<Link to="/history">
📜 မှတ်တမ်း
</Link>

<Link to="/profile">
👤 Profile
</Link>

</div>
)

}

export default BottomNav;