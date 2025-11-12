import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Website/Home";
import LoginPage from "./Pages/Auth/AuthOperation/Login";
import RegisterPage from "./Pages/Auth/AuthOperation/Register";
import Users from "./Pages/Dashboard/User/Users";
import GoogleCallBack from "./Pages/Auth/AuthOperation/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/Protecting/RequireAuth";
import User from "./Pages/Dashboard/User/User";
import AddUser from "./Pages/Dashboard/User/AddUser";

import Error404 from "./Pages/Auth/Errors/404";
import RequireBack from "./Pages/Auth/Protecting/RequireBack";

import Categories from "./Pages/Dashboard/Category/Categories";
import AddCategory from "./Pages/Dashboard/Category/AddCategory";
import Category from "./Pages/Dashboard/Category/Category";
import Products from "./Pages/Dashboard/Product/Products";
import AddProduct from "./Pages/Dashboard/Product/AddProduct";
import Product from "./Pages/Dashboard/Product/Product";
// import './Components/Loading/loading.css'
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route element={<RequireBack />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Error404 />} />
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={['1996','1995','1999']} />}>
          <Route path="/dashboard" element={<Dashboard />} >
            <Route element={<RequireAuth allowedRole={['1995']} />} >
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
              <Route element={<RequireAuth allowedRole={['1995','1999']} />} > 
                  {/* categories */}
                  <Route path="categories" element={<Categories />} />
                  <Route path="categories/:id" element={<Category />} />
                  <Route path="category/add" element={<AddCategory />} />
                  {/* prodcuts */}
                  <Route path="products" element={<Products />} />
                  <Route path="products/:id" element={<Product />} />
                  <Route path="product/add" element={<AddProduct />} />
                </Route>

            
           

          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
