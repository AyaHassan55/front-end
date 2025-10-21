import React, { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
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

  const handleRegister = () => {
    console.log("Register clicked", formData);
  };

  const handleGoogleSignUp = () => {
    console.log("Google Sign-Up clicked");
  };

  return (
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
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              id="username"
              className="form-control form-control-sm"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="name" className="form-label">
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control form-control-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control form-control-sm"
              value={formData.password}
              onChange={handleChange}
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
        </div>
      </div>
    </div>
  );
}
