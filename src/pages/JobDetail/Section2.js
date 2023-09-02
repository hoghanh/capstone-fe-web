import { Col, Row, Typography } from 'antd';
import { ButtonPrimary } from 'components/customize/GlobalCustomize';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import {  PaperClipOutlined } from 'components/icon/Icon';
import React from 'react';



//Description
const CoverLetter = () => {
  return (
    <CustomRow>
      <Col span={24}>
        <Typography.Title level={5} style={styles.titleSection}>Đơn xin việc</Typography.Title>
      </Col>
      <Col span={24}>
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
        </Row>
      </Col>
    </CustomRow>
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

// Header section
const HeaderSection = () => {
  return (
   <>
      <Row justify={'space-between'} style={{ padding: 10 }}>
        <Col>
          <Row>
            <CustomCol>
              <Typography.Title level={3} style={styles.titleHeader}>
                Đề xuất
              </Typography.Title>
            </CustomCol>
          </Row>
        </Col>
        <Col>
          <ButtonPrimary>Xóa đề xuất</ButtonPrimary>
        </Col>
      </Row>
   </>
  );
};

//Body Section
const BodySection = () => {
  return (
    <Row>
        <CustomDivider />
      <Col span={24}>
        <CoverLetter />
      </Col>
      <CustomDivider />
      <Col span={24}>
        <AttachmentArticle />
      </Col>
    </Row>
  );
};

const Section2 = () => {
  return (
    <>
      <CustomCard style={{ padding: 20 }}>
        {/* Header section */}
        <HeaderSection />
        {/* Body Section */}
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
    color: '#656565',
    paddingLeft: 10,
    marginBottom: 20,
  },

  titleSection: { margin: '0 0 10px 0' },

};


export default Section2;
