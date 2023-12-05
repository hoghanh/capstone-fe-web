import { DownOutlined } from '@ant-design/icons';
import {
  Col,
  Form,
  Image,
  Input,
  List,
  Radio,
  Row,
  Select,
  Skeleton,
  Typography,
  Upload,
  notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ModalPrimary } from 'components/Modal/Modal';
import {
  ButtonIcon,
  ButtonPrimary,
} from 'components/customize/GlobalCustomize';
import {
  CustomCard,
  CustomCol,
  CustomDivider,
  CustomRow,
} from 'components/customize/Layout';
import {
  Flag,
  PaperClipOutlined,
  Pen,
  Plus,
  Trash,
} from 'components/icon/Icon';
import React, { useEffect, useState } from 'react';
import color from 'styles/color';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  applicationListState,
  authState,
  freelancerState,
} from 'recoil/atom';
import { get, post, put, remove } from 'utils/APICaller';
import { formatDate } from 'components/formatter/format';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'config/firebase';
import { PlusOutlined } from '@ant-design/icons';


const EditPersonalInformation = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const updateFreelancerInfo = (values) => {
    const { phone, address } = values;
    console.log(informationUser?.id, phone, address)
    put({
      endpoint: `/freelancer/basicInfo/${informationUser?.id}`,
      body: {
        phone,
        address,
      },
    })
      .then((res) => {
        setInformationUser({
          ...informationUser,
          accounts: {
            ...informationUser?.accounts,
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
          name='submitInformation'
          initialValues={{
            remember: true,
            phone: informationUser?.accounts.phone,
            address: informationUser?.accounts.address,
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
                        message: 'Không được để trống ô này!',
                      },
                      {
                        pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                        message: 'Số điện thoại không hợp lệ!',
                      },
                    ]}
                  >
                    <Input
                      style={{ width: '40%' }}
                      prefix={<Flag />}
                      placeholder='0123456789'
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
                        message: 'Không được để trống ô này!',
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
    { label: 'Nhiều hơn 30h / tuần', value: 1 },
    { label: 'Ít hơn 30h / tuần', value: 2 },
    { label: 'Có mặt khi yêu cầu', value: 3 },
    { label: 'Không có giới hạn', value: 4 },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const hoursPerWeek = hoursPerWeekOptions.find(
      (item) => item.value === value
    ).label;
    put({
      endpoint: `/freelancer/hoursPerWeek/${informationUser?.id}`,
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
      <ModalPrimary
        title={'Khả dụng'}
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
  { value: '1', label: 'Cơ Bản' },
  { value: '2', label: 'Trung cấp' },
  { value: '3', label: 'Thông thạo' },
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
          endpoint: `/freelancer/languages/${informationUser?.id}`,
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
        console.error('Validation failed:', error);
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
        title={'Thêm ngôn ngữ'}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name='addLanguage' initialValues={{ level: '2' }}>
          <Row gutter={[0, 10]}>
            <Col span={12}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Text>Ngôn ngữ</Typography.Text>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: 'Không được để trống ô này!',
                      },
                    ]}
                  >
                    <Input placeholder='VD: Tiếng Anh' />
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
                  <Form.Item name='level'>
                    <Select
                      style={{ width: 120 }}
                      suffixIcon={<DownOutlined />}
                      placement='bottomLeft'
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
    const id = changedField.replace('language', '').replace('level', '');
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
          endpoint: `/freelancer/languages/${informationUser?.id}`,
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
        title={'Chỉnh sửa ngôn ngữ'}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onValuesChange={handleLanguageChange}
          name='editLanguage'
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
                            message: 'Không được để trống ô này!',
                          },
                        ]}
                      >
                        <Input placeholder='VD: Tiếng Anh' />
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
                          placement='bottomLeft'
                          options={languagesItems}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      span={2}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
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
                          <Trash color={'#eb4335'} />
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
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { major } = values;
        put({
          endpoint: `/freelancer/major/${informationUser?.id}`,
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
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
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
        <Form form={form}>
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Form.Item
                    name='major'
                    initialValue={informationUser?.major}
                    rules={[
                      {
                        required: true,
                        message: 'Chuyên ngành không được để trống',
                      },
                    ]}
                  >
                    <Input
                      onChange={onChange}
                      style={{ width: '100%' }}
                      placeholder='Nhập chuyên ngành của bạn tại đây ...'
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
          endpoint: `/freelancer/introduction/${informationUser?.id}`,
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
  const onChange = (e) => { };
  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={'Giới thiệu'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name='submitApplication'
          initialValues={{
            remember: true,
            title: informationUser?.title,
            introduction: informationUser?.introduction,
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
                        message: 'Không được để trống ô này!',
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

const EditSkills = ({ skillList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [skills, setSkills] = useState([]);
  const [value, setValue] = useState([]);
  const [flat, setFlat] = useState(false);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    getFreelancer();
    setFlat(false);
  }, [flat]);

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
      endpoint: `/freelancer/skills/${informationUser?.id}`,
      body: {
        skill: value,
      },
    })
      .then((res) => {
        setFlat(true);
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
    mode: 'multiple',
    size: 'large',
    value,
    options: skills?.map((item) => ({ label: item.name, value: item.name })),
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: 'Nhập hoặc chọn kĩ năng',
    tokenSeparators: [','],
    maxTagCount: 'responsive',
  };

  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={'Kỹ năng chuyên môn'}
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
  const [progresspercent, setProgresspercent] = useState(0);
  const [avatar, setAvatar] = useState([]);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const uploadFile = (event) => {
    const file = event.image[0].originFileObj;
    if (!file) return;

    const storageRef = ref(storage, `images/avatars/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateInfo(event, downloadURL);
        });
      }
    );
  };

  const updateInfo = (values, image) => {
    const { name } = values;
    put({
      endpoint: `/freelancer/nameImage/${informationUser?.id}`,
      body: {
        name,
        image,
      },
    })
      .then((res) => {
        setInformationUser({
          ...informationUser,
          accounts: {
            ...informationUser?.accounts,
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
  };

  const handleChange = ({ avatar: newAvatar }) => setAvatar(newAvatar);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (
          values.image !== undefined &&
          values.image !== null &&
          values.image !== ''
        ) {
          if (values.image.length > 0) {
            uploadFile(values);
          } else {
            updateInfo(values);
          }
        } else {
          updateInfo(values, informationUser?.accounts.image);
        }
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const props = {
    listType: 'picture-card',
    fileList: { avatar },
    accept: '.png, .jpg, .jpeg',
    maxCount: 1,
    beforeUpload: () => false,
    onRemove: () => false,
    showUploadList: {
      showRemoveIcon: false,
    },
    onChange: handleChange,
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải ảnh lên
      </div>
    </div>
  );

  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary
        title={'Thông tin cơ bản'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name='submitNameAvatar'
          initialValues={{
            remember: true,
            name: informationUser?.accounts.name,
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
                        message: 'Không được để trống ô này!',
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
                    style={{ paddingLeft: 10 }}
                    name='image'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                  >
                    <Upload {...props}>{uploadButton}</Upload>
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

const EditCV = () => {
  const [informationUser, setInformationUser] = useRecoilState(freelancerState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState();
  const [, setProgresspercent] = useState(0);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleUpload = (event) => {
    const file = event.files[0].originFileObj;
    setFileName(file.name);

    if (!file) return;

    const storageRef = ref(
      storage,
      `CV/freelancer-${informationUser?.id}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          submitCV(downloadURL);
        });
      }
    );
  };

  const submitCV = (url) => {
    put({
      endpoint: `/freelancer/cvFile/${informationUser?.id}`,
      body: {
        cvFile: url,
      },
    })
      .then((res) => {
        setInformationUser({ ...informationUser, cvFile: url });
        notification.success({
          message: 'Tải tệp thành công!',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Có lỗi xảy ra',
        });
      });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (
          values.files !== undefined &&
          values.files !== null &&
          values.files !== ''
        ) {
          if (values.files.length > 0) {
            handleUpload(values);
          } else {
            submitCV(values);
          }
        } else {
          submitCV(values);
        }
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
      <ButtonPrimary
        onClick={showModal}
        $primary
        style={{ border: `1px solid ${color.colorDeactivate}` }}
      >
        Nộp CV/Resume
      </ButtonPrimary>
      <ModalPrimary
        title={'Nộp CV/Resume'}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name='submitCV'
          initialValues={{
            remember: true,
          }}
        >
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Form.Item
                    name='files'
                    valuePropName='fileList'
                    rules={[
                      {
                        required: true,
                        message: 'Không được để trống ô này!',
                      },
                    ]}
                    getValueFromEvent={normFile}
                  >
                    <Upload.Dragger
                      name='file-upload'
                      maxCount={1}
                      accept='.pdf, .png, .jpg, .jpeg'
                      beforeUpload={() => false}
                    >
                      <p className='ant-upload-drag-icon'>
                        <PaperClipOutlined />
                      </p>
                      <p className='ant-upload-text'>
                        Kéo và thả tệp CV của bạn vào đây
                      </p>
                      <p className='ant-upload-hint'>
                        (Kích thước tệp tối đa: 25 MB)
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  {informationUser?.cvFile ? (
                    <Typography.Link
                      href={informationUser?.cvFile}
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
                  ) : null}
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
  const auth = useRecoilValue(authState);

  return (
    <Row justify={'space-between'} style={{ padding: 25 }}>
      <Col>
        <Row>
          <Col
            style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}
          >
            <Image
              width={72}
              src={informationUser?.accounts.image}
              alt='Apofoitisi logo'
              preview={false}
              style={{ borderRadius: '50%' }}
            />
          </Col>
          <CustomCol
            style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}
          >
            <Row gutter={10}>
              <Col>
                <Typography.Title level={2} style={styles.nameUser}>
                  {informationUser?.accounts.name != null &&
                    informationUser?.accounts.name !== '' ? (
                    informationUser?.accounts.name
                  ) : (
                    <Skeleton.Input size={'large'} />
                  )}
                </Typography.Title>
              </Col>
              <Col>
                {auth.role === 'freelancer' &&
                  auth.id === informationUser?.accountId ? (
                  <Col>
                    <EditNameAvatar />
                  </Col>
                ) : null}
              </Col>
            </Row>
          </CustomCol>
        </Row>
      </Col>
      <Col
        className='btnSubmitCV'
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Row gutter={[20, 0]}>
          {auth.role === 'freelancer' &&
            auth.id === informationUser?.accountId ? (
            <Col>
              <EditCV />
            </Col>
          ) : (
            <Col>
              {informationUser?.cvFile ? (
                <Typography.Link
                  href={informationUser?.cvFile}
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
              ) : null}
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};


const BodySectionLeft = () => {
  const informationUser = useRecoilValue(freelancerState);
  const auth = useRecoilValue(authState);

  return (
    <Col
      span={0}
      sm={{ span: 8 }}
      style={{ borderRight: '1px solid #656565', padding: '30px 20px' }}
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
                {auth.role === 'freelancer' &&
                  auth.id === informationUser?.accountId ? (
                  <Col>
                    <EditPersonalInformation />
                  </Col>
                ) : null}
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
                    {informationUser?.accounts.phone != null &&
                     informationUser?.accounts.phone !== ''
                     ? informationUser?.accounts.phone
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
                        Email
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ letterSpacing: 1 }}>
                    {informationUser?.accounts.email != null &&
                      informationUser?.accounts.email !== ''
                      ? informationUser?.accounts.email
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
                  {informationUser?.accounts.address != null &&
                    informationUser?.accounts.address !== ''
                      ? informationUser?.accounts.address
                    : 'Chưa có thông tin'}
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
                    {auth.role === 'freelancer' &&
                      auth.id === informationUser?.accountId ? (
                      <Col>
                        <EditWorkingTime />
                      </Col>
                    ) : null}
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    {informationUser?.hoursPerWeek != null &&
                      informationUser?.hoursPerWeek !== ''
                      ? informationUser?.hoursPerWeek
                      : 'Chưa có thông tin'}
                  </Typography.Text>
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
                    {auth.role === 'freelancer' &&
                      auth.id === informationUser?.accountId ? (
                      <Col>
                        <AddLanguage />
                      </Col>
                    ) : null}
                    {auth.role === 'freelancer' &&
                      auth.id === informationUser?.accountId ? (
                      <Col>
                        <EditLanguages />
                      </Col>
                    ) : null}
                  </Row>
                </Col>
                {informationUser?.language.length > 0 ? informationUser?.language.map((language) => (
                  <Col key={language.id} span={24}>
                    <Typography.Text>
                      <Typography.Text strong style={{ marginRight: 20 }}>
                        {language.name}:
                      </Typography.Text>
                      {language.level}
                    </Typography.Text>
                  </Col>
                )) : <Col span={24}>Chưa có thông tin</Col>}
              </Row>
            </CustomCol>
            <CustomCol>
              <Row gutter={[0, 15]}>
                <Col>
                  <Row align={'middle'} gutter={[30, 10]}>
                    <Col>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Chuyên ngành
                      </Typography.Title>
                    </Col>
                    {auth.role === 'freelancer' &&
                      auth.id === informationUser?.accountId ? (
                      <Col>
                        <EditMajor />
                      </Col>
                    ) : null}
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    {informationUser?.major != null &&
                      informationUser?.major !== ''
                      ? informationUser?.major
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

const BodySectionLeftResponsive = () => {
  const informationUser = useRecoilValue(freelancerState);
  const auth = useRecoilValue(authState);

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
        backgroundColor: color.colorWhite,
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
                {auth.role === 'freelancer' &&
                  auth.id === informationUser?.accountId ? (
                  <Col>
                    <EditPersonalInformation />
                  </Col>
                ) : null}
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
                    {informationUser?.accounts.phone != null &&
                      informationUser?.accounts.phone !== ''
                        ? informationUser?.accounts.phone
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
                        Email
                      </Typography.Title>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ letterSpacing: 1 }}>
                    {informationUser?.accounts.email != null &&
                      informationUser?.accounts.email !== ''
                        ? informationUser?.accounts.email
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
                  {informationUser?.accounts.address != null &&
                    informationUser?.accounts.address !== ''
                      ? informationUser?.accounts.address
                    : 'Chưa có thông tin'}
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
                    {auth.role === 'freelancer' &&
                      auth.id === informationUser?.accountId ? (
                      <Col>
                        <EditWorkingTime />
                      </Col>
                    ) : null}
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text> {informationUser?.hoursPerWeek != null &&
                    informationUser?.hoursPerWeek !== ''
                    ? informationUser?.hoursPerWeek
                    : 'Chưa có thông tin'}</Typography.Text>
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
                    {auth.role === 'freelancer' &&
                      auth.id === informationUser?.accountId ? (
                      <Col>
                        <AddLanguage />
                      </Col>
                    ) : null}
                    {auth.role === 'freelancer' &&
                      auth.id === informationUser?.accountId ? (
                      <Col>
                        <EditLanguages />
                      </Col>
                    ) : null}
                  </Row>
                </Col>
                {informationUser?.language.length > 0 ? informationUser?.language.map((language) => (
                  <Col key={language.id} span={24}>
                    <Typography.Text>
                      <Typography.Text strong style={{ marginRight: 20 }}>
                        {language.name}:
                      </Typography.Text>
                      {language.level}
                    </Typography.Text>
                  </Col>
                )) : <Col span={24}>Chưa có thông tin</Col>}
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
                      {auth.role === 'freelancer' &&
                        auth.id === informationUser?.accountId ? (
                        <Col>
                          <EditMajor />
                        </Col>
                      ) : null}
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    {informationUser?.major != null &&
                      informationUser?.major !== ''
                      ? informationUser?.major
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

const ListWithLoadMore = ({ items }) => {
  const [visible, setVisible] = useState(2);
  let counts = 3;

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + counts);
  };

  const showLessItems = () => {
    setVisible((prevValue) =>
      prevValue > counts ? prevValue - counts : counts
    );
  };

  return (
    <List
      dataSource={items.slice(0, visible)}
      renderItem={(item) => (
        <List.Item>
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
                <Row gutter={10} align={'middle'}>
                  <Col>
                    <Typography.Text style={{ color: color.colorDeactivate }}>
                      Ngày bắt đầu: {formatDate(item.updatedAt)}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </CustomRow>
          </Col>
        </List.Item>
      )}
      footer={
        <div style={{ margin: 'auto', width: '20%' }}>
          {items.length <= 3 ? null : (visible < 3 ? (
            <Typography.Text
              style={{ cursor: 'pointer' }}
              onClick={showMoreItems}
            >
              Xem thêm...
            </Typography.Text>
          ) : (
            <Typography.Text
              style={{ cursor: 'pointer' }}
              onClick={showLessItems}
            >
              Thu gọn
            </Typography.Text>
          ))}
        </div>
      }
    />
  );
};

const BodySectionRight = () => {
  const informationUser = useRecoilValue(freelancerState);
  const applications = useRecoilValue(applicationListState);
  const [isModalLevel, setIsModalLevel] = useState(false);
  const [value, setValue] = useState(1);
  const [skillList, setSkillList] = useState([]);
  const [idSkill, setIdSkill] = useState(null);
  const auth = useRecoilValue(authState);

  const levelOptions = [
    { label: 'Cơ bản', value: 1 },
    { label: 'Trung cấp', value: 2 },
    { label: 'Thông thạo', value: 3 },
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
              <Row align={'middle'}>
                <Col>
                  <Typography.Title
                    level={3}
                    style={{ margin: 0, paddingRight: 30 }}
                  >
                    {informationUser?.title != null &&
                      informationUser?.title !== ''
                      ? informationUser?.title
                      : 'Chưa có thông tin'}
                  </Typography.Title>
                </Col>
                {auth.role === 'freelancer' &&
                  auth.id === informationUser?.accountId ? (
                  <Col>
                    <EditIntroduction />
                  </Col>
                ) : null}
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Typography.Text>
                {informationUser?.introduction != null &&
                  informationUser?.introduction !== ''
                  ? informationUser?.introduction
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
                  <Typography.Title
                    level={4}
                    style={{ margin: 0, paddingRight: 30 }}
                  >
                    Kỹ năng
                  </Typography.Title>
                </Col>
                {auth.role === 'freelancer' &&
                  auth.id === informationUser?.accountId ? (
                  <Col>
                    <EditSkills
                      skillList={skillList}
                      setSkillList={setSkillList}
                    />
                  </Col>
                ) : null}
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Row className='skillArticle' gutter={[0, 10]}>
                {auth.role === 'freelancer' &&
                  auth.id === informationUser?.accountId ? (
                  <Col span={24}>
                    <Typography.Text style={{ margin: 0, fontStyle: 'italic' }}>
                      - Nhấn vào thẻ để thay đổi mức độ kỹ năng
                    </Typography.Text>
                  </Col>
                ) : null}
                <CustomCol span={24}>
                  <List
                    style={{ overflowX: 'auto' }}
                    grid={{
                      gutter: 15,
                    }}
                    dataSource={skillList?.map((item) => ({
                      title: `${item.name} - ${item.level}`,
                      level: item.level,
                      id: item.id,
                    }))}
                    renderItem={(item) => {
                      if (
                        auth.role === 'freelancer' &&
                        auth.id === informationUser?.accountId
                      ) {
                        return (
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
                              padding: '5px 10px',
                              backgroundColor: color.colorBluishCyan,
                              borderRadius: 25,
                              textWrap: 'nowrap',
                              cursor: 'pointer',
                            }}
                          >
                            {item.title}
                          </List.Item>
                        );
                      } else {
                        return (
                          <List.Item
                            style={{
                              fontWeight: 700,
                              fontSize: 14,
                              padding: '5px 10px',
                              backgroundColor: color.colorBluishCyan,
                              borderRadius: 25,
                              textWrap: 'nowrap',
                            }}
                          >
                            {item.title}
                          </List.Item>
                        );
                      }
                    }}
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
            <Col span={24} >
              <ListWithLoadMore items={applications} />
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalPrimary
        title={'Trình độ'}
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
    color: '#656565',
    paddingLeft: 10,
    marginBottom: 20,
  },
};

export default Overview;
