import {
  Card,
  Dropdown,
  Grid,
  Layout,
  Typography,
  notification,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { get, put } from 'utils/APICaller';
import { formatDateTime } from 'components/formatter/format';
import Loading from 'components/loading/loading';
import EditScheduleModal from './EditScheduleModal';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useRecoilValue } from 'recoil';
import { authState, clientProfile } from 'recoil/atom';
import MeetingCalendar from './MeetingCalendar';
import socket from 'config';

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

const InterviewSchedule = () => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();
  const user = useRecoilValue(clientProfile);
  const auth = useRecoilValue(authState);

  const { pathname } = useLocation();
  const page = pathname.replace('/', '');
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentLocation, setAppointmentLocation] = useState('');
  const [id, setId] = useState('');

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

  const onClick = (
    e,
    time,
    applicationId,
    appointmentId,
    location,
    appointmentStatus,
    freelancerAccountId
  ) => {
    const checkAction = e.key.toString();
    const appointmentTime = new Date(time);
    const today = new Date();
    const timeDifference = appointmentTime - today;

    if (checkAction.includes('start') || checkAction.includes('decline')) {
      if (timeDifference > 0) {
        notification.error({
          message:
            'Chưa tới thời gian phỏng vấn, vui lòng phỏng vấn rồi thực hiện thao tác',
        });
      } else if (
        appointmentStatus === 'approved' ||
        appointmentStatus === 'declined'
      ) {
        notification.error({
          message:
            (appointmentStatus === 'approved' ? 'Đã nhận. ' : 'Đã từ chối. ') +
            'Vui lòng xem chi tiết tại danh sách ứng tuyển ',
        });
      } else {
        if (checkAction.includes('start')) {
          approveApplication(applicationId, freelancerAccountId);
        } else {
          declineApplication(applicationId);
        }
      }
    } else if (checkAction.includes('edit')) {
      if (timeDifference > 24 * 60 * 60 * 1000) {
        showModal(appointmentId, time, location);
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

  function approveApplication(id, freelancerAccountId) {
    put({ endpoint: `/application/approve/${id}` })
      .then((res) => {
        notification.success({
          message: 'Nhận ứng viên thành công',
        });

        let notificationData = {
          notificationName: 'Thay đổi số dư',
          notificationDescription: res.data.message,
        };

        //Gửi notification [thông tin] - đến [accountID người nhận]
        socket.emit('sendNotification', notificationData, auth.id);

        //Gửi thông tin đến freelancer
        notificationData = {
          notificationName: 'Công việc được nhận ',
          notificationDescription: `${user.accounts.name} vừa nhận đơn ứng tuyển của bạn`,
        };
        socket.emit('sendNotification', notificationData, freelancerAccountId);
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
                    record?.appointments[0]?.time,
                    record?.id,
                    record?.appointments[0]?.appointmentId,
                    record?.appointments[0]?.location.length > 0
                      ? record.appointments[0]?.location
                      : record.appointments[0]?.link,
                    record?.status,
                    record?.freelancers?.accounts.id
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
          <MeetingCalendar />
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
            style={{ padding: 30 }}
          />
        </Card>
      </Layout.Content>
    </>
  );
};

export default InterviewSchedule;
