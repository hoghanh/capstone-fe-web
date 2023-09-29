import { DownOutlined } from '@ant-design/icons';
import { Col, Image, Input, InputNumber, List, Radio, Row, Select, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ModalPrimary } from 'components/Modal/Modal';
// import confirm from 'antd/es/modal/confirm';
import { ButtonIcon, ButtonPrimary } from 'components/customize/GlobalCustomize';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import { Checking, Flag, MapMarkerAlt, Pen, Plus, SearchOutlined, Star, Trash } from 'components/icon/Icon';
import React, { useState } from 'react';
import color from 'styles/color';
import css from './profile.module.css'
import { useRecoilValue } from 'recoil';
import { profileState } from 'recoil/atom';

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

const EditWorkingTime = () => {
  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
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
                <Typography.Title level={4} style={{margin: 0}}>Thời gian làm mỗi tuần</Typography.Title>
              </Col>
              <Col span={24}>
                <Typography.Text>Biết cường độ làm việc có thể giúp bạn tìm được công việc phù hợp.</Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Title level={5}  style={{margin: 0}}>Tôi có thể bỏ ra</Typography.Title>
              </Col>
              <Col span={24}>
                <Row>
                  <Radio.Group onChange={onChange} value={value}>
                    <Col span={24} style={{padding: 5}}>
                      <Radio value={1}>Nhiều hơn 30h / tuần</Radio>
                    </Col>
                    <Col span={24} style={{padding: 5}}>
                      <Radio value={2}>Ít hơn 30h / tuần</Radio>
                    </Col>
                    <Col span={24} style={{padding: 5}}>
                      <Radio value={3}>Có mặt khi yêu cầu</Radio>
                    </Col>
                    <Col span={24} style={{padding: 5}}>
                      <Radio value={4}>Không có giới hạn</Radio>
                    </Col>
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
                <Input className='searchInput' addonBefore={<SearchOutlined />} placeholder="Tìm kiếm ngôn ngữ" />
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
                  suffixIcon={<DownOutlined /> }
                  placement='bottomLeft'
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
          <Col offset={2}>
            
          </Col>
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
          <Col span={2} style={{display: 'flex', justifyContent: 'flex-end', alignItems:'center'}}>
            <ButtonIcon style={{ backgroundColor: color.colorWhite , border: `1px solid ${color.colorDeactivate}` }}>
              <Trash color={'#eb4335'} />
            </ButtonIcon>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};

const AddEducation = () => {
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
        <Plus />
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

const EditEducations = () => {
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

const EditIntroduction= () => {
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
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };
  return (
    <>
      <ButtonIcon onClick={showModal}>
        <Pen />
      </ButtonIcon>
      <ModalPrimary title={'Giới thiệu'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  Chuyên môn
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Input placeholder="Software Engineer | Javascript" />
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
                <TextArea
                  className='introText'
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
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};

const EditSkills= () => {
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
                <Select className='skillSelect' suffixIcon={<></>} {...selectProps} />
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};

const EditCertifications= () => {
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

  const informationUser = useRecoilValue(profileState)

  console.log('informations', informationUser)

  return (
    <Row justify={'space-between'} style={{ padding: 25 }}>
      <Col>
        <Row>
          <Col style={{ display: 'flex', alignItems: 'center', marginRight: 10, position: 'relative' }}>
            <Image
              width={72}
              src= {informationUser.image}
              alt="Apofoitisi logo"
              preview={true}
              style={{ borderRadius: '50%' }}
            />
            <div style={{ position: 'absolute', right: 2, bottom: 2 }}>
              <Checking />
            </div>
          </Col>
          <CustomCol>
            <Row gutter={10}>
              <Col>
                <Typography.Title level={2} style={styles.nameUser}>
                  {informationUser.name}
                </Typography.Title>
              </Col>
              <Col>
                <ButtonIcon>
                  <Pen />
                </ButtonIcon>
              </Col>
            </Row>
            <Row>
              <Col>
                <MapMarkerAlt size={16} color={'#656565'} />
              </Col>
              <Col>
                <Typography.Text style={styles.address}>TP. Hồ Chí Minh, Việt Nam</Typography.Text>
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
  const informationUser = useRecoilValue(profileState)

  return (
    <Col span={0} sm={{span: 8}} style={{ borderRight: '1px solid #656565', padding: '30px 20px' }}>
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
                  <Typography.Text style={{letterSpacing: 1}}>{informationUser.phone}</Typography.Text>
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
                  <Typography.Text>More than 30hrs/weeks</Typography.Text>
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
                      <AddLanguage/>
                    </Col>
                    <Col>
                      <EditLanguages/>
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
                        Giáo dục
                      </Typography.Title>
                    </Col>
                    <Col>
                      <ButtonIcon>
                        <Plus />
                      </ButtonIcon>
                    </Col>
                    <Col>
                      <ButtonIcon>
                        <Pen />
                      </ButtonIcon>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography.Text strong style={{ display: 'block', marginBottom: 10 }}>
                    FPT University
                  </Typography.Text>
                  <Typography.Text>Computer Software Engineering · (2019 - 2023)</Typography.Text>
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
  const informationUser = useRecoilValue(profileState)

  return (
    <Col span={24} sm={{span: 0}} style={{ borderRight: '1px solid #656565', padding: '30px 20px' }}>
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
                  <Typography.Text style={{letterSpacing: 1}}>{informationUser.phone}</Typography.Text>
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
                      <AddLanguage/>
                    </Col>
                    <Col>
                      <EditLanguages/>
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
  return (
    <Col span={24} sm={{span: 16}}>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24} style={{ padding: 20 }}>
              <Row align={'middle'}>
                <Col>
                  <Typography.Title level={3} style={{ margin: 0, paddingRight: 30 }}>
                    Software Engineer | Javascript
                  </Typography.Title>
                </Col>
                <Col>
                  <EditIntroduction />
                </Col>
              </Row>
            </Col>
            <Col span={24} style={{ padding: 20 }}>
              <Typography.Text>
                I’m a developer with experience in building websites for small and medium sized businesses. Whether
                you’re trying to win work, list your services or even create a whole online store – I can help! I’m
                experienced in HTML and CSS 3, JavaScipt, ReactJS and React Native Regular communication is really
                important to me, so let’s keep in touch!
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
                    <Col style={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                      <div
                        style={{ display: 'flex', direction: 'row', alignItems: 'center', padding: 5, marginRight: 5 }}
                      >
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                      </div>
                      <Typography.Text style={{ fontSize: 16, marginTop: 2 }}>5.00</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ color: color.colorDeactivate, fontStyle: 'italic' }}>
                    “Great work!”
                  </Typography.Text>
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
                    <Col style={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                      <div
                        style={{ display: 'flex', direction: 'row', alignItems: 'center', padding: 5, marginRight: 5 }}
                      >
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                      </div>
                      <Typography.Text style={{ fontSize: 16, marginTop: 2 }}>5.00</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ color: color.colorDeactivate, fontStyle: 'italic' }}>
                    “Great work!”
                  </Typography.Text>
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
                    <Col style={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                      <div
                        style={{ display: 'flex', direction: 'row', alignItems: 'center', padding: 5, marginRight: 5 }}
                      >
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                      </div>
                      <Typography.Text style={{ fontSize: 16, marginTop: 2 }}>5.00</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: color.colorDeactivate }}>
                        Jul 8, 2020 - Mar 8, 2023
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ color: color.colorDeactivate, fontStyle: 'italic' }}>
                    “Great work!”
                  </Typography.Text>
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
const BodySection = ({ information }) => {
  return (
    <Row>
      <BodySectionLeft information={information} />
      <BodySectionRight information={information} />
    </Row>
  );
};

const Overview = () => {

  return (
    <>
      <CustomCard style={{ padding: 0, marginBottom: 30 }}>
        {/* Header section */}
        <HeaderSection/>
        <CustomDivider $primary />
        {/* Body Section */}
        <BodySection />
      </CustomCard>

      <CustomCard style={{ padding: 0, marginBottom: 30 }}>
        <BodySectionLeftResponsive/>
      </CustomCard>
    </>
  );
};

const styles = {
  nameUser: {
    margin: 0,
    paddingBottom: 10,
  },

  address: {
    color: '#656565',
    paddingLeft: 10,
    marginBottom: 20,
  },
};

export default Overview;
