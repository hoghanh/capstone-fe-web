const stackedBarChart = {
  series: [{
    name: 'Từ chối',
    data: [44, 55, 41, 37, 22, 43, 21, 53, 40, 39, 42, 0]
  }, {
    name: 'Phỏng vấn',
    data: [29, 32, 33, 30, 13, 43, 32, 25, 18, 30, 27, 0]
  }, {
    name: 'Nhận việc',
    data: [12, 17, 11, 9, 9, 11, 20, 10, 21, 15, 9, 0]
  }],

  options: {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",
      stacked: true,

      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [2],
      offsetY: 20,
      formatter: function (_val, opt) {
        let series = opt.w.config.series
        let idx = opt.dataPointIndex
        const total = series.reduce((total, self) => total + self.data[idx], 0)
        return total
      },
      style: {
        colors: ["#000"]
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#000",
            "#000",
            "#000",
            "#000",
            "#000",
            "#000",
            "#000",
            "#000",
            "#000",
            "#000",
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#000",
            "#000",
            "#000",
            "#000",
            "#000",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val + " applcations";
        },
      },
    },
  },
};

export default stackedBarChart;
