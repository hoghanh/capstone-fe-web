import { useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import { Logout } from 'components/icon/Icon';
import useAuthActions from 'recoil/action';
import AppBreadcrumb from 'components/AppBreadcrumb';

function ClientHeader({ placement, name, subName, onPress }) {
  useEffect(() => window.scrollTo(0, 0));
  const { logout } = useAuthActions();

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <AppBreadcrumb />
        </Col>

        <Col span={24} md={18} className='header-control'>
          <div onClick={() => logout()}>
            <Logout size={32} />
          </div>

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
