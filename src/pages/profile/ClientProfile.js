import { Row, Col, Card, Descriptions, Avatar, Typography } from 'antd';
import { ButtonIcon } from 'components/customize/GlobalCustomize';
import { Pen } from 'components/icon/Icon';
import Loading from 'components/loading/loading';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, clientProfile } from 'recoil/atom';
import { get } from 'utils/APICaller';

function ClientProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useRecoilState(clientProfile);

  const auth = useRecoilValue(authState);

  useEffect(() => {
    setIsLoading(true);
    fetchProfile();
  }, []);

  function fetchProfile() {
    get({ endpoint: `/client/profile/${auth.id}` })
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div
        className="profile-nav-bg"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1651488829517-95af02975dd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
        }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: 'none' }}
        style={{ padding: '10px 0' }}
        title={
          <Row justify="space-between" align="middle">
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={user?.accounts.image} />
                <Typography.Title level={3} style={{ marginLeft: 10 }}>
                  {user?.accounts.name}
                </Typography.Title>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row>
        <Col md={24}>
          <Card
            bordered={false}
            title={<Typography.Title level={3}>Hồ sơ cá nhân</Typography.Title>}
            className="header-solid h-full card-profile-information"
            extra={
              <Link to={'/client/profile/edit'}>
                <ButtonIcon>
                  <Pen />
                </ButtonIcon>
              </Link>
            }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            style={{ padding: 20 }}
          >
            <p className="text-dark">{user?.introduction}</p>
            <hr className="my-25" />
            <Descriptions column={1}>
              <Descriptions.Item label="Email">
                {user?.accounts.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {user?.accounts.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Website">
                {user?.companyWebsite}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {user?.accounts.address}
              </Descriptions.Item>
              <Descriptions.Item label="Mã số thuế">
                {user?.taxCode}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ClientProfile;
