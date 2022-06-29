import { Route, Routes } from "react-router";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import AddCategorie from "./components/DashBoard/AddCategorie";
import DashBoard from "./components/DashBoard/DashBoard";
import Nav from "./components/Nav/Nav";
import Categoriepage from "./pages/categoriepage";
import HomePage from "./pages/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { Authintcated, fetchMe } from "./store/authSlice";
import ToastsArea from "./components/ToastsArea/ToastsArea";
import Footer from "./components/footer/Footer";
import Signup from "./components/register-user/Signup"
function App() {
  const [showrgister,setShowrgister]=useState(false)
  const dispatch = useDispatch();
  const isAuth = useSelector(Authintcated);

  if (isAuth) {
    dispatch(fetchMe());
  }

const showrgisterpaage=()=>{
  if (showrgister === false){
    setShowrgister(true)
  }else if (showrgister === true){
    setShowrgister(false)
  }
  
};


  return (
    <div className="App">
      
      <Nav showrgisterpaage={showrgisterpaage} />
      {showrgister && <Signup/>}  
      <ToastsArea />
      <div className="page">
      
        <Routes>
          <Route path="/categories/create" element={<AddCategorie />} />
          <Route path="/categories" element={<Categoriepage />} />
          <Route path="/admin-board" element={<DashBoard />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
