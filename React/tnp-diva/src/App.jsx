import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Home from "./pages/Home";
import LoadingScreen from "./pages/LoadingScreen";

function App() {
  const {
    isLoggedIn,
    loading,
  } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingScreen />;
  }
  if (!isLoggedIn) {
    return <Login />;
  }
  return <Home />;
}

export default App;