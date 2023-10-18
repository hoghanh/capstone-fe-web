import {
  Badge,
  Calendar,
  Card,
  Col,
  Grid,
  Layout,
  Row,
  Typography,
} from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import joblist from 'styles/joblist';
import './styles.css';
import LocalStorageUtils from 'utils/LocalStorageUtils';

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
          content: 'This is error event 4.',
        },
      ];
      break;
    default:
  }
  return listData || [];
};
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
              stroke-width='2'
              stroke-miterlimit='10'
              stroke-linecap='round'
              stroke-linejoin='round'
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
              stroke-width='2'
              stroke-miterlimit='10'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <>
      <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Card
          bodyStyle={{ padding: 'unset' }}
          style={joblist.card}
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
          <Row>
            <Col xs={24} md={12}>
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
                    onTypeChange('month'); // Set type to 'month' if it's not already
                    return null;
                  }
                }}
                className='calendar'
                cellRender={cellRender}
              />
            </Col>
            <Col xs={24} md={12}></Col>
          </Row>
        </Card>
      </Layout.Content>
    </>
  );
};

export default InterviewSchedule;
