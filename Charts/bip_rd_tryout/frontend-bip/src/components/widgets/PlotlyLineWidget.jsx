import { useRef } from 'react';
import ReactPlotly from 'react-plotly.js';

const Plot = ReactPlotly.default || ReactPlotly;

export default function PlotlyLineWidget({ data }) {
    const cacheRef = useRef({ start: null, end: null });
    const debounceRef = useRef(null);
    const cellIds = ['AG-CELL-00110-CLA.079', 'AG-CELL-00109-CLA.078', 'AG-CELL-00107-CLA.055'];

    // --- Dynamic Bounds ---
    const cycles = data.map(d => d.cycle);
    const xMin = cycles.length > 0 ? Math.min(...cycles) : 0;
    const xMax = cycles.length > 0 ? Math.max(...cycles) : 100;
    const xMargin = (xMax - xMin) * 0.05 || 5;

    const allVoltages = data.flatMap(d => cellIds.map(id => d[`${id}_voltage`]).filter(v => v !== undefined));
    const lineYMin = allVoltages.length > 0 ? Math.min(...allVoltages) : 0;
    const lineYMax = allVoltages.length > 0 ? Math.max(...allVoltages) : 5;
    const lineYMargin = (lineYMax - lineYMin) * 0.1 || 0.5;

    // --- Fetch Logic ---
    const executeBufferedDataFetch = (startX, endX) => {
        const BUFFER_SIZE = 200;
        const THRESHOLD_ZONE = 50;
        const currentCache = cacheRef.current;

        if (currentCache.start !== null && currentCache.end !== null) {
            if (startX >= currentCache.start + THRESHOLD_ZONE && endX <= currentCache.end - THRESHOLD_ZONE) {
                return; // Safe inside buffer
            }
        }
        const targetStart = Math.max(1, startX - BUFFER_SIZE);
        const targetEnd = endX + BUFFER_SIZE;
        cacheRef.current = { start: targetStart, end: targetEnd };
        console.log(`🛰️ [Line Widget] Fetching: /api/region?start=${targetStart}&end=${targetEnd}`);
    };

    const handleRelayout = (eventData) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (eventData['xaxis.autorange']) {
                cacheRef.current = { start: null, end: null };
                return;
            }
            if (eventData['xaxis.range[0]'] !== undefined) {
                executeBufferedDataFetch(Math.round(eventData['xaxis.range[0]']), Math.round(eventData['xaxis.range[1]']));
            }
        }, 200);
    };

    // --- Layout & Traces ---
    const commonSpikeConfig = {
        showspikes: true, spikemode: 'across+toaxis', spikesnap: 'cursor', 
        spikethickness: 1, spikedash: 'dash', spikecolor: '#999999'
    };

    const layout = {
        autosize: true,
        margin: { t: 10, b: 40, l: 40, r: 20 }, // Reduced top margin since title is outside
        legend: { orientation: 'h', y: -0.2 },
        dragmode: 'zoom',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        hovermode: 'x unified',
        xaxis: { 
            title: 'Cycle Number', 
            minallowed: Math.max(0, xMin - xMargin), 
            maxallowed: xMax + xMargin, 
            ...commonSpikeConfig 
        },
        yaxis: { 
            title: 'Potential (V)', 
            range: [lineYMin - lineYMargin * 0.2, lineYMax + lineYMargin * 0.2],
            minallowed: lineYMin - lineYMargin, 
            maxallowed: lineYMax + lineYMargin, 
            ...commonSpikeConfig 
        }
    };

    const traces = cellIds.map(id => ({
        x: cycles,
        y: data.map(d => d[`${id}_voltage`]),
        name: id,
        type: 'scattergl',
        mode: 'lines',
        hoverinfo: 'all'
    }));

    return (
        <div className="w-full h-full flex flex-col p-4 box-border">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex-shrink-0">Potential vs. Test Cumulative Capacity</h3>
            <div className="flex-1 w-full min-h-0 relative">
                <Plot 
                    divId="widget-line-chart"
                    data={traces} 
                    layout={layout} 
                    useResizeHandler={true}
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                    config={{ responsive: true, displayModeBar: true, displaylogo: false }}
                    onRelayout={handleRelayout} 
                />
            </div>
        </div>
    );
}