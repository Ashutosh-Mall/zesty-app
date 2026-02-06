import React from "react";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordSetUp from "./pages/PasswordSetUp";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Profile from "./pages/profile/Profile";
import ProfileEdit from "./pages/profile/ProfileEdit";
import FoodItemAdd from "./pages/vendor/FoodItemAdd";
import FoodItems from "./pages/vendor/FoodItems";
import FoodItemEdit from "./pages/vendor/FoodItemEdit";
import Food from "./pages/customer/Food";
import FoodOrder from "./pages/customer/FoodOrder";
import ViewCart from "./pages/customer/ViewCart";
import OrderForDelivery from "./pages/deliveryBoy/OrderForDelivery";
const App = () => {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sendOtp" element={<PasswordSetUp/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/edit" element={<ProfileEdit/>}/>
          <Route path="/vendor/add" element={<FoodItemAdd/>}/>
          <Route path="/vendor/food" element={<FoodItems/>}/>
          <Route path="/food/edit/:id" element={<FoodItemEdit />}/>
          <Route path="/food" element={<Food />} />
          <Route path="/food/:id" element={<FoodOrder/>} />
          <Route path="/cart" element={<ViewCart/>} /> 
          <Route path="/delivery/orders" element={<OrderForDelivery/>} />
        </Routes>
        <Chatbot/>
        <Footer/>
    </div>
  );
};

export default App;
