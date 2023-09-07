import { Card, Col, Row, Typography } from 'antd';
import { CustomCard, CustomDivider, CustomRow } from 'components/customize/Layout';
import { PaperClipOutlined, Star } from 'components/icon/Icon';
import React, { useState } from 'react';
import color from 'styles/color';

const tabListNoTitle = [
  {
    key: 'Processing',
    label: 'Đang làm',

  },
  {
    key: 'Accomplished',
    label: 'Đã hoàn thành',
  },

];

const ContentProcessing = () =>{
  return (
   <>
      <Row >
        <Col span={24} style={{padding: 20}}>
          <Row gutter={[0, 5]}>
              <Col span={24} style={{padding: '0 10px'}}>
               <Row gutter={[0, 10]}> 
                  <Col span={24}>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      Javascript expert with Next.js and React.js expertise
                    </Typography.Title>
                  </Col>
                  <Col span={24}>
                    <Typography.Text style={{ margin: 0 }}>Lương: 000.000VND</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text style={{ margin: 0 }}>Ngày bắt đầu: 23/07/2023</Typography.Text>
                  </Col>
               </Row>
              </Col>
            <Col span={24}>
              <Typography.Text style={{ display: 'flex', margin: 0, padding: '0 10px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat dui quis quis. Eu dictum
                turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis. Libero lectus venenatis,
                cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis aliquam viverra dolor
                blandit... more
              </Typography.Text>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <Typography.Title level={5} style={{ margin: 0, marginRight: 10}}>
                    File đính kèm:
                  </Typography.Title>
                </Col>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text underline={true} style={{ fontWeight: 700, fontSize: 14, marginLeft: 5 }}>
                    fileAttachName.doc
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
            <CustomRow align={'middle'}>
                <Col>
                  <Typography.Title level={5} style={{ margin: 0, marginRight: 10}}>
                    Hợp đồng:
                  </Typography.Title>
                </Col>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text underline={true} style={{ fontWeight: 700, fontSize: 14, marginLeft: 5 }}>
                    hopdong.pdf
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
        <CustomDivider/>
        <Col span={24} style={{padding: 20}}>
          <Row gutter={[0, 5]}>
              <Col span={24} style={{padding: '0 10px'}}>
               <Row gutter={[0, 10]}> 
                  <Col span={24}>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      Javascript expert with Next.js and React.js expertise
                    </Typography.Title>
                  </Col>
                  <Col span={24}>
                    <Typography.Text style={{ margin: 0 }}>Lương: 000.000VND</Typography.Text>
                  </Col>
                  <Col span={24}>
                    <Typography.Text style={{ margin: 0 }}>Ngày bắt đầu: 23/07/2023</Typography.Text>
                  </Col>
               </Row>
              </Col>
            <Col span={24}>
              <Typography.Text style={{ display: 'flex', margin: 0, padding: '0 10px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat dui quis quis. Eu dictum
                turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis. Libero lectus venenatis,
                cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis aliquam viverra dolor
                blandit... more
              </Typography.Text>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <Typography.Title level={5} style={{ margin: 0, marginRight: 10}}>
                    File đính kèm:
                  </Typography.Title>
                </Col>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text underline={true} style={{ fontWeight: 700, fontSize: 14, marginLeft: 5 }}>
                    fileAttachName.doc
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
            <CustomRow align={'middle'}>
                <Col>
                  <Typography.Title level={5} style={{ margin: 0, marginRight: 10}}>
                    Hợp đồng:
                  </Typography.Title>
                </Col>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text underline={true} style={{ fontWeight: 700, fontSize: 14, marginLeft: 5 }}>
                    hopdong.pdf
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
      </Row>
   </>
  );
}

const ContentAccomplished = () =>{
  return (
    <>
      <Row>
        <Col span={24} style={{ padding: 20 }}>
          <Row gutter={[0, 5]}>
            <Col span={24} style={{ padding: '0 10px' }}>
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ margin: 0 }}>Lương: 000.000VND</Typography.Text>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ margin: 0, paddingRight: 20 }}>Ngày bắt đầu: 23/07/2023</Typography.Text>
                  <Typography.Text style={{ margin: 0 }}>Ngày hoàn thành: 23/08/2023</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <Typography.Title level={5} style={{ margin: 0, marginRight: 10 }}>
                    Hợp đồng:
                  </Typography.Title>
                </Col>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text underline={true} style={{ fontWeight: 700, fontSize: 14, marginLeft: 5 }}>
                    hopdong.pdf
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Col>
                  <Typography.Title level={5} style={{ margin: 0, marginRight: 10 }}>
                    Đánh giá:
                  </Typography.Title>
                </Col>
                <Col>
                  <Typography.Text style={{ fontSize: 14, marginLeft: 5, fontStyle: 'italic' }}>
                    "Great work!"
                  </Typography.Text>
                </Col>
              </CustomRow>
              <CustomRow align={'middle'} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Col style={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                  <div style={{ display: 'flex', direction: 'row', alignItems: 'center', padding: 5, marginRight: 5 }}>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                  <Typography.Text style={{ fontSize: 16, marginTop: 2 }}>5.00</Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
        <CustomDivider />
        <Col span={24} style={{ padding: 20 }}>
          <Row gutter={[0, 5]}>
            <Col span={24} style={{ padding: '0 10px' }}>
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ margin: 0 }}>Lương: 000.000VND</Typography.Text>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ margin: 0, paddingRight: 20 }}>Ngày bắt đầu: 23/07/2023</Typography.Text>
                  <Typography.Text style={{ margin: 0 }}>Ngày hoàn thành: 23/08/2023</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <Typography.Title level={5} style={{ margin: 0, marginRight: 10 }}>
                    Hợp đồng:
                  </Typography.Title>
                </Col>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text underline={true} style={{ fontWeight: 700, fontSize: 14, marginLeft: 5 }}>
                    hopdong.pdf
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Col>
                  <Typography.Title level={5} style={{ margin: 0, marginRight: 10 }}>
                    Đánh giá:
                  </Typography.Title>
                </Col>
                <Col>
                  <Typography.Text style={{ fontSize: 14, marginLeft: 5, fontStyle: 'italic' }}>
                    "Great work!"
                  </Typography.Text>
                </Col>
              </CustomRow>
              <CustomRow align={'middle'} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Col style={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                  <div style={{ display: 'flex', direction: 'row', alignItems: 'center', padding: 5, marginRight: 5 }}>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                  <Typography.Text style={{ fontSize: 16, marginTop: 2 }}>5.00</Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
        <CustomDivider />
        <Col span={24} style={{ padding: 20 }}>
          <Row gutter={[0, 5]}>
            <Col span={24} style={{ padding: '0 10px' }}>
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ margin: 0 }}>Lương: 000.000VND</Typography.Text>
                </Col>
                <Col span={24}>
                  <Typography.Text style={{ margin: 0, paddingRight: 20 }}>Ngày bắt đầu: 23/07/2023</Typography.Text>
                  <Typography.Text style={{ margin: 0 }}>Ngày hoàn thành: 23/08/2023</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'}>
                <Col>
                  <Typography.Title level={5} style={{ margin: 0, marginRight: 10 }}>
                    Hợp đồng:
                  </Typography.Title>
                </Col>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  <Typography.Text underline={true} style={{ fontWeight: 700, fontSize: 14, marginLeft: 5 }}>
                    hopdong.pdf
                  </Typography.Text>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow align={'middle'} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Col>
                  <Typography.Title level={5} style={{ margin: 0, marginRight: 10 }}>
                    Đánh giá:
                  </Typography.Title>
                </Col>
                <Col>
                  <Typography.Text style={{ fontSize: 14, marginLeft: 5, fontStyle: 'italic' }}>
                    "Great work!"
                  </Typography.Text>
                </Col>
              </CustomRow>
              <CustomRow align={'middle'} style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Col style={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
                  <div style={{ display: 'flex', direction: 'row', alignItems: 'center', padding: 5, marginRight: 5 }}>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                  </div>
                  <Typography.Text style={{ fontSize: 16, marginTop: 2 }}>5.00</Typography.Text>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

const contentListNoTitle = {
  Processing: <ContentProcessing/>,
  Accomplished: <ContentAccomplished/>,
};

const JobStatus = () => {
  const [activeTabKey2, setActiveTabKey2] = useState('Processing');
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  return (
    <CustomCard style={{ padding: 0, marginBottom: 30}}>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <Typography.Title level={3} style={{ margin: '20px 30px 10px' }}>
            Các Công Việc của Tôi
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
              padding: '0 30px',
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
    </CustomCard>
  );
};

export default JobStatus;
