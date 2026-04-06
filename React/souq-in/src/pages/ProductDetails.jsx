import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { useEffect } from "react";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const { items } = useSelector((state) => state.products);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, items.length]);
    const product = items.find((p) => p.id == id);

    if (!product) {
        return <div className="p-6">Product not found</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-80 rounded-lg"
            />

            <div>
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                <p className="text-gray-500 mb-2">{product.brand}</p>
                <p className="text-xl font-semibold mb-4">₹{product.price}</p>

                <p className="text-gray-700 mb-6">{product.description}</p>

                <button
                    onClick={() => {
                        dispatch(addToCart(product));
                        navigate("/cart");
                    }}
                    className="bg-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-600"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;