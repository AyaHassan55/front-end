export default function LoginPage() {
  function loginBtnClicked() {
    alert("Login clicked!");
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
                  htmlFor="username-input"
                  className="form-label text-start d-block"
                >
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username-input"
                  placeholder="Enter your username"
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
