import {
  Avatar,
  Badge,
  Calendar,
  Card,
  Dropdown,
  Grid,
  Layout,
  Menu,
  Typography,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import { EllipsisOutlined } from '@ant-design/icons';
import { get } from 'utils/APICaller';
import { formatDateTime } from 'components/formatter/format';
import { ArrowLeft, ArrowRight } from 'components/icon/Icon';
import Loading from 'components/loading/loading';

const actions = [
  {
    key: 'edit',
    label: 'Chỉnh sửa thông tin phỏng vấn',
  },
  {
    key: 'start',
    label: 'Nhận ứng viên',
  },
  {
    key: 'decline',
    label: 'Từ chối ứng viên',
    danger: true,
  },
];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

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
  }, [clientId]);

  const getListData = (value) => {
    let listData = [];
    jobListColor.forEach((item) => {
      const time = new Date(item.time);
      time.setHours(time.getHours() - 7, 0, 0);
      if (time.getMonth() === value.month()) {
        if (time.getDate() === value.date()) {
          const checkDuplicate = listData.filter(
            (listData) => listData.color === item.color
          );
          if (checkDuplicate.length === 0) {
            listData.push(item);
          }
        }
      }
    });
    return listData;
  };

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
          <li key={item.color + item.time}>
            <Badge status='default' color={item.color} />
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
          <ArrowLeft />
        </button>
        <div className='text-month'>{value.format('MMMM')}</div>
        <button
          className='btn-month'
          onClick={() => onChange(value.clone().add(1, 'month'))}
        >
          <ArrowRight />
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
    setIsLoading(true);
    let items = [];
    let itemChildren = [];
    let coloritems = [];
    jobs?.forEach((job) => {
      const color = getRandomColor();
      job.proposals?.forEach((proposal) => {
        itemChildren.push(
          getItem(
            <div
              style={{
                display: ' flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 15,
                width: '100%',
              }}
            >
              <div>
                <Avatar
                  style={{
                    marginRight: 10,
                  }}
                  size='small'
                  src={proposal.freelancers?.accounts.image}
                ></Avatar>
                <Typography.Text style={{ fontWeight: 'bold', color: '#000' }}>
                  {proposal.freelancers?.accounts.name}
                </Typography.Text>
              </div>
              <Dropdown
                menu={{
                  items: actions.map((action) => ({
                    ...action,
                    key:
                      action.key +
                      '_' +
                      proposal?.appointments[0]?.appointmentId,
                  })),
                  onClick,
                }}
              >
                <EllipsisOutlined />
              </Dropdown>
            </div>,
            'appoinment_' + proposal?.appointments[0]?.appointmentId,
            null,
            [
              {
                key:
                  'appointment_time_' +
                  proposal?.appointments[0]?.appointmentId,
                label:
                  'Thời gian phỏng vấn: ' +
                  formatDateTime(proposal.appointments[0]?.time),
              },
              {
                key:
                  'appointment_location_' +
                  proposal?.appointments[0]?.appointmentId,
                label: (
                  <>
                    Địa điểm : {proposal.appointments[0]?.location}{' '}
                    <Link to={proposal.appointments[0]?.link}>
                      {proposal.appointments[0]?.link}
                    </Link>
                  </>
                ),
              },
            ],
            'group'
          )
        );
        coloritems.push({
          jobId: job.id,
          color: color,
          time: proposal.appointments[0]?.time,
        });
      });

      coloritems.sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateA - dateB;
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
    });
    setIsLoading(false);
    return [items, coloritems];
  }

  return isLoading ? (
    <Loading />
  ) : (
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
