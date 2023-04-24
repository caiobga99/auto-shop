import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/index";
import Register from "./components/Register/index";
import Home from "./pages/Home/index";
import Sale from "./pages/Sale/index";
import Profile from "./pages/Profile/index";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

import ReactGA from "react-ga";

const TRACKING_ID = "G-KNWLS24FGR";

ReactGA.initialize(TRACKING_ID);

export default function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setUserName(user.displayName) : setUserName("");
      console.log(user);
    });
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/venda" element={<Sale />} />
        <Route exact path="/logOut" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </div>
  );
}
