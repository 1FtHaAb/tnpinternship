import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const dispatch = useDispatch();
    const { items, loading, searchTerm } = useSelector((state) => state.products);
    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, items.length]);
    if (loading) return <p className="p-4">Loading...</p>;

    const filteredProducts = items.filter((product) => {
        const matchCategory = category
            ? product.category.toLowerCase() === category
            : true;

        const matchSearch = product.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchCategory && matchSearch;
    });

    console.log(searchTerm);

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-xl font-semibold mb-4">Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl p-3 shadow hover:shadow-lg transition cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <img
                            src={product.thumbnail}
                            className="w-full h-40 object-contain"
                        />
                        <h3 className="text-sm mt-2 line-clamp-2">
                            {product.title}
                        </h3>
                        <p className="text-gray-500 text-xs">
                            {product.brand}
                        </p>
                        <p className="font-semibold mt-1">
                            ₹{product.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductPage;