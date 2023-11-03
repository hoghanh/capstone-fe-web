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
import { get, put } from 'utils/APICaller';
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
  const { md } = useBreakpoint();

  const clientId = LocalStorageUtils.getItem('profile').id;
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');
  const [isLoading, setIsLoading] = useState(true);
  const [jobList, setJobList] = useState([]);
  const [jobListColor, setJobListColor] = useState([]);

  const location = useLocation();

  const onClick = (e, time, applicationId) => {
    //todo: gọi api để check xem application đã được approve hay decline chưa, nếu chưa thì xử lý start/ end else thì không cần xử lý,
    const checkAction = e.key.toString();
    const appoinmentTime = new Date(time);
    const today = new Date();
    const timeDifference = appoinmentTime - today;

    if (checkAction.includes('start')) {
      const itemId = checkAction.replace('start_', '');
      if (timeDifference < 0) {
        notification.error({
          message:
            'Chưa tới thời gian phỏng vấn, vui lòng phỏng vấn rồi thực hiện thao tác',
        });
      } else {
      }
      approveAplication(itemId);
    } else if (checkAction.includes('decline')) {
      const itemId = checkAction.replace('decline_', '');
      declineAplication(itemId);
    } else if (checkAction.includes('edit')) {
      if (timeDifference > 24 * 60 * 60 * 1000) {
        const itemId = checkAction.replace('edit_', '');
      } else if (timeDifference <= 24 * 60 * 60 * 1000 && timeDifference > 0) {
        notification.error({
          message:
            'Cách thời gian phỏng vấn chưa đến 1 ngày, bạn không thể chỉnh sửa',
        });
      } else {
        notification.error({
          message: 'Đã quá thời gian phỏng vấn, bạn không thể chỉnh sửa',
        });
      }
    }
  };

  function approveAplication(id) {
    put({ endpoint: `/aplication/approve/${id}` })
      .then((res) => {
        notification.success({
          message: 'Đã nhận ứng viên',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Có lỗi xảy ra! Vui lòng thử lại',
        });
      });
  }

  function declineAplication(id) {
    put({ endpoint: `/application/decline/${id}` })
      .then((res) => {
        notification.success({
          message: 'Đã từ chối ứng viên',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Có lỗi xảy ra! Vui lòng thử lại',
        });
      });
  }

  useEffect(() => {
    getInterviewSchedule();
  }, []);

  function getInterviewSchedule() {
    setIsLoading(true);
    get({
      endpoint: `/job/appointment/${clientId}`,
    })
      .then((res) => {
        const data = generateJobs(res.data);
        console.log(data);

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
  }

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
      job.applications?.forEach((application) => {
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
                  src={application.freelancers?.accounts.image}
                ></Avatar>
                <Typography.Text style={{ fontWeight: 'bold', color: '#000' }}>
                  {application.freelancers?.accounts.name}
                </Typography.Text>
              </div>
              <Dropdown
                menu={{
                  items: actions.map((action) => ({
                    ...action,
                    key: action.key + '_' + application?.id,
                    onClick: () =>
                      onClick(
                        action,
                        application.appointments[0]?.time,
                        application?.id
                      ),
                  })),
                }}
              >
                <EllipsisOutlined />
              </Dropdown>
            </div>,
            'appoinment_' + application?.appointments[0]?.appointmentId,
            null,
            [
              {
                key:
                  'appointment_time_' +
                  application?.appointments[0]?.appointmentId,
                label:
                  'Thời gian phỏng vấn: ' +
                  formatDateTime(application.appointments[0]?.time),
              },
              {
                key:
                  'appointment_location_' +
                  application?.appointments[0]?.appointmentId,
                label: (
                  <>
                    Địa điểm : {application.appointments[0]?.location}{' '}
                    <Link to={application.appointments[0]?.link}>
                      {application.appointments[0]?.link}
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
          time: application.appointments[0]?.time,
        });
      });

      coloritems.sort((a, b) => new Date(a.time) - new Date(b.time));

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
