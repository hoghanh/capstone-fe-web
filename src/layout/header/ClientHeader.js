import { useEffect } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import { Logout, Toggler } from 'components/icon/Icon';
import useAuthActions from 'recoil/action';
import AppBreadcrumb from 'components/AppBreadcrumb';
import { useNavigate } from 'react-router-dom';

function ClientHeader({ name, subName, onPress }) {
  useEffect(() => window.scrollTo(0, 0));
  const navigate = useNavigate();

  const { logout } = useAuthActions();
  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <AppBreadcrumb />
        </Col>

        <Col span={24} md={18} className='header-control'>
          <div onClick={() => handleLogout()}>
            <Logout size={24} />
          </div>

          <ReactSVG
            src='/icon/notification.svg'
            beforeInjection={(svg) => {
              svg.setAttribute('width', '24');
              svg.setAttribute('height', '24');
            }}
          />
          <Button
            type='link'
            className='sidebar-toggler'
            onClick={() => onPress()}
          >
            <Toggler />
          </Button>
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
