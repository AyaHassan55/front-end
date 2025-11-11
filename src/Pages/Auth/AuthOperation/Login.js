import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseUrl, LOGIN } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const cookie = new Cookie();
  // useRef---------------------------------------
    const focus = useRef();
    console.log(focus.current);

  //Handle focus
  useEffect(()=>{
    focus.current.focus();
  },[]) 
  // Handle form change------------------------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
  // login submit
  async function loginBtnClicked(e) {
    e.preventDefault();
    setLoading(true);
    console.log("Login clicked", formData);
    try {
      const res = await axios.post(`${baseUrl}/${LOGIN}`, formData);
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      console.log("Role:", role);
      const go = role === '1995' ? 'users' : 'writer';
      cookie.set("e-commerce", token);
      window.location.pathname = `/dashboard/${go}`;
      // navigate('/dashboard/users', { replace: true });  // replace to prevent going back to login page
    } catch (err) {
      setLoading(false);
      if (err.response?.status === 401) {
        setErr("Wrong Email Or Password");
      } else if (err.response?.status === 422) {
        setErr("Please fill all fields correctly");
      } else {
        setErr("Internal Server Error");
      }
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="container mt-5">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4" style={{ color: "#007BFF" }}>
                Welcome Back!
              </h2>
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label text-start d-block"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    ref={focus}   // focus 1st input
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label text-start d-block"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={loginBtnClicked}
                >
                  Login
                </button>


                <div className="text-center">
                  <p className="mb-2" style={{ fontSize: "14px" }}>
                    Or
                  </p>
                  <button
                    type="button"
                    className="google-btn-container btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center w-100"

                  >
                    <a href={`http://127.0.0.1:8000/login-google`} className="google-btn d-flex align-items-center text-decoration-none ">



                      <div>
                        <FontAwesomeIcon style={{ marginRight: '4px' }} icon={faGoogle} />
                        Login with Google
                      </div>
                    </a>
                  </button>
                  {err !== "" && <span className="error">{err}</span>}
                </div>
                {/* if don't have account */}
                <div className="text-center mt-3">
                  <p style={{ fontSize: "14px" }}>
                    Don't have an account?{" "}
                    <span
                      onClick={() => navigate("/register")}
                      style={{ color: "#007BFF", cursor: "pointer" ,textDecoration:'underline'}}
                    >
                      Sign Up
                    </span>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
