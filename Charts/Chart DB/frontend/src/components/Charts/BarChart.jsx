import PlotlyComponent from "react-plotly.js";

const Plot = PlotlyComponent.default || PlotlyComponent;

const BarChart = ({
  months,
  values,
}) => {
  return (
    <div className="w-full overflow-hidden">
      <Plot
        data={[
          {
            x: months,
            y: values,
            type: "bar",
          },
        ]}
        layout={{
          autosize: true
        }}

        style={{
          width: "100%",
          height: "500px"
        }}

        useResizeHandler={true}
      />
    </div>
  );
};

export default BarChart;