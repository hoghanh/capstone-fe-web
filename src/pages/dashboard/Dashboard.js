import React, { useEffect, useState } from 'react';
import { Typography, Card, Grid, Layout, Row, Col, notification } from 'antd';
import Billing from 'pages/billing/Billing';
import MeetingCalendar from 'pages/schedule/MeetingCalendar';
import { Link, useLocation } from 'react-router-dom';
import { Documents, ListItem, Money, User } from 'components/icon/Icon';
import { useRecoilValue } from 'recoil';
import { clientProfile } from 'recoil/atom';
import { get } from 'utils/APICaller';
import { FormatVND } from 'components/formatter/format';
import EChart from 'components/chart/EChart';
import StackedBarChart from 'components/chart/StackedBarChart';

const Dashboard = () => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');
  const user = useRecoilValue(clientProfile);
  const [jobList, setJobList] = useState([]);
  const [applications, setApplications] = useState([]);

  const [totalJobs, setTotalJobs] = useState();
  const [totalApplications, setTotalApplications] = useState();
  const [totalApproved, setTotalApproved] = useState();
  const [totalTransaction, setTotalTransaction] = useState();
  


  useEffect(() => {
    getJobList(user);
    getApplicationList(user)
    getPayment(user) 
  }, [user]);


  function getJobList(user) {
    get({
      endpoint: `/job/client/${user.id}`,
    })
      .then((res) => {
        setJobList(res.data)
        setTotalJobs(res.data.length);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }

  function getApplicationList(user) {
    get({
      endpoint: `/application/client/${user.id}`,
    })
      .then((res) => {
        setApplications(res.data);
        setTotalApplications(res.data.length);
        setTotalApproved((res.data.map((item)=> item.status === 'interview').length))
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }

  function getPayment(user) {
    get({
      endpoint: `/payment/client/${user.id}`,
    })
      .then((res) => {
        let balance = 0;
        for (const transaction of res.data.payment) {
          if (transaction.type === "+") {
            balance += transaction.amount;
          }
        }
        console.log(balance)
        setTotalTransaction(balance)
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }

  const count = [
    {
      today: 'Tổng bài đăng',
      title: `${totalJobs ? totalJobs : '0'}`,
      icon: <ListItem />,
    },
    {
      today: 'Tổng đơn ứng tuyển',
      title: `${totalApplications ? totalApplications : '0'}`,
      icon:  <Documents color='#fff' />,
    },
    {
      today: 'Nhận việc',
      title: `${totalApproved ? totalApproved : '0'}`,
      icon: <User color='#fff' />,
    },
    {
      today: 'Tổng tiền nạp vào',
      title: `${FormatVND(totalTransaction, '') ? FormatVND(totalTransaction, '') : '0'}`,
      per: 'VNĐ',
      icon: <Money size={46} />,
    },
  ];


  return (
    <>
      <Layout.Content
        style={{
          maxWidth: 1080,
          margin: '0 auto',
        }}
        className='schedule-interview'
      >
        <Row gutter={[24, 24]} style={{marginBottom: 24}}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={6}
            >
              <Card style={{padding: 16}}>
                <div>
                  <Row align='middle' gutter={[12, 0]}>
                    <Col xs={18}>
                      <span style={{color: '#8c8c8c', fontSize: 14, fontWeight: 600}}>{c.today}</span>
                      <Typography.Title level={2}>
                        {c.title} <span style={{color:'#828282', fontSize: 14}}>{c.per}</span>
                      </Typography.Title>
                    </Col>
                    <Col xs={6}>
                      <div style={{ background: "#1890ff", borderRadius: ".5rem", color: "#fff", height: "48px", lineHeight: "55px", marginLeft: "auto", textAlign: "center", width: "48px" }}>{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={[24, 0]} className='mb-24'>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} className='mb-24'>
            <Card bordered={false} style={{height: '100%', padding: 20}}>
              <EChart jobList={jobList} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} className='mb-24'>
            <Card bordered={false} style={{height: '100%', padding: 20}}>
              <StackedBarChart applications={applications} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card
              bodyStyle={{ padding: 'unset' }}
              style={{
                boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
                marginBottom: 30,
              }}
              className='card-jobs'
              headStyle={{ paddingLeft: 0 }}
              title={
                <div className='trackingJobs'>
                  <Typography.Title
                    level={md ? 3 : 5}
                    style={{ paddingLeft: 30 }}
                  >
                    Lịch phỏng vấn
                  </Typography.Title>
                </div>
              }
              extra={
                page === 'client/schedule' ? '' : <Link>Xem chi tiết</Link>
              }
            >
              <MeetingCalendar />
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </>
  );
};

export default Dashboard;
