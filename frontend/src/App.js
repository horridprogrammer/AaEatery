import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './component/Login/Login';
import AddUser from './component/Users/AddUser';
import AdminDashboard from "./component/Admin/AdminDashboard";
import ProtectedRoute from "./component/Admin/ProtectedRoute";
import ProductInventory from "./component/Admin/product/ProductInventory";
import AddProduct from "./component/Admin/product/AddProduct";
import UpdateProduct from "./component/Admin/product/UpdateProduct";
import UserDashboard from "./component/User/UserDashboard";
import DisplayProduct from "./component/Users/product/DisplayProduct";
import Product from "./component/Users/product/Product";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>}></Route>

        {/* Admin Route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard/>
            </ProtectedRoute>
          }
        ></Route>
        <Route 
          path="/admin/product"
          element={
            <ProtectedRoute role="ADMIN">
              <ProductInventory/>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/addproduct"
          element={
            <ProtectedRoute role="ADMIN">
              <AddProduct/>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/updateproduct/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <UpdateProduct/>
            </ProtectedRoute>
          }
        ></Route>

        {/* User Route */}
        <Route
          path="/user/dashboard"
          element={
            <UserDashboard/>
          }
        ></Route>
        <Route
          path="/user/displayProduct"
          element={
            <DisplayProduct/>
          }
        ></Route>
        <Route
          path="/user/product/:id"
          element={
            <Product/>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
