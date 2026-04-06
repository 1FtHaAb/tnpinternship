import React, { useState } from "react";

const App = () => {

    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [result, setResult] = useState(null);

    const addNumbers = () => {
        setResult(Number(num1) + Number(num2));
    };

    const subtractNumbers = () => {
        setResult(Number(num1) - Number(num2));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Simple Calculator
                </h1>
                <input
                    type="number"
                    placeholder="Enter first number"
                    className="border w-full p-2 rounded mb-3"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter second number"
                    className="border w-full p-2 rounded mb-4"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                />
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={addNumbers}
                        className="bg-green-500 text-white px-3 py-2 rounded w-full hover:bg-green-600"
                    >
                        Add
                    </button>
                    <button
                        onClick={subtractNumbers}
                        className="bg-red-500 text-white px-3 py-2 rounded w-full hover:bg-red-600"
                    >
                        Subtract
                    </button>
                </div>
                <div className="text-center text-lg font-medium">
                    Result: {result}
                </div>
            </div>
        </div>
    );
};

export default App;