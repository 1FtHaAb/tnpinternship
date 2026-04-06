import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h1 className="text-xl font-bold text-white mb-3">Souq</h1>
          <p className="text-sm text-gray-400">
            Grab it While it's Hot!
          </p>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-3">Support</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white cursor-pointer">Help Center</Link></li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Shipping</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;