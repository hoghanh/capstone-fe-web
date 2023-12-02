import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";

function StackedBarChart({ applications }) {
   const { Title, Paragraph } = Typography;

   const applicationByMonth = [];
   const interviewApplicationsByMonth = [];
   const declinedApplicationsByMonth = [];
   const approvedApplicationsByMonth = [];
   const sentApplicationsByMonth = [];


   function getMonthThisMonth() {
      const today = new Date();
      return today.getMonth() + 1;
   }


   for (let month = 0; month < 12; month++) {
      const applicationsInMonth = applications.filter((application) => {
         const createdAt = new Date(application.sendDate);
         const monthOfSendDate = createdAt.getMonth();
         return monthOfSendDate === month;
      });
      applicationByMonth.push(applicationsInMonth.length);

      const interviewApplicationsInMonth = applications.filter((application) => {
         const createdAt = new Date(application.sendDate);
         const monthOfSendDate = createdAt.getMonth();
         return (
            monthOfSendDate === month &&
            application.status === 'interview'
         );
      });
      interviewApplicationsByMonth.push(interviewApplicationsInMonth.length);

      const declinedApplicationsInMonth = applications.filter((application) => {
         const createdAt = new Date(application.sendDate);
         const monthOfSendDate = createdAt.getMonth();
         return (
            monthOfSendDate === month &&
            application.status === 'declined'
         );
      });
      declinedApplicationsByMonth.push(declinedApplicationsInMonth.length);

      const approvedApplicationsInMonth = applications.filter((application) => {
         const createdAt = new Date(application.sendDate);
         const monthOfSendDate = createdAt.getMonth();
         return (
            monthOfSendDate === month &&
            application.status === 'approved'
         );
      });
      approvedApplicationsByMonth.push(approvedApplicationsInMonth.length);

      const sentApplicationsInMonth = applications.filter((application) => {
         const createdAt = new Date(application.sendDate);
         const monthOfSendDate = createdAt.getMonth();
         return (
            monthOfSendDate === month &&
            application.status === 'sent'
         );
      });
      sentApplicationsByMonth.push(sentApplicationsInMonth.length);
   }


   function compareMonths() {
      const difference = applicationByMonth[getMonthThisMonth() - 1] - applicationByMonth[(getMonthThisMonth() - 2)];
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

   function sum(numbers) {
      let total = 0;
      for (const number of numbers) {
         total += number;
      }
      return total;
   }


   const stackedBarChart = {
      series: [{
         name: 'Đã gửi',
         data: sentApplicationsByMonth
      }, {
         name: 'Phỏng vấn',
         data: interviewApplicationsByMonth
      }, {
         name: 'Nhân việc',
         data: approvedApplicationsByMonth
      }, {
         name: 'Từ chối',
         data: declinedApplicationsByMonth
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
               borderRadius: 2,
            },
         },
         dataLabels: {
            enabled: false,
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
                     "#fff",
                     "#fff",
                     "#fff",
                     "#fff",
                     "#fff",
                     "#000",
                     "#000",
                  ],
               },
            },
         },

         tooltip: {
            y: {
               formatter: function (val) {
                  return val + " đơn";
               },
            },
         },
      },
   };
   const items = [
      {
         Amount: sum(sentApplicationsByMonth),
         status: "Đã gửi",
      },
      {
         Amount: sum(interviewApplicationsByMonth),
         status: "Phỏng vấn",
      },
      {
         Amount: sum(approvedApplicationsByMonth),
         status: "Chấp thuận",
      },
      {
         Amount: sum(declinedApplicationsByMonth),
         status: "Từ chối",
      },
   ];

   return (
      <>
         <div id="chart">
            <ReactApexChart
               style={{ boxShadow: '0px 4px 6px #0000001f', borderRadius: 12 }}
               options={stackedBarChart.options}
               series={stackedBarChart.series}
               type="bar"
               height={220}
            />
         </div>
         <div className="chart-vistior">
            <Title level={5}>Tổng đơn ứng tuyển tháng {getMonthThisMonth()}</Title>
            <Paragraph className="lastweek">
               {compareMonths()}
            </Paragraph>
            <Row gutter>
               {items.map((v, index) => (
                  <Col xs={6} xl={6} sm={6} md={6} key={index}>
                     <div className="chart-visitor-count">
                        <Title level={4}>{v.Amount}</Title>
                        <span>{v.status}</span>
                     </div>
                  </Col>
               ))}
            </Row>
         </div>
      </>
   );
}

export default StackedBarChart;
