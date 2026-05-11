import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      <Navbar />

      <div className="flex flex-col lg:flex-row justify-between items-center px-4 md:px-12 lg:px-16 py-10 gap-10">
        <div className="bg-[#1b1e4b] w-full lg:w-[40%] rounded-3xl px-4 md:px-12 py-12 md:py-20">
          <div className="mb-14">
            <h1 className="text-[#7dfa96] text-5xl md:text-6xl font-bold">
              Login
            </h1>

            <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight">
              To your Account
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-14 rounded-xl px-5 bg-[#D9D9D9] text-black mb-3 outline-none"
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
              className="w-full h-14 rounded-xl px-5 bg-[#D9D9D9] text-black mb-2 outline-none"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-red-400 text-sm mb-3">
                {errors.password.message}
              </p>
            )}

            <p className="text-right text-xs text-gray-300 mb-8">
              Forgot Password?
            </p>

            {error && (
              <p className="text-red-400 mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#7dfa96] rounded-xl text-black text-xl font-bold hover:opacity-90 transition"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>

            <div className="border-b border-[#7dfa96] my-8"></div>

            <p className="text-sm text-gray-300 mb-4">
              New Here?
            </p>

            <button
              type="button"
              className="w-full h-14 border-2 border-[#7dfa96] rounded-xl text-[#7dfa96] text-xl font-bold hover:bg-[#7dfa96] hover:text-black transition"
            >
              Get Started
            </button>
          </form>
        </div>

        <div className="w-full lg:w-[50%]">
          <h1 className="text-[#7dfa96] text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
            DIVA
          </h1>
          <p className="text-gray-200 text-xl md:text-2xl mb-8">
            Data Integrity and Validation Assistant
          </p>

          <div className="border-b border-[#7dfa96] mb-10"></div>

          <h2 className="text-white text-4xl md:text-5xl leading-tight mb-8">
            Identify high - stake data <br></br> issue in minutes
          </h2>

          <p className="text-[#7dfa96] text-lg md:text-xl leading-relaxed">
            Unlock full potential of your data by using DIVA to validate, monitor <br></br> and
            troubleshoot data issues and errors in your specific <br></br>databases.
          </p>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default Login;