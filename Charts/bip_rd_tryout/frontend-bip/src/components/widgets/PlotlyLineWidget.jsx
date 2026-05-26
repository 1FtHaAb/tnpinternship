import { useRef, useEffect, useState } from 'react';
import ReactPlotly from 'react-plotly.js';

const Plot = ReactPlotly.default || ReactPlotly;

export default function PlotlyLineWidget({ id, data, isEditMode }) {
    const cacheRef = useRef({ start: null, end: null });
    const debounceRef = useRef(null);
    const cellIds = ['AG-CELL-00110-CLA.079', 'AG-CELL-00109-CLA.078', 'AG-CELL-00107-CLA.055'];

    const STORAGE_KEY = `plotly_line_view_${id}`;

    // 1. React State only updates on initial load or cross-tab sync
    const [viewState, setViewState] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch { return null; }
    });

    // 2. Silent Ref tracks the state locally without triggering re-renders
    const stateRef = useRef(viewState);
    useEffect(() => {
        stateRef.current = viewState;
    }, [viewState]);

    // Cross-tab sync
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === STORAGE_KEY) setViewState(e.newValue ? JSON.parse(e.newValue) : null);
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [STORAGE_KEY]);

    // --- Dynamic Bounds ---
    const cycles = data.map(d => d.cycle);
    const xMin = cycles.length > 0 ? Math.min(...cycles) : 0;
    const xMax = cycles.length > 0 ? Math.max(...cycles) : 100;
    const xMargin = (xMax - xMin) * 0.05 || 5;

    const allVoltages = data.flatMap(d => cellIds.map(cell => d[`${cell}_voltage`]).filter(v => v !== undefined));
    const lineYMin = allVoltages.length > 0 ? Math.min(...allVoltages) : 0;
    const lineYMax = allVoltages.length > 0 ? Math.max(...allVoltages) : 5;
    const lineYMargin = (lineYMax - lineYMin) * 0.1 || 0.5;

    useEffect(() => {
        const resize = () => { window.dispatchEvent(new Event('resize')); };
        resize();
        const timeout = setTimeout(resize, 150);
        return () => clearTimeout(timeout);
    }, [isEditMode]);

    const executeBufferedDataFetch = (startX, endX) => {
        // ... (Keep your existing fetch logic)
        const BUFFER_SIZE = 200;
        const THRESHOLD_ZONE = 50;
        const currentCache = cacheRef.current;

        if (currentCache.start !== null && currentCache.end !== null) {
            if (startX >= currentCache.start + THRESHOLD_ZONE && endX <= currentCache.end - THRESHOLD_ZONE) return; 
        }
        const targetStart = Math.max(1, startX - BUFFER_SIZE);
        const targetEnd = endX + BUFFER_SIZE;
        cacheRef.current = { start: targetStart, end: targetEnd };
        console.log(`🛰️ [Line Widget] Fetching: /api/region?start=${targetStart}&end=${targetEnd}`);
    };

    const handleRelayout = (eventData) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            
            // Only process actual zoom/pan events
            const isXZoom = eventData['xaxis.range[0]'] !== undefined || eventData['xaxis.range'] || eventData['xaxis.autorange'];
            const isYZoom = eventData['yaxis.range[0]'] !== undefined || eventData['yaxis.range'] || eventData['yaxis.autorange'];

            if (isXZoom || isYZoom) {
                // Read from the silent ref, NOT the React state
                let newState = { ...stateRef.current, rev: Date.now() };

                if (eventData['xaxis.autorange']) delete newState.xRange;
                else if (eventData['xaxis.range[0]'] !== undefined) newState.xRange = [eventData['xaxis.range[0]'], eventData['xaxis.range[1]']];
                else if (eventData['xaxis.range']) newState.xRange = eventData['xaxis.range'];

                if (eventData['yaxis.autorange']) delete newState.yRange;
                else if (eventData['yaxis.range[0]'] !== undefined) newState.yRange = [eventData['yaxis.range[0]'], eventData['yaxis.range[1]']];
                else if (eventData['yaxis.range']) newState.yRange = eventData['yaxis.range'];

                // Update the silent ref and local storage, but DO NOT call setViewState!
                stateRef.current = newState;
                if (!newState.xRange && !newState.yRange) {
                    localStorage.removeItem(STORAGE_KEY);
                } else {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
                }
            }

            if (eventData['xaxis.autorange']) {
                cacheRef.current = { start: null, end: null };
            } else if (eventData['xaxis.range[0]'] !== undefined) {
                executeBufferedDataFetch(Math.round(eventData['xaxis.range[0]']), Math.round(eventData['xaxis.range[1]']));
            }
        }, 200);
    };

    const commonSpikeConfig = {
        showspikes: true, spikemode: 'across+toaxis', spikesnap: 'cursor',
        spikethickness: 1, spikedash: 'dash', spikecolor: '#999999'
    };

    const layout = {
        autosize: true,
        margin: { t: 10, b: 50, l: 40, r: 20 },
        legend: { orientation: 'h', yanchor: 'top', y: -0.1, xanchor: 'center', x: 0.5 },
        uirevision: viewState ? viewState.rev : 'fixed_revision', 
        dragmode: 'zoom', 
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        hovermode: 'x unified',
        xaxis: {
            title: 'Cycle Number',
            minallowed: Math.max(0, xMin - xMargin),
            maxallowed: xMax + xMargin,
            ...commonSpikeConfig,
            ...(viewState?.xRange ? { range: viewState.xRange, autorange: false } : { autorange: true })
        },
        yaxis: {
            title: 'Potential (V)',
            minallowed: lineYMin - lineYMargin,
            maxallowed: lineYMax + lineYMargin,
            ...commonSpikeConfig,
            ...(viewState?.yRange ? { range: viewState.yRange, autorange: false } : { range: [lineYMin - lineYMargin * 0.2, lineYMax + lineYMargin * 0.2] })
        }
    };

    const traces = cellIds.map(cell => ({
        x: cycles,
        y: data.map(d => d[`${cell}_voltage`]),
        name: cell,
        type: 'scattergl',
        mode: 'lines',
        hoverinfo: 'all'
    }));

    return (
        <div className="w-full h-full flex flex-col p-4 box-border">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex-shrink-0">Potential vs. Test Cumulative Capacity</h3>
            <div className="flex-1 w-full min-h-0 relative">
                <Plot
                    divId={`widget-line-${id}`}
                    data={traces}
                    layout={layout}
                    useResizeHandler={true}
                    style={{ width: '100%', height: 'calc(100% - 60px)', position: 'absolute' }}
                    config={{ responsive: true, displayModeBar: true, displaylogo: false, scrollZoom: true }}
                    onRelayout={handleRelayout}
                />
            </div>
        </div>
    );
}