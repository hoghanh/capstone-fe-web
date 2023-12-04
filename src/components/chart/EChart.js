import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";

function EChart({jobList}) {

  const { Title, Paragraph } = Typography;

  function getMonthThisMonth() {
    const today = new Date();
    return today.getMonth() + 1;
  }

  const jobsByMonth = [];
  for (let month = 0; month < 12; month++) {
    const jobsInMonth = jobList?.filter((job) => {
      const createdAt = new Date(job.createdAt);
      const monthOfCreatedAt = createdAt.getMonth();
      return monthOfCreatedAt === month;
    });
    jobsByMonth.push(jobsInMonth.length);
  }

  function compareMonths() {
    const difference = jobsByMonth[getMonthThisMonth() - 1] - jobsByMonth[(getMonthThisMonth() - 2)];
    let result = '';
    if (difference > 0) {
      const c = difference;
      result = <Typography.Text>Nhiều hơn tháng trước {<span style={{color:'#00e396'}}>+{c}</span>}</Typography.Text>;
    } else if (difference < 0) {
      const c = difference;
      result = <Typography.Text>Ít hơn tháng trước <span style={{ color: 'red' }}>{c}</span></Typography.Text>;
    } else {
      result = <Typography.Text>Bằng tháng trước</Typography.Text>;
    }
    return result;
  }  

  const eChart = {
    series: [
      {
        name: "Bài viết",
        data: jobsByMonth,
        color: "#1890FF",
      },
    ],
  
    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
  
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 2,
        },
      },
      dataLabels: {
        enabled: false,
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
  
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " bài";
          },
        },
      },
    },
  };

  return (
    <>
      <div>
        <ReactApexChart
          style={{ boxShadow: '0px 4px 6px #0000001f', borderRadius: 12 }}
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Tổng bài viết đã đăng tháng {getMonthThisMonth()} này</Title>
        <Paragraph className="lastweek">
          {compareMonths()}
        </Paragraph>
      </div>
    </>
  );
}

export default EChart;
