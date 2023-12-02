import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";

function LineChart({revenue}) {
  
  
  const { Title, Paragraph } = Typography;


  function sum(numbers) {
    let total = 0;
    for (const number of numbers) {
      total += number;
    }
    return total;
  }


  const revenuesByMonth = [];
  for (let month = 0; month < 12; month++) {
    const revenuesInMonth = revenue.filter((revenue) => {
      const createdAt = new Date(revenue.createdAt);
      const monthOfCreatedAt = createdAt.getMonth();
      return monthOfCreatedAt === month;
    });
    let totalRevenueForMonth = 0;
    for (const revenue of revenuesInMonth) {
      totalRevenueForMonth += revenue.amount;
    }
  
    revenuesByMonth.push(totalRevenueForMonth);
  }

  const lineChart = {
    series: [
      {
        name: "Doanh thu",
        data: revenuesByMonth,
        offsetY: 0,
      },
    ],
  
    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
  
      legend: {
        show: false,
      },
  
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
  
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },
  
      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
        categories: [
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
        ],
      },
  
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <>
      <div style={{ marginTop: "1rem" }}>

        <ReactApexChart
          className="full-width"
          options={lineChart.options}
          series={lineChart.series}
          type="area"
          height={350}
          width={"100%"}
        />
      </div>
    </>
  );
}

export default LineChart;
