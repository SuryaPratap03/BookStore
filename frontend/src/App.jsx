import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserHistoryOfOrders from "./components/Profile/UserHistoryOfOrders";
import Settings from "./components/Profile/Settings";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem('id') &&
      localStorage.getItem('token') &&
      localStorage.getItem('role')
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem('role')));
    }
  },[])
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/allBooks" element={<AllBooks />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites/>}></Route>
          <Route path="/profile/orderHistory" element={<UserHistoryOfOrders/>}></Route>
          <Route path="/profile/settings" element={<Settings/>}></Route>
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/viewBookDetails/:id" element={<ViewBookDetails/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
