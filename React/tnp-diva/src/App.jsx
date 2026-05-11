import { useSelector } from "react-redux";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import LoadingScreen from "./pages/LoadingScreen";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";


function App() {
  const {
    isLoggedIn,
    loading,
  } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={ isLoggedIn ? <Navigate to="/home" /> : <Login /> }
      />
      <Route
        path="/home"
        element={ isLoggedIn? <Home /> : <Navigate to="/" /> }
      />
      <Route
        path="/about"
        element={<About />}
      />
      <Route
        path="/faqs"
        element={<Faqs />}
      />
      <Route
        path="/contact"
        element={<Contact />}
      />
    </Routes>
  );
}

export default App;