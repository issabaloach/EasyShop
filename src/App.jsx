import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import SignUp from "./Pages/Auth/SignUp";
import SignIn from "./Pages/Auth/LogIn";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Carts from "./Pages/Carts";
import Orders from "./Pages/Orders";
import Auth from "./Pages/Auth/Auth";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<SignIn />} />

        {/* Non-auth routes */}
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Carts />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;