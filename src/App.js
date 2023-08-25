import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminOrders from "./pages/admin/AdminOrders";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import About from "./pages/front/About";
import Products from "./pages/front/Products";
import ProductDetail from "./pages/front/ProductDetail";
import OrderInfo from "./pages/front/OrderInfo";
import OrderSuccess from "./pages/front/OrderSuccess";
import Location from "./pages/front/Location";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="product/:id" element={<ProductDetail />}></Route>
          <Route path="order-info" element={<OrderInfo />}></Route>
          <Route
            path="order-success/:orderId"
            element={<OrderSuccess />}
          ></Route>
          <Route path="location" element={<Location />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="coupons" element={<AdminCoupons />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
