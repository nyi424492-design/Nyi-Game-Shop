import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Order from "./pages/Order";

import Deposit from "./pages/Deposit";
import History from "./pages/History";
import Profile from "./pages/Profile";

import BottomNav from "./components/BottomNav";


function App() {

  return (
    <BrowserRouter>

      <div className="min-h-screen bg-black text-white pb-16">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/order" element={<Order />} />

          <Route path="/deposit" element={<Deposit />} />

          <Route path="/history" element={<History />} />

          <Route path="/profile" element={<Profile />} />

        </Routes>


        <BottomNav />

      </div>

    </BrowserRouter>
  );
}


export default App;