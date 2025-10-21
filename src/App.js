import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Website/Home";
import LoginPage from "./Pages/Website/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
