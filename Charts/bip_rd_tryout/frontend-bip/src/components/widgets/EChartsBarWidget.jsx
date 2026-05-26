import React, { useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

export default function EChartsBarWidget({ data }) {
  const chartRef = useRef(null);
  const cacheRef = useRef({ start: null, end: null });
  const debounceRef = useRef(null);
  
  const cellIds = ['AG-CELL-00110-CLA.079', 'AG-CELL-00109-CLA.078', 'AG-CELL-00107-CLA.055'];
  const intervalBarCycles = [100, 200, 300, 400, 500, 600];

  const handleDoubleClick = () => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().dispatchAction({ type: 'dataZoom', start: 0, end: 100 });
      cacheRef.current = { start: null, end: null };
    }
  };

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
    console.log(`🛰️ [ECharts Bar Widget] Fetching: /api/region?start=${targetStart}&end=${targetEnd}`);
  };

  const handleDataZoom = () => {
    if (!chartRef.current) return;
    const chartInstance = chartRef.current.getEchartsInstance();
    const xAxisModel = chartInstance.getModel().getComponent('xAxis', 0);
    if (!xAxisModel) return;

    // Convert ECharts categorical indices back into actual cycle numbers
    const indexExtent = xAxisModel.axis.scale.getExtent();
    const startIdx = Math.max(0, Math.floor(indexExtent[0]));
    const endIdx = Math.min(intervalBarCycles.length - 1, Math.ceil(indexExtent[1]));

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      executeBufferedDataFetch(intervalBarCycles[startIdx], intervalBarCycles[endIdx]);
    }, 200);
  };

  useEffect(() => {
    let instance = null;
    if (chartRef.current) {
      instance = chartRef.current.getEchartsInstance();
      instance.on('datazoom', handleDataZoom);
    }
    return () => {
      if (instance) instance.off('datazoom', handleDataZoom);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [data]);

  const filteredBarData = data.filter(d => intervalBarCycles.includes(d.cycle));

  const option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { bottom: 0, data: cellIds },
    toolbox: {
      right: 10, top: 0,
      feature: { dataZoom: { yAxisIndex: 'all', title: { zoom: 'Box Zoom', back: 'Undo Zoom' } } }
    },
    xAxis: { type: 'category', data: intervalBarCycles.map(c => `Cycle ${c}`), axisTick: { alignWithLabel: true } },
    yAxis: { type: 'value', name: 'Efficiency (%)', max: 100 },
    dataZoom: [
      { type: 'inside', xAxisIndex: [0], filterMode: 'none', zoomOnMouseWheel: true, moveOnMouseMove: true },
      { type: 'inside', yAxisIndex: [0], filterMode: 'none', zoomOnMouseWheel: true, moveOnMouseMove: true },
      { type: 'slider', xAxisIndex: [0], bottom: 40, filterMode: 'none' }
    ],
    series: cellIds.map(id => ({
      name: id,
      type: 'bar',
      stack: 'total',
      data: filteredBarData.map(d => d[`${id}_efficiency`] * 0.33),
      clip: true
    }))
  };

  return (
    <div className="w-full h-full flex flex-col p-4 box-border bg-white rounded-xl" onDoubleClick={handleDoubleClick}>
      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex-shrink-0">Coulombic Efficiency Distribution</h3>
      <div className="flex-1 w-full min-h-0 relative">
        <ReactECharts ref={chartRef} option={option} style={{ height: '100%', width: '100%', position: 'absolute' }} />
      </div>
    </div>
  );
}