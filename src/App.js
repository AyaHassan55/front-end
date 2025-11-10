import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Website/Home";
import LoginPage from "./Pages/Auth/Login";
import RegisterPage from "./Pages/Auth/Register";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import Users from "./Pages/Dashboard/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import User from "./Pages/Dashboard/User";
import AddUser from "./Pages/Dashboard/AddUser";
import Error403 from "./Pages/Auth/403";
import Writer from "./Pages/Dashboard/Writer";
import Error404 from "./Pages/Auth/404";
import RequireBack from "./Pages/Auth/RequireBack";

import Categories from "./Pages/Dashboard/Categories";
import AddCategory from "./Pages/Dashboard/AddCategory";
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
                  <Route path="categories" element={<Categories />} />
                  <Route path="category/add" element={<AddCategory />} />
                </Route>

             <Route element={<RequireAuth allowedRole={['1995','1996']} />} > 
                  <Route path="writer" element={<Writer />} />
              </Route>
           

          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
