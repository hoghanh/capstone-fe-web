import { Row, Col, Card, Descriptions, Avatar, Typography } from 'antd';
import { ButtonIcon } from 'components/customize/GlobalCustomize';
import { Pen } from 'components/icon/Icon';
function ClientProfile() {
  return (
    <>
      <div
        className='profile-nav-bg'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1651488829517-95af02975dd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
        }}
      ></div>

      <Card
        className='card-profile-head'
        bodyStyle={{ display: 'none' }}
        style={{ padding: '10px 0' }}
        title={
          <Row justify='space-between' align='middle'>
            <Col span={24} md={12} className='col-info'>
              <Avatar.Group>
                <Avatar
                  size={74}
                  shape='square'
                  src='https://images.unsplash.com/photo-1651488829517-95af02975dd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
                />
                <Typography.Title level={3} style={{ marginLeft: 10 }}>
                  Company
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
            className='header-solid h-full card-profile-information'
            extra={
              <ButtonIcon>
                <Pen />
              </ButtonIcon>
            }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            style={{ padding: 20 }}
          >
            <p className='text-dark'>
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).{' '}
            </p>
            <hr className='my-25' />
            <Descriptions column={1}>
              <Descriptions.Item label='Email'>
                sarahjacob@mail.com
              </Descriptions.Item>
              <Descriptions.Item label='Số điện thoại'>
                01231234123
              </Descriptions.Item>
              <Descriptions.Item label='Website'>
                foody.com.vn
              </Descriptions.Item>
              <Descriptions.Item label='Địa chỉ'>
                Lầu G, Tòa nhà Jabes 1, số 34 đường Cống Quỳnh, Phường Phạm Ngũ
                Lão, Quận 1, Thành phố Hồ Chí Minh, Việt Nam
              </Descriptions.Item>
              <Descriptions.Item label='Mã số thuế'>
                091287349186247
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ClientProfile;
