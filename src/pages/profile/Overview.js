import { DownOutlined } from '@ant-design/icons';
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
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ModalPrimary } from 'components/Modal/Modal';
// import confirm from 'antd/es/modal/confirm';
import { ButtonIcon, ButtonPrimary } from 'components/customize/GlobalCustomize';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import { Checking, Flag, Pen, Plus, SearchOutlined, Star, Trash } from 'components/icon/Icon';
import React, { useState } from 'react';
import color from 'styles/color';
import css from './profile.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { freelancerState, profileState } from 'recoil/atom';
import { post } from 'utils/APICaller';

const Skill = [
  {
    title: 'Javascript',
  },
  {
    title: 'Html',
  },
  {
    title: 'NextJS',
  },
  {
    title: 'ReactJS',
  },
  {
    title: 'Javascript',
  },
  {
    title: 'Html',
  },
  {
    title: 'NextJS',
  },
  {
    title: 'ReactJS',
  },
  {
    title: 'Javascript',
  },
  {
    title: 'Html',
  },
  {
    title: 'NextJS',
  },
  {
    title: 'ReactJS',
  },
];

const options = [];
for (let i = 0; i < Skill.length; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `${value}`,
    value,
  });
}

const EditPersonalInformation = () => {
  //Modal
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const updateFreelancerInfo = (values) => {
    const { phone, address } = values;
    post({
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
          message: 'Cập nhật thành công!',
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
        // Gửi dữ liệu đi ở đây
        updateFreelancerInfo(values);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Validation failed:', error);
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
        title={'Chỉnh sửa thông tin'}
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
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: 'Không được để trống ô này!',
                      },
                      {
                        pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                        message: 'Số điện thoại không hợp lệ!',
                      },
                    ]}
                  >
                    <Input style={{ width: '40%' }} prefix={<Flag />} placeholder="0123456789" controls={false} />
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
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: 'Không được để trống ô này!',
                      },
                    ]}
                  >
                    <Input placeholder="Địa chỉ" />
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
    { label: 'Nhiều hơn 30h / tuần', value: 1 },
    { label: 'Ít hơn 30h / tuần', value: 2 },
    { label: 'Có mặt khi yêu cầu', value: 3 },
    { label: 'Không có giới hạn', value: 4 },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const hoursPerWeek = hoursPerWeekOptions.find((item) => item.value === value).label;
    post({
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
          message: 'Cập nhật thành công!',
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
      <ModalPrimary title={'Khả dụng'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  Thời gian làm mỗi tuần
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Typography.Text>Biết cường độ làm việc có thể giúp bạn tìm được công việc phù hợp.</Typography.Text>
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

const AddLanguage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Plus />
      </ButtonIcon>
      <ModalPrimary
        title={'Thêm ngôn ngữ'}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[0, 10]}>
          <Col span={12}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Text>Ngôn ngữ</Typography.Text>
              </Col>
              <Col span={24}>
                <Input className="searchInput" addonBefore={<SearchOutlined />} placeholder="Tìm kiếm ngôn ngữ" />
              </Col>
            </CustomRow>
          </Col>
          <Col span={12}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Text>Trình độ</Typography.Text>
              </Col>
              <Col span={24}>
                <Select
                  defaultValue="2"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  suffixIcon={<DownOutlined />}
                  placement="bottomLeft"
                  options={[
                    { value: '1', label: 'Cơ Bản' },
                    { value: '2', label: 'Giao tiếp' },
                    { value: '3', label: 'Thông thạo' },
                    { value: '4', label: 'Tự nhiên' },
                  ]}
                />
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};

const EditLanguages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={'Chỉnh sửa ngôn ngữ'}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[0, 10]}>
          <Col span={12}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Text>Ngôn ngữ</Typography.Text>
              </Col>
              <Col span={24}>
                <Input placeholder="Tìm kiếm ngôn ngữ" />
              </Col>
            </CustomRow>
          </Col>
          <Col span={10}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Text>Trình độ</Typography.Text>
              </Col>
              <Col span={24}>
                <Select
                  defaultValue="2"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  suffixIcon={<DownOutlined />}
                  placement="bottomLeft"
                  options={[
                    { value: '1', label: 'Cơ Bản' },
                    { value: '2', label: 'Giao tiếp' },
                    { value: '3', label: 'Thông thạo' },
                    { value: '4', label: 'Tự nhiên' },
                  ]}
                />
              </Col>
            </CustomRow>
          </Col>
          <Col offset={2}></Col>
          <Col span={12}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Text>Ngôn ngữ</Typography.Text>
              </Col>
              <Col span={24}>
                <Input placeholder="Tìm kiếm ngôn ngữ" />
              </Col>
            </CustomRow>
          </Col>
          <Col span={10}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Text>Trình độ</Typography.Text>
              </Col>
              <Col span={24}>
                <Select
                  defaultValue="2"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  suffixIcon={<DownOutlined />}
                  placement="bottomLeft"
                  options={[
                    { value: '1', label: 'Cơ Bản' },
                    { value: '2', label: 'Giao tiếp' },
                    { value: '3', label: 'Thông thạo' },
                    { value: '4', label: 'Tự nhiên' },
                  ]}
                />
              </Col>
            </CustomRow>
          </Col>
          <Col span={2} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <ButtonIcon style={{ backgroundColor: color.colorWhite, border: `1px solid ${color.colorDeactivate}` }}>
              <Trash color={'#eb4335'} />
            </ButtonIcon>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};

const EditMajor = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const major = value;
    post({
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
          message: 'Cập nhật thành công!',
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
        title={'Chuyên ngành'}
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
                  style={{ width: '100%' }}
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
console.log(informationUser)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const {title, introduction} = values;
        post({
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
              message: 'Cập nhật thành công!',
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
        console.error('Validation failed:', error);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };
  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary title={'Giới thiệu'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          name="submitProposal"
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
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'Không được để trống ô này!',
                      },
                    ]}
                  >
                    <Input placeholder="Software Engineer | Javascript" />
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
                    className="introText"
                    name="introduction"
                    rules={[
                      {
                        required: true,
                        message: 'Không được để trống ô này!',
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      allowClear={true}
                      maxLength={1000}
                      style={{
                        height: 120,
                        resize: 'none',
                      }}
                      onChange={onChange}
                      placeholder="textarea"
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

const EditSkills = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [value, setValue] = useState(['Javascript', 'Html', 'NextJS', 'ReactJS']);
  const selectProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    value,
    options,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: 'Thêm kỹ năng của bạn...',
    maxTagCount: 'responsive',
  };
  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary title={'Kỹ năng chuyên môn'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Text>Hãy nhập những kỹ năng bạn có để được đề xuất công việc phù hợp nhất.</Typography.Text>
              </Col>
              <Col span={24}>
                <Select className="skillSelect" suffixIcon={<></>} {...selectProps} />
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};

const AddCertifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <ButtonIcon>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={'Chỉnh sửa thông tin'}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Text>Số điện thoại</Typography.Text>
              </Col>
              <Col span={24}>
                <InputNumber style={{ width: '40%' }} prefix={<Flag />} placeholder="0123456789" controls={false} />
              </Col>
            </CustomRow>
          </Col>
          <Col span={24}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Text>Địa chỉ</Typography.Text>
              </Col>
              <Col span={24}>
                <Input placeholder="Địa chỉ" />
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};

// Header section
const HeaderSection = () => {
  const informationUser = useRecoilValue(freelancerState);

  return (
    <Row justify={'space-between'} style={{ padding: 25 }}>
      <Col>
        <Row>
          <Col style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
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
                <Typography.Title level={2} style={styles.nameUser}>
                  {informationUser.accounts.name != null && informationUser.accounts.name !== '' ? (
                    informationUser.accounts.name
                  ) : (
                    <Skeleton.Input size={'large'} />
                  )}
                </Typography.Title>
              </Col>
            </Row>
          </CustomCol>
        </Row>
      </Col>
      <Col className={css.btnSubmitCV}>
        <Row gutter={[20, 0]}>
          <Col>
            <ButtonPrimary $primary style={{ border: `1px solid ${color.colorDeactivate}` }}>
              Nộp CV/Resume
            </ButtonPrimary>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

//Body Section Left
const BodySectionLeft = () => {
  const informationUser = useRecoilValue(freelancerState);

  return (
    <Col span={0} sm={{ span: 8 }} style={{ borderRight: '1px solid #656565', padding: '30px 20px' }}>
      <Row gutter={[0, 10]}>
        <Col>
          <Row gutter={[0, 10]}>
            <Col>
              <Row align={'middle'} gutter={[30, 10]}>
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
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Số điện thoại
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ letterSpacing: 1 }}>
                    {' '}
                    {informationUser.accounts.phone != null && informationUser.accounts.phone !== ''
                      ? informationUser.accounts.phone
                      : 'Chưa có thông tin'}
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol span={24}>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Địa chỉ
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    {informationUser.accounts.address != null && informationUser.accounts.address !== ''
                      ? informationUser.accounts.address
                      : 'Chưa có thông tin'}
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
        <Col>
          <Row gutter={[0, 10]}>
            <Col>
              <Row align={'middle'} gutter={[30, 10]}>
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
                  <Row align={'middle'} gutter={[30, 10]}>
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
                    {informationUser.hoursPerWeek != null && informationUser.hoursPerWeek !== ''
                      ? informationUser.hoursPerWeek
                      : 'Chưa có thông tin'}
                  </Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={[30, 10]}>
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
                <Col>
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
                <Col>
                  <Row align={'middle'} gutter={[30, 10]}>
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
                    {informationUser.major != null && informationUser.major !== ''
                      ? informationUser.major
                      : 'Chưa có thông tin'}
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

//Body Section Left Responsive
const BodySectionLeftResponsive = () => {
  const informationUser = useRecoilValue(profileState);

  return (
    <Col
      span={24}
      sm={{ span: 0 }}
      style={{
        borderRight: '1px solid #656565',
        padding: '30px 20px',
        marginBottom: 30,
        boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: 20,
        backgroundColor: color.colorWhitegq,
      }}
    >
      <Row gutter={[0, 10]}>
        <Col>
          <Row gutter={[0, 10]}>
            <Col>
              <Row align={'middle'} gutter={[30, 10]}>
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
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Số điện thoại
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ letterSpacing: 1 }}>{informationUser.phone}</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
            <CustomCol span={24}>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={[30, 10]}>
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
              <Row align={'middle'} gutter={[30, 10]}>
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
                  <Row align={'middle'} gutter={[30, 10]}>
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
                  <Row align={'middle'} gutter={[30, 10]}>
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
                  <Row align={'middle'} gutter={[30, 10]}>
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
                  <Typography.Text>Kỹ thuật phần mềm · (2019 - 2023)</Typography.Text>
                </Col>
              </Row>
            </CustomCol>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

//Body Section Right
const BodySectionRight = () => {
  const informationUser = useRecoilValue(freelancerState);
  return (
    <Col span={24} sm={{ span: 16 }}>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={'middle'}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0, paddingRight: 30 }}>
                    {informationUser.title != null && informationUser.title !== ''
                      ? informationUser.title
                      : 'Chưa có thông tin'}
                  </Typography.Title>
                </Col>
                <Col>
                  <EditIntroduction />
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Typography.Text>
                {informationUser.introduction != null && informationUser.introduction !== ''
                  ? informationUser.introduction
                  : 'Chưa có thông tin'}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <CustomDivider $primary />
        <Col span={24}>
          <Row>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={'middle'}>
                <Col>
                  <Typography.Title level={4} style={{ margin: 0, paddingRight: 30 }}>
                    Kỹ năng
                  </Typography.Title>
                </Col>
                <Col>
                  <EditSkills />
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Row className="skillArticle" gutter={[0, 10]}>
                <CustomCol span={24}>
                  <List
                    style={{ overflowX: 'auto' }}
                    grid={{
                      gutter: 15,
                    }}
                    dataSource={Skill}
                    renderItem={(item, index) => (
                      <List.Item
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          padding: '5px 10px',
                          backgroundColor: color.colorBluishCyan,
                          borderRadius: 25,
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
              <Row align={'middle'}>
                <Col>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Dự án từng làm
                  </Typography.Title>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <CustomRow gutter={[0, 10]} style={{ paddingRight: 30, paddingLeft: 30 }}>
                <Col span={24}>
                  <Typography.Title level={5} style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Row gutter={10} align={'middle'}>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </CustomRow>
            </Col>
            <CustomDivider $primary />
            <Col span={24}>
              <CustomRow gutter={[0, 10]} style={{ paddingRight: 30, paddingLeft: 30 }}>
                <Col span={24}>
                  <Typography.Title level={5} style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Row gutter={10} align={'middle'}>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </CustomRow>
            </Col>
            <CustomDivider $primary />
            <Col span={24}>
              <CustomRow gutter={[0, 10]} style={{ paddingRight: 30, paddingLeft: 30 }}>
                <Col span={24}>
                  <Typography.Title level={5} style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Row gutter={10} align={'middle'}>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

//Body Section
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
        {/* Header section */}
        <HeaderSection />
        <CustomDivider $primary />
        {/* Body Section */}
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
    color: '#656565',
    paddingLeft: 10,
    marginBottom: 20,
  },
};

export default Overview;
