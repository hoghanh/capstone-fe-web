import React, {useState, useEffect} from 'react';
import { Layout, Row, Col, Typography, Button } from 'antd';
import { ClockCircleFilled } from '@ant-design/icons';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import {
  AddressCard,
  BookMarkOutlined,
  CreditCard,
  Donate,
  Envelope,
  MapMarkerAlt,
  PaperClipOutlined,
  PhoneAlt,
} from 'components/icon/Icon';
import color from 'styles/color';
import AppBreadcrumb from 'components/AppBreadcrumb';
import { get } from 'utils/APICaller';

const Skill = ['Javascript', 'Html', 'NextJS', 'ReactJS'];

//Header Article right
const HeaderArticle = () => {
  return (
    <CustomRow>
      <CustomCol span={11} style={styles.headerRight}>
        <Typography.Title level={3} style={styles.headerTitleRight}>
          Chi tiết dự án
        </Typography.Title>
        <Typography.Text style={styles.headerTextRight}>5 Freelancer đã ứng tuyển</Typography.Text>
      </CustomCol>
      <CustomCol
        span={11}
        style={{
          ...styles.headerRight,
          alignItems: 'flex-end',
        }}
      >
        <Typography.Title level={3} style={styles.headerTitleRight}>
          000.000VND - 000.000VND
        </Typography.Title>
        <div>
          <ClockCircleFilled />
          <Typography.Text style={{ ...styles.headerTextRight, marginLeft: 10 }}>
            Thời gian ứng tuyển còn lại 4 ngày
          </Typography.Text>
        </div>
      </CustomCol>
      <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BookMarkOutlined />
      </Col>
    </CustomRow>
  );
};

//Description
const DescriptionsArticle = () => {
  return (
    <Row>
      <CustomCol span={24}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
              Lorem ipsum dolor sit amet consectetur. Malesuada viverra risus condimentum integer tortor. Tempus cursus
              risus commodo lorem elit id. Sed et dolor dictum faucibus. Enim tellus et egestas nisi maecenas turpis
              nunc. Turpis eu fermentum pretium purus sapien purus. Mi sollicitudin lacus mauris eu pellentesque amet
              iaculis dignissim sit. Neque morbi in nec viverra id integer. Donec id gravida elementum arcu in aliquam
              nullam nibh sit.
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
              Cursus diam natoque orci pulvinar elit. Suspendisse sit nunc velit mauris interdum laoreet faucibus nunc
              ut. Diam posuere elementum justo tristique neque at in nisl aliquam. Vitae mi at morbi pretium. Facilisis
              at egestas facilisis cras. Praesent at dolor lectus vivamus ipsum at platea ut ornare.
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
              Urna molestie lobortis integer adipiscing pretium. Gravida adipiscing elementum ac quam. Porttitor odio
              viverra convallis egestas sit. Est porttitor mauris commodo parturient pharetra. Mauris sem netus vitae
              volutpat orci. Malesuada amet mi bibendum nulla in diam. Ipsum odio et dignissim molestie commodo
              adipiscing feugiat aliquam. Donec facilisis ac viverra in mattis ultrices. Malesuada turpis ultrices
              lobortis aliquam malesuada. Urna duis sed sit pellentesque facilisi id mauris id. Cursus proin tortor eu
              vitae pellentesque quam ut et blandit. Pulvinar sed mattis nulla eget ipsum nam facilisi venenatis.
              Rhoncus massa elementum vitae eget non consectetur nec eget. Feugiat eu ac egestas dui. Cursus purus
              pulvinar nisl nulla et tristique dictum.
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
              Urna molestie lobortis integer adipiscing pretium. Gravida adipiscing elementum ac quam. Porttitor odio
              viverra convallis egestas sit. Est porttitor mauris commodo parturient pharetra. Mauris sem netus vitae
              volutpat orci. Malesuada amet mi bibendum nulla in diam. Ipsum odio et dignissim molestie commodo
              adipiscing feugiat aliquam. Donec facilisis ac viverra in mattis ultrices. Malesuada turpis ultrices
              lobortis aliquam malesuada. Urna duis sed sit pellentesque facilisi id mauris id. Cursus proin tortor eu
              vitae pellentesque quam ut et blandit. Pulvinar sed mattis nulla eget ipsum nam facilisi venenatis.
              Rhoncus massa elementum vitae eget non consectetur nec eget. Feugiat eu ac egestas dui. Cursus purus
              pulvinar nisl nulla et tristique dictum.
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
        <Typography.Title level={5} style={styles.titleSection}>Tệp tin đính kèm</Typography.Title>
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
    <CustomRow gutter={[0, 10]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Yêu cầu kỹ năng
        </Typography.Title>
      </Col>
      <CustomCol span={24} style={{ display: 'flex', gap: 15, flexDirection: 'row' }}>
        {Skill.map((item) => {
          return (
            <Typography.Text
              key={item}
              style={{
                fontWeight: 700,
                fontSize: 14,
                padding: '5px 10px',
                backgroundColor: color.colorBluishCyan,
                borderRadius: 25,
              }}
            >
              {item}
            </Typography.Text>
          );
        })}
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
        <Typography.Title level={5} style={{margin: '0 0 0 -5px' }}>
          Xác minh
        </Typography.Title>
      </Col>
      <CustomCol span={24} style={{ display: 'flex' }}>
        <AddressCard />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>
          Đã xác minh danh tính
        </Typography.Text>
      </CustomCol>
      <CustomCol span={24} style={{ display: 'flex' }}>
        <Donate />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>
          Đã xác minh thanh toán
        </Typography.Text>
      </CustomCol>
      <CustomCol span={24} style={{ display: 'flex' }}>
        <Envelope />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>
          Đã xác minh địa chỉ email
        </Typography.Text>
      </CustomCol>
      <CustomCol span={24} style={{ display: 'flex' }}>
        <CreditCard />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>
          Chưa xác minh hình thức thanh toán
        </Typography.Text>
      </CustomCol>
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
      <CustomCol span={24} style={{ display: 'flex' }}>
        <MapMarkerAlt />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>Địa chỉ</Typography.Text>
      </CustomCol>
      <CustomCol span={24} style={{ display: 'flex' }}>
        <Envelope />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>
          FoodyEmterprise@gmail.com{' '}
        </Typography.Text>
      </CustomCol>
      <CustomCol span={24} style={{ display: 'flex' }}>
        <PhoneAlt />
        <Typography.Text style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}>Số điện thoại </Typography.Text>
      </CustomCol>
    </CustomRow>
  );
};

const ArticleRight = () => {
  return (
    <Col span={18} style={{ paddingRight: 20 }}>
      <HeaderArticle />
      <CustomDivider />
      <DescriptionsArticle />
      <CustomDivider />
      <AttachmentArticle />
      <CustomDivider />
      <SkillArticle />
    </Col>
  );
};

const InformationLeft = () => {
  return (
    <Col span={6} style={{ paddingLeft: 10, borderLeft: `1px solid ${color.colorBlueWhale}` }}>
      <Row style={{ justifyContent: 'center' }}>
        {/* Đăng nhập và phân quyền nếu đăng nhập  */}
        <Col style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            style={{
              fontWeight: 700,
              fontSize: 16,
              height: 'auto',
              padding: '12px 32px',
              backgroundColor: color.colorBluishCyan,
              borderRadius: 25,
              color: color.colorBlueWhale,
              border: 0,
            }}
          >
            Đăng nhập
          </Button>
        </Col>
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

const JobDetail = () => {

  const [jobdetail, setJobDetail] = useState('');

  useEffect(() => {
    fetchJobDetail();
  }, []);

  const fetchJobDetail = async () => {
    await get({ endpoint: "/accounts/profile/1" })
      .then((response) => {
        const data = response.data;
        // console.log(data);
        setJobDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Layout.Content style={styles.containerBody}>
        <AppBreadcrumb />
        <Typography.Title level={2} style={styles.titlePost}>
          Javascript expert with Next.js and React.js expertise
        </Typography.Title>
        <CustomCard>
          <CustomRow gutter={[20, 0]}>
            <ArticleRight />
            <InformationLeft />
          </CustomRow>
        </CustomCard>
      </Layout.Content>
    </>
  );
};

//styles
const styles = {
  //Toàn trang
  containerBody: { maxWidth: 1080, margin: '0 auto' },
  titlePost: { padding: '10px 30px', margin: '20px 0' },

  //Article Right
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  headerTitleRight: {
    lineHeight: 'normal',
    margin: '0 0 10px 0',
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

export default JobDetail;
