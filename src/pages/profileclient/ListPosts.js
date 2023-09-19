import { FileTextFilled } from '@ant-design/icons';
import { Col, List, Row, Typography } from 'antd';
import { CustomCard, CustomCol, CustomDivider } from 'components/customize/Layout';
import { BookMarkOutlined } from 'components/icon/Icon';
import React from 'react';
import color from 'styles/color';

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

  ];
  

const ListPosts = () => {
  return (
    <>
      <CustomCard style={{ padding: '10px 0' }}>
        <Row>
          <Col span={24} style={{ padding: '10px 30px' }}>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Các công việc đã đăng
            </Typography.Title>
          </Col>
          <CustomDivider />
          <Col span={24} style={{ padding: 20 }}>
            <Row gutter={[0, 5]}>
              <Col span={22} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Row gutter={[0, 10]}>
                  <Col span={24}>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      Javascript expert with Next.js and React.js expertise
                    </Typography.Title>
                  </Col>
                  <Col span={24}>
                    <Typography.Text level={4}>
                      Lương thoả thuận: 000.000VND - 000.000VND <span>/</span> còn 4 ngày
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <BookMarkOutlined />
              </Col>
              <Col span={24}>
                <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat dui quis quis. Eu
                  dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis. Libero lectus
                  venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis aliquam
                  viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et
                  volutpat dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas
                  dapibus duis. Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac
                  aliquam, id sagittis aliquam viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Viverra eget et volutpat dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget
                  lobortis mauris maecenas dapibus duis. Libero lectus venenatis, cursus id pulvinar donec tincidunt
                  tellus justo. Vitae ac aliquam, id sagittis aliquam viverra dolor blandit.
                </Typography.Text>
              </Col>
              <Col span={24}>
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
              <Col span={24} style={{ padding: '0 20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Typography.Title level={5} style={{ color: color.colorDeactivate, margin: 0 }}>
                  4 người đã ứng tuyển <FileTextFilled />
                </Typography.Title>
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
                    <Typography.Text level={4}>Lương thoả thuận: 000.000VND - 000.000VND / còn 4 ngày</Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Typography.Text style={{ display: 'flex', margin: 0, paddingLeft: 10, paddingRight: 10 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et volutpat dui quis quis. Eu
                  dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas dapibus duis. Libero lectus
                  venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac aliquam, id sagittis aliquam
                  viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra eget et
                  volutpat dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget lobortis mauris maecenas
                  dapibus duis. Libero lectus venenatis, cursus id pulvinar donec tincidunt tellus justo. Vitae ac
                  aliquam, id sagittis aliquam viverra dolor blandit. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Viverra eget et volutpat dui quis quis. Eu dictum turpis ultrices in. Ullamcorper nam eget
                  lobortis mauris maecenas dapibus duis. Libero lectus venenatis, cursus id pulvinar donec tincidunt
                  tellus justo. Vitae ac aliquam, id sagittis aliquam viverra dolor blandit.
                </Typography.Text>
              </Col>
              <Col span={24}>
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
              <Col span={24} style={{ padding: '0 20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Typography.Title level={5} style={{ color: color.colorDeactivate, margin: 0 }}>
                  4 người đã ứng tuyển <FileTextFilled />
                </Typography.Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </CustomCard>
    </>
  );
};

export default ListPosts;
