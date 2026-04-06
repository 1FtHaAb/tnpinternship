import React, { useState } from "react";

const App = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTC: false
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    alert("Data saved to Local Storage!");
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-green-500 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="h-120 w-150 rounded-2xl bg-blue-200 border-2 border-blue-800"
      >

        <div className="flex justify-start">
          <h1 className="text-2xl p-4 font-bold">
            Create <span className="text-green-600">Account</span>
          </h1>
        </div>

        <div className="Form Questions">
          <div className="grid grid-cols-2 gap-1 px-4 pt-4 pb-2">
            <div className="flex items-center w-full h-10 bg-violet-200 border-2 border-black rounded-xl px-3">
              <i className="fa-solid fa-user mr-2"></i>
              <input
                id="firstName"
                placeholder="First Name"
                className="bg-transparent outline-none w-full"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center w-full h-10 bg-violet-200 border-2 border-black rounded-xl px-3">
              <i className="fa-solid fa-user mr-2"></i>
              <input
                id="lastName"
                placeholder="Last Name"
                className="bg-transparent outline-none w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="flex items-center w-full h-10 bg-violet-200 border-2 border-black rounded-xl px-3">
              <i className="fa-solid fa-id-badge mr-2"></i>
              <input
                id="username"
                placeholder="Username"
                className="bg-transparent outline-none w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="flex items-center w-full h-10 bg-violet-200 border-2 border-black rounded-xl px-3">
              <i className="fa-solid fa-envelope mr-2"></i>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="flex items-center w-full h-10 bg-violet-200 border-2 border-black rounded-xl px-3">
              <i className="fa-solid fa-key mr-2"></i>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="bg-transparent outline-none w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="flex items-center w-full h-10 bg-violet-200 border-2 border-black rounded-xl px-3">
              <i className="fa-solid fa-key mr-2"></i>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="bg-transparent outline-none w-full"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-4 py-2 flex items-center justify-center">
            <div>
              <input
                id="acceptTC"
                type="checkbox"
                className="mx-4"
                onChange={handleChange}
              />
              <span className="text-md font-bold">
                I agree to{" "}
                <a
                  href="https://generator.lorem-ipsum.info/terms-and-conditions"
                  target="_blank"
                  className="text-green-500"
                >
                  Terms & Conditions
                </a>
              </span>
            </div>
          </div>
          <div className="px-4 flex items-center justify-center">
            <button
              type="submit"
              className="font-bold rounded-xl h-10 w-100 bg-green-500 border-2 border-black"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;