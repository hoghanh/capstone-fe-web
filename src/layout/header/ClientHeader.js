import { useEffect } from 'react';
import { Row, Col, Breadcrumb, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Logout } from 'components/icon/Icon';
import { GoogleLogout } from 'react-google-login';
import { CLIENTID } from 'config';

const onSuccess = () => {
  console.log('Logout success');
};

const onFail = () => {
  console.log('Fail');
};

function ClientHeader({ placement, name, subName, onPress }) {
  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/'>Pages</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: 'capitalize' }}>
              {name.replace('/', '')}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className='ant-page-header-heading'>
            <span
              className='ant-page-header-heading-title'
              style={{ textTransform: 'capitalize' }}
            >
              {subName.replace('/', '')}
            </span>
          </div>
        </Col>

        <Col span={24} md={18} className='header-control'>
          <GoogleLogout
            clientId={CLIENTID}
            onLogoutSuccess={onSuccess}
            onFailure={onFail}
            render={(renderProps) => (
              <Logout onClick={renderProps.onClick} size={32} />
            )}
          ></GoogleLogout>

          <ReactSVG
            src='/icon/notification.svg'
            beforeInjection={(svg) => {
              svg.setAttribute('width', '32');
              svg.setAttribute('height', '32');
            }}
          />
          <Input
            className='header-search'
            placeholder='Type here...'
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </>
  );
}

export default ClientHeader;
