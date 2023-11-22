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
} from 'antd';
import {
  CustomCol,
  CustomDivider,
  CustomRow,
} from 'components/customize/Layout';
import { PaperClipOutlined } from 'components/icon/Icon';
import React, { useEffect, useState } from 'react';
import color from 'styles/color';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, valueSearchState } from 'recoil/atom';
import { Link } from 'react-router-dom';
import { ModalPrimary } from 'components/Modal/Modal';
import { get, post, put } from 'utils/APICaller';
import { EllipsisOutlined } from '@ant-design/icons';
import { checkIfIsUrl } from 'components/formatter/format';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/vi_VN';
import 'dayjs/locale/vi';

const tabList = [
  {
    key: 'Sent',
    label: 'Được gửi đến',
  },
  {
    key: 'interview',
    label: 'Phỏng vấn',
  },
];

const sentItems = [
  {
    key: 'interview',
    label: 'Phỏng vấn',
  },
  {
    key: 'decline',
    label: 'Từ chối',
    danger: true,
  },
];

const interviewItems = [
  {
    key: 'edit',
    label: 'Chỉnh sửa lịch hẹn',
  },
  {
    key: 'accept',
    label: 'Nhận ứng viên',
  },
  {
    key: 'decline',
    label: 'Từ chối',
    danger: true,
  },
];

const EditInterview = ({
  isModalEdit,
  setIsModalEdit,
  appointmentId,
  isIdItem,
  setIsIdItem,
  form,
}) => {
  const [timeBooking, setTimeBooking] = useState('');
  const onChange = (value, dateString) => {
    setTimeBooking(dateString);
  };

  const editAppointment = (values) => {
    const { editAddress } = values;
    let location = null;
    let link = null;
    if (checkIfIsUrl(editAddress)) {
      location = null;
      link = editAddress;
    } else {
      location = editAddress;
      link = null;
    }
    put({
      endpoint: `/appointment/detail/${appointmentId}`,
      body: {
        location,
        link,
        time: dayjs(values.editTime),
      },
    })
      .then((res) => {
        setIsIdItem(null);
        notification.success({
          message: 'Đã thay đổi lịch phỏng vấn!',
        });
        setIsModalEdit(false);
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
        editAppointment(values);
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const handleCancel = () => {
    setIsModalEdit(false);
  };

  return (
    <>
      <ModalPrimary
        title={'Chỉnh sửa lịch hẹn'}
        open={isModalEdit}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name='editInterview'>
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
                    name='editAddress'
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
                    name='editTime'
                    rules={[
                      {
                        required: true,
                        message: 'Không được để trống ô này!',
                      },
                    ]}
                  >
                    <DatePicker
                    timezone="UTC"
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

const Interview = ({
  isModalInterview,
  setIsModalInterview,
  isIdItem,
  setIsIdItem,
}) => {
  const [timeBooking, setTimeBooking] = useState('');
  const auth = useRecoilValue(authState);
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
        clientId: auth.id,
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
        title={"Đặt lịch hẹn"}
        open={isModalInterview}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name="bookingInterview">
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
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input placeholder="Ví dụ: Công ty ABC, toà nhà 123, Phường Đa Kao, Quận 1" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Typography.Title level={4}>
                    Thời gian phỏng vấn
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="time"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <DatePicker
                      timezone="UTC"
                      style={{ with: "100%" }}
                      showTime
                      showNow={false}
                      onChange={onChange}
                      disabledDate={(current) => {
                        return (
                          current && current.isBefore(dayjs().endOf("day"))
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

const AcceptInterview = ({
  isModalAccept,
  setIsModalAccept,
  isIdItem,
  setIsIdItem,
}) => {
  const handleOk = () => {
    put({
      endpoint: `/application/approve/${isIdItem}`,
    })
      .then((res) => {
        setIsIdItem(null);
        notification.success({
          message: 'Đã tuyển dụng',
        });
        setIsModalAccept(false);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const handleCancel = () => {
    setIsModalAccept(false);
  };

  return (
    <>
      <ModalPrimary
        title='Tuyển dụng'
        open={isModalAccept}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Tuyển dụng'
      >
        Bạn muốn tuyển dụng ứng viên này?
      </ModalPrimary>
    </>
  );
};

const TabSent = ({ activeTabKey }) => {
  const [applicationList, setApplicationList] = useState([]);
  const search = useRecoilValue(valueSearchState);
  const [list, setList] = useState([]);
  const [ellipsis] = useState(true);
  const [isModalInterview, setIsModalInterview] = useState(false);
  const [isModalDecline, setIsModalDecline] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalAccept, setIsModalAccept] = useState(false);
  const [isIdItem, setIsIdItem] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [appointment, setAppointment] = useState([]);
  const [appointmentId, setAppointmentId] = useState();
  const [form] = Form.useForm();

  const auth = useRecoilValue(authState);

  useEffect(() => {
    getApplications();
    getAppointment();
  }, [isIdItem]);

  const getAppointment = () => {
    get({ endpoint: `/appointment/client/${auth.id}` })
      .then((res) => {
        const data = res.data.filter((item) => item.applicationId != null);
        setAppointment(data);
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  useEffect(() => {
    const filtered = applicationList.filter((item) => {
      if (activeTabKey === 'Sent') {
        return search === ''
          ? item.status === 'Sent'
          : item.jobs?.title.toLowerCase().includes(search) &&
              item.status === 'Sent';
      } else if (activeTabKey === 'interview') {
        return search === ''
          ? item.status === 'interview'
          : item.jobs?.title.toLowerCase().includes(search) &&
              item.status === 'interview';
      }
      return true;
    });
    setList(filtered);
  }, [search, activeTabKey, applicationList]);

  const getApplications = async () => {
    get({ endpoint: `/application/client/${auth.id}` })
      .then((response) => {
        const data = response.data;
        let applications = data.filter(
          (application) =>
            application.jobId !== null && application.jobs !== null
        );
        setApplicationList(applications);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClick = (id, key) => {
    const checkAction = key.toString();
    if (checkAction.includes('decline')) {
      setIsIdItem(id);
      setIsModalDecline(true);
    } else if (checkAction.includes('interview')) {
      setIsIdItem(id);
      setIsModalInterview(true);
    } else if (checkAction.includes('edit')) {
      setIsIdItem(id);
      const item = appointment.find((c) => c.applicationId === id);
      setAppointmentId(item.appointmentId);
      if (item) {
        form.setFieldsValue({
          editAddress: item.location === null ? item.link : item.location,
          editTime: dayjs(item.time),
        });
      }
      setIsModalEdit(true);
    } else if (checkAction.includes('accept')) {
      setIsIdItem(id);
      setIsModalAccept(true);
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
          <Empty />
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
                            src={application?.freelancers.accounts.image}
                            alt='Apofoitisi logo'
                            preview={true}
                            style={{ borderRadius: '50%' }}
                          />
                        </Col>
                        <CustomCol>
                          <Row gutter={10}>
                            <Col>
                              <Link to={`/client/applications/freelancer-profile/38`}>
                                <Typography.Title
                                  level={4}
                                  style={{ margin: 0 }}
                                >
                                  {application?.freelancers.accounts.name}
                                </Typography.Title>
                              </Link>
                            </Col>
                          </Row>
                        </CustomCol>
                      </Row>
                    </Col>
                    <Col>
                      <Dropdown
                        menu={{
                          items:
                            activeTabKey === 'Sent'
                              ? sentItems.map((item) => ({
                                  ...item,
                                  key:
                                    item.key + '_' + application.id.toString(),
                                }))
                              : interviewItems.map((item) => ({
                                  ...item,
                                  key:
                                    item.key + '_' + application.id.toString(),
                                })),
                          onClick: ({ key }) => {
                            onClick(application.id, key);
                          },
                        }}
                      >
                        <EllipsisOutlined />
                      </Dropdown>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Row justify={'space-between'}>
                    <Col>
                      <Row gutter={[0, 10]}>
                        <Col span={24}>
                          <Link to={`/jobs/job-detail/${application.id}`}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {application.jobs?.title}
                            </Typography.Title>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Link to={`/jobs/job-detail/${application?.id}`}>
                    <Typography.Paragraph
                      style={{
                        margin: 0,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                      ellipsis={
                        ellipsis
                          ? {
                              rows: 3,
                            }
                          : false
                      }
                    >
                      {application.description}
                    </Typography.Paragraph>
                  </Link>
                </Col>
                <Col span={24}>
                  <CustomRow align={'middle'}>
                    <Col>
                      <PaperClipOutlined />
                    </Col>
                    <Col>
                      <Typography.Text
                        underline={true}
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          marginLeft: 5,
                          color: color.colorPrimary,
                        }}
                      >
                        fileAttachName.doc
                      </Typography.Text>
                    </Col>
                  </CustomRow>
                </Col>
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
      />
      <EditInterview
        isModalEdit={isModalEdit}
        setIsModalEdit={setIsModalEdit}
        appointmentId={appointmentId}
        isIdItem={isIdItem}
        setIsIdItem={setIsIdItem}
        form={form}
      />
      <DeclineInterview
        isModalDecline={isModalDecline}
        setIsModalDecline={setIsModalDecline}
        isIdItem={isIdItem}
        setIsIdItem={setIsIdItem}
      />
      <AcceptInterview
        isModalAccept={isModalAccept}
        setIsModalAccept={setIsModalAccept}
        isIdItem={isIdItem}
        setIsIdItem={setIsIdItem}
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
  const [activeTabKey, setActiveTabKey] = useState('Sent');
  const setSearch = useSetRecoilState(valueSearchState);
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const { RangePicker } = DatePicker;
  const { Search } = Input;

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const onSearch = (value, _e, info) => setSearch(value.toLowerCase());

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
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
            <TabSent activeTabKey={activeTabKey} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ApplicationsTracking;
