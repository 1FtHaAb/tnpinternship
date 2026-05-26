import { useRef, useEffect } from 'react';
import ReactPlotly from 'react-plotly.js';

const Plot = ReactPlotly.default || ReactPlotly;

export default function PlotlyBarWidget({ data }) {
    const cacheRef = useRef({ start: null, end: null });
    const debounceRef = useRef(null);
    const cellIds = ['AG-CELL-00110-CLA.079', 'AG-CELL-00109-CLA.078', 'AG-CELL-00107-CLA.055'];
    const intervalBarCycles = [100, 200, 300, 400, 500, 600];

    useEffect(() => {
        const resize = () => { window.dispatchEvent(new Event('resize')); };
        resize();
        const timeout = setTimeout(resize, 300);
        return () => clearTimeout(timeout);
    }, []);

    // --- Fetch Logic (Categorical Extraction) ---
    const executeBufferedDataFetch = (startX, endX) => {
        const BUFFER_SIZE = 200;
        const THRESHOLD_ZONE = 50;
        const currentCache = cacheRef.current;

        if (currentCache.start !== null && currentCache.end !== null) {
            if (startX >= currentCache.start + THRESHOLD_ZONE && endX <= currentCache.end - THRESHOLD_ZONE) return;
        }
        const targetStart = Math.max(1, startX - BUFFER_SIZE);
        const targetEnd = endX + BUFFER_SIZE;
        cacheRef.current = { start: targetStart, end: targetEnd };
        console.log(`🛰️ [Bar Widget] Fetching: /api/region?start=${targetStart}&end=${targetEnd}`);
    };

    const handleRelayout = (eventData) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (eventData['xaxis.autorange']) {
                cacheRef.current = { start: null, end: null };
                return;
            }
            if (eventData['xaxis.range[0]'] !== undefined) {
                const startIdx = Math.max(0, Math.floor(eventData['xaxis.range[0]']));
                const endIdx = Math.min(intervalBarCycles.length - 1, Math.ceil(eventData['xaxis.range[1]']));
                executeBufferedDataFetch(intervalBarCycles[startIdx], intervalBarCycles[endIdx]);
            }
        }, 200);
    };

    // --- Layout & Traces ---
    const layout = {
        autosize: true,
        margin: { t: 10, b: 40, l: 40, r: 20 },
        legend: { orientation: 'h', y: -0.2 },
        barmode: 'stack',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
            title: 'Cycle Category',
            minallowed: -0.5,
            maxallowed: intervalBarCycles.length - 0.5
        },
        yaxis: {
            title: 'Efficiency (%)',
            range: [0, 100],
            minallowed: -5,
            maxallowed: 105
        }
    };

    const filteredBarData = data.filter(d => intervalBarCycles.includes(d.cycle));
    const traces = cellIds.map(id => ({
        x: intervalBarCycles.map(c => `Cycle ${c}`),
        y: filteredBarData.map(d => d[`${id}_efficiency`] * 0.33),
        name: id,
        type: 'bar'
    }));

    return (
        <div className="w-full h-full flex flex-col p-4 box-border bg-white rounded-xl">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex-shrink-0">Coulombic Efficiency Distribution</h3>
            <div className="flex-1 w-full min-h-0 relative">
                <Plot
                    divId={`widget-bar`}
                    data={traces}
                    layout={layout}
                    useResizeHandler={true}
                    style={{ width: '100%', height: 'calc(100% - 60px)', position: 'absolute' }}
                    config={{ responsive: true, displayModeBar: true, displaylogo: false }}
                    onRelayout={handleRelayout}
                />
            </div>
        </div>
    );
}