import { DownOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  List,
  Radio,
  Row,
  Select,
  Skeleton,
  Typography,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { ModalPrimary } from "components/Modal/Modal";
import {
  ButtonIcon,
  ButtonPrimary,
} from "components/customize/GlobalCustomize";
import {
  CustomCard,
  CustomCol,
  CustomDivider,
  CustomRow,
} from "components/customize/Layout";
import { Flag, Pen, Plus, Trash } from "components/icon/Icon";
import React, { useEffect, useState } from "react";
import color from "styles/color";
import css from "./profile.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  applicationListState,
  authState,
  freelancerState,
  profileState,
} from "recoil/atom";
import { get, post, put, remove } from "utils/APICaller";
import { formatDate } from "components/formatter/format";

const EditPersonalInformation = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const updateFreelancerInfo = (values) => {
    const { phone, address } = values;
    put({
      endpoint: `/freelancer/basicInfo/${informationUser.id}`,
      body: {
        phone: phone,
        address: address,
      },
    })
      .then((res) => {
        setInformationUser({
          ...informationUser,
          accounts: {
            ...informationUser.accounts,
            phone,
            address,
          },
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
        updateFreelancerInfo(values);
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
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={"Chỉnh sửa thông tin"}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="submitInformation"
          initialValues={{
            remember: true,
            phone: informationUser.accounts.phone,
            address: informationUser.accounts.address,
          }}
        >
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Số điện thoại</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='phone'
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                      {
                        pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                        message: "Số điện thoại không hợp lệ!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "40%" }}
                      prefix={<Flag />}
                      placeholder="0123456789"
                      controls={false}
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Địa chỉ</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='address'
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input placeholder='Địa chỉ' />
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

const EditWorkingTime = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const hoursPerWeekOptions = [
    { label: "Nhiều hơn 30h / tuần", value: 1 },
    { label: "Ít hơn 30h / tuần", value: 2 },
    { label: "Có mặt khi yêu cầu", value: 3 },
    { label: "Không có giới hạn", value: 4 },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const hoursPerWeek = hoursPerWeekOptions.find(
      (item) => item.value === value
    ).label;
    put({
      endpoint: `/freelancer/hoursPerWeek/${informationUser.id}`,
      body: {
        hoursPerWeek,
      },
    })
      .then((res) => {
        setInformationUser({
          ...informationUser,
          hoursPerWeek,
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={"Khả dụng"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  Thời gian làm mỗi tuần
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Typography.Text>
                  Biết cường độ làm việc có thể giúp bạn tìm được công việc phù
                  hợp.
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Tôi có thể bỏ ra
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Row>
                  <Radio.Group onChange={onChange} value={value}>
                    {hoursPerWeekOptions.map((item) => (
                      <Col key={item.value} span={24} style={{ padding: 5 }}>
                        <Radio value={item.value}>{item.label}</Radio>
                      </Col>
                    ))}
                  </Radio.Group>
                </Row>
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};
const languagesItems = [
  { value: "1", label: "Cơ Bản" },
  { value: "2", label: "Trung cấp" },
  { value: "3", label: "Thông thạo" },
];

const AddLanguage = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const auth = useRecoilValue(authState);

  const getFreelancer = () => {
    get({ endpoint: `/freelancer/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        setInformationUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const level = languagesItems.find(
          (item) => item.value === values.level
        ).label;
        const { name } = values;
        post({
          endpoint: `/freelancer/languages/${informationUser.id}`,
          body: {
            name,
            level,
          },
        })
          .then((res) => {
            getFreelancer();
            notification.success({
              message: res.data,
            });
            setIsModalOpen(false);
          })
          .catch((error) => {
            notification.error({
              message: error.response.data.message,
            });
          });
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
      <ButtonIcon onClick={showModal}>
        <Plus />
      </ButtonIcon>
      <ModalPrimary
        title={"Thêm ngôn ngữ"}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name="addLanguage" initialValues={{ level: "2" }}>
          <Row gutter={[0, 10]}>
            <Col span={12}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Ngôn ngữ</Typography.Text>
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
                    <Input placeholder="VD: Tiếng Anh" />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={12}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Trình độ</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item name="level">
                    <Select
                      style={{ width: 120 }}
                      suffixIcon={<DownOutlined />}
                      placement="bottomLeft"
                      options={languagesItems}
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

const EditLanguages = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [languages, setLanguages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const auth = useRecoilValue(authState);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getFreelancer = () => {
    get({ endpoint: `/freelancer/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        setInformationUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLanguageChange = (changedValues, allValues) => {
    const changedField = Object.keys(changedValues)[0];
    const id = changedField.replace("language", "").replace("level", "");
    const name = allValues[`language${id}`];
    let level = allValues[`level${id}`];
    const getLevel = (level, languagesItems) => {
      const item = languagesItems.find((item) => item.value === level);
      return item ? item.label : level;
    };
    level = getLevel(level, languagesItems);
    const obj = { id, name, level };
    const index = languages.findIndex((o) => o.id === id);
    if (index === -1) {
      setLanguages((prevList) => [...prevList, obj]);
    } else {
      setLanguages((prevList) =>
        prevList.map((o, i) => (i === index ? obj : o))
      );
    }
  };

  const handleDeleteLanguage = (languageId) => {
    remove({
      endpoint: `/freelancer/language/${languageId}`,
    })
      .then((res) => {
        getFreelancer();
        notification.success({
          message: res.data,
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
        put({
          endpoint: `/freelancer/languages/${informationUser.id}`,
          body: {
            languages,
          },
        })
          .then((res) => {
            getFreelancer();
            notification.success({
              message: res.data,
            });
            setIsModalOpen(false);
          })
          .catch((error) => {
            notification.error({
              message: error.response.data.message,
            });
          });
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
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={"Chỉnh sửa ngôn ngữ"}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onValuesChange={handleLanguageChange}
          name="editLanguage"
          initialValues={{ remember: false }}
        >
          <Row>
            <Col span={24}>
              <CustomRow gutter={[10, 10]}>
                <Col span={12}>
                  <Typography.Text>Ngôn ngữ</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text>Trình độ</Typography.Text>
                </Col>
              </CustomRow>
            </Col>
            {informationUser?.language.map((item) => {
              return (
                <Col key={item.id} span={24}>
                  <CustomRow gutter={[10, 10]}>
                    <Col span={12}>
                      <Form.Item
                        name={`language${item.id}`}
                        initialValue={item.name}
                        rules={[
                          {
                            required: true,
                            message: "Không được để trống ô này!",
                          },
                        ]}
                      >
                        <Input placeholder="VD: Tiếng Anh" />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        name={`level${item.id}`}
                        initialValue={item.level}
                      >
                        <Select
                          style={{ width: 120 }}
                          suffixIcon={<DownOutlined />}
                          placement="bottomLeft"
                          options={languagesItems}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      span={2}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                      }}
                    >
                      {informationUser?.language.length > 1 && (
                        <ButtonIcon
                          onClick={() => handleDeleteLanguage(item.id)}
                          style={{
                            backgroundColor: color.colorWhite,
                            border: `1px solid ${color.colorDeactivate}`,
                          }}
                        >
                          <Trash color={"#eb4335"} />
                        </ButtonIcon>
                      )}
                    </Col>
                  </CustomRow>
                </Col>
              );
            })}
          </Row>
        </Form>
      </ModalPrimary>
    </>
  );
};

const EditMajor = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const major = value;
    put({
      endpoint: `/freelancer/major/${informationUser.id}`,
      body: {
        major,
      },
    })
      .then((res) => {
        setInformationUser({
          ...informationUser,
          major,
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

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Plus />
      </ButtonIcon>
      <ModalPrimary
        title={"Chuyên ngành"}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Input
                  onChange={onChange}
                  style={{ width: "100%" }}
                  placeholder="Nhập chuyên ngành của bạn tại đây ..."
                />
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};

const EditIntroduction = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { title, introduction } = values;
        put({
          endpoint: `/freelancer/introduction/${informationUser.id}`,
          body: {
            title,
            introduction,
          },
        })
          .then((res) => {
            setInformationUser({
              ...informationUser,
              title,
              introduction,
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

        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={"Giới thiệu"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name='submitApplication'
          initialValues={{
            remember: true,
            title: informationUser.title,
            introduction: informationUser.introduction,
          }}
        >
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Chuyên môn
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='title'
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input placeholder='Software Engineer | Javascript' />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Mô tả bản thân
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    className='introText'
                    name='introduction'
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      allowClear={true}
                      maxLength={1000}
                      style={{
                        height: 120,
                        resize: "none",
                      }}
                      onChange={onChange}
                      placeholder='textarea'
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

const EditSkills = ({ skillList, setSkillList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [skills, setSkills] = useState([]);
  const [value, setValue] = useState([]);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    fetchSkills();
  }, []);

  const getFreelancer = () => {
    get({ endpoint: `/freelancer/profile/${auth.id}` })
      .then((response) => {
        const data = response.data;
        setInformationUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setValue(skillList.map((item) => item.name));
  }, [skillList]);

  const fetchSkills = () => {
    get({ endpoint: `/skill/` })
      .then((response) => {
        const data = response.data;
        setSkills(data);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    put({
      endpoint: `/freelancer/skills/${informationUser.id}`,
      body: {
        skill: value,
      },
    })
      .then((res) => {
        let updatedSkillList = [...skillList];
        updatedSkillList = updatedSkillList.filter((skill) =>
          value.includes(skill.name)
        );
        const missingSkills = value.filter(
          (skill) => !updatedSkillList.some((s) => s.name === skill)
        );
        missingSkills.forEach((skill) => {
          updatedSkillList.push({ name: skill, level: "Cơ bản" });
        });
        setSkillList(updatedSkillList);
        getFreelancer();
        notification.success({
          message: res.data,
        });
        setIsModalOpen(false);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const selectProps = {
    mode: "multiple",
    size: "large",
    value,
    options: skills?.map((item) => ({ label: item.name, value: item.name })),
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: "Nhập hoặc chọn kĩ năng",
    tokenSeparators: [","],
    maxTagCount: "responsive",
  };

  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={"Kỹ năng chuyên môn"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Text>
                  Hãy nhập những kỹ năng bạn có để được đề xuất công việc phù
                  hợp nhất.
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Select {...selectProps} />
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};

const EditNameAvatar = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { name, image } = values;
        put({
          endpoint: `/freelancer/nameImage/${informationUser.id}`,
          body: {
            name,
            image,
          },
        })
          .then((res) => {
            setInformationUser({
              ...informationUser,
              accounts: {
                ...informationUser.accounts,
                name,
                image,
              },
            });
            notification.success({
              message: res.data,
            });
          })
          .catch((error) => {
            notification.error({
              message: error.response.data.message,
            });
          });

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
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={"Thông tin cơ bản"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="submitNameAvatar"
          initialValues={{
            remember: true,
            name: informationUser.accounts.name,
            image: informationUser.accounts.image,
          }}
        >
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Họ và tên
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input placeholder='Nguyen Van A' />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Avatar
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='image'
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống ô này!",
                      },
                    ]}
                  >
                    <Input placeholder='URL' />
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
  const informationUser = useRecoilValue(freelancerState);

  return (
    <Row justify={"space-between"} style={{ padding: 25 }}>
      <Col>
        <Row>
          <Col
            style={{ display: "flex", alignItems: "center", marginRight: 10 }}
          >
            <Image
              width={72}
              src={informationUser.accounts.image}
              alt='Apofoitisi logo'
              preview={true}
              style={{ borderRadius: "50%" }}
            />
          </Col>
          <CustomCol
            style={{ display: "flex", alignItems: "center", marginRight: 10 }}
          >
            <Row gutter={10}>
              <Col>
                <Typography.Title level={2} style={styles.nameUser}>
                  {informationUser.accounts.name != null &&
                  informationUser.accounts.name !== "" ? (
                    informationUser.accounts.name
                  ) : (
                    <Skeleton.Input size={"large"} />
                  )}
                </Typography.Title>
              </Col>
              <Col>
                <EditNameAvatar />
              </Col>
            </Row>
          </CustomCol>
        </Row>
      </Col>
      <Col className={css.btnSubmitCV}>
        <Row gutter={[20, 0]}>
          <Col>
            <ButtonPrimary
              $primary
              style={{ border: `1px solid ${color.colorDeactivate}` }}
            >
              Nộp CV/Resume
            </ButtonPrimary>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const BodySectionLeft = () => {
  const informationUser = useRecoilValue(freelancerState);

  return (
    <Col
      span={0}
      sm={{ span: 8 }}
      style={{ borderRight: "1px solid #656565", padding: "30px 20px" }}
    >
      <Row gutter={[0, 10]}>
        <Col>
          <Row gutter={[0, 10]}>
            <Col>
              <Row align={"middle"} gutter={[30, 10]}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    Thông tin cá nhân
                  </Typography.Title>
                </Col>
                <Col>
                  <EditPersonalInformation />
                </Col>
              </Row>
            </Col>
            <CustomCol span={24}>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={"middle"} gutter={[30, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Số điện thoại
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ letterSpacing: 1 }}>
                    {" "}
                    {informationUser.accounts.phone != null &&
                    informationUser.accounts.phone !== ""
                      ? informationUser.accounts.phone
                      : "Chưa có thông tin"}
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol span={24}>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={"middle"} gutter={[30, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Địa chỉ
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    {informationUser.accounts.address != null &&
                    informationUser.accounts.address !== ""
                      ? informationUser.accounts.address
                      : "Chưa có thông tin"}
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
        <Col>
          <Row gutter={[0, 10]}>
            <Col>
              <Row align={"middle"} gutter={[30, 10]}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    Thông tin công việc
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={"middle"} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Thời gian làm mỗi tuần
                      </Typography.Title>
                    </Col>
                    <Col>
                      <EditWorkingTime />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Text>
                    {informationUser.hoursPerWeek != null &&
                    informationUser.hoursPerWeek !== ""
                      ? informationUser.hoursPerWeek
                      : "Chưa có thông tin"}
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={"middle"} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Ngôn ngữ
                      </Typography.Title>
                    </Col>
                    <Col>
                      <AddLanguage />
                    </Col>
                    <Col>
                      <EditLanguages />
                    </Col>
                  </Row>
                </Col>
                {informationUser?.language.map((language) => (
                  <Col key={language.id} span={24}>
                    <Typography.Text>
                      <Typography.Text strong style={{ marginRight: 20 }}>
                        {language.name}:
                      </Typography.Text>
                      {language.level}
                    </Typography.Text>
                  </Col>
                ))}
              </Row>
            </CustomCol>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={"middle"} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Chuyên ngành
                      </Typography.Title>
                    </Col>
                    <Col>
                      <EditMajor />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Text>
                    {informationUser.major != null &&
                    informationUser.major !== ""
                      ? informationUser.major
                      : "Chưa có thông tin"}
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

const BodySectionLeftResponsive = () => {
  const informationUser = useRecoilValue(profileState);

  return (
    <Col
      span={24}
      sm={{ span: 0 }}
      style={{
        borderRight: "1px solid #656565",
        padding: "30px 20px",
        marginBottom: 30,
        boxShadow: "2px 6px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: 20,
        backgroundColor: color.colorWhitegq,
      }}
    >
      <Row gutter={[0, 10]}>
        <Col>
          <Row gutter={[0, 10]}>
            <Col>
              <Row align={"middle"} gutter={[30, 10]}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    Thông tin cá nhân
                  </Typography.Title>
                </Col>
                <Col>
                  <EditPersonalInformation />
                </Col>
              </Row>
            </Col>
            <CustomCol span={24}>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={"middle"} gutter={[30, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Số điện thoại
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ letterSpacing: 1 }}>
                    {informationUser.phone}
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol span={24}>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={"middle"} gutter={[30, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Địa chỉ
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>{informationUser.address}</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
        <Col>
          <Row gutter={[0, 10]}>
            <Col>
              <Row align={"middle"} gutter={[30, 10]}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0 }}>
                    Thông tin công việc
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col span={24}>
                  <Row align={"middle"} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Thời gian làm mỗi tuần
                      </Typography.Title>
                    </Col>
                    <Col>
                      <EditWorkingTime />
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>More than 30hrs/weeks</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col span={24}>
                  <Row align={"middle"} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Ngôn ngữ
                      </Typography.Title>
                    </Col>
                    <Col>
                      <AddLanguage />
                    </Col>
                    <Col>
                      <EditLanguages />
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    <Typography.Text strong style={{ marginRight: 20 }}>
                      Tiếng Anh:
                    </Typography.Text>
                    Giao tiếp
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    <Typography.Text strong style={{ marginRight: 20 }}>
                      Tiếng Nhật:
                    </Typography.Text>
                    Giao tiếp
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            {/* Left 3 */}
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col span={24}>
                  <Row align={"middle"} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Chuyên ngành
                      </Typography.Title>
                    </Col>
                    <Col>
                      <ButtonIcon>
                        <Plus />
                      </ButtonIcon>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    Kỹ thuật phần mềm · (2019 - 2023)
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

const BodySectionRight = () => {
  const informationUser = useRecoilValue(freelancerState);
  const applications = useRecoilValue(applicationListState);
  const [isModalLevel, setIsModalLevel] = useState(false);
  const [value, setValue] = useState(1);
  const [skillList, setSkillList] = useState([]);
  const [idSkill, setIdSkill] = useState(null);

  const levelOptions = [
    { label: "Cơ bản", value: 1 },
    { label: "Trung cấp", value: 2 },
    { label: "Thông thạo", value: 3 },
  ];

  useEffect(() => {
    setSkillList(
      informationUser?.skills.map((item) => ({
        id: item.freelancerskill.freelancerSkillId,
        name: item.name,
        level: item.freelancerskill.level,
      }))
    );
  }, [informationUser]);

  const handleModaLevel = () => {
    const level = levelOptions.find((item) => item.value === value).label;
    put({
      endpoint: `/freelancer/skill/${idSkill}`,
      body: {
        level,
      },
    })
      .then((res) => {
        const updatedSkillList = [...skillList];
        const skillIndex = updatedSkillList.findIndex(
          (skill) => skill.id === idSkill
        );
        updatedSkillList[skillIndex].level = level;
        setSkillList(updatedSkillList);
        notification.success({
          message: res.data,
        });
        setIdSkill(null);
        setIsModalLevel(false);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const handleModalLevelCancel = () => {
    setIdSkill(null);
    setIsModalLevel(false);
  };

  const onLevelChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Col span={24} sm={{ span: 16 }}>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={"middle"}>
                <Col>
                  <Typography.Title
                    level={3}
                    style={{ margin: 0, paddingRight: 30 }}
                  >
                    {informationUser.title != null &&
                    informationUser.title !== ""
                      ? informationUser.title
                      : "Chưa có thông tin"}
                  </Typography.Title>
                </Col>
                <Col>
                  <EditIntroduction />
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Typography.Text>
                {informationUser.introduction != null &&
                informationUser.introduction !== ""
                  ? informationUser.introduction
                  : "Chưa có thông tin"}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <CustomDivider $primary />
        <Col span={24}>
          <Row>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={"middle"}>
                <Col>
                  <Typography.Title
                    level={4}
                    style={{ margin: 0, paddingRight: 30 }}
                  >
                    Kỹ năng
                  </Typography.Title>
                </Col>
                <Col>
                  <EditSkills
                    skillList={skillList}
                    setSkillList={setSkillList}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Row className='skillArticle' gutter={[0, 10]}>
                <CustomCol span={24}>
                  <List
                    style={{ overflowX: "auto" }}
                    grid={{
                      gutter: 15,
                    }}
                    dataSource={skillList?.map((item) => ({
                      title: `${item.name} - ${item.level}`,
                      level: item.level,
                      id: item.id,
                    }))}
                    renderItem={(item) => (
                      <List.Item
                        onClick={() => {
                          setIsModalLevel(true);
                          setValue(
                            levelOptions.find((l) => l.label === item.level)
                              .value
                          );
                          setIdSkill(item.id);
                        }}
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          padding: "5px 10px",
                          backgroundColor: color.colorBluishCyan,
                          borderRadius: 25,
                          textWrap: "nowrap",
                          cursor: "pointer",
                        }}
                      >
                        {item.title}
                      </List.Item>
                    )}
                  />
                </CustomCol>
              </Row>
            </Col>
          </Row>
        </Col>
        <CustomDivider $primary />
        <Col span={24}>
          <Row>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={"middle"}>
                <Col>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Dự án từng làm
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            {applications.map((item, index) => {
              return (
                <Col span={24} key={item.id}>
                  <CustomRow
                    gutter={[0, 10]}
                    style={{ paddingRight: 30, paddingLeft: 30 }}
                  >
                    <Col span={24}>
                      <Typography.Title
                        level={5}
                        style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}
                      >
                        {item.jobs?.title}
                      </Typography.Title>
                    </Col>
                    <Col span={24}>
                      <Row gutter={10} align={"middle"}>
                        <Col>
                          <Typography.Text
                            style={{ color: color.colorDeactivate }}
                          >
                            {formatDate(item.sendDate)} -{" "}
                            {formatDate(item.sendDate)}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                  </CustomRow>
                  {applications.length === index + 1 ? null : <CustomDivider />}
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <ModalPrimary
        title={"Trình độ"}
        open={isModalLevel}
        onOk={handleModaLevel}
        onCancel={handleModalLevelCancel}
      >
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Row>
              <Radio.Group onChange={onLevelChange} value={value}>
                {levelOptions.map((item) => (
                  <Col key={item.value} span={24} style={{ padding: 5 }}>
                    <Radio value={item.value}>{item.label}</Radio>
                  </Col>
                ))}
              </Radio.Group>
            </Row>
          </Col>
        </Row>
      </ModalPrimary>
    </Col>
  );
};

const BodySection = () => {
  return (
    <Row>
      <BodySectionLeft />
      <BodySectionRight />
    </Row>
  );
};

const Overview = () => {
  return (
    <>
      <CustomCard style={{ padding: 0, marginBottom: 30 }}>
        <HeaderSection />
        <CustomDivider $primary />
        <BodySection />
      </CustomCard>

      <BodySectionLeftResponsive />
    </>
  );
};

const styles = {
  nameUser: {
    margin: 0,
  },

  address: {
    color: "#656565",
    paddingLeft: 10,
    marginBottom: 20,
  },
};

export default Overview;
