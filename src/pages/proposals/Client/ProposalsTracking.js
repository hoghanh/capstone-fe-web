import { Card, Col, Input, Row, Typography, DatePicker, Image, Empty, Form, notification } from 'antd';
import { CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import { PaperClipOutlined } from 'components/icon/Icon';
import React, { useEffect, useState } from 'react';
import color from 'styles/color';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileState, proposalListState, valueSearchState } from 'recoil/atom';
import { ButtonIcon, ButtonPrimary } from 'components/customize/GlobalCustomize';
import { Link } from 'react-router-dom';
import { ModalPrimary } from 'components/Modal/Modal';
import { post, put } from 'utils/APICaller';
import LocalStorageUtils from 'utils/LocalStorageUtils';

const tabListNoTitle = [
  {
    key: 'Sent',
    label: 'Phù hợp với công việc',
  },
  {
    key: 'Approved',
    label: 'Đã gửi đi',
  },
  {
    key: 'Declined',
    label: 'Phỏng vấn',
  },
];

const TabSent = () => {
  const proposalList = useRecoilValue(proposalListState);
  const search = useRecoilValue(valueSearchState);
  const list = proposalList.filter((item) => {
    return search === ''
      ? item.status === 'Sent'
      : item.jobs?.title.toLowerCase().includes(search) && item.status === 'Sent'
  });
  const informationUser = useRecoilValue(profileState);
  return (
    <>
      <Row>
        {list.length === 0 || list === null ? (
          <Col span={24}>
            <Empty />
          </Col>
        ) : (
          list.map((proposal, index) => {
            return (
              <Col key={index} span={24}>
                <Row style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }} gutter={[0, 5]}>
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
                              src={informationUser.image}
                              alt="Apofoitisi logo"
                              preview={true}
                              style={{ borderRadius: '50%' }}
                            />
                          </Col>
                          <CustomCol>
                            <Row gutter={10}>
                              <Col>
                                <Link to="/client/proposals/freelancer-profile">
                                  <Typography.Title level={4} style={{ margin: 0 }}>
                                    Nguyen Van A
                                  </Typography.Title>
                                </Link>
                              </Col>
                            </Row>
                          </CustomCol>
                        </Row>
                      </Col>
                      <Col>
                        <ButtonPrimary style={{ paddingRight: 20, paddingLeft: 20, paddingBottom: 10, paddingTop: 10 }}>
                          Gửi lời mời
                        </ButtonPrimary>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Row justify={'space-between'}>
                      <Col>
                        <Row gutter={[0, 10]}>
                          <Col span={24}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {proposal.jobs?.title}
                            </Typography.Title>
                          </Col>
                          <Col span={24}>
                            <Typography.Text style={{ margin: 0 }}>Công ty cổ phần Foody</Typography.Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>
                      {proposal.description}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <CustomRow align={'middle'}>
                      <Col>
                        <PaperClipOutlined />
                      </Col>
                      <Col>
                        <Typography.Text
                          underline={true}
                          style={{ fontWeight: 700, fontSize: 14, marginLeft: 5, color: color.colorPrimary }}
                        >
                          fileAttachName.doc
                        </Typography.Text>
                      </Col>
                    </CustomRow>
                  </Col>
                </Row>
                {list.length === index + 1 ? null : <CustomDivider />}
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

const TabDeclined = () => {
  const proposalList = useRecoilValue(proposalListState);
  const search = useRecoilValue(valueSearchState);
  const list = proposalList.filter((item) => {
    return search === ""
      ? item.status === "interview"
      : item.jobs?.title.toLowerCase().includes(search) &&
          item.status === "interview";
  });
  const informationUser = useRecoilValue(profileState);

  const declineProposal = (jobId) => {
    put({
      endpoint: `/proposal/decline/${jobId}`,
    })
      .then((res) => {
        notification.success({
          message: "Đã từ chối",
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const approvedProposal = (jobId) => {
    put({
      endpoint: `/proposal/approve/${jobId}`,
    })
      .then((res) => {
        notification.success({
          message: "Đã duyệt công việc",
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };



  return (
    <>
      <Row>
        {list.length === 0 || list === null ? (
          <Col span={24}>
            <Empty />
          </Col>
        ) : (
          list.map((proposal, index) => {
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
                    <Row justify={"space-between"}>
                      <Col>
                        <Row align={"middle"}>
                          <Col
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: 10,
                              position: "relative",
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                          >
                            <Image
                              width={72}
                              src={informationUser.image}
                              alt="Apofoitisi logo"
                              preview={true}
                              style={{ borderRadius: "50%" }}
                            />
                          </Col>
                          <CustomCol>
                            <Row gutter={10}>
                              <Col>
                                <Typography.Title
                                  level={4}
                                  style={{ margin: 0 }}
                                >
                                  Nguyen Van A
                                </Typography.Title>
                              </Col>
                            </Row>
                          </CustomCol>
                        </Row>
                      </Col>
                      <Col>
                        <Row gutter={[10, 10]}>
                          <Col>
                            <EditInterview/>
                          </Col>
                          <Col>
                          <ButtonPrimary
                              $warning
                              style={{ padding: "10px 20px" }}
                              onClick={() => declineProposal(proposal.jobId)}
                            >
                              Từ chối
                            </ButtonPrimary>
                          </Col>
                          <Col>
                            <ButtonPrimary
                              onClick={() => approvedProposal(proposal.jobId)}
                              style={{
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingBottom: 10,
                                paddingTop: 10,
                              }}
                            >
                              Bắt đầu làm
                            </ButtonPrimary>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Row justify={"space-between"}>
                      <Col>
                        <Row gutter={[0, 10]}>
                          <Col span={24}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {proposal.jobs?.title}
                            </Typography.Title>
                          </Col>
                          <Col span={24}>
                            <Typography.Text style={{ margin: 0 }}>
                              Công ty cổ phần Foody
                            </Typography.Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Typography.Text
                      style={{
                        display: "flex",
                        margin: 0,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      {proposal.description}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <CustomRow align={"middle"}>
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
                {list.length === index + 1 ? null : <CustomDivider />}
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

const EditInterview = ({ proposal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [timeBooking, setTimeBooking] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const clientId = LocalStorageUtils.getItem("profile").id;

  const onChange = (value, dateString) => {
    setTimeBooking(dateString);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const interviewProposal = () => {
    put({
      endpoint: `/proposal/interview/${proposal.jobId}`,
    })
      .then((res) => {
        notification.success({
          message: "Đã cập nhật lịch phỏng vấn!",
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const createAppointment = (values) => {
    const { url } = values;
    post({
      endpoint: `/appointment/`,
      body: {
        location: url,
        link: "https://meet.google.com/xye-stsk-ghs",
        time: timeBooking,
        clientId: clientId,
        proposalId: proposal.id,
      },
    })
      .then((res) => {
        interviewProposal();
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
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ButtonPrimary
        $info
        onClick={showModal}
        style={{
          paddingRight: 20,
          paddingLeft: 20,
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        Sửa thời gian phỏng vấn
      </ButtonPrimary>
      <ModalPrimary
        title={"Chỉnh sửa thông tin"}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="submitProposal"
          initialValues={{
            remember: true,
          }}
        >
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
                    name="url"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input placeholder="Ex: Microsoft" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Typography.Title level={4}>
                    Link phỏng vấn (hoặc địa điểm)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="datetime"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ with: "100%" }}
                      showTime
                      onChange={onChange}
                      onOk={onOk}
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

const AcceptInterview = ({ proposal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [timeBooking, setTimeBooking] = useState('');
  const showModal = () => {

    setIsModalOpen(true);
  };
  const clientId = LocalStorageUtils.getItem("profile").id;

  const onChange = (value, dateString) => {
    setTimeBooking(dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const interviewProposal = () => {
    console.log(proposal.jobId)
    put({
      endpoint: `/proposal/interview/${proposal.jobId}`,
    })
      .then((res) => {
        notification.success({
          message: "Đã cập nhật lịch phỏng vấn!",
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const createAppointment = (values) => {
    const { url } = values;
    post({
      endpoint: `/appointment/`,
      body: {
        location: url,
        link: "https://meet.google.com/xye-stsk-ghs",
        time: timeBooking,
        clientId: clientId,
        proposalId: proposal.id,
      },
    })
      .then((res) => {
        console.log('hello')
        interviewProposal();
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
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ButtonPrimary
        onClick={showModal}
        style={{
          paddingRight: 20,
          paddingLeft: 20,
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        Bắt đầu phỏng vấn
      </ButtonPrimary>
      <ModalPrimary
        title={"Chỉnh sửa thông tin"}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="submitProposal"
          initialValues={{
            remember: true,
          }}
        >
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
                    name="url"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input placeholder="Ex: Microsoft" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Typography.Title level={4}>
                    Link phỏng vấn (hoặc địa điểm)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="datetime"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ with: "100%" }}
                      showTime
                      onChange={onChange}
                      onOk={onOk}
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


const TabApproved = () => {
  const proposalList = useRecoilValue(proposalListState);
  const search = useRecoilValue(valueSearchState);
  const list = proposalList.filter((item) => {
    return search === ""
      ? item.status === "Sent"
      : item.jobs?.title.toLowerCase().includes(search) &&
          item.status === "Sent";
  });
  const informationUser = useRecoilValue(profileState);
 
  useEffect(() => {

  }, [list])
  
  const declineProposal = (jobId) => {
    put({
      endpoint: `/proposal/decline/${jobId}`,
    })
      .then((res) => {
        notification.success({
          message: "Đã từ chôi",
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };



  return (
    <>
      <Row>
        {list.length === 0 || list === null ? (
          <Col span={24}>
            <Empty />
          </Col>
        ) : (
          list.map((proposal, index) => {
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
                    <Row justify={"space-between"}>
                      <Col>
                        <Row align={"middle"}>
                          <Col
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: 10,
                              position: "relative",
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                          >
                            <Image
                              width={72}
                              src={informationUser.image}
                              alt="Apofoitisi logo"
                              preview={true}
                              style={{ borderRadius: "50%" }}
                            />
                          </Col>
                          <CustomCol>
                            <Row gutter={10}>
                              <Col>
                                <Typography.Title
                                  level={4}
                                  style={{ margin: 0 }}
                                >
                                  Nguyen Van A
                                </Typography.Title>
                              </Col>
                            </Row>
                          </CustomCol>
                        </Row>
                      </Col>
                      <Col>
                        <Row gutter={[10, 10]}>
                          <Col>
                            <ButtonPrimary
                              $warning
                              style={{ padding: "10px 20px" }}
                              onClick={() => declineProposal(proposal.jobId)}
                            >
                              Từ chối
                            </ButtonPrimary>
                          </Col>
                          <Col>
                            <AcceptInterview proposal={proposal} />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Row justify={"space-between"}>
                      <Col>
                        <Row gutter={[0, 10]}>
                          <Col span={24}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {proposal.jobs?.title}
                            </Typography.Title>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Typography.Text
                      style={{
                        display: "flex",
                        margin: 0,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      {proposal.description}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <CustomRow align={"middle"}>
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
                {list.length === index + 1 ? null : <CustomDivider />}
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

const contentListNoTitle = {
  Sent: <TabSent />,
  Approved: <TabApproved />,
  Declined: <TabDeclined />,
};

const ProposalsTracking = () => {
  const [activeTabKey2, setActiveTabKey2] = useState('Sent');
  const [, setSearch] = useRecoilState(valueSearchState);
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const { RangePicker } = DatePicker;
  const { Search } = Input;

  const onTab2Change = (key) => {
    setActiveTabKey2(key);
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
            Đề xuất của tôi
          </Typography.Title>
        </Col>
        <Col span={12} style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
          <Search
            placeholder="Tìm kiếm..."
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
          />
        </Col>
        <Col className="trackingJobs" span={24}>
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
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey2}
            onTabChange={onTab2Change}
          >
            {contentListNoTitle[activeTabKey2]}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ProposalsTracking;
