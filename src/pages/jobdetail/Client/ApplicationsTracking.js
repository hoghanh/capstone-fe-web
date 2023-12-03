import {
  Card,
  Col,
  Input,
  Row,
  Typography,
  DatePicker,
  Image,
  Empty,
  Form,
  notification,
  Dropdown,
  Pagination,
  Tag,
} from 'antd';
import {
  CustomCol,
  CustomDivider,
  CustomRow,
} from 'components/customize/Layout';
import { PaperClipOutlined } from 'components/icon/Icon';
import React, { useEffect, useState } from 'react';
import color from 'styles/color';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  authState,
  clientProfile,
  profileState,
  valueSearchState,
} from 'recoil/atom';
import { Link, useParams } from 'react-router-dom';
import { ModalPrimary } from 'components/Modal/Modal';
import { get, post, put } from 'utils/APICaller';
import { EllipsisOutlined } from '@ant-design/icons';
import { checkIfIsUrl, formatDate } from 'components/formatter/format';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/vi_VN';
import 'dayjs/locale/vi';
import socket from 'config';

const tabList = [
  {
    key: 'sent',
    label: 'Ứng tuyển',
  },
  {
    key: 'interview',
    label: 'Phỏng vấn',
  },
  {
    key: 'approved',
    label: 'Nhận việc',
  },
  {
    key: 'declined',
    label: 'Từ chối',
  },
];

const sentItems = [
  {
    key: 'interview',
    label: 'Phỏng vấn',
  },
  {
    key: 'approved',
    label: 'Nhận việc',
  },
  {
    key: 'decline',
    label: 'Từ chối',
    danger: true,
  },
];

const interviewItems = [
  {
    key: 'approved',
    label: 'Nhận việc',
  },
  {
    key: 'decline',
    label: 'Từ chối',
    danger: true,
  },
];

const Interview = ({
  isModalInterview,
  setIsModalInterview,
  isIdItem,
  setIsIdItem,
}) => {
  const [timeBooking, setTimeBooking] = useState('');
  const user = useRecoilValue(clientProfile);
  const [form] = Form.useForm();

  const onChange = (value, dateString) => {
    setTimeBooking(dateString);
  };

  const interviewApplication = () => {
    put({
      endpoint: `/application/interview/${isIdItem}`,
    })
      .then((res) => {
        setIsIdItem(null);
        notification.success({
          message: 'Đặt lịch thành công!',
        });
        form.resetFields();
        setIsModalInterview(false);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const createAppointment = (values) => {
    const { address } = values;
    let location = null;
    let link = null;

    if (checkIfIsUrl(address)) {
      location = null;
      link = address;
    } else {
      location = address;
      link = null;
    }
    post({
      endpoint: `/appointment/`,
      body: {
        location,
        link,
        time: timeBooking,
        clientId: user.id,
        applicationId: isIdItem,
      },
    })
      .then((res) => {
        interviewApplication();
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        createAppointment(values);
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalInterview(false);
  };

  return (
    <>
      <ModalPrimary
        title={'Đặt lịch hẹn'}
        open={isModalInterview}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name='bookingInterview'>
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4}>
                    Link phỏng vấn (hoặc địa điểm)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='address'
                    rules={[
                      {
                        required: true,
                        message: 'Không được để trống ô này!',
                      },
                    ]}
                  >
                    <Input placeholder='Ví dụ: Công ty ABC, toà nhà 123, Phường Đa Kao, Quận 1' />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Typography.Title level={4}>
                    Thời gian phỏng vấn
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='time'
                    rules={[
                      {
                        required: true,
                        message: 'Không được để trống ô này!',
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ with: '100%' }}
                      showTime
                      showNow={false}
                      onChange={onChange}
                      disabledDate={(current) => {
                        return (
                          current && current.isBefore(dayjs().endOf('day'))
                        );
                      }}
                      locale={locale}
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Form>
      </ModalPrimary>
    </>
  );
};

const DeclineInterview = ({
  isModalDecline,
  setIsModalDecline,
  isIdItem,
  setIsIdItem,
}) => {
  const declineInterview = () => {
    put({
      endpoint: `/application/decline/${isIdItem}`,
    })
      .then((res) => {
        setIsIdItem(null);
        notification.success({
          message: 'Đã từ chối',
        });
        setIsModalDecline(false);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const handleOk = () => {
    declineInterview();
  };

  const handleCancel = () => {
    setIsModalDecline(false);
  };

  return (
    <>
      <ModalPrimary
        title='Từ chối'
        open={isModalDecline}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Từ chối'
        okType='danger'
      >
        Bạn có chắc muốn từ chối hồ sơ này?
      </ModalPrimary>
    </>
  );
};

const Approved = ({
  isModalApproved,
  setIsModalApproved,
  isIdItem,
  setIsIdItem,
  accountId,
}) => {
  const auth = useRecoilValue(authState);
  const user = useRecoilValue(profileState);

  const approved = () => {
    put({
      endpoint: `/application/approve/${isIdItem}`,
    })
      .then((res) => {
        setIsIdItem(null);
        notification.success({
          message: 'Nhận ứng viên thành công',
        });
        setIsModalApproved(false);

        let notificationData = {
          notificationName: 'Thay đổi số dư',
          notificationDescription: res.data.message,
        };

        //Gửi notification [thông tin] - đến [accountID người nhận]
        socket.emit('sendNotification', notificationData, auth.id);

        //Gửi thông tin đến freelancer
        notificationData = {
          notificationName: 'Công việc được nhận ',
          notificationDescription: `${user.name} vừa nhận đơn ứng tuyển của bạn`,
        };
        socket.emit('sendNotification', notificationData, accountId);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const handleOk = () => {
    approved();
  };

  const handleCancel = () => {
    setIsModalApproved(false);
  };

  return (
    <>
      <ModalPrimary
        title='Đồng ý'
        open={isModalApproved}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Đồng ý'
      >
        Bạn có chắc muốn nhận hồ sơ này?
      </ModalPrimary>
    </>
  );
};

const TabSent = ({ activeTabKey, value, page, setPage }) => {
  const [applicationList, setApplicationList] = useState([]);
  const search = useRecoilValue(valueSearchState);
  const [list, setList] = useState([]);
  const [isModalInterview, setIsModalInterview] = useState(false);
  const [isModalApproved, setIsModalApproved] = useState(false);
  const [isModalDecline, setIsModalDecline] = useState(false);
  const [isIdItem, setIsIdItem] = useState(null);
  const [pageSize] = useState(10);
  const user = useRecoilValue(clientProfile);
  const [accountId, setAccountId] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (user) {
      getApplications(id);
    }
  }, [user, isIdItem, id]);

  useEffect(() => {
    if (value) {
      const start = new Date(value[0]);
      const end = new Date(value[1]);
      const filteredDate = applicationList.filter((item) => {
        const sendDate = new Date(item.sendDate);
        return sendDate >= start && sendDate <= end;
      });
      const filtered = filteredDate.filter((item) => {
        if (activeTabKey === 'sent') {
          return search === ''
            ? item.freelancers.applications[0].status === 'sent'
            : item.freelancers.accounts.name.toLowerCase().includes(search) &&
                item.freelancers.applications[0].status === 'sent';
        } else if (activeTabKey === 'interview') {
          return search === ''
            ? item.freelancers.applications[0].status === 'interview'
            : item.freelancers.accounts.name.toLowerCase().includes(search) &&
                item.freelancers.applications[0].status === 'interview';
        } else if (activeTabKey === 'approved') {
          return search === ''
            ? item.freelancers.applications[0].status === 'approved'
            : item.freelancers.accounts.name.toLowerCase().includes(search) &&
                item.freelancers.applications[0].status === 'approved';
        } else if (activeTabKey === 'declined') {
          return search === ''
            ? item.freelancers.applications[0].status === 'declined'
            : item.freelancers.accounts.name.toLowerCase().includes(search) &&
                item.freelancers.applications[0].status === 'declined';
        }
        return true;
      });
      setList(filtered);
    } else {
      const filtered = applicationList.filter((item) => {
        if (activeTabKey === 'sent') {
          return search === ''
            ? item.freelancers.applications[0].status === 'sent'
            : item.freelancers.accounts.name.toLowerCase().includes(search) &&
                item.freelancers.applications[0].status === 'sent';
        } else if (activeTabKey === 'interview') {
          return search === ''
            ? item.freelancers.applications[0].status === 'interview'
            : item.freelancers.accounts.name.toLowerCase().includes(search) &&
                item.freelancers.applications[0].status === 'interview';
        } else if (activeTabKey === 'approved') {
          return search === ''
            ? item.freelancers.applications[0].status === 'approved'
            : item.freelancers.accounts.name.toLowerCase().includes(search) &&
                item.freelancers.applications[0].status === 'approved';
        } else if (activeTabKey === 'declined') {
          return search === ''
            ? item.freelancers.applications[0].status === 'declined'
            : item.freelancers.accounts.name.toLowerCase().includes(search) &&
                item.freelancers.applications[0].status === 'declined';
        }
        return true;
      });
      setList(filtered);
    }
  }, [search, activeTabKey, applicationList, value]);

  const getApplications = (id) => {
    get({ endpoint: `/application/job/${id}` })
      .then((response) => {
        let applications = response.data;
        setApplicationList(applications);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClick = (id, key, accountId, appointments) => {
    const checkAction = key.toString();
    const appointmentTime = new Date(appointments?.time);
    const today = new Date();
    const timeDifference = appointmentTime - today;
    if (checkAction.includes('decline')) {
      setIsIdItem(id);
      if (timeDifference > 0) {
        notification.error({
          message:
            'Chưa tới thời gian phỏng vấn, vui lòng phỏng vấn rồi thực hiện thao tác',
        });
      } else {
        console.log('hi');
        setIsModalDecline(true);
      }
      setAccountId(accountId);
    } else if (checkAction.includes('interview')) {
      setIsIdItem(id);
      setIsModalInterview(true);
      setAccountId(accountId);
    } else if (checkAction.includes('approved')) {
      setIsIdItem(id);
      setIsIdItem(id);
      if (timeDifference > 0) {
        notification.error({
          message:
            'Chưa tới thời gian phỏng vấn, vui lòng phỏng vấn rồi thực hiện thao tác',
        });
      } else {
        setIsModalDecline(true);
      }
      setAccountId(accountId);
    }
  };

  const handleChange = (page) => {
    setPage(page);
  };

  const getPagedList = () => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return list.slice(start, end);
  };

  return (
    <Row>
      {list.length === 0 || list === null ? (
        <Col span={24}>
          <Empty description={<span>Dữ liệu trống</span>} />
        </Col>
      ) : (
        getPagedList()?.map((application, index) => {
          return (
            <Col key={index} span={24}>
              <Row
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                gutter={[0, 5]}
              >
                <Col span={24}>
                  <Row justify={'space-between'}>
                    <Col>
                      <Row align={'middle'}>
                        <Col
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginRight: 10,
                            position: 'relative',
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}
                        >
                          <Image
                            width={72}
                            src={
                              application?.freelancers.accounts.image ||
                              '/icon/logo.svg'
                            }
                            alt='avatar user'
                            preview={true}
                            style={{ borderRadius: '50%' }}
                          />
                        </Col>
                        <CustomCol>
                          <Row gutter={10}>
                            <Col>
                              <Link
                                to={`/client/applications/freelancer-profile/${application?.freelancers.accounts.id}`}
                              >
                                <Typography.Title
                                  level={4}
                                  style={{ margin: 0 }}
                                >
                                  {application?.freelancers.accounts.name}
                                  {application?.hired ? (
                                    <Tag
                                      style={{ marginLeft: 10 }}
                                      color='green'
                                    >
                                      Nhân lực cũ
                                    </Tag>
                                  ) : null}
                                </Typography.Title>
                              </Link>
                            </Col>
                          </Row>
                        </CustomCol>
                      </Row>
                    </Col>
                    <Col>
                      {activeTabKey === 'sent' ||
                      activeTabKey === 'interview' ? (
                        <Dropdown
                          menu={{
                            items:
                              activeTabKey === 'sent'
                                ? application?.freelancers.hired !== true
                                  ? sentItems
                                      .filter((item) => item.key !== 'approved')
                                      .map((item) => ({
                                        ...item,
                                        key:
                                          item.key +
                                          '_' +
                                          application?.freelancers.applications[0].id.toString(),
                                      }))
                                  : sentItems.map((item) => ({
                                      ...item,
                                      key:
                                        item.key +
                                        '_' +
                                        application?.freelancers.applications[0].id.toString(),
                                    }))
                                : interviewItems.map((item) => ({
                                    ...item,
                                    key:
                                      item.key +
                                      '_' +
                                      application?.freelancers.applications[0].id.toString(),
                                  })),
                            onClick: ({ key }) => {
                              onClick(
                                application?.freelancers.applications[0].id,
                                key,
                                application?.freelancers.accounts.id,
                                application?.freelancers.applications[0]
                                  .appointments
                              );
                            },
                          }}
                        >
                          <EllipsisOutlined />
                        </Dropdown>
                      ) : null}
                    </Col>
                  </Row>
                </Col>
                <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Row justify={'space-between'}>
                    <Col>
                      <Row gutter={[0, 10]}>
                        <Col span={24}>
                          <Typography.Text style={{ margin: 0 }}>
                            Ngày ứng tuyển:{' '}
                            {formatDate(
                              application.freelancers.applications[0].sendDate
                            )}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Typography.Paragraph
                    style={{
                      margin: 0,
                      paddingLeft: 10,
                      paddingRight: 10,
                      cursor: 'pointer',
                      textAlign: 'justify',
                    }}
                    ellipsis={{
                      rows: 3,
                      expandable: true,
                      symbol: 'Xem thêm',
                    }}
                  >
                    {application.freelancers.applications[0].description}
                  </Typography.Paragraph>
                </Col>
                {application.freelancers.applications[0]?.fileAttach ? (
                  <Col span={24}>
                    <CustomRow align={'middle'}>
                      <Col>
                        <PaperClipOutlined />
                      </Col>
                      <Col>
                        <Typography.Link
                          href={application.fileAttach}
                          target='_blank'
                          underline={true}
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            marginLeft: 5,
                            color: color.colorPrimary,
                            cursor: 'pointer',
                          }}
                        >
                          CV.pdf
                        </Typography.Link>
                      </Col>
                    </CustomRow>
                  </Col>
                ) : null}
              </Row>
              <CustomDivider />
            </Col>
          );
        })
      )}
      <Interview
        isModalInterview={isModalInterview}
        setIsModalInterview={setIsModalInterview}
        isIdItem={isIdItem}
        setIsIdItem={setIsIdItem}
        accountId={accountId}
      />
      <DeclineInterview
        isModalDecline={isModalDecline}
        setIsModalDecline={setIsModalDecline}
        isIdItem={isIdItem}
        setIsIdItem={setIsIdItem}
        accountId={accountId}
      />

      <Approved
        isModalApproved={isModalApproved}
        setIsModalApproved={setIsModalApproved}
        isIdItem={isIdItem}
        setIsIdItem={setIsIdItem}
        accountId={accountId}
      />

      <Col span={24}>
        <Pagination
          current={page}
          total={list.length}
          showSizeChanger={false}
          pageSize={pageSize}
          onChange={handleChange}
          style={{ padding: 20, display: 'flex', justifyContent: 'center' }}
        />
      </Col>
    </Row>
  );
};

const ApplicationsTracking = () => {
  const [activeTabKey, setActiveTabKey] = useState('sent');
  const setSearch = useSetRecoilState(valueSearchState);
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const { RangePicker } = DatePicker;
  const { Search } = Input;
  const [page, setPage] = useState(1);

  const onTabChange = (key) => {
    setPage(1);
    setActiveTabKey(key);
  };

  const onSearch = (value, _e, info) => setSearch(value.toLowerCase());

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 30;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 30;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  return (
    <Card style={{ padding: 0, marginBottom: 30 }}>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <Typography.Title level={3} style={{ margin: '20px 30px 10px' }}>
            Công việc của tôi
          </Typography.Title>
        </Col>
        <Col
          span={12}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Search
            placeholder='Tìm kiếm...'
            allowClear
            onSearch={onSearch}
            style={{
              width: '100%',
            }}
          />
        </Col>
        <Col
          span={12}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <RangePicker
            timezone='UTC'
            value={dates || value}
            disabledDate={disabledDate}
            onCalendarChange={(val) => {
              setDates(val);
            }}
            onChange={(val) => {
              setValue(val);
            }}
            format={'DD/MM/YYYY'}
            onOpenChange={onOpenChange}
            changeOnBlur
            locale={locale}
          />
        </Col>
        <Col className='trackingJobs' span={24}>
          <Card
            style={{
              width: '100%',
              border: 'transparent',
            }}
            headStyle={{
              color: color.colorBlack,
              fontWeight: 'bold',
              paddingLeft: 30,
              paddingRight: 30,
              margin: '10px 0',
              borderBottom: '0.5px solid #000 !important',
            }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
          >
            <TabSent
              activeTabKey={activeTabKey}
              value={value}
              page={page}
              setPage={setPage}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ApplicationsTracking;
