import { useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

export default function EChartsGraphs({ data }) {
  // 1. References for the Line Chart
  const lineChartRef = useRef(null);
  const lineCacheRef = useRef({ start: null, end: null });
  const lineDebounceRef = useRef(null);

  // 2. References for the Scatter Chart
  const scatterChartRef = useRef(null);
  const scatterCacheRef = useRef({ start: null, end: null });
  const scatterDebounceRef = useRef(null);

  // 3. References for the Bar Chart
  const barChartRef = useRef(null);
  const barCacheRef = useRef({ start: null, end: null });
  const barDebounceRef = useRef(null);
  
  const cellIds = ['AG-CELL-00110-CLA.079', 'AG-CELL-00109-CLA.078', 'AG-CELL-00107-CLA.055'];

  // Global double-click handler to reset zoom levels for any chart
  const handleDoubleClick = (chartRef, cacheRef) => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.dispatchAction({ type: 'dataZoom', start: 0, end: 100 });
      cacheRef.current = { start: null, end: null };
    }
  };

  // Shared Core Fetch Controller with Sliding Window Buffer
  const executeBufferedDataFetch = (startX, endX, cacheRef, chartLabel) => {
    const BUFFER_SIZE = 200;       // Points to pre-fetch ahead/behind
    const THRESHOLD_ZONE = 50;     // Trigger buffer fill zone
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

  // Parser for Value-Based continuous axes (Line and Scatter)
  const parseValueZoomEvent = (chartRef, debounceRef, cacheRef, label) => {
    if (!chartRef.current) return;
    const chartInstance = chartRef.current.getEchartsInstance();
    const xAxisModel = chartInstance.getModel().getComponent('xAxis', 0);
    if (!xAxisModel) return;

    const xExtent = xAxisModel.axis.scale.getExtent();
    const startX = Math.round(xExtent[0]);
    const endX = Math.round(xExtent[1]);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      executeBufferedDataFetch(startX, endX, cacheRef, label);
    }, 200);
  };

  // NEW: Parser for Category-Based discrete axes (Bar Chart)
  const parseCategoryZoomEvent = (chartRef, debounceRef, cacheRef, label, categories) => {
    if (!chartRef.current) return;
    const chartInstance = chartRef.current.getEchartsInstance();
    
    // Extract current visible index array boundary from the axis model
    const xAxisModel = chartInstance.getModel().getComponent('xAxis', 0);
    if (!xAxisModel) return;

    const indexExtent = xAxisModel.axis.scale.getExtent(); // Returns index array bounds like [0, 2]
    const startIdx = Math.max(0, Math.floor(indexExtent[0]));
    const endIdx = Math.min(categories.length - 1, Math.ceil(indexExtent[1]));

    // Map those indices back to your raw numerical cycles (e.g. "Cycle 100" -> 100)
    const startX = categories[startIdx];
    const endX = categories[endIdx];

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      executeBufferedDataFetch(startX, endX, cacheRef, label);
    }, 200);
  };

  const intervalBarCycles = [100, 200, 300, 400, 500, 600];

  useEffect(() => {
    let lineInstance = null;
    let scatterInstance = null;
    let barInstance = null;

    if (lineChartRef.current) {
      lineInstance = lineChartRef.current.getEchartsInstance();
      lineInstance.on('datazoom', () => parseValueZoomEvent(lineChartRef, lineDebounceRef, lineCacheRef, "Line Chart"));
    }

    if (scatterChartRef.current) {
      scatterInstance = scatterChartRef.current.getEchartsInstance();
      scatterInstance.on('datazoom', () => parseValueZoomEvent(scatterChartRef, scatterDebounceRef, scatterCacheRef, "Scatter Plot"));
    }

    if (barChartRef.current) {
      barInstance = barChartRef.current.getEchartsInstance();
      barInstance.on('datazoom', () => parseCategoryZoomEvent(barChartRef, barDebounceRef, barCacheRef, "Bar Chart", intervalBarCycles));
    }

    return () => {
      if (lineInstance) lineInstance.off('datazoom');
      if (scatterInstance) scatterInstance.off('datazoom');
      if (barInstance) barInstance.off('datazoom');
      if (lineDebounceRef.current) clearTimeout(lineDebounceRef.current);
      if (scatterDebounceRef.current) clearTimeout(scatterDebounceRef.current);
      if (barDebounceRef.current) clearTimeout(barDebounceRef.current);
    };
  }, [data]);

  // Shared Interactions Config
  const dataZoomConfig = [
    { type: 'inside', xAxisIndex: [0], filterMode: 'none', zoomOnMouseWheel: true, moveOnMouseMove: true },
    { type: 'inside', yAxisIndex: [0], filterMode: 'none', zoomOnMouseWheel: true, moveOnMouseMove: true },
    { type: 'slider', xAxisIndex: [0], bottom: 40, filterMode: 'none' }
  ];

  const commonToolbox = {
    right: 10,
    top: 10,
    feature: {
      dataZoom: { yAxisIndex: 'all', title: { zoom: 'Box Zoom', back: 'Undo Zoom' } },
      saveAsImage: { title: 'Export PNG' }
    }
  };

  // 1. Line Chart Config
  const lineOption = {
    title: { text: 'Potential vs. Test Cumulative Capacity (Interactive)', textStyle: { fontSize: 16, fontWeight: 'bold' } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { bottom: 0, data: cellIds },
    toolbox: commonToolbox,
    xAxis: { type: 'value', name: 'Cycle Number', boundaryGap: false, scale: true },
    yAxis: { type: 'value', name: 'Potential (V)', scale: true },
    dataZoom: dataZoomConfig,
    series: cellIds.map(id => ({
      name: id,
      type: 'line',
      data: data.map(d => [d.cycle, d[`${id}_voltage`]]),
      showSymbol: false,
      lineStyle: { width: 2 },
      sampling: 'none', 
      clip: true 
    }))
  };

  // 2. Scatter Plot Config
  const scatterOption = {
    title: { text: 'Coulombic Efficiency (%) vs Cycle (Interactive)', textStyle: { fontSize: 16, fontWeight: 'bold' } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { bottom: 0, data: cellIds },
    toolbox: commonToolbox,
    xAxis: { type: 'value', name: 'Cycle Number', boundaryGap: false, scale: true },
    yAxis: { type: 'value', name: 'Coulombic Efficiency (%)', scale: true },
    dataZoom: dataZoomConfig,
    series: cellIds.map(id => ({
      name: id,
      type: 'scatter',
      symbolSize: 6,
      data: data.map(d => [d.cycle, d[`${id}_efficiency`]]),
      clip: true 
    }))
  };

  // 3. Stacked Bar Chart Config (Now with full interactive parity!)
  const filteredBarData = data.filter(d => intervalBarCycles.includes(d.cycle));

  const barOption = {
    title: { text: 'Coulombic Efficiency Distribution (Stacked & Interactive)', textStyle: { fontSize: 16, fontWeight: 'bold' } },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { bottom: 0, data: cellIds },
    toolbox: commonToolbox,
    xAxis: { 
      type: 'category', 
      data: intervalBarCycles.map(c => `Cycle ${c}`), 
      axisTick: { alignWithLabel: true } 
    },
    yAxis: { type: 'value', name: 'Efficiency (%)', max: 100 },
    dataZoom: dataZoomConfig,
    series: cellIds.map(id => ({
      name: id,
      type: 'bar',
      stack: 'total',
      data: filteredBarData.map(d => d[`${id}_efficiency`] * 0.33),
      clip: true // Prevents vertical bleeding during tall Y-pans
    }))
  };

  return (
    <div className="grid grid-cols-1 gap-8 w-full">
      {/* Line Chart Workspace */}
      <div 
        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm" 
        onDoubleClick={() => handleDoubleClick(lineChartRef, lineCacheRef)}
      >
        <ReactECharts ref={lineChartRef} option={lineOption} style={{ height: '450px' }} />
      </div>

      {/* Scatter Plot Workspace */}
      <div 
        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm" 
        onDoubleClick={() => handleDoubleClick(scatterChartRef, scatterCacheRef)}
      >
        <ReactECharts ref={scatterChartRef} option={scatterOption} style={{ height: '450px' }} />
      </div>

      {/* Bar Chart Workspace */}
      <div 
        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        onDoubleClick={() => handleDoubleClick(barChartRef, barCacheRef)}
      >
        <ReactECharts ref={barChartRef} option={barOption} style={{ height: '450px' }} />
      </div>
    </div>
  );
}