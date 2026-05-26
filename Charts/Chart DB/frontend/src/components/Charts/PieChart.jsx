import PlotlyComponent from "react-plotly.js";

const Plot = PlotlyComponent.default || PlotlyComponent;

const PieChart = ({
  months,
  values,
}) => {
  return (
    <div className="w-full overflow-hidden">
      <Plot
        data={[
          {
            labels: months,
            values: values,
            type: "pie",
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

export default PieChart;