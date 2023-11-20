import {
  Col,
  DatePicker,
  Dropdown,
  Form,
  Image,
  Input,
  Row,
  Typography,
  notification,
} from "antd";
import { ButtonIcon } from "components/customize/GlobalCustomize";
import {
  CustomCard,
  CustomCol,
  CustomDivider,
  CustomRow,
} from "components/customize/Layout";
import { Plus } from "components/icon/Icon";
import React, { useEffect, useState } from "react";
import css from "./profile.module.css";
import { ModalPrimary } from "components/Modal/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, freelancerState } from "recoil/atom";
import { post, put, remove } from "utils/APICaller";
import moment from "moment";
import { formatDate } from "components/formatter/format";
import { Link } from "react-router-dom";
import { EllipsisOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import 'dayjs/locale/vi';

const items = [
  {
    key: "edit",
    label: "Chỉnh sửa",
  },
  {
    key: "remove",
    label: "Xóa",
    danger: true,
  },
];

const AddCertifications = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [issueDate, setIssueDate] = useState();
  const [expirationDate, setExpirationDate] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onIssueDate = (date, dateString) => {
    setIssueDate(dateString);
  };

  const onExpDate = (date, dateString) => {
    setExpirationDate(dateString);
  };

  const addCertificates = (values) => {
    const { name, issuingOrganization, credentialId, credentialUrl } = values;
    post({
      endpoint: `/certificate/`,
      body: {
        name,
        issuingOrganization,
        issueDate,
        expirationDate: expirationDate ? dayjs(expirationDate).format("YYYY-MM-DD") : null,
        credentialId,
        credentialUrl,
        accountId: informationUser.accountId,
      },
    })
      .then((res) => {
        const certificate = res.data;
        setInformationUser({
          ...informationUser,
          certificates: [...informationUser.certificates, certificate],
        });
        notification.success({
          message: "Cập nhật thành công!",
        });
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
        addCertificates(values);
        setIsModalOpen(false);
      })
      .catch((error) => {
        notification.error("Validation failed:", error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Plus />
      </ButtonIcon>
      <ModalPrimary
        title={"Thêm chứng chỉ mới"}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="submitCertificate"
          initialValues={{
            remember: false,
          }}
        >
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Tên chứng chỉ</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="VD: Certified Scrum Master (CSM)"
                      controls={false}
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Tổ chức cấp</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="issuingOrganization"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "40%" }}
                      placeholder="VD: Scrum Alliance"
                      controls={false}
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>

            <Col span={12}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Ngày cấp</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="issueDate"
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
                      showNow={false}
                      format={"YYYY-MM-DD"}
                      onChange={onIssueDate}
                      disabledDate={(current) => {
                        return current && current > moment().endOf("day");
                      }}
                      locale={locale}
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>

            <Col span={12}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Ngày Hết hạn</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item name="expirationDate">
                    <DatePicker
                    timezone="UTC"
                      style={{ with: "100%" }}
                      showNow={false}
                      format={"YYYY-MM-DD"}
                      onChange={onExpDate}
                      disabledDate={(current) => {
                        const issueDate = form.getFieldValue("issueDate");
                        return (
                          !issueDate || (current &&
                            issueDate &&
                            current.isBefore(issueDate.clone().add(30, "days")))
                        );
                      }}
                      locale={locale}

                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>

            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>ID chứng chỉ</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="credentialId"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input placeholder="VD: CSM-123456789A" />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>

            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Đường dẫn chứng chỉ</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="credentialUrl"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input placeholder="VD: https://certificate.com/csm-123456789a" />
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

const HeaderSection = () => {
  const auth = useRecoilValue(authState);

  return (
    <Row justify={"space-between"} style={{ padding: 25 }}>
      <Col>
        <Row>
          <CustomCol>
            <Typography.Title level={3} style={styles.titleHeader}>
              Chứng chỉ
            </Typography.Title>
          </CustomCol>
        </Row>
      </Col>
      {auth.role === "freelancer" ? (
        <Col>
          <AddCertifications />
        </Col>
      ) : null}
    </Row>
  );
};

const BodySection = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalRemove, setIsModalRemove] = useState(false);
  const [isIdItem, setIsIdItem] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [issueDate, setIssueDate] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const [form] = Form.useForm();
  const auth = useRecoilValue(authState);


  useEffect(() => {
    setCertificates(informationUser.certificates);
  }, [informationUser]);

  const onIssueDate = (date, dateString) => {
    setIssueDate(dateString);
  };

  const onExpDate = (date, dateString) => {
    if (dateString === "") {
      return setExpirationDate(null);
    } else {
      setExpirationDate(dateString);
    }
  };

  const onClick = (id, key) => {
    const checkAction = key.toString();
    if (checkAction.includes("remove")) {
      setIsIdItem(id);
      setIsModalRemove(true);
    } else if (checkAction.includes("edit")) {
      setIsIdItem(id);
      const item = certificates.find((c) => c.id === id);
      if (item) {
        form.setFieldsValue({
          name: item.name,
          issuingOrganization: item.issuingOrganization,
          issueDate: dayjs(item.issueDate),
          expirationDate: item.expirationDate
            ? dayjs(item.expirationDate)
            : null,
          credentialId: item.credentialId,
          credentialUrl: item.credentialUrl,
        });
      }
      setIsModalEdit(true);
    }
  };

  const handleRemove = () => {
    remove({
      endpoint: `/certificate/detail/${isIdItem}`,
    })
      .then((res) => {
        setInformationUser({
          ...informationUser,
          certificates: informationUser.certificates.filter(
            (certificate) => certificate.id !== isIdItem
          ),
        });
        notification.success({
          message: res.data,
        });
        setIsIdItem(null);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
    setIsModalRemove(false);
  };

  const handleCancelRemove = () => {
    setIsModalRemove(false);
  };

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        const {name, issuingOrganization, credentialId, credentialUrl} = values;
        const newCertificate = {
          id: isIdItem,
          name,
          issuingOrganization,
          issueDate: dayjs(issueDate).format('YYYY-MM-DD'),
          expirationDate: expirationDate ? dayjs(expirationDate).format("YYYY-MM-DD") : null,
          credentialId,
          credentialUrl,
        };
        put({
          endpoint: `/certificate/detail/${isIdItem}`,
          body: {
            name,
            issuingOrganization,
            issueDate: dayjs(issueDate).format("YYYY-MM-DD"),
            expirationDate: expirationDate ? dayjs(expirationDate).format("YYYY-MM-DD") : null,
            credentialId,
            credentialUrl,
          },
        })
          .then((res) => {
            const item = certificates.map((c) => {
              if (c.id === isIdItem) {
                return newCertificate;
              } else {
                return c;
              }
            });
            setCertificates(item);
            notification.success({
              message: "Cập nhật thành công!",
            });
            setIsModalEdit(false);
            setIsIdItem(null);
          })
          .catch((error) => {
            notification.error({
              message: error.response.data.message,
            });
          });
      })
      .catch((error) => {
        notification.error("Validation failed:", error);
      });
    
  };

  const handleCancelEdit = () => {
    setIsModalEdit(false);
    setIsIdItem(null);
  };

  return (
    <Row style={{ marginRight: 30, marginLeft: 30 }}>
      {certificates.map((certificate, index) => (
        <div key={certificate.id} style={{ width: "100%" }}>
          <Col span={24}>
            <Row
              className={css.certificate}
              style={{ padding: "20px 30px" }}
              align={"middle"}
            >
              <Col span={0} sm={{ span: 4 }} style={{ paddingRight: 20 }}>
                <Link to={certificate.credentialUrl} target="_blank">
                  <Image
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/fpt-sep-fe-eb227.appspot.com/o/resources%2Fimage%2Fcertificate-1.png?alt=media&token=c69c8ae7-24df-4b50-92fa-37b5cc9439e1"
                    }
                    preview={false}
                    alt="certificate"
                  />
                </Link>
              </Col>
              <Col span={24} sm={{ span: 20 }}>
                <Row>
                  <Col span={23}>
                    <CustomRow>
                      <Col span={24}>
                        <Link to={certificate.credentialUrl} target="_blank">
                          <Typography.Title level={3} style={{ margin: 0 }}>
                            {certificate.name}
                          </Typography.Title>
                        </Link>
                      </Col>
                      <Col span={24}>
                        <Typography.Text>
                          Tổ chức: {certificate.issuingOrganization}
                        </Typography.Text>
                      </Col>
                      <Col span={24}>
                        <Typography.Text>
                          Ngày phát hành: {formatDate(certificate.issueDate)}
                        </Typography.Text>
                      </Col>
                      <Col
                        span={24}
                        style={{
                          display: certificate.expirationDate
                            ? "block"
                            : "none",
                        }}
                      >
                        <Typography.Text>
                          Ngày hết hạn: {formatDate(certificate.expirationDate)}
                        </Typography.Text>
                      </Col>
                    </CustomRow>
                  </Col>
                  {auth.role === "freelancer" ? (
                    <Col
                      span={1}
                      style={{ display: "flex", alignItems: "flex-start" }}
                    >
                      <Dropdown
                        menu={{
                          items,
                          onClick: ({ key }) => {
                            onClick(certificate.id, key);
                          },
                        }}
                      >
                        <EllipsisOutlined />
                      </Dropdown>
                    </Col>
                  ) : null}
                </Row>
              </Col>
            </Row>
          </Col>
          {certificates.length === index + 1 ? null : (
            <CustomDivider $primary />
          )}
        </div>
      ))}
      <ModalPrimary
        title="Cảnh báo"
        open={isModalRemove}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleRemove}
        onCancel={handleCancelRemove}
        okText="Xóa"
        okType="danger"
      >
        Bạn có chắc muốn xóa chứng chỉ này?
      </ModalPrimary>

      <ModalPrimary
        title={"Chỉnh sửa chứng chỉ"}
        open={isModalEdit}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleEdit}
        onCancel={handleCancelEdit}
      >
        <Form
          form={form}
          name="editCertificate"
          initialValues={{
            remember: true,
          }}
        >
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Tên chứng chỉ</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item name="name">
                    <Input
                      placeholder="VD: Certified Scrum Master (CSM)"
                      controls={false}
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Tổ chức cấp</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="issuingOrganization"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "40%" }}
                      placeholder="VD: Scrum Alliance"
                      controls={false}
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={12}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Ngày cấp</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="issueDate"
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
                      showNow={false}
                      format={"YYYY-MM-DD"}
                      onChange={onIssueDate}
                      disabledDate={(current) => {
                        return current && current.isAfter(dayjs().endOf("day"));
                      }}
                      locale={locale}
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={12}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Ngày Hết hạn</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="expirationDate"
                    rules={[
                      {
                        validator: async (_, value) => {
                          const issueDate = form.getFieldValue("issueDate");
                          if (!issueDate) {
                            return Promise.reject(
                              new Error("Vui lòng chọn ngày phát hành")
                            );
                          }

                          if (value || null) {
                            if (
                              value.isBefore(issueDate.clone().add(30, "days"))
                            ) {
                              return Promise.reject(
                                new Error(
                                  "Ngày hết hạn phải cách cấp ít nhất 30 ngày"
                                )
                              );
                            }
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <DatePicker
                      timezone="UTC"
                      style={{ with: "100%" }}
                      showNow={false}
                      format={"YYYY-MM-DD"}
                      onChange={onExpDate}
                      disabledDate={(current) => {
                        const issueDate = form.getFieldValue("issueDate");
                        return (
                          !issueDate ||
                          (current &&
                            issueDate &&
                            current.isBefore(issueDate.clone().add(30, "days")))
                        );
                      }}
                      locale={locale}
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>ID chứng chỉ</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="credentialId"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Không được để trống ô này!",
                    //   },
                    // ]}
                  >
                    <Input placeholder="VD: CSM-123456789A" />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Đường dẫn chứng chỉ</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="credentialUrl"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Không được để trống ô này!",
                    //   },
                    // ]}
                  >
                    <Input placeholder="VD: https://certificate.com/csm-123456789a" />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Form>
      </ModalPrimary>
    </Row>
  );
};

const Certificates = () => {
  return (
    <>
      <CustomCard style={{ padding: 0 }}>
        <HeaderSection />
        <BodySection />
      </CustomCard>
    </>
  );
};

const styles = {
  titleHeader: {
    margin: 0,
  },

  address: {
    color: "#656565",
    paddingLeft: 10,
    marginBottom: 20,
  },
};

export default Certificates;
