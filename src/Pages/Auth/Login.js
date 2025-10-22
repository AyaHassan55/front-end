import axios from "axios";
import { useState } from "react";
import { baseUrl, LOGIN } from "../../Api/Api";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",

    password: "",
  });

  async function loginBtnClicked(e) {
    console.log("Register clicked", formData);
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/${LOGIN}`, formData);
      console.log("success");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container mt-5">
      <div
        className="row justify-content-center align-items-center "
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
                  htmlFor="email-input"
                  className="form-label text-start d-block"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="username-input"
                  placeholder="Enter your Email"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="pass-input"
                  className="form-label text-start d-block"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pass-input"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={loginBtnClicked}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
