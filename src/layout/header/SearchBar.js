import React, { useState } from 'react';
import {
  Input,
  Image,
  Typography,
  Row,
  Col,
  Button,
  Layout,
  Grid,
  Modal,
  Divider,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import GoogleLoginButton from '../../components/button/GoogleLoginButton';
import Link from 'antd/es/typography/Link';
import searchbar from '../../styles/searchbar';

function SearchBar() {
  const { useBreakpoint } = Grid;
  const { xs } = useBreakpoint();
  const [loading, setLoading] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const showModalRegister = () => {
    setOpenRegister(true);
  };
  const handleOkRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenRegister(false);
    }, 3000);
  };
  const handleCancelRegister = () => {
    setOpenRegister(false);
  };

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

  if (xs) {
    return (
      <Layout.Header style={{ background: '#ffffff' }}>
        <Row justify='center' align='middle'>
          <Col flex={1}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              FPT-SEP
            </Typography.Title>
          </Col>

          <Col flex={1}>
            <Input
              placeholder='Search... '
              prefix={<SearchOutlined />}
              style={{ width: 150 }}
            />
          </Col>
        </Row>
      </Layout.Header>
    );
  }

  return (
    <Layout.Header style={{ background: '#ffffff' }}>
      <Modal
        open={openRegister}
        title='Title'
        onOk={handleOkRegister}
        onCancel={handleCancelRegister}
        footer={[
          <Button key='back' onClick={handleCancelRegister}>
            Return
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={handleOkRegister}
          >
            Submit
          </Button>,
          <Button
            key='link'
            href='https://google.com'
            type='primary'
            loading={loading}
            onClick={handleOkRegister}
          >
            Search on Google
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal
        width={450}
        open={openLogin}
        onOk={handleOkLogin}
        onCancel={handleCancelLogin}
        footer={
          <Typography
            style={{
              textAlign: 'center',
              paddingTop: 30,
              paddingBottom: 30,
            }}
          >
            Not a member yet? <Link>Join now</Link>
          </Typography>
        }
        bodyStyle={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '0 16px 10px 16px',
          gap: 10,
        }}
      >
        <Typography.Title level={4} style={{ textAlign: 'center' }}>
          Login to FPT-SEP
        </Typography.Title>
        <GoogleLoginButton />
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Image
          width={34}
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          alt='Apofoitisi logo'
          preview={false}
        />
        <Typography.Title level={4} style={{ margin: 0 }}>
          FPT-SEP
        </Typography.Title>
        <Input
          placeholder='Tìm kiếm'
          prefix={<SearchOutlined style={{ color: '#828282' }} />}
          style={{ padding: 10, borderRadius: 8, width: 477 }}
        />
        <Typography.Title level={4} style={{ margin: 0 }}>
          Khám phá
        </Typography.Title>
        <Button onClick={showModalRegister}>Đăng kí</Button>
        <Button type='primary' onClick={showModalLogin}>
          Đăng nhập
        </Button>
      </div>
      {/* <Row
        justify="center"
        align="middle"
        style={{ margin: "0 auto", maxWidth: 1080 }}
      >
        <Col span={1}>
          <Image
            width={50}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="Apofoitisi logo"
            style={{ marginBottom: 10 }}
            preview={false}
          />
        </Col>
        <Col span={3} style={searchbar.text}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            FPT-SEP
          </Typography.Title>
        </Col>
        <Col span={13}>
          <Input
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined style={{ color: "#828282" }} />}
            style={{ padding: 10, borderRadius: 8 }}
          />
        </Col>
        <Col span={3} style={searchbar.text}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Khám phá
          </Typography.Title>
        </Col>
        <Col span={2}>
          <Button onClick={showModalRegister}>Đăng kí</Button>
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={showModalLogin}>
            Đăng nhập
          </Button>
        </Col>
      </Row> */}
    </Layout.Header>
  );
}

export default SearchBar;
