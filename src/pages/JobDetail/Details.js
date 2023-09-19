import { ClockCircleFilled, InboxOutlined } from '@ant-design/icons';
import { Col, List, Row, Typography,  message, Upload } from 'antd';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import {
  AddressCard,
  BookMarkOutlined,
  CreditCard,
  Donate,
  Envelope,
  Flag,
  MapMarkerAlt,
  PaperClipOutlined,
  Pen,
  PhoneAlt,
} from 'components/icon/Icon';
import LoginModal from 'layout/header/LoginModal';
import React, { useState } from 'react';
import color from 'styles/color';
import css from './jobDetail.module.css';
import './jobDetail.module.css';
import { ButtonPrimary } from 'components/customize/GlobalCustomize';
import { CalculateDaysLeft, FormatVND } from 'components/formatter/format';
import { useRecoilValue } from 'recoil';
import { authState, jobDetailState } from 'recoil/atom';
import { ModalPrimary } from 'components/Modal/Modal';
import TextArea from 'antd/es/input/TextArea';

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

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


const SubmitProposal = () => {
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

  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  return (
    <>
      <ButtonPrimary onClick={showModal}>Gửi CV/Resume</ButtonPrimary>
      <ModalPrimary
        title={'Chi tiết đề xuất'}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'Gửi đi'}
      >
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Mô tả mong muốn
                </Typography.Title>
              </Col>
              <Col span={24}>
                <TextArea
                  className="introText"
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
          <Col span={24}>
            <CustomRow gutter={[0, 10]}>
              <Col span={24}>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  CV/Resume đính kèm (PDF)
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Drag or upload file</p>
                </Dragger>
              </Col>
            </CustomRow>
          </Col>
        </Row>
      </ModalPrimary>
    </>
  );
};

//Header Article right
const HeaderArticle = () => {
  const jobDetail = useRecoilValue(jobDetailState);

  return (
    <>
      <Row>
        <Col sm={{ span: 24 }} xs={{ span: 0 }}>
          <CustomRow>
            <CustomCol span={11} style={styles.headerRight}>
              <Typography.Title level={3} style={styles.headerTitleRight}>
                Chi tiết dự án
              </Typography.Title>
              <Typography.Text style={styles.headerTextRight}>
                {jobDetail.applied} Freelancer đã ứng tuyển
              </Typography.Text>
            </CustomCol>
            <CustomCol
              span={11}
              style={{
                ...styles.headerRight,
                alignItems: 'flex-end',
              }}
            >
              <Typography.Title level={4} style={styles.headerTitleRight}>
                {FormatVND(jobDetail.lowestIncome)} - {FormatVND(jobDetail.highestIncome)}
              </Typography.Title>
              <div>
                <ClockCircleFilled />
                <Typography.Text style={{ ...styles.headerTextRight, marginLeft: 10 }}>
                  {CalculateDaysLeft(jobDetail.proposalSubmitDeadline)}
                </Typography.Text>
              </div>
            </CustomCol>
            <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <BookMarkOutlined />
            </Col>
          </CustomRow>
        </Col>
        <Col sm={{ span: 0 }} xs={{ span: 24 }}>
          <CustomRow>
            <CustomCol span={22} style={styles.headerRight}>
              <Row gutter={[0, 5]}>
                <Col span={24}>
                  <Typography.Title level={3} style={styles.headerTitleRight}>
                    Chi tiết dự án
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Title level={4} style={styles.headerTitleRight}>
                    000.000VND - 000.000VND
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text style={styles.headerTextRight}>5 Freelancer đã ứng tuyển</Typography.Text>
                </Col>{' '}
                <Col span={24}>
                  <div>
                    <ClockCircleFilled />
                    <Typography.Text style={{ ...styles.headerTextRight, marginLeft: 10 }}>
                      Thời gian ứng tuyển còn lại 4 ngày
                    </Typography.Text>
                  </div>
                </Col>
              </Row>
            </CustomCol>
            <Col
              span={2}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '10px 0px' }}
            >
              <BookMarkOutlined />
            </Col>
          </CustomRow>
        </Col>
      </Row>
    </>
  );
};

//Description
const DescriptionsArticle = ({ description }) => {
  return (
    <Row>
      <CustomCol span={24}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>{description}</Typography.Text>
          </Col>
        </Row>
      </CustomCol>
    </Row>
  );
};

//Attachment
const AttachmentArticle = () => {
  return (
    <CustomRow>
      <Col span={24}>
        <Typography.Title level={5} style={styles.titleSection}>
          Tệp tin đính kèm
        </Typography.Title>
      </Col>
      <CustomCol span={24} style={{ display: 'flex' }}>
        <PaperClipOutlined />
        <Typography.Text underline={true} style={{ fontWeight: 700, fontSize: 14, marginLeft: 5 }}>
          fileAttachName.doc
        </Typography.Text>
      </CustomCol>
    </CustomRow>
  );
};

//Skill
const SkillArticle = () => {
  
  return (
    <CustomRow className="skillArticle" gutter={[0, 10]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Yêu cầu kỹ năng
        </Typography.Title>
      </Col>
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
    </CustomRow>
  );
};

//About customer
const AboutCustomer = () => {
  return (
    <CustomRow gutter={[0, 10]}>
      <Col span={24}>
        <Typography.Title
          level={4}
          style={{
            fontStyle: 'normal',
            margin: '0 0 0 -10px',
            paddingBottom: 20,
          }}
        >
          Về khách hàng
        </Typography.Title>
      </Col>
      <CustomCol span={24} style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
        <Typography.Text style={{ fontSize: 14, color: color.colorDeactivate }}>Công ty</Typography.Text>
        <Typography.Title
          className={css.titleAboutCustomer}
          level={5}
          style={{
            margin: '0 0 10px 0',
            textAlign: 'center',
          }}
        >
          CÔNG TY CỔ PHẦN FOODY
        </Typography.Title>
      </CustomCol>
      <CustomCol span={24} style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
        <Typography.Text style={{ fontSize: 14, color: color.colorDeactivate }}>Bài viết đã đăng</Typography.Text>
        <Typography.Title
          className={css.titleAboutCustomer}
          level={5}
          style={{
            margin: '0 0 10px 0',
            textAlign: 'center',
          }}
        >
          3 bài viết đã đăng
        </Typography.Title>
      </CustomCol>
    </CustomRow>
  );
};

//Verified Informations
const VerifiedInformations = () => {
  return (
    <CustomRow gutter={[0, 10]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ margin: '0 0 0 -5px' }}>
          Xác minh
        </Typography.Title>
      </Col>
      <Col span={24} style={{ display: 'flex' }}>
        <AddressCard />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>
          Đã xác minh danh tính
        </Typography.Text>
      </Col>
      <Col span={24} style={{ display: 'flex' }}>
        <Donate />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>
          Đã xác minh thanh toán
        </Typography.Text>
      </Col>
      <Col span={24} style={{ display: 'flex' }}>
        <Envelope />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>
          Đã xác minh địa chỉ email
        </Typography.Text>
      </Col>
      <Col span={24} style={{ display: 'flex' }}>
        <CreditCard />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>
          Chưa xác minh hình thức thanh toán
        </Typography.Text>
      </Col>
    </CustomRow>
  );
};

//Contact Info
const ContactInfo = () => {
  return (
    <CustomRow gutter={[0, 10]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ margin: '0 0 0 -5px' }}>
          Thông tin sơ bộ
        </Typography.Title>
      </Col>
      <Col span={24} style={{ display: 'flex' }}>
        <MapMarkerAlt />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>Địa chỉ</Typography.Text>
      </Col>
      <Col span={24} style={{ display: 'flex' }}>
        <Envelope />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>
          FoodyEmterprise@gmail.com{' '}
        </Typography.Text>
      </Col>
      <Col span={24} style={{ display: 'flex' }}>
        <PhoneAlt />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>Số điện thoại </Typography.Text>
      </Col>
    </CustomRow>
  );
};

const ArticleLeft = () => {
  const jobDetail = useRecoilValue(jobDetailState);

  return (
    <Col md={{ span: 18 }} xs={{ span: 24 }} style={{ paddingRight: 20 }}>
      <HeaderArticle
        lowestIncome={jobDetail.lowestIncome}
        highestIncome={jobDetail.highestIncome}
        proposalSubmitDeadline={jobDetail.proposalSubmitDeadline}
      />
      <CustomDivider />
      <DescriptionsArticle description={jobDetail.description} />
      <CustomDivider />
      <AttachmentArticle />
      <CustomDivider />
      <SkillArticle />
    </Col>
  );
};

const InformationRight = ({ showModalLogin }) => {
  const auth = useRecoilValue(authState);
  return (
    <Col md={{ span: 6 }} xs={{ span: 0 }} style={{ paddingLeft: 10, borderLeft: `1px solid ${color.colorBlueWhale}` }}>
      <Row style={{ justifyContent: 'center' }}>
        {/* Đăng nhập và phân quyền nếu đăng nhập  */}
        <Col style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {auth.email ? <SubmitProposal /> : <ButtonPrimary onClick={showModalLogin}>Đăng nhập</ButtonPrimary>}
        </Col>
        {/* Sau khi được nhận việc  */}
        {/* <Col style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Row>
            <Col span={24}>
              <Typography.Title level={5} style={styles.titleSection}>
                Hợp đồng
              </Typography.Title>
            </Col>
            <CustomCol span={24} style={{ display: 'flex' }}>
              <PaperClipOutlined />
              <Typography.Text
                underline={false}
                style={{ fontWeight: 700, fontSize: 14, marginLeft: 5, color: color.colorPrimary }}
              >
                HopDongLamViec.pdf
              </Typography.Text>
            </CustomCol>
          </Row>
        </Col> */}
        <CustomDivider />
        <AboutCustomer />
        <CustomDivider />
        <VerifiedInformations />
        <CustomDivider />
        <ContactInfo />
      </Row>
    </Col>
  );
};

// khi màn hình <=768px sẽ xuất hiện
const InformationResponsive = ({ showModalLogin }) => {
  return (
    <Col
      md={{ span: 0 }}
      xs={{ span: 24 }}
      style={{
        padding: 10,
        boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
        marginBottom: 30,
        borderRadius: 20,
        backgroundColor: color.colorWhite,
      }}
    >
      <Row className={css.containerInfoRes} style={{ justifyContent: 'center' }}>
        {/* Sau khi được nhận việc  */}
        {/* <Col className={css.cardContract} style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Row>
                  <Col span={24}>
                    <Typography.Title level={5} style={styles.titleSection}>
                      Hợp đồng
                    </Typography.Title>
                  </Col>
                  <CustomCol span={24} style={{ display: 'flex' }}>
                    <PaperClipOutlined />
                    <Typography.Text
                      underline={false}
                      style={{ fontWeight: 700, fontSize: 14, marginLeft: 5, color: color.colorPrimary }}
                    >
                      HopDongLamViec.pdf
                    </Typography.Text>
                  </CustomCol>
                </Row>
              </Col> */}
        {/* <CustomDivider /> */}
        <AboutCustomer />
        <CustomDivider />
        <VerifiedInformations />
        <CustomDivider />
        <ContactInfo />
      </Row>
    </Col>
  );
};

const Details = () => {
  const jobDetail = useRecoilValue(jobDetailState);
  const [, setLoading] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const showModalLogin = () => {
    setOpenLogin(true);
  };
  const handleOkLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenLogin(false);
    }, 3000);
  };
  const handleCancelLogin = () => {
    setOpenLogin(false);
  };

  return (
    <>
      <LoginModal
        visible={openLogin}
        onCancel={handleCancelLogin}
        onOk={handleOkLogin}
        // handleMove={handleMove}
      />
      <Typography.Title level={2} style={styles.titlePost}>
        {jobDetail.title}
      </Typography.Title>
      <CustomCard style={{ marginBottom: 30 }}>
        <CustomRow gutter={[20, 0]}>
          <ArticleLeft jobDetail={jobDetail} />
          <InformationRight showModalLogin={showModalLogin} />
        </CustomRow>
      </CustomCard>
      <InformationResponsive />

      {/* Đăng nhập và phân quyền nếu đăng nhập  */}
      <div
        className={css.buttonLogin}
        style={{ margin: '20px 0', display: 'none', justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <ButtonPrimary onClick={showModalLogin}>Đăng nhập</ButtonPrimary>
      </div>
    </>
  );
};

const styles = {
  titlePost: { padding: '10px 30px', margin: '20px 0' },

  //Article Right
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  headerTitleRight: {
    lineHeight: 'normal',
    margin: 0,
  },

  headerTextRight: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
  },

  titleSection: { margin: '0 0 10px 0' },

  iconBookmark: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Details;
