import { Col, Grid, Image, Row, Typography } from "antd";
// import confirm from 'antd/es/modal/confirm';
import { CustomCard, CustomCol } from "components/customize/Layout";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get } from "utils/APICaller";

const Overview = () => {
  const { useBreakpoint } = Grid;
  const { sm } = useBreakpoint();
  const [clientAccount, setClientAccount] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getClient();
    }
  }, [id]);

  const getClient = () => {
    get({ endpoint: `/client/profile/${id}}` })
      .then((response) => {
        const data = response.data;
        setClientAccount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CustomCard
        style={{
          paddingRight: 0,
          paddingLeft: 0,
          paddingBottom: 0,
          paddingTop: 0,
          marginBottom: 30,
        }}
      >
        <Row justify={"space-between"}>
          <Col
            span={24}
            lg={{ span: 14 }}
            sm={{ span: 13 }}
            style={{
              paddingRight: 25,
              paddingLeft: 25,
              paddingBottom: 25,
              paddingTop: 25,
            }}
          >
            <Row>
              <Col span={24}>
                <Row>
                  <Col
                    span={4}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <Image
                      width={100}
                      src={clientAccount?.accounts.image}
                      alt="Apofoitisi logo"
                      preview={true}
                      style={{ borderRadius: "50%" }}
                    />
                  </Col>
                  <CustomCol
                    span={19}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography.Title level={2} style={styles.name}>
                      {clientAccount?.accounts.name}
                    </Typography.Title>
                  </CustomCol>
                </Row>
              </Col>
              <Col span={24}>
                <Typography.Title
                  level={3}
                  style={{
                    margin: 0,
                    paddingRight: 20,
                    paddingLeft: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                >
                  Giới thiệu
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Typography.Paragraph
                  style={{
                    margin: 0,
                    paddingRight: 20,
                    paddingLeft: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                >
                  {clientAccount?.introduction}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Col>
          <Col
            span={24}
            lg={{ span: 10 }}
            sm={{ span: 11 }}
            style={{
              borderLeft: sm ? "1px solid #656565" : "",
              paddingTop: 30,
              paddingBottom: 30,
              paddingRight: 20,
              paddingLeft: 20,
            }}
          >
            <Row gutter={[0, 10]}>
              <Col>
                <Row gutter={[0, 10]}>
                  <Col>
                    <Row align={"middle"} gutter={[30, 10]}>
                      <Col>
                        <Typography.Title level={3} style={{ margin: 0 }}>
                          Thông tin cá nhân
                        </Typography.Title>
                      </Col>
                    </Row>
                  </Col>
                  <CustomCol span={24}>
                    <Row gutter={[15, 15]}>
                      <Col>
                        <Row align={"middle"} gutter={[30, 10]}>
                          <Col>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              Email
                            </Typography.Title>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Typography.Text style={{ letterSpacing: 1 }}>
                          {clientAccount?.accounts.email}
                        </Typography.Text>
                      </Col>
                    </Row>
                  </CustomCol>
                  <CustomCol span={24}>
                    <Row gutter={[15, 15]}>
                      <Col>
                        <Row align={"middle"} gutter={[30, 10]}>
                          <Col>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              Số điện thoại
                            </Typography.Title>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Typography.Text style={{ letterSpacing: 1 }}>
                          {clientAccount?.accounts.phone}
                        </Typography.Text>
                      </Col>
                    </Row>
                  </CustomCol>
                  <CustomCol span={24}>
                    <Row gutter={[15, 15]}>
                      <Col>
                        <Row align={"middle"} gutter={[30, 10]}>
                          <Col>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              Website
                            </Typography.Title>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Link to={clientAccount?.companyWebsite} target='_blank'>
                          <Typography.Text style={{ letterSpacing: 1 }}>
                            {clientAccount?.companyWebsite}
                          </Typography.Text>
                        </Link>
                      </Col>
                    </Row>
                  </CustomCol>
                  <CustomCol span={24}>
                    <Row gutter={[15, 15]}>
                      <Col>
                        <Row align={"middle"} gutter={[30, 10]}>
                          <Col span={24}>
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              Địa chỉ
                            </Typography.Title>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Typography.Text>
                          {clientAccount?.accounts.address}
                        </Typography.Text>
                      </Col>
                    </Row>
                  </CustomCol>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </CustomCard>
    </>
  );
};

const styles = {
  name: {
    margin: 0,
  },

  address: {
    color: "#656565",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 20,
  },
};

export default Overview;
