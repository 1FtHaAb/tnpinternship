
import { BarChart2, Activity } from 'lucide-react';

export default function LibrarySelector({ onSelect }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 tracking-tight text-white">Battery Intelligence R&D</h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">
          Select a rendering library to evaluate performance, rendering capacity, and interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <button
          onClick={() => onSelect('echarts')}
          className="flex flex-col items-center justify-center p-12 bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-500 hover:bg-slate-800 transition-all group w-full"
        >
          <Activity className="w-16 h-16 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-semibold text-white mb-2">Apache ECharts</h2>
          <span className="text-sm text-slate-400">Canvas Rendering Engine</span>
        </button>
        <button
          onClick={() => onSelect('plotly')}
          className="flex flex-col items-center justify-center p-12 bg-slate-900 rounded-2xl border border-slate-800 hover:border-purple-500 hover:bg-slate-800 transition-all group w-full"
        >
          <BarChart2 className="w-16 h-16 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-semibold text-white mb-2">Plotly.js</h2>
          <span className="text-sm text-slate-400">WebGL Rendering Engine</span>
        </button>
      </div>
    </div>
  );
}