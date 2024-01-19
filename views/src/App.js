import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Home from "./pages/home.js";
import About from "./pages/about.js";
import Contact from "./pages/contact.js";
import Dashboard from "./components/dashboard.js";
import PassChecker from "./components/passChecker.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Home /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/password-checker" element={<PassChecker />} />
        </Routes>
    </div>
  );
}

export default App;
