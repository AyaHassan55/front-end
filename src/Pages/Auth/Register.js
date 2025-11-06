import React, { useState } from "react";
import { baseUrl, REGISTER } from "../../Api/Api";
import axios from "axios";
// import LoadingSubmit from "../../Components/Loading/Loading";
import LoadingSubmit from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
export default function RegisterPage() {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // cookie
  const cookie = new Cookie();
  async function handleRegister(e) {
    console.log("Register clicked", formData);
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/${REGISTER}`, formData);
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      alert('regester success')
      window.location.pathname = "/users";
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 422) {
        setErr("Email is already taken");
      } else if (err.response) {
        setErr("Internal server error");
      } else {
        setErr("Network error or server not reachable");
      }
    }
  }

  const handleGoogleSignUp = () => {
    console.log("Google Sign-Up clicked");
  };

  return (
    <div>
      {loading && <LoadingSubmit />}
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <div
          className="card p-4 shadow-sm"
          style={{
            maxWidth: "380px", // 👈 أصغر من قبل (كان 500px)
            width: "100%",
            borderRadius: "12px",
          }}
        >
          <h4 className="text-center text-primary mb-3">Create an Account</h4>

          <form>
            <div className="mb-2">
              <label htmlFor="name" className="form-label text-start d-block">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control form-control-sm"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="form-label text-start d-block">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control form-control-sm"
                value={formData.email}
                onChange={handleChange}
                required
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
                id="password"
                className="form-control form-control-sm"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-primary btn-sm w-100"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>

          <hr className="my-3" />

          <div className="text-center">
            <p className="mb-2" style={{ fontSize: "14px" }}>
              Or sign up with
            </p>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center w-100"
              onClick={handleGoogleSignUp}
            >
              <i className="fa-brands fa-google me-2"></i> Sign up with Google
            </button>
            {err !== "" && <span className="error">{err}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
