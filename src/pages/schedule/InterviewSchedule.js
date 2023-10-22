import {
  Avatar,
  Badge,
  Calendar,
  Card,
  Col,
  Grid,
  Layout,
  Menu,
  Row,
  Typography,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import joblist from 'styles/joblist';
import './styles.css';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import {
  AppstoreOutlined,
  HeartFilled,
  MailOutlined,
  SettingOutlined,
  SmileFilled,
} from '@ant-design/icons';
import { get } from 'utils/APICaller';
import { formatDate } from 'components/formatter/format';

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
        {
          type: 'error',
          content: 'This is error event.',
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event',
        },
        {
          type: 'success',
          content: 'This is very long usual event......',
        },
        {
          type: 'error',
          content: 'This is error event 1.',
        },
        {
          type: 'error',
          content: 'This is error event 2.',
        },
        {
          type: 'error',
          content: 'This is error event 3.',
        },
        {
          type: 'error',
          content: 'This is error event 4.',
        },
        {
          type: 'other',
          content: 'This is error event 5.',
        },
      ];
      break;
    default:
  }
  return listData || [];
};

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 1', '11'),
    getItem('Option 2', '12'),
    getItem('Option 3', '13'),
    getItem('Option 4', '14'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '15'),
    getItem('Option 6', '16'),
  ]),
];

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const InterviewSchedule = () => {
  const { useBreakpoint } = Grid;
  const { sm, md, lg, xl } = useBreakpoint();

  const clientId = LocalStorageUtils.getItem('profile').id;
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');
  const [isLoading, setIsLoading] = useState(true);
  const [jobList, setJobList] = useState([]);
  const [jobListColor, setJobListColor] = useState([]);

  const onClick = (e) => {
    console.log('click ', e);
  };

  useEffect(() => {
    setIsLoading(true);
    get({
      endpoint: `/job/appointment/${clientId}`,
    })
      .then((res) => {
        const filtered = res.data.filter((job) => {
          return job.status === true;
        });
        console.log(filtered);

        const data = generateJobs(filtered);

        setJobList(data[0]);
        setJobListColor(data[1]);
        setTimeout(() => {
          setIsLoading(false);
        }, [500]);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }, []);

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className='events'>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type}
              color={
                item.type === 'error'
                  ? '#E15554'
                  : item.type === 'success'
                  ? '#6FDB45'
                  : item.type === 'warning'
                  ? '#F2C94C'
                  : '#7B61FF'
              }
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const monthHeader = (value, onChange) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px',
        }}
      >
        <button
          className='btn-month'
          onClick={() => onChange(value.clone().subtract(1, 'month'))}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='31'
            height='30'
            viewBox='0 0 31 30'
            fill='none'
          >
            <path
              d='M18.6035 21.2068L12.3966 14.9999L18.6035 8.79297'
              stroke='black'
              strokeWidth='2'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <div className='text-month'>{value.format('MMMM')}</div>
        <button
          className='btn-month'
          onClick={() => onChange(value.clone().add(1, 'month'))}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='31'
            height='30'
            viewBox='0 0 31 30'
            fill='none'
          >
            <path
              d='M12.3965 8.79421L18.6034 15.0011L12.3965 21.208'
              stroke='black'
              strokeWidth='2'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    );
  };

  function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 31) + 70;
    const lightness = Math.floor(Math.random() * 21) + 70;
    const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    return hslColor;
  }

  function generateJobs(jobs) {
    let items = [];
    let itemChildren = [];
    let coloritems = [];
    jobs?.map((job) => {
      const color = getRandomColor();
      job.proposals?.forEach((proposal) => {
        itemChildren.push(
          getItem(
            <>
              <div>
                <Avatar
                  style={{
                    backgroundColor: '#fde3cf',
                    color: '#f56a00',
                    marginRight: 10,
                  }}
                >
                  U
                </Avatar>
                <b>{proposal.freelancers?.accounts.name}</b>
              </div>
              <div>Thời gian phỏng vấn : {proposal.appointments[0]?.time}</div>
              <div>
                Địa điểm : {proposal.appointments[0]?.location}{' '}
                <Link to={proposal.appointments[0]?.link}>
                  {proposal.appointments[0]?.link}
                </Link>
              </div>
            </>,
            'appointment_' + proposal.id,
            null
          )
        );
      });

      items.push(
        getItem(
          <b>{job.title}</b>,
          'job_' + job.id,
          <Badge status='default' color={color} />,
          itemChildren
        )
      );
      itemChildren = [];
      coloritems.push({ jobId: job.id, color: color });
    });
    return [items, coloritems];
  }

  return (
    <>
      <Layout.Content
        style={{
          maxWidth: 1080,
          margin: '0 auto',
        }}
        className='schedule-interview'
      >
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
              <Typography.Title level={md ? 3 : 5} style={{ paddingLeft: 30 }}>
                Lịch phỏng vấn
              </Typography.Title>
            </div>
          }
          extra={page === 'client/schedule' ? '' : <Link>Xem chi tiết</Link>}
        >
          <Calendar
            locale={{
              lang: {
                locale: 'en',
                monthFormat: 'MMMM',
                weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                weekdaysShort: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
              },
            }}
            fullscreen={false}
            headerRender={({ value, onChange, type, onTypeChange }) => {
              if (type === 'month') {
                return monthHeader(value, onChange);
              } else {
                onTypeChange('month');
                return null;
              }
            }}
            className='calendar'
            cellRender={cellRender}
            style={{ margin: 30 }}
          />
          <Menu
            onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            items={jobList}
            className='appoinment-list'
          />
        </Card>
      </Layout.Content>
    </>
  );
};

export default InterviewSchedule;
