import { Card, Col, Row, Typography } from 'antd';
import { ButtonPrimary } from 'components/customize/GlobalCustomize';
import { CustomDivider, CustomRow } from 'components/customize/Layout';
import { PaperClipOutlined, Trash } from 'components/icon/Icon';
import React, { useState } from 'react';
import color from 'styles/color';

const tabListNoTitle = [
  {
    key: 'Sent',
    label: 'Đã gửi đi',
  },
  {
    key: 'Interviewed',
    label: 'Phỏng vấn',
  },
  {
    key: 'Reject',
    label: 'Từ chối',
  },
];

const ContentSent = () => {
  return (
    <>
      <Row>
        <Col span={24} style={{ padding: 20 }}>
          <Row gutter={[0, 5]}>
            <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Row justify={'space-between'}>
                <Col>
                  <Row gutter={[0, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Javascript expert with Next.js and React.js expertise
                      </Typography.Title>
                    </Col>
                    <Col span={24}>
                      <Typography.Text style={{ margin: 0 }}>Công ty cổ phần Foody</Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <ButtonPrimary style={{ backgroundColor: 'red', width: 45, height: 45, padding: 10 }}>
                    <Trash />
                  </ButtonPrimary>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat dui quis quis. Eu
                dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis. Libero lectus
                venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis aliquam
                viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat
                dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis.
                Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis
                aliquam viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et
                volutpat dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas
                dapibus duis. Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac
                aliquam, id sagittis aliquam viverra dolor blandit.
              </Typography.Text>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text
                    underline={true}
                    style={{ fontWeight: 700, fontSize: 14, marginLeft: 5, color: color.colorPrimary }}
                  >
                    fileAttachName.doc
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
        <CustomDivider />
        <Col span={24} style={{ padding: 20 }}>
          <Row gutter={[0, 5]}>
            <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Row justify={'space-between'}>
                <Col>
                  <Row gutter={[0, 10]}>
                    <Col span={24}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Javascript expert with Next.js and React.js expertise
                      </Typography.Title>
                    </Col>
                    <Col span={24}>
                      <Typography.Text style={{ margin: 0 }}>Công ty cổ phần Foody</Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <ButtonPrimary style={{ backgroundColor: 'red', width: 45, height: 45, padding: 10 }}>
                    <Trash />
                  </ButtonPrimary>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat dui quis quis. Eu
                dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis. Libero lectus
                venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis aliquam
                viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat
                dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis.
                Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis
                aliquam viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et
                volutpat dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas
                dapibus duis. Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac
                aliquam, id sagittis aliquam viverra dolor blandit.
              </Typography.Text>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text
                    underline={true}
                    style={{ fontWeight: 700, fontSize: 14, marginLeft: 5, color: color.colorPrimary }}
                  >
                    fileAttachName.doc
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const ContentInterviewed = () => {
  return (
    <>
      <Row>
        <Col span={24} style={{ padding: 20 }}>
          <Row gutter={[0, 5]}>
            <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ margin: 0 }}>Công ty cổ phần Foody</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat dui quis quis. Eu
                dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis. Libero lectus
                venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis aliquam
                viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat
                dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis.
                Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis
                aliquam viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et
                volutpat dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas
                dapibus duis. Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac
                aliquam, id sagittis aliquam viverra dolor blandit.
              </Typography.Text>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text
                    underline={true}
                    style={{ fontWeight: 700, fontSize: 14, marginLeft: 5, color: color.colorPrimary }}
                  >
                    fileAttachName.doc
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
        <CustomDivider />
        <Col span={24} style={{ padding: 20 }}>
          <Row gutter={[0, 5]}>
            <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ margin: 0 }}>Công ty cổ phần Foody</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat dui quis quis. Eu
                dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis. Libero lectus
                venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis aliquam
                viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat
                dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis.
                Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis
                aliquam viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et
                volutpat dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas
                dapibus duis. Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac
                aliquam, id sagittis aliquam viverra dolor blandit.
              </Typography.Text>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text
                    underline={true}
                    style={{ fontWeight: 700, fontSize: 14, marginLeft: 5, color: color.colorPrimary }}
                  >
                    fileAttachName.doc
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const ContentReject = () => {
  return (
    <>
      <Row>
        <Col span={24} style={{ padding: 20 }}>
          <Row gutter={[0, 5]}>
            <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ margin: 0 }}>Công ty cổ phần Foody</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat dui quis quis. Eu
                dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis. Libero lectus
                venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis aliquam
                viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat
                dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis.
                Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis
                aliquam viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et
                volutpat dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas
                dapibus duis. Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac
                aliquam, id sagittis aliquam viverra dolor blandit.
              </Typography.Text>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text
                    underline={true}
                    style={{ fontWeight: 700, fontSize: 14, marginLeft: 5, color: color.colorPrimary }}
                  >
                    fileAttachName.doc
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
        <CustomDivider />
        <Col span={24} style={{ padding: 20 }}>
          <Row gutter={[0, 5]}>
            <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ margin: 0 }}>Công ty cổ phần Foody</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat dui quis quis. Eu
                dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis. Libero lectus
                venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis aliquam
                viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat
                dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis.
                Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis
                aliquam viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et
                volutpat dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas
                dapibus duis. Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac
                aliquam, id sagittis aliquam viverra dolor blandit.
              </Typography.Text>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text
                    underline={true}
                    style={{ fontWeight: 700, fontSize: 14, marginLeft: 5, color: color.colorPrimary }}
                  >
                    fileAttachName.doc
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const contentListNoTitle = {
  Sent: <ContentSent />,
  Interviewed: <ContentInterviewed />,
  Reject: <ContentReject />,
};

const ProposalsTracking = () => {
  const [activeTabKey2, setActiveTabKey2] = useState('Sent');
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <Card style={{ padding: 0, marginBottom: 30 }}>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <Typography.Title level={3} style={{ margin: '20px 30px 10px' }}>
            Đề xuất của tôi
          </Typography.Title>
        </Col>
        <Col className="trackingJobs" span={24}>
          <Card
            style={{
              width: '100%',
              border: 'transparent',
            }}
            headStyle={{
              color: color.colorBlack,
              fontWeight: 'bold',
              paddingLeft: 30,
              paddingRight: 30,
              margin: '10px 0',
              borderBottom: '0.5px solid #000 !important',
            }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey2}
            onTabChange={onTab2Change}
          >
            {contentListNoTitle[activeTabKey2]}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ProposalsTracking;
