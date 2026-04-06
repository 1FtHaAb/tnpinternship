import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
    return (
        <div className="bg-white border-b sticky top-0 z-50">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
                <div className="flex items-center gap-6">
                    <span className="text-sm font-medium">Hi! User</span>

                    <div className="hidden md:flex items-center border rounded-full px-1 py-1 shadow-sm">
                        <SearchBar />
                    </div>
                </div>

                <Link to="/">
                    <img
                        src="/logo-wide.png"
                        className="h-16 cursor-pointer"
                    />
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm">
                    <span className="hover:text-blue-600 cursor-pointer">
                        <Link to="/">Daily Deals</Link>
                    </span>
                    <span className="hover:text-blue-600 cursor-pointer">
                        <Link to="#footer">Gift Cards</Link>
                    </span>
                    <span className="hover:text-blue-600 cursor-pointer">
                        <Link to="/contact">Help Center</Link>
                    </span>
                    <Link to="/cart" className="hover:scale-110 transition bg-yellow-500 rounded-lg p-2">
                        Cart 🛒
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;