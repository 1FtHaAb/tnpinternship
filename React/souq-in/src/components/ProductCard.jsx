import { useNavigate } from "react-router-dom";

function ProductCard({ name, img }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products?category=${name.toLowerCase()}`)}
      className="min-w-45 bg-white rounded-2xl p-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer"
    >
      <img
        src={img}
        className="h-36 w-full object-contain rounded-lg"
      />

      <p className="mt-2 text-sm font-medium text-gray-700 text-center">
        {name}
      </p>
    </div>
  );
}

export default ProductCard;