import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;