import { useRef, useEffect, useState } from 'react';
import ReactPlotly from 'react-plotly.js';

const Plot = ReactPlotly.default || ReactPlotly;

export default function PlotlyLineWidget({ id, data, isEditMode }) {
    const cacheRef = useRef({ start: null, end: null });
    const debounceRef = useRef(null);
    const cellIds = ['AG-CELL-00110-CLA.079', 'AG-CELL-00109-CLA.078', 'AG-CELL-00107-CLA.055'];
    
    const STORAGE_KEY = `plotly_line_view_${id}`;

    const [viewState, setViewState] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch { return null; }
    });

    const [uiRev, setUiRev] = useState(() => viewState ? viewState.rev : Date.now());

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === STORAGE_KEY) {
                const newState = e.newValue ? JSON.parse(e.newValue) : null;
                setViewState(newState);
                setUiRev(newState ? newState.rev : Date.now());
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [STORAGE_KEY]);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 300);
        return () => clearTimeout(timer);
    }, [isEditMode]);

    const cycles = data.map(d => d.cycle);
    const xMin = cycles.length > 0 ? Math.min(...cycles) : 0;
    const xMax = cycles.length > 0 ? Math.max(...cycles) : 100;
    const xMargin = (xMax - xMin) * 0.05 || 5;

    const allVoltages = data.flatMap(d => cellIds.map(cell => d[`${cell}_voltage`]).filter(v => v !== undefined));
    const lineYMin = allVoltages.length > 0 ? Math.min(...allVoltages) : 0;
    const lineYMax = allVoltages.length > 0 ? Math.max(...allVoltages) : 5;
    const lineYMargin = (lineYMax - lineYMin) * 0.1 || 0.5;

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
        console.log(`🛰️ [Line Widget] Fetching: /api/region?start=${targetStart}&end=${targetEnd}`);
    };

    const handleRelayout = (eventData) => {
        const isUserZoom = 
            'xaxis.range[0]' in eventData || 'xaxis.range' in eventData ||
            'yaxis.range[0]' in eventData || 'yaxis.range' in eventData ||
            'xaxis.autorange' in eventData || 'yaxis.autorange' in eventData;

        if (!isUserZoom) return; 

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setViewState(prev => {
                let newState = { ...prev, rev: Date.now() };

                if (eventData['xaxis.autorange']) delete newState.xRange;
                else if (eventData['xaxis.range[0]'] !== undefined) newState.xRange = [eventData['xaxis.range[0]'], eventData['xaxis.range[1]']];
                else if (eventData['xaxis.range']) newState.xRange = eventData['xaxis.range'];

                if (eventData['yaxis.autorange']) delete newState.yRange;
                else if (eventData['yaxis.range[0]'] !== undefined) newState.yRange = [eventData['yaxis.range[0]'], eventData['yaxis.range[1]']];
                else if (eventData['yaxis.range']) newState.yRange = eventData['yaxis.range'];

                if (!newState.xRange && !newState.yRange) {
                    localStorage.removeItem(STORAGE_KEY);
                } else {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
                }
                return newState;
            });

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
        // Increased 't' to 40 so the modebar pushes down away from the top edge
        margin: { t: 0, b: 60, l: 40, r: 20 },
        legend: { orientation: 'h', yanchor: 'top', y: -0.15, xanchor: 'center', x: 0.5 },
        uirevision: uiRev, 
        dragmode: 'pan', 
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        hovermode: 'x unified',
        xaxis: {
            title: 'Cycle Number',
            minallowed: Math.max(0, xMin - xMargin),
            maxallowed: xMax + xMargin,
            ...commonSpikeConfig,
            autorange: viewState?.xRange ? false : true,
            range: viewState?.xRange || undefined
        },
        yaxis: {
            title: 'Potential (V)',
            minallowed: lineYMin - lineYMargin,
            maxallowed: lineYMax + lineYMargin,
            ...commonSpikeConfig,
            autorange: viewState?.yRange ? false : true,
            range: viewState?.yRange || undefined
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

    // Using STRICT inline styles for the layout to completely block RGL/Tailwind conflicts
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '16px', boxSizing: 'border-box' }}>
            
            {/* Header Area (Forced height, will never shrink) */}
            <div style={{ flex: '0 0 auto', marginBottom: '8px', zIndex: 10 }}>
                <h3 className="text-sm font-semibold text-gray-700 m-0">Potential vs. Test Cumulative Capacity</h3>
            </div>
            
            {/* Chart Area (Forced boundary, strict absolute positioning for Plotly) */}
            <div style={{ flex: '1 1 auto', position: 'relative', width: '100%', minHeight: 0 }}>
                <Plot
                    divId={`widget-line-${id}`}
                    data={traces}
                    layout={layout}
                    useResizeHandler={true}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
                    config={{ responsive: true, displayModeBar: true, displaylogo: false, scrollZoom: true }}
                    onRelayout={handleRelayout}
                />
            </div>
            
        </div>
    );
}