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
} from "antd";
import {
  CustomCol,
  CustomDivider,
  CustomRow,
} from "components/customize/Layout";
import { PaperClipOutlined } from "components/icon/Icon";
import React, { useEffect, useState } from "react";
import color from "styles/color";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState, proposalListState, valueSearchState } from "recoil/atom";
import { ButtonPrimary } from "components/customize/GlobalCustomize";
import { Link } from "react-router-dom";
import { ModalPrimary } from "components/Modal/Modal";
import { get, post, put } from "utils/APICaller";
import LocalStorageUtils from "utils/LocalStorageUtils";
import { EllipsisOutlined } from "@ant-design/icons";
import moment from "moment";
import { checkIfIsUrl } from "components/formatter/format";

const tabList = [
  {
    key: "Sent",
    label: "Được gửi đến",
  },
  {
    key: "interview",
    label: "Phỏng vấn",
  },
];

const sentItems = [
  {
    key: "interview",
    label: "Phỏng vấn",
  },
  {
    key: "decline",
    label: "Từ chối",
    danger: true,
  },
];

const interviewItems = [
  {
    key: "edit",
    label: "Chỉnh sửa lịch hẹn",
  },
  {
    key: "accept",
    label: "Bắt đầu làm",
  },
  {
    key: "decline",
    label: "Từ chối",
    danger: true,
  },
];

const EditInterview = ({ isModalEdit, setIsModalEdit, proposal }) => {
  const [form] = Form.useForm();
  const [timeBooking, setTimeBooking] = useState("");

  const clientId = LocalStorageUtils.getItem("profile").id;

  const onChange = (value, dateString) => {
    setTimeBooking(dateString);
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
    const { address } = values;
    const location = checkIfIsUrl(address) ? null : address;
    const link = checkIfIsUrl(address) ? address : null;
    post({
      endpoint: `/appointment/`,
      body: {
        location,
        link,
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
        setIsModalEdit(false);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleCancel = () => {
    setIsModalEdit(false);
  };

  return (
    <>
      <ModalPrimary
        title={"Chỉnh sửa lịch hẹn"}
        open={isModalEdit}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="editInterview"
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
                    name="address"
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
                    Thời gian phỏng vấn
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="editDatetime"
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
                      showNow={false}
                      onChange={onChange}
                      disabledDate={(current) => {
                        return current && current < moment().endOf("day");
                      }}
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

const Interview = ({ isModalInterview, setIsModalInterview, proposal }) => {
  const [form] = Form.useForm();
  const [timeBooking, setTimeBooking] = useState("");
  const clientId = LocalStorageUtils.getItem("profile").id;

  const onChange = (value, dateString) => {
    setTimeBooking(dateString);
  };

  const interviewProposal = () => {
    put({
      endpoint: `/proposal/interview/${proposal.id}`,
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
        setIsModalInterview(false);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  const handleCancel = () => {
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
        <Form
          form={form}
          name="bookInterview"
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
                    Thời gian phỏng vấn
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

const DeclineInterview = ({ isModalDecline, setIsModalDecline, proposal }) => {
  
  const declineInterview = () => {
    put({
      endpoint: `/proposal/decline/${proposal.jobId}`,
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


  const handleOk = () => {
    setIsModalDecline(false);
  };

  const handleCancel = () => {
    setIsModalDecline(false);
  };

  return (
    <>
      <ModalPrimary
        title="Từ chối"
        open={isModalDecline}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Từ chối"
        okType="danger"
      >
        Bạn có chắc muốn từ chối hồ sơ này?
      </ModalPrimary>
    </>
  );
};

const AcceptInterview = ({ isModalDecline, setIsModalDecline, proposal }) => {

  const handleOk = () => {
    setIsModalDecline(false);
  };

  const handleCancel = () => {
    setIsModalDecline(false);
  };

  return (
    <>
      <ModalPrimary
        title="Tuyển dụng"
        open={isModalDecline}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Từ chối"
        okType="danger"
      >
        Bạn có chắc muốn tuyển dụng hồ sơ này?
      </ModalPrimary>
    </>
  );
};

const TabSent = ({ activeTabKey }) => {
  const [proposalList, setProposalList] = useState([]);
  const search = useRecoilValue(valueSearchState);
  const [list, setList] = useState([]);
  const [ellipsis, setEllipsis] = useState(true);
  const [isModalInterview, setIsModalInterview] = useState(false);
  const [isModalDecline, setIsModalDecline] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalAccept, setIsModalAccept] = useState(false);
  const [isIdItem, setIsIdItem] = useState(null);
  const client= LocalStorageUtils.getItem('profile');


  useEffect(() => {
    getProposals();
  }, []);


  useEffect(() => {
    console.log('helo')
    const filtered = proposalList.filter((item) => {
      if (activeTabKey === "Sent") {
        return search === ""
          ? item.status === "Sent"
          : item.jobs?.title.toLowerCase().includes(search) &&
              item.status === "Sent";
      } else if (activeTabKey === "interview") {
        return search === ""
          ? item.status === "interview"
          : item.jobs?.title.toLowerCase().includes(search) &&
              item.status === "interview";
      }
      return true;
    });
    setList(filtered);
  }, [search, activeTabKey, proposalList]);

  const getProposals = async () => {
    get({ endpoint: `/proposal/client/${client.id}` })
      .then((response) => {
        const data = response.data;
        let proposals = data.filter((proposal) => proposal.jobId !== null && proposal.jobs !== null);
        setProposalList(proposals);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClick = ({ key }) => {
    const checkAction = key.toString();
    if (checkAction.includes("decline")) {
      const itemId = checkAction.replace("decline_", "");
      setIsIdItem(itemId);
      setIsModalDecline(true);
    } else if (checkAction.includes("interview")) {
      const itemId = checkAction.replace("interview", "");
      setIsIdItem(itemId);
      setIsModalInterview(true);
    } else if (checkAction.includes("edit")) {
      const itemId = checkAction.replace("edit_", "");
      setIsIdItem(itemId);
      setIsModalEdit(true);
    } else if (checkAction.includes("accept")) {
      const itemId = checkAction.replace("accept_", "");
      setIsIdItem(itemId);
      setIsModalAccept(true);
    }
  };

  return (
    <Row>
      {list.length === 0 || list === null ? (
        <Col span={24}>
          <Empty />
        </Col>
      ) : (
        list?.map((proposal, index) => {
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
                            src={proposal?.freelancers.accounts.image}
                            alt="Apofoitisi logo"
                            preview={true}
                            style={{ borderRadius: "50%" }}
                          />
                        </Col>
                        <CustomCol>
                          <Row gutter={10}>
                            <Col>
                              <Link to="/client/proposals/freelancer-profile">
                                <Typography.Title
                                  level={4}
                                  style={{ margin: 0 }}
                                >
                                  {proposal?.freelancers.accounts.name}
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
                            activeTabKey === "Sent"
                              ? sentItems.map((item) => ({
                                  ...item,
                                  key: item.key + "_" + proposal.id.toString(),
                                }))
                              : interviewItems.map((item) => ({
                                  ...item,
                                  key: item.key + "_" + proposal.id.toString(),
                                })),
                          onClick,
                        }}
                      >
                        <EllipsisOutlined />
                      </Dropdown>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Row justify={"space-between"}>
                    <Col>
                      <Row gutter={[0, 10]}>
                        <Col span={24}>
                          <Link to={`/jobs/job-detail/${proposal.id}`}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {proposal.jobs?.title}
                            </Typography.Title>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Link to={`/jobs/job-detail/${proposal?.id}`}>
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
                      {proposal.description}
                    </Typography.Paragraph>
                  </Link>
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
              <CustomDivider />
              <Interview
                  isModalInterview={isModalInterview}
                  setIsModalInterview={setIsModalInterview}
                  proposal={proposal}
                />
                <EditInterview
                  isModalEdit={isModalEdit}
                  setIsModalEdit={setIsModalEdit}
                  proposal={proposal}
                />
              <DeclineInterview
                isModalDecline={isModalDecline}
                setIsModalDecline={setIsModalDecline}
              />
              <AcceptInterview
                  isModalAccept={isModalAccept}
                  setIsModalAccept={setIsModalAccept}
                  proposal={proposal}
                />
            </Col>
          );
        })
      )}
      {/* <Pagination
            total={list.length}
            onChange={onChange}
            showSizeChanger={false}
            style={{ padding: 20, display: 'flex', justifyContent: 'center' }}
          /> */}
    </Row>
  );
};

const ProposalsTracking = () => {
  const [activeTabKey, setActiveTabKey] = useState("Sent");
  const [, setSearch] = useRecoilState(valueSearchState);
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
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 7;
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
          <Typography.Title level={3} style={{ margin: "20px 30px 10px" }}>
            Đề xuất của tôi
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
            placeholder="Tìm kiếm..."
            allowClear
            onSearch={onSearch}
            style={{
              width: "100%",
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
            display: "flex",
            justifyContent: "flex-end",
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
            format={"DD/MM/YYYY"}
            onOpenChange={onOpenChange}
            changeOnBlur
          />
        </Col>
        <Col className="trackingJobs" span={24}>
          <Card
            style={{
              width: "100%",
              border: "transparent",
            }}
            headStyle={{
              color: color.colorBlack,
              fontWeight: "bold",
              paddingLeft: 30,
              paddingRight: 30,
              margin: "10px 0",
              borderBottom: "0.5px solid #000 !important",
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

export default ProposalsTracking;
