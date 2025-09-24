import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './component/Login/Login';

// Admin imports
import AdminDashboard from "./component/Admin/AdminDashboard";
import ProtectedRoute from "./component/Admin/ProtectedRoute";
import ProductInventory from "./component/Admin/product/ProductInventory";
import AddProduct from "./component/Admin/product/AddProduct";
import UpdateProduct from "./component/Admin/product/UpdateProduct";
import AddUser from "./component/Users/AddUser";
import AdminLayout from "./component/Admin/AdminLayout";

// User imports
import UserDashboard from "./component/User/UserDashboard";
import DisplayProduct from "./component/Users/product/DisplayProduct";
import Product from "./component/Users/product/Product";
import Cart from "./component/Users/product/Cart";
import OrderPlacement from "./component/Users/product/OrderPlacement";
import OrderPage from "./component/Users/product/OrderPage";
import UserLayout from "./component/Users/UserLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="product"
          element={
            <ProtectedRoute role="ADMIN">
              <ProductInventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="addproduct"
          element={
            <ProtectedRoute role="ADMIN">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateproduct/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="adduser"
          element={
            <ProtectedRoute role="ADMIN">
              <AddUser />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* User Routes */}
      <Route path="/user" element={<UserLayout />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="displayProduct" element={<DisplayProduct />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="placeOrder" element={<OrderPlacement />} />
        <Route path="myOrders" element={<OrderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
