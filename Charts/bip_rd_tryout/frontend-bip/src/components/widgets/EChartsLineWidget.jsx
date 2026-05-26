import React, { useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

export default function EChartsLineWidget({ data }) {
  const chartRef = useRef(null);
  const cacheRef = useRef({ start: null, end: null });
  const debounceRef = useRef(null);
  
  const cellIds = ['AG-CELL-00110-CLA.079', 'AG-CELL-00109-CLA.078', 'AG-CELL-00107-CLA.055'];
  const cycles = data.map(d => d.cycle);

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
    console.log(`🛰️ [ECharts Line Widget] Fetching: /api/region?start=${targetStart}&end=${targetEnd}`);
  };

  const handleDataZoom = () => {
    if (!chartRef.current) return;
    const chartInstance = chartRef.current.getEchartsInstance();
    const xAxisModel = chartInstance.getModel().getComponent('xAxis', 0);
    if (!xAxisModel) return;

    const xExtent = xAxisModel.axis.scale.getExtent();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      executeBufferedDataFetch(Math.round(xExtent[0]), Math.round(xExtent[1]));
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

  const option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { bottom: 0, data: cellIds },
    toolbox: {
      right: 10, top: 0,
      feature: { dataZoom: { yAxisIndex: 'all', title: { zoom: 'Box Zoom', back: 'Undo Zoom' } } }
    },
    xAxis: { type: 'value', name: 'Cycle Number', boundaryGap: false, scale: true },
    yAxis: { type: 'value', name: 'Potential (V)', scale: true },
    dataZoom: [
      { type: 'inside', xAxisIndex: [0], filterMode: 'none', zoomOnMouseWheel: true, moveOnMouseMove: true },
      { type: 'inside', yAxisIndex: [0], filterMode: 'none', zoomOnMouseWheel: true, moveOnMouseMove: true },
      { type: 'slider', xAxisIndex: [0], bottom: 40, filterMode: 'none' }
    ],
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

  return (
    <div className="w-full h-full flex flex-col p-4 box-border bg-white rounded-xl" onDoubleClick={handleDoubleClick}>
      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex-shrink-0">Potential vs. Test Cumulative Capacity</h3>
      <div className="flex-1 w-full min-h-0 relative">
        <ReactECharts ref={chartRef} option={option} style={{ height: '100%', width: '100%', position: 'absolute' }} />
      </div>
    </div>
  );
}