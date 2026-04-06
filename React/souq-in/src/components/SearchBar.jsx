import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;

    dispatch(setSearchTerm(value));

    if (value.trim() !== "") {
      navigate("/products");
    }
  };

  return (
    <div className="p-3">
      <input
        type="text"
        placeholder="Search products..."
        className="outline-none w-40 focus:w-64 transition-all duration-300"
        onChange={handleChange}
        
      />
    </div>
  );
}

export default SearchBar;