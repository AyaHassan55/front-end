import axios from "axios";
import { useState } from "react";
import { baseUrl, LOGIN } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";

export default function LoginPage() {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const cookie = new Cookie();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  async function loginBtnClicked(e) {
    e.preventDefault();
    setLoading(true);
    console.log("Login clicked", formData);
    try {
      const res = await axios.post(`${baseUrl}/${LOGIN}`, formData);
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      window.location.pathname = "/users";
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
                {err && (
                  <span className="error text-danger mt-2 d-block">{err}</span>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
