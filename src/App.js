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
// import './Components/Loading/loading.css'
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        {/* Protected Routes */}
        {/* <Route element={<RequireAuth />}> */}
          <Route path="/dashboard" element={<Dashboard />} >
            <Route element={<RequireAuth allowedRole={'1995'} />} >
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
             <Route element={<RequireAuth allowedRole={'1996'} />} > <Route path="writer" element={<Writer />} /></Route>
           

          </Route>
        {/* </Route> */}

      </Routes>
    </div>
  );
}

export default App;
