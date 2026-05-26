var options = {
  series: [
    {
      name: "Desktops",
      data: Array.from({ length: 1000 }, (_, i) => ({
        x: i,
        y: Math.floor(Math.random() * 100),
      })),
    },
  ],

  chart: {
    height: 350,
    type: "line",
    zoom: { enabled: false },
    animations: { enabled: false },
  },

  stroke: {
    curve: "dotted", // keep straight for performance
    width: 2,
  },

  markers: {
    size: 0, // disable default markers
    discrete: [
      {
        seriesIndex: 0,
        dataPointIndex: 7,
        fillColor: "green",
        strokeColor: "red",
        size: 5,
        shape: "circle",
      },
      {
        seriesIndex: 0,
        dataPointIndex: 8,
        fillColor: "blue",
        strokeColor: "#eee",
        size: 4,
        shape: "circle",
      },
      {
        seriesIndex: 0,
        dataPointIndex: 6,
        fillColor: "violet",
        strokeColor: "#eee",
        size: 20,
        shape: "circle", // sparkle removed
      },
    ],
  },

  tooltip: {
    enabled: true,
    followCursor: true,
    theme: "dark",
    custom: function ({ series, seriesIndex, dataPointIndex }) {
      return `
        <div style="padding:10px;background:#222;color:white">
          <h3>${series[seriesIndex][dataPointIndex]}</h3>
        </div>
      `;
    },
  },

  xaxis: {
    type: "numeric",
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
