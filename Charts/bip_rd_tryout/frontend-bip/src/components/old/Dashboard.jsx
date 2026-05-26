// src/components/Dashboard.jsx
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { generateCellData } from '../mockData';
import EChartsGraphs from './EChartsGraphs';
import PlotlyGraphs from './PlotlyGraphs';

export default function Dashboard({ library, onBack }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateCellData());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 capitalize">{library} Evaluation</h1>
              <p className="text-sm text-gray-500">Phase 1: Line, Scatter, Bar (Multi-cell Overview)</p>
            </div>
          </div>
        </div>

        {library === 'echarts' ? <EChartsGraphs data={data} /> : <PlotlyGraphs data={data} />}
      </div>
    </div>
  );
}