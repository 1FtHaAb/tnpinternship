import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="h-20 w-full flex items-center px-5 md:px-10">
                <a href="/">
                    <div className="flex items-center cursor-pointer">
                        <img src="/logo.png" className="h-10" />
                        <h1
                            onClick={() => dispatch(logout())}
                            className="px-2 text-2xl md:text-3xl font-bold text-white cursor-pointer"
                        >
                            DIVA
                        </h1>
                    </div>
                </a>
                <div className="hidden md:flex flex-1 justify-end gap-8 text-lg text-white">
                    <a href="/" className="hover:text-[#7dfa96]">SOLUTIONS</a>
                    <a href="/about" className="hover:text-[#7dfa96]">ABOUT</a>
                    <a href="/faqs" className="hover:text-[#7dfa96]">FAQs</a>
                    <a href="/contact" className="hover:text-[#7dfa96]">CONTACT</a>
                </div>
                <div className="text-white flex-1 flex justify-end md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl"> ☰ </button>
                </div>
            </div>
            {
                menuOpen && (
                    <div className="text-white md:hidden flex flex-col items-center gap-5 py-5 text-lg">
                        <a href="/">SOLUTIONS</a>
                        <a href="/about">ABOUT</a>
                        <a href="/faqs">FAQs</a>
                        <a href="/contact">CONTACT</a>
                    </div>
                )
            }
        </div>
    )
}

export default Navbar