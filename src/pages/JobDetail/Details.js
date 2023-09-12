import { ClockCircleFilled } from '@ant-design/icons';
import { Col, List, Row, Typography } from 'antd';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import { AddressCard, BookMarkOutlined, CreditCard, Donate, Envelope, MapMarkerAlt, PaperClipOutlined, PhoneAlt } from 'components/icon/Icon';
import LoginModal from 'layout/header/LoginModal';
import React, { useState } from 'react';
import color from 'styles/color';
import css from './jobDetail.module.css';
import './jobDetail.module.css';
import { ButtonPrimary } from 'components/customize/GlobalCustomize';
import { CalculateDaysLeft, FormatVND } from 'components/formatter/format';

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

//Header Article right
const HeaderArticle = ({lowestIncome, highestIncome, proposalSubmitDeadline}) => {
  return (
    <>
      <Row>
        <Col sm={{ span: 24 }} xs={{ span: 0 }}>
          <CustomRow>
            <CustomCol span={11} style={styles.headerRight}>
              <Typography.Title level={3} style={styles.headerTitleRight}>
                Chi tiết dự án
              </Typography.Title>
              <Typography.Text style={styles.headerTextRight}>7 Freelancer đã ứng tuyển</Typography.Text>
            </CustomCol>
            <CustomCol
              span={11}
              style={{
                ...styles.headerRight,
                alignItems: 'flex-end',
              }}
            >
              <Typography.Title level={4} style={styles.headerTitleRight}>
                {FormatVND(lowestIncome)} - {FormatVND(highestIncome)}
              </Typography.Title>
              <div>
                <ClockCircleFilled />
                <Typography.Text style={{ ...styles.headerTextRight, marginLeft: 10 }}>
                  {CalculateDaysLeft(proposalSubmitDeadline)}
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
            <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '10px 0px' }}>
              <BookMarkOutlined />
            </Col>
          </CustomRow>
        </Col>
      </Row>
    </>
  );
};

//Description
const DescriptionsArticle = ({description}) => {
  return (
    <Row>
      <CustomCol span={24}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
              {description}
            </Typography.Text>
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
        <Typography.Text  underline={true} style={{ fontWeight: 700, fontSize: 14, marginLeft: 5 }}>
          fileAttachName.doc
        </Typography.Text>
      </CustomCol>
    </CustomRow>
  );
};

//Skill
const SkillArticle = () => {
  return (
    <CustomRow className='skillArticle' gutter={[0, 10]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Yêu cầu kỹ năng
        </Typography.Title>
      </Col>
      <CustomCol span={24}>
        <List
        style={{overflowX: 'auto'}}
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
        <Typography.Title className={css.titleAboutCustomer}
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
        <Typography.Title className={css.titleAboutCustomer}
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

const ArticleLeft = ({jobDetail}) => {
  return (
    <Col md={{span: 18}} xs={{span: 24}}  style={{ paddingRight: 20 }}>
      <HeaderArticle lowestIncome={jobDetail.lowestIncome} highestIncome={jobDetail.highestIncome} proposalSubmitDeadline={jobDetail.proposalSubmitDeadline} />
      <CustomDivider />
      <DescriptionsArticle  description={(jobDetail.description)}/>
      <CustomDivider />
      <AttachmentArticle />
      <CustomDivider />
      <SkillArticle />
    </Col>
  );
};

const InformationRight = ({ showModalLogin }) => {
  return (
    <Col md={{span: 6}} xs={{span: 0}} style={{ paddingLeft: 10, borderLeft: `1px solid ${color.colorBlueWhale}` }}>
      <Row style={{ justifyContent: 'center' }}>
        {/* Đăng nhập và phân quyền nếu đăng nhập  */}
        <Col style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ButtonPrimary onClick={showModalLogin}>
            Đăng nhập
          </ButtonPrimary>
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
          <Col md={{span: 0}} xs={{span: 24}} style={{ padding: 10 ,boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)', marginBottom: 30, borderRadius: 20, backgroundColor: color.colorWhite }}>
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

const Details = ({jobDetail}) => {
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
      <div className={css.buttonLogin} style={{ margin: '20px 0', display: 'none', justifyContent: 'flex-end', alignItems: 'center' }}>
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
    margin: 0
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
