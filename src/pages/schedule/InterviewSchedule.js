import {
  Card,
  Dropdown,
  Grid,
  Layout,
  Typography,
  notification,
  Table,
  Input,
  Button,
  Space,
} from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { EllipsisOutlined, SearchOutlined } from '@ant-design/icons';
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
import Highlighter from 'react-highlight-words';
import moment from 'moment';

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
    freelancerAccountId,
    jobId
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
          approveApplication(applicationId, freelancerAccountId, jobId);
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

  function approveApplication(id, freelancerAccountId, jobId) {
    put({ endpoint: `/application/approve/${id}` })
      .then((res) => {
        notification.success({
          message: 'Nhận ứng viên thành công',
        });

        let notificationData;

        setTimeout(() => {
          notificationData = {
            notificationName: 'Thay đổi số dư',
            notificationDescription: res.data.message,
            context: 'payment',
          };

          //Gửi notification [thông tin] - đến [accountID người nhận]
          socket.emit('sendNotification', notificationData, auth.id);

          //Gửi thông tin đến freelancer
          notificationData = {
            notificationName: 'Công việc được nhận ',
            notificationDescription: `${user.accounts.name} vừa nhận đơn ứng tuyển của bạn`,
            context: jobId,
          };

          //Gửi notification [thông tin] - đến [accountID người nhận]
          socket.emit(
            'sendNotification',
            notificationData,
            freelancerAccountId
          );
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        notification.error({
          message: error.message,
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
    getInterviewSchedule(user);
  }, [user, id]);

  function getInterviewSchedule(user) {
    setIsLoading(true);
    get({
      endpoint: `/appointment/client/${user.id}`,
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

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      const dataIndexArray = dataIndex.split('.');
      let nestedValue = record;

      for (const prop of dataIndexArray) {
        nestedValue = nestedValue[prop];
      }

      return nestedValue
        ? nestedValue.toString().toLowerCase().includes(value.toLowerCase())
        : record['link'].toString().toLowerCase().includes(value.toLowerCase());
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const appointmentColumns = [
    {
      title: 'Công việc',
      dataIndex: 'applications.jobs.title',
      key: 'job',
      width: '30%',
      ...getColumnSearchProps('applications.jobs.title'),
      render: (text, record) => record.applications.jobs.title,
    },
    {
      title: 'Ứng viên',
      dataIndex: 'applications.freelancers.accounts.name',
      key: 'name',
      ...getColumnSearchProps('applications.freelancers.accounts.name'),
      render: (text, record) => record.applications.freelancers.accounts.name,
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => (moment(a.time).isAfter(b.time) ? 1 : -1),
      render: (text, record) => formatDateTime(record.time),
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
      width: '30%',
      ...getColumnSearchProps('location'),
      render: (text, record) =>
        record.location || (
          <Typography.Link href={record.link}>{record.link}</Typography.Link>
        ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'applications.status',
      key: 'status',
      filters: [
        { text: 'Đã nhận', value: 'approved' },
        { text: 'Đang phỏng vấn', value: 'interview' },
        { text: 'Đã từ chối', value: 'declined' },
      ],
      onFilter: (value, record) => record.applications.status === value,
      render: (text, record) =>
        record.applications.status === 'approved' ? (
          <Typography.Text type='success'>Đã nhận</Typography.Text>
        ) : record.applications.status === 'interview' ? (
          <Typography.Text type='warning'>Đang phỏng vấn</Typography.Text>
        ) : (
          <Typography.Text type='danger'>Đã từ chối</Typography.Text>
        ),
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
                  record?.time,
                  record?.applicationId,
                  record?.appointmentId,
                  record?.location ? record?.location : record?.link,
                  record?.applications?.status,
                  record?.applications?.freelancers.accounts.id,
                  record?.applications?.jobId
                ),
            })),
          }}
        >
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ];

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
          open={openModal}
          onCancel={handleCancelModal}
          setId={setId}
          setOpenModal={setOpenModal}
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
            columns={appointmentColumns}
            dataSource={dataTable}
            pagination={false}
            rowKey={(record) => record.appointmentId}
            style={{ padding: 30 }}
          />
        </Card>
      </Layout.Content>
    </>
  );
};

export default InterviewSchedule;
