import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      console.log("Login Success:", result);
    } catch (error) {
      console.log("Login Failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-2xl font-bold text-green-400">
          DIVA
        </h1>
        <div className="space-x-8 text-sm text-gray-300">
          <a href="#">SOLUTIONS</a>
          <a href="#">ABOUT US</a>
          <a href="#">FAQs</a>
          <a href="#">CONTACT US</a>
        </div>
      </div>

      <div className="flex justify-between items-center px-10 py-10">
        <div className="bg-slate-800 p-10 rounded-2xl w-[35%]">
          <h2 className="text-3xl font-semibold mb-6">
            <span className="text-green-400">
              Login
            </span>
            <br />
            To your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-lg mb-2 bg-gray-200 text-black"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="text-red-400 text-sm mb-3">
                {errors.username.message}
              </p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg mb-2 bg-gray-200 text-black"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mb-3">
                {errors.password.message}
              </p>
            )}

            {error && (
              <p className="text-red-500 mb-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-400 text-black py-3 rounded-lg"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>

        <div className="w-[55%]">
          <h1 className="text-6xl font-bold text-green-400 mb-4">
            DIVA
          </h1>
          <p className="text-gray-400 text-xl mb-6">
            Data Integrity and Validation Assistant
          </p>
          <div className="border-b border-green-400 mb-6"></div>
          <h2 className="text-5xl leading-tight">
            Identify high-stake data issue in minutes
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;