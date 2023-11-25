import {
  Avatar,
  Badge,
  Calendar,
  Card,
  Dropdown,
  Grid,
  Layout,
  Typography,
  notification,
  Row,
  Col,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { get, put } from 'utils/APICaller';
import { formatDateTime } from 'components/formatter/format';
import { ArrowLeft, ArrowRight } from 'components/icon/Icon';
import Loading from 'components/loading/loading';
import EditScheduleModal from './EditScheduleModal';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useRecoilValue } from 'recoil';
import { clientProfile } from 'recoil/atom';

// Cài đặt ngôn ngữ tiếng Việt cho Day.js
dayjs.locale('vi');

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
  const user = useRecoilValue(clientProfile);
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentLocation, setAppointmentLocation] = useState('');
  const [id, setId] = useState('');
  let statusApplication = '';

  const [openModal, setOpenModal] = useState(false);

  const [dataTable, setDataTable] = useState([]);

  const showModal = (id, time, location) => {
    setOpenModal(true);
    setId(id);
    setAppointmentLocation(location);
    setAppointmentTime(time);
  };
  const handleOkModal = () => {
    setTimeout(() => {
      setOpenModal(false);
    }, 3000);
  };
  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const onClick = (e, time, applicationId, appointmentId, location) => {
    const checkAction = e.key.toString();
    const appointmentTime = new Date(time);
    const today = new Date();
    const timeDifference = appointmentTime - today;

    setIsLoading(true);
    setTimeout(() => {
      if (checkAction.includes('start') || checkAction.includes('decline')) {
        if (timeDifference > 0) {
          notification.error({
            message:
              'Chưa tới thời gian phỏng vấn, vui lòng phỏng vấn rồi thực hiện thao tác',
          });
        } else if (
          statusApplication === 'approved' ||
          statusApplication === 'declined'
        ) {
          notification.error({
            message:
              (statusApplication === 'approved'
                ? 'Đã nhận. '
                : 'Đã từ chối. ') +
              'Vui lòng xem chi tiết tại danh sách ứng tuyển ',
          });
          statusApplication = '';
        } else {
          if (checkAction.includes('start')) {
            approveApplication(applicationId);
          } else {
            declineApplication(applicationId);
          }
        }
      } else if (checkAction.includes('edit')) {
        if (timeDifference > 24 * 60 * 60 * 1000) {
          showModal(appointmentId, time, location);
        } else if (
          timeDifference <= 24 * 60 * 60 * 1000 &&
          timeDifference > 0
        ) {
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
      setIsLoading(false);
    }, 3000);
  };

  function approveApplication(id) {
    put({ endpoint: `/application/approve/${id}` })
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

  function declineApplication(id) {
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
    if (user) {
      getInterviewSchedule();
    }
  }, [user]);

  function getInterviewSchedule() {
    setIsLoading(true);
    get({
      endpoint: `/job/appointment/${user.id}`,
    })
      .then((res) => {
        setDataTable(res.data);
        // const data = generateJobs(res.data);
        // setJobList(data[0]);
        // setJobListColor(data[1]);
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
    // jobListColor.forEach((item) => {
    //   const time = new Date(item.time);
    //   if (time.getMonth() === value.month()) {
    //     if (time.getDate() === value.date()) {
    //       const checkDuplicate = listData.filter(
    //         (listData) => listData.color === item.color
    //       );
    //       if (checkDuplicate.length === 0) {
    //         listData.push(item);
    //       }
    //     }
    //   }
    // });
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
        <div className='text-month'>
          {capitalizeFirstLetter(value.format('MMMM'))}
        </div>
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
                        application?.id,
                        application?.appointments[0]?.appointmentId,
                        application.appointments[0]?.location.length > 0
                          ? application.appointments[0]?.location
                          : application.appointments[0]?.link
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
    return [items];
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderAppointments = (appointments) => {
    const appointmentColumns = [
      {
        title: 'Người phỏng vấn',
        dataIndex: 'freelancers.accounts.name',
        key: 'name',
        render: (text, record) => record.freelancers.accounts.name,
      },
      {
        title: 'Thời gian',
        dataIndex: 'appointments.time',
        key: 'time',
        render: (text, record) => formatDateTime(record.appointments[0].time),
      },
      {
        title: 'Địa điểm',
        dataIndex: 'appointments.location',
        key: 'location',
        render: (text, record) => record.appointments[0].location,
      },
      {
        title: 'Thao tác',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => (
          <Dropdown
            menu={{
              items: actions.map((action) => ({
                ...action,
                key: action.key + '_' + record?.id,
                onClick: () =>
                  onClick(
                    action,
                    record.appointments[0]?.time,
                    record?.id,
                    record?.appointments[0]?.appointmentId,
                    record.appointments[0]?.location.length > 0
                      ? record.appointments[0]?.location
                      : record.appointments[0]?.link
                  ),
              })),
            }}
          >
            <EllipsisOutlined />
          </Dropdown>
        ),
      },
    ];

    return (
      <Table
        columns={appointmentColumns}
        dataSource={appointments}
        pagination={false}
        rowKey={(record) => record.appointmentId}
      />
    );
  };

  const expandedRowRender = (record) => {
    return renderAppointments(record.applications);
  };

  const columns = [{ title: 'Công việc', dataIndex: 'title', key: 'name' }];

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
        <EditScheduleModal
          visible={openModal}
          onCancel={handleCancelModal}
          onOk={handleOkModal}
          appointmentTime={appointmentTime}
          appointmentLocation={appointmentLocation}
          id={id}
        />
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
          <Row>
            <Col span={10}>
              <Calendar
                locale={{
                  lang: {
                    locale: 'vi',
                    monthFormat: 'MMMM',
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
            </Col>
            <Col span={14}>
              <Table
                columns={columns}
                expandable={{
                  expandedRowRender,
                  defaultExpandedRowKeys: dataTable.map((record) =>
                    record.id.toString()
                  ),
                }}
                dataSource={dataTable}
                rowKey={(record) => record.id}
                pagination={false}
              />
            </Col>
          </Row>
        </Card>
      </Layout.Content>
    </>
  );
};

export default InterviewSchedule;
