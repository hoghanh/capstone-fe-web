import { Card, Col, Row, Typography } from 'antd';
import { CustomDivider, CustomRow } from 'components/customize/Layout';
import { PaperClipOutlined } from 'components/icon/Icon';
import React, { useEffect, useState } from 'react';
import color from 'styles/color';
import { get } from 'utils/APICaller';

const tabListNoTitle = [
  {
    key: 'Sent',
    label: 'Đã gửi',
  },
  {
    key: 'Approved',
    label: 'Đã nhận',
  },
  {
    key: 'Declined',
    label: 'Từ chối',
  },
];

const TabSent = () => {

  const [proposals, setProposals] = useState('');
  
  useEffect(() => {
    getProposals();
  }, []);
  
  const getProposals = async () => {
    await get({ endpoint: `/proposal/freelancer/1` })
      .then((response) => {
        const data = response.data;
        const proposals = data.filter((item) => item.status === "Sent");
        setProposals(proposals);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      <Row>
        {proposals && proposals.map((proposal) => {
          return (
            <>
              <Col span={24} style={{ padding: 20 }}>
                <Row gutter={[0, 5]}>
                  <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Row justify={'space-between'}>
                      <Col>
                        <Row gutter={[0, 10]}>
                          <Col span={24}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {proposal.jobs.title}
                            </Typography.Title>
                          </Col>
                          <Col span={24}>
                            <Typography.Text style={{ margin: 0 }}>Công ty cổ phần Foody</Typography.Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>{proposal.description}</Typography.Text>
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
            </>
          );
        })}

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

const TabDeclined = () => {

  const [proposals, setProposals] = useState('');
  
  useEffect(() => {
    getProposals();
  }, []);
  
  const getProposals = async () => {
    await get({ endpoint: `/proposal/freelancer/1` })
      .then((response) => {
        const data = response.data;
        const proposals = data.filter((item) => item.status === "approved");
        setProposals(proposals);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      <Row>
        {proposals && proposals.map((proposal) => {
          return (
            <>
              <Col span={24} style={{ padding: 20 }}>
                <Row gutter={[0, 5]}>
                  <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Row justify={'space-between'}>
                      <Col>
                        <Row gutter={[0, 10]}>
                          <Col span={24}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {proposal.jobs.title}
                            </Typography.Title>
                          </Col>
                          <Col span={24}>
                            <Typography.Text style={{ margin: 0 }}>Công ty cổ phần Foody</Typography.Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>{proposal.description}</Typography.Text>
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
            </>
          );
        })}

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

const TabApproved = () => {

  const [proposals, setProposals] = useState('');
  
  useEffect(() => {
    getProposals();
  }, []);
  
  const getProposals = async () => {
    await get({ endpoint: `/proposal/freelancer/1` })
      .then((response) => {
        const data = response.data;
        const proposals = data.filter((item) => item.status === "declined");
        setProposals(proposals);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      <Row>
        {proposals && proposals.map((proposal) => {
          return (
            <>
              <Col span={24} style={{ padding: 20 }}>
                <Row gutter={[0, 5]}>
                  <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Row justify={'space-between'}>
                      <Col>
                        <Row gutter={[0, 10]}>
                          <Col span={24}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {proposal.jobs.title}
                            </Typography.Title>
                          </Col>
                          <Col span={24}>
                            <Typography.Text style={{ margin: 0 }}>Lương: 400.000VND</Typography.Text>
                          </Col>
                          <Col span={24}>
                            <Typography.Text style={{ margin: 0, paddingRight: 15 }}>Ngày bắt đầu: 23/7/2023</Typography.Text>
                            <Typography.Text style={{ margin: 0 }}>Ngày kết thúc: 24/7/2023</Typography.Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>
                      {proposal.description}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <CustomRow align={'middle'}>
                      <Col>
                        <Typography.Title level={5} style={{ margin: 0, paddingRight: 10 }}>
                          Hợp đồng
                        </Typography.Title>
                      </Col>
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
            </>
          );
        })}

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
  Sent: <TabSent />,
  Approved: <TabApproved />,
  Declined: <TabDeclined />,
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
