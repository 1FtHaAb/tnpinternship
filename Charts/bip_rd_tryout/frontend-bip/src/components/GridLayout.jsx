import { useState, useMemo } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import PlotlyLineWidget from './widgets/PlotlyLineWidget';
import PlotlyScatterWidget from './widgets/PlotlyScatterWidget';
import PlotlyBarWidget from './widgets/PlotlyBarWidget';

import { generateCellData } from './mockData';

const GridLayout = () => {
  const { width, containerRef, mounted } = useContainerWidth({
    measureBeforeMount: false,
    initialWidth: 1200,
  });

  const [widgets, setWidgets] = useState([{ id: "asc" }, { id: "13" }, { id: "35" }]);
  const [layouts, setLayouts] = useState(() => {
    const saved = localStorage.getItem('layoutConfig');
    return saved ? JSON.parse(saved) : { lg: [], md: [], sm: [] };
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const mockData = useMemo(() => generateCellData(), []);

  // Add new graph/widget
  const addWidget = () => {
    const id = `widget_${Date.now()}`;

    const newWidget = {
      id,
      title: `Graph ${widgets.length + 1}`,
    };

    setWidgets((prev) => [...prev, newWidget]);

    // Auto-positioning
    const newLayoutItem = {
      i: id,
      x: 0,
      y: Infinity, // <- THIS makes it auto-place at bottom
      w: 2,
      h: 4,
      isDraggable: false,
      minH: 3,
      maxH: 6,
    };

    setLayouts((prev) => ({
      lg: [...prev.lg, newLayoutItem],
      md: [...prev.md, newLayoutItem],
      sm: [...prev.sm, { ...newLayoutItem, w: 6 }],
    }));
  };

  const toggleEditMode = () => {
    const nextMode = !isEditMode;
    setIsEditMode(nextMode);
    const updateItemMode = (item) => ({
      ...item,
      minH: 3,
      maxH: 6,
      isDraggable: nextMode,
      isResizable: nextMode,
    });

    setLayouts((prev) => ({
      lg: prev.lg.map(updateItemMode),
      md: prev.md.map(updateItemMode),
      sm: prev.sm.map(updateItemMode),
    }));
  };

  const handleLayoutChange = (_currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    console.log(allLayouts);
    const layoutConfig = JSON.stringify(allLayouts);
    localStorage.setItem("layoutConfig", layoutConfig);
  };

  const gridItemStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      {/* Toolbar */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
        <button
          onClick={addWidget}
          style={{
            padding: '10px 18px', borderRadius: '8px', border: 'none',
            background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: '600',
          }}
        >
          + Add Graph
        </button>

        <button
          onClick={(toggleEditMode)}
          style={{
            padding: '10px 18px', borderRadius: '8px', border: 'none',
            background: isEditMode ? '#ef4444' : '#e2e8f0',
            color: isEditMode ? '#fff' : '#475569',
            cursor: 'pointer', fontWeight: '600',
          }}
        >
          {isEditMode ? 'Done Editing' : 'Edit Dashboard'}
        </button>
      </div>

      {/* Empty State */}
      {widgets.length === 0 && (
        <div
          style={{
            height: '300px',
            border: '2px dashed #cbd5e1',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            background: '#fff',
          }}
        >
          No graphs added yet
        </div>
      )}

      {/* Grid */}
      {mounted && widgets.length > 0 && (
        <Responsive
          className="layout"
          layouts={layouts}
          width={width}
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          cols={{ lg: 2, md: 2, sm: 2 }}
          rowHeight={100}
          margin={[10, 10]}
          onLayoutChange={handleLayoutChange}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          draggableHandle=".widget-drag-handle"
        >
          {widgets.map((widget, index) => (
            <div
              key={widget.id}
              style={{
                ...gridItemStyle,
                borderColor: isEditMode ? '#3b82f6' : '#e2e8f0',
              }}
            >
              {isEditMode && (
                <div
                  className="widget-drag-handle z-10"
                  style={{
                    height: '32px',
                    flexShrink: 0,
                    background: '#f1f5f9',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: 'grab',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 10px',
                    fontSize: '12px',
                    userSelect: 'none',
                  }}
                >
                  ⋮⋮ Drag Widget
                </div>
              )}
              <div
                className="nodrag"
                style={{ flex: 1, minHeight: 0, width: '100%', pointerEvents: 'all' }}
              >
                {index % 3 === 0 && (
                  <PlotlyLineWidget id={widget.id} data={mockData} isEditMode={isEditMode} />
                )}
                {index % 3 === 1 && (
                  <PlotlyScatterWidget id={widget.id} data={mockData} isEditMode={isEditMode} />
                )}
                {index % 3 === 2 && (
                  <PlotlyBarWidget id={widget.id} data={mockData} isEditMode={isEditMode} />
                )}
              </div>
            </div>
          ))}
        </Responsive>
      )}
    </div>
  );
};

export default GridLayout;