import { useRef } from 'react';
import ReactPlotly from 'react-plotly.js';

const Plot = ReactPlotly.default || ReactPlotly;

export default function PlotlyGraphs({ data }) {
    // References for tracking sliding window caches and debounce timers
    const lineCacheRef = useRef({ start: null, end: null });
    const lineDebounceRef = useRef(null);

    const scatterCacheRef = useRef({ start: null, end: null });
    const scatterDebounceRef = useRef(null);

    const barCacheRef = useRef({ start: null, end: null });
    const barDebounceRef = useRef(null);

    const cellIds = ['AG-CELL-00110-CLA.079', 'AG-CELL-00109-CLA.078', 'AG-CELL-00107-CLA.055'];
    const intervalBarCycles = [100, 200, 300, 400, 500, 600];

    const cycles = data.map(d => d.cycle);
    const xMin = cycles.length > 0 ? Math.min(...cycles) : 0;
    const xMax = cycles.length > 0 ? Math.max(...cycles) : 100;

    const xMargin = (xMax - xMin) * 0.05 || 5;
    const dynamicXMinAllowed = Math.max(0, xMin - xMargin);
    const dynamicXMaxAllowed = xMax + xMargin;

    // Extract Line Graph Y-Axis (Voltage) Bounds Across All Cells Dynamically
    const allVoltages = data.flatMap(d => cellIds.map(id => d[`${id}_voltage`]).filter(v => v !== undefined));
    const lineYMin = allVoltages.length > 0 ? Math.min(...allVoltages) : 0;
    const lineYMax = allVoltages.length > 0 ? Math.max(...allVoltages) : 5;
    const lineYMargin = (lineYMax - lineYMin) * 0.1 || 0.5;

    // Extract Scatter Graph Y-Axis (Efficiency) Bounds Across All Cells Dynamically
    const allEfficiencies = data.flatMap(d => cellIds.map(id => d[`${id}_efficiency`]).filter(e => e !== undefined));
    const scatterYMin = allEfficiencies.length > 0 ? Math.min(...allEfficiencies) : 0;
    const scatterYMax = allEfficiencies.length > 0 ? Math.max(...allEfficiencies) : 100;
    const scatterYMargin = (scatterYMax - scatterYMin) * 0.1 || 5;

    // Shared Core Fetch Controller with Sliding Window Buffer
    const executeBufferedDataFetch = (startX, endX, cacheRef, chartLabel) => {
        const BUFFER_SIZE = 200;
        const THRESHOLD_ZONE = 50;
        const currentCache = cacheRef.current;

        if (currentCache.start !== null && currentCache.end !== null) {
            const isSafeInsideBuffer =
                startX >= currentCache.start + THRESHOLD_ZONE &&
                endX <= currentCache.end - THRESHOLD_ZONE;

            if (isSafeInsideBuffer) {
                console.log(`%c 🟢 [${chartLabel}] Within cache buffer [${currentCache.start} ➔ ${currentCache.end}]. API skipped.`, "color: #4CAF50");
                return;
            }
        }

        const targetStart = Math.max(1, startX - BUFFER_SIZE);
        const targetEnd = endX + BUFFER_SIZE;

        console.log(`%c 🛰️ [${chartLabel}] Network Request Triggered! Prefetching...`, "color: #FF9800; font-weight: bold;");
        console.log(`   ↳ Viewport Range: [${startX} ➔ ${endX}] | API Target: /api/region?start=${targetStart}&end=${targetEnd}`);

        cacheRef.current = { start: targetStart, end: targetEnd };
    };

    // Plotly Specific Event Parser
    const handleRelayout = (eventData, debounceRef, cacheRef, chartLabel, isCategory = false, categories = []) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            if (eventData['xaxis.autorange'] || eventData['xaxis.autorange'] === true) {
                console.log(`%c 🔄 [${chartLabel}] Zoom reset via Double Click. Cache flushed.`, "color: #2196F3");
                cacheRef.current = { start: null, end: null };
                return;
            }

            if (eventData['xaxis.range[0]'] !== undefined && eventData['xaxis.range[1]'] !== undefined) {
                let startX, endX;

                if (isCategory && categories.length > 0) {
                    const startIdx = Math.max(0, Math.floor(eventData['xaxis.range[0]']));
                    const endIdx = Math.min(categories.length - 1, Math.ceil(eventData['xaxis.range[1]']));
                    startX = categories[startIdx];
                    endX = categories[endIdx];
                } else {
                    startX = Math.round(eventData['xaxis.range[0]']);
                    endX = Math.round(eventData['xaxis.range[1]']);
                }

                executeBufferedDataFetch(startX, endX, cacheRef, chartLabel);
            }
        }, 200);
    };

    // --- Dynamic Layout Standardizations ---

    const layoutBase = {
        autosize: true,
        margin: { t: 40, b: 60, l: 40, r: 20 },
        legend: { orientation: 'h', y: -0.2 },
        dragmode: 'zoom',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
    };

    const commonPlotProps = {
        useResizeHandler: true,
        style: { width: '100%', height: '100%' },
        config: { responsive: true, displayModeBar: true, displaylogo: false }
    };

    // Define the style properties for the ruler lines
    const commonSpikeConfig = {
        showspikes: true,             // Activates the ruler line
        spikemode: 'across+toaxis',   // Draws lines all the way across the grid bounds
        spikesnap: 'cursor',          // Snaps perfectly to the cursor position
        spikethickness: 1,            // Keeps the line thin and precise
        spikedash: 'dash',            // Makes it a clean dashed line like ECharts
        spikecolor: '#999999'         // Subtle gray color so it doesn't distract from data
    };

    const lineLayout = {
        ...layoutBase,
        height: 400,
        hovermode: 'x unified', // Crucial: Groups all cell tooltips into a single box like your screenshot
        xaxis: {
            title: 'Cycle Number',
            minallowed: dynamicXMinAllowed,
            maxallowed: dynamicXMaxAllowed,
            ...commonSpikeConfig // Injects the X ruler line
        },
        yaxis: {
            title: 'Potential (V)',
            range: [lineYMin - lineYMargin * 0.2, lineYMax + lineYMargin * 0.2],
            minallowed: lineYMin - lineYMargin,
            maxallowed: lineYMax + lineYMargin,
            ...commonSpikeConfig // Injects the Y ruler line
        }
    };

    const scatterLayout = {
        ...layoutBase,
        height: 400,
        hovermode: 'x unified', // Syncs tooltips across all cells at that x-value
        xaxis: {
            title: 'Cycle Number',
            minallowed: dynamicXMinAllowed,
            maxallowed: dynamicXMaxAllowed,
            ...commonSpikeConfig
        },
        yaxis: {
            title: 'Coulombic Efficiency (%)',
            range: [scatterYMin - scatterYMargin * 0.2, scatterYMax + scatterYMargin * 0.2],
            minallowed: scatterYMin - scatterYMargin,
            maxallowed: scatterYMax + scatterYMargin,
            ...commonSpikeConfig
        }
    };

    // Dynamic Bar Layout Design
    const barLayout = {
        ...layoutBase,
        height: 400,
        barmode: 'stack',
        xaxis: {
            title: 'Cycle Category',
            minallowed: -0.5,
            maxallowed: intervalBarCycles.length - 0.5
        },
        yaxis: {
            title: 'Efficiency (%)',
            range: [0, 100], // Extends out smoothly to show full stacked distribution totals up to 100%
            minallowed: -5,
            maxallowed: 105
        }
    };

    const lineTraces = cellIds.map(id => ({
        x: cycles,
        y: data.map(d => d[`${id}_voltage`]),
        name: id,
        type: 'scattergl',
        mode: 'lines',
        hoverinfo: 'all' // Allows spikes to interact with the curve data markers
    }));

    const scatterTraces = cellIds.map(id => ({
        x: cycles,
        y: data.map(d => d[`${id}_efficiency`]),
        name: id,
        type: 'scattergl',
        mode: 'markers',
        marker: { size: 5 }
    }));

    const filteredBarData = data.filter(d => intervalBarCycles.includes(d.cycle));
    const barTraces = cellIds.map(id => ({
        x: intervalBarCycles.map(c => `Cycle ${c}`),
        y: filteredBarData.map(d => d[`${id}_efficiency`] * 0.33),
        name: id,
        type: 'bar'
    }));

    return (
        // Enforce a strict vertical block column layout with clear gap separation
        <div className="flex flex-col gap-12 w-full bg-transparent">
            
            {/* 1. Isolated Container for the Line Chart */}
            <div className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full h-[480px] overflow-hidden">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Potential vs. Test Cumulative Capacity</h3>
                <div className="w-full h-[400px]">
                    <Plot 
                        divId="plotly-line-chart" // Unique tracking ID
                        data={lineTraces} 
                        layout={lineLayout} 
                        {...commonPlotProps} 
                        onRelayout={(figure) => handleRelayout(figure, lineDebounceRef, lineCacheRef, "Line Chart")} 
                    />
                </div>
            </div>

            {/* 2. Isolated Container for the Scatter Plot */}
            <div className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full h-[480px] overflow-hidden">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Coulombic Efficiency (%) vs Cycle</h3>
                <div className="w-full h-[400px]">
                    <Plot 
                        divId="plotly-scatter-chart" // Unique tracking ID keeps Lasso Select isolated here
                        data={scatterTraces} 
                        layout={scatterLayout} 
                        {...commonPlotProps} 
                        onRelayout={(figure) => handleRelayout(figure, scatterDebounceRef, scatterCacheRef, "Scatter Plot")} 
                    />
                </div>
            </div>

            {/* 3. Isolated Container for the Bar Chart */}
            <div className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full h-[480px] overflow-hidden">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Coulombic Efficiency Distribution</h3>
                <div className="w-full h-[400px]">
                    <Plot 
                        divId="plotly-bar-chart" // Unique tracking ID
                        data={barTraces} 
                        layout={barLayout} 
                        {...commonPlotProps} 
                        onRelayout={(figure) => handleRelayout(figure, barDebounceRef, barCacheRef, "Bar Chart", true, intervalBarCycles)} 
                    />
                </div>
            </div>

        </div>
    );
}