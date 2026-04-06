import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

function Contact() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const subject = watch("subject");

  const onSubmit = (data) => {
    setLoading(true);

    setTimeout(() => {
      console.log("Form Data:", data);
      alert("Form submitted successfully");
      setLoading(false);
      reset();
    }, 1500);
  };

  const [fileName, setFileName] = useState("");


  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          placeholder="Name"
          className="w-full border p-2 rounded"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^\S+@\S+$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          placeholder="Phone"
          className="w-full border p-2 rounded"
          {...register("phone", {
            required: "Phone required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10 digit number",
            },
          })}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <select
          className="w-full border p-2 rounded"
          {...register("subject", { required: "Select a subject" })}
        >
          <option value="">Select Subject</option>
          <option value="general">General</option>
          <option value="support">Support</option>
          <option value="feedback">Feedback</option>
        </select>
        {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}

        {subject === "support" && (
          <input
            placeholder="Order ID"
            className="w-full border p-2 rounded"
            {...register("orderId", { required: "Order ID required for support" })}
          />
        )}

        <div>
          <p className="font-medium">Gender</p>
          <label>
            <input type="radio" value="male" {...register("gender")} /> Male
          </label>
          <label className="ml-4">
            <input type="radio" value="female" {...register("gender")} /> Female
          </label>
        </div>

        <div>
          <p className="font-medium">Interests</p>
          <label>
            <input type="checkbox" value="shopping" {...register("interests")} /> Shopping
          </label>
          <label className="ml-4">
            <input type="checkbox" value="offers" {...register("interests")} /> Offers
          </label>
        </div>

        <div>
          <label className="block mb-2 font-medium">Upload File</label>

          <div className="flex items-center gap-3">
            <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
              Choose File
              <input
                type="file"
                className="hidden"
                {...register("file")}
                onChange={(e) => {
                  setFileName(e.target.files[0]?.name || "");
                }}
              />
            </label>

            <span className="text-gray-600 text-sm">
              {fileName || "No file chosen"}
            </span>
          </div>
        </div>

        <textarea
          placeholder="Message"
          className="w-full border p-2 rounded"
          {...register("message", {
            required: "Message required",
            minLength: {
              value: 10,
              message: "Minimum 10 characters",
            },
          })}
        />
        {errors.message && <p className="text-red-500">{errors.message.message}</p>}

        <div className="bg-gray-100 p-3 rounded">
          <p className="text-sm text-gray-600">Live Preview:</p>
          <p><strong>Name:</strong> {watch("name")}</p>
          <p><strong>Email:</strong> {watch("email")}</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

      </form>
    </div>
  );
}

export default Contact;