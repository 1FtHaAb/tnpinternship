import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, clearCart } from "../redux/cartSlice";

const Cart = () => {
  const { items: cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQty = (item) => {
    dispatch(addToCart(item));
  };

  const decreaseQty = (item) => {
    if (item.qty === 1) {
      dispatch(removeFromCart(item.id));
      return;
    }

    const updatedCart = cart.map((i) =>
      i.id === item.id ? { ...i, qty: i.qty - 1 } : i
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  const checkout = () => {
    alert("Cart is checked out successfully✅. Thank You fo Shopping!");
    dispatch(clearCart());
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-xl shadow bg-white"
              >
                <img
                  src={item.thumbnail}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-500">{item.brand}</p>
                  <p className="font-semibold mt-1">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-xl shadow h-fit">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total Price</span>
              <span className="font-semibold">₹{total}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" onClick={checkout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;