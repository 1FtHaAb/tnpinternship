import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchResults } from "../redux/dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [company, setCompany] = useState("TechNova Solutions");
  const [dataType, setDataType] = useState("sales");
  const [year, setYear] = useState("2022");
  const [charts, setCharts] = useState([]);

  const { loading } = useSelector((state) => state.dashboard);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setCharts((prev) => [
        ...prev,
        value,
      ]);
    } else {
      setCharts((prev) =>
        prev.filter(
          (chart) => chart !== value
        )
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (charts.length === 0) {
      alert("Select at least one chart");
      return;
    }

    const formData = { company, dataType, year, charts };

    try {
      await dispatch(fetchResults(formData)).unwrap();
      navigate("/results");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 unselectable">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          <div>
            <label>Company</label>
            <br />
            <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option> TechNova Solutions </option>
              <option> GreenWheel Auto </option>
              <option> Apex Logistics </option>
              <option> SkyHigh Retail </option>
            </select>
          </div>

          <div>
            <label>Data Type</label>
            <br />
            <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
            >
              <option value="sales"> Sales </option>
              <option value="service"> Service </option>
              <option value="customer_satisfaction"> Customer Satisfaction </option>
            </select>
          </div>

          <div>
            <label>Year</label>
            <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>

          <div>
            <label>Select Charts</label>
            <div className="flex gap-4 mt-3">
              <div
                onClick={() => handleCheckboxChange({ target: { value: "bar", checked: !charts.includes("bar") } })}
                className={`px-6 py-4 rounded-xl border cursor-pointer ${charts.includes("bar") ? "bg-green-600 text-white" : "bg-white"}`}
              >
                Bar Chart
              </div>

              <div
                onClick={() => handleCheckboxChange({ target: { value: "pie", checked: !charts.includes("pie") } })}
                className={`px-6 py-4 rounded-xl border cursor-pointer ${charts.includes("pie") ? "bg-green-600 text-white" : "bg-white"}`}
              >
                Pie Chart
              </div>

              <div
                onClick={() => handleCheckboxChange({ target: { value: "scatter", checked: !charts.includes("scatter") } })}
                className={`px-6 py-4 rounded-xl border cursor-pointer ${charts.includes("scatter") ? "bg-green-600 text-white" : "bg-white"}`}
              >
                Scatter Chart
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-xl font-semibold flex justify-center mx-auto"
          >
            {loading ? "Generating..." : "Generate Charts"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;