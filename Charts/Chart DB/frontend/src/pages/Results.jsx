import { useMemo } from "react";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BarChart from "../components/Charts/BarChart";
import PieChart from "../components/Charts/PieChart";
import ScatterChart from "../components/Charts/ScatterChart";

const Results = () => {
  const { results, error, } = useSelector((state) => state.dashboard);

  const chartData = useMemo(() => {
    if (!results) return null;

    return {
      months: results.months,
      values: results.values,
      charts: results.charts,
      title: `${results.company} - ${results.dataType} (${results.year})`,
      company: results.company,
      dataType: results.dataType,
      year: results.year,
    };
  }, [results]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f7fb]">
        <Navbar />

        <div className="max-w-3xl mx-auto p-8">
          <div className="bg-red-100 text-red-600 border border-red-200 rounded-2xl p-6 text-lg font-medium">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-[#f5f7fb]">
        <Navbar />
        <div className="max-w-3xl mx-auto p-8">
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-700"> No Results Found </h2>
            <Link to="/dashboard"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Back To Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800"> Results </h1>
          </div>
          <Link to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold w-fit"
          >
            Back To Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2"> Company </p>
            <h2 className="text-2xl font-bold text-gray-800"> {chartData.company} </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2"> Data Type </p>
            <h2 className="text-2xl font-bold text-gray-800 capitalize"> {chartData.dataType} </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2"> Year </p>
            <h2 className="text-2xl font-bold text-gray-800"> {chartData.year} </h2>
          </div>
        </div>

        <div className="space-y-10">
          {chartData.charts.includes(
            "bar"
          ) && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-gray-800"> Bar Chart </h2>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-175">
                    <BarChart
                      months={chartData.months}
                      values={chartData.values}
                    />
                  </div>
                </div>
              </div>
            )}

          {chartData.charts.includes(
            "pie"
          ) && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-gray-800"> Pie Chart </h2>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-175">
                    <PieChart
                      months={chartData.months}
                      values={chartData.values}
                    />
                  </div>
                </div>
              </div>
            )}

          {chartData.charts.includes(
            "scatter"
          ) && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-gray-800"> Scatter Chart </h2>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-175">
                    <ScatterChart
                      months={chartData.months}
                      values={chartData.values}
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Results;