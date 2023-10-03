import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout, Drawer } from 'antd';
import Sidenav from './Sidenav';
import ClientHeader from '../header/ClientHeader';
import '../../styles/clientlayout.css';
import ClientFooter from 'layout/footer/ClientFooter';

function ClientLayout({ children }) {
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState('transparent');

  const handleSidenavType = (type) => setSidenavType(type);
  const openDrawer = () => setVisible(!visible);

  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');

  return (
    <Layout className={`layout-dashboard profile`}>
      <Drawer
        title={false}
        placement='left'
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key='left'
        width={250}
        className={`drawer-sidebar `}
      >
        <Layout className={`layout-dashboard `}>
          <Layout.Sider
            trigger={null}
            width={250}
            theme='light'
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === '#fff' ? 'active-route' : ''
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color='#1890ff' />
          </Layout.Sider>
        </Layout>
      </Drawer>
      <Layout.Sider
        breakpoint='lg'
        collapsedWidth='0'
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={250}
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === '#fff' ? 'active-route' : ''
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav color='#1890ff' />
      </Layout.Sider>
      <Layout>
        <Layout.Header>
          <ClientHeader
            onPress={openDrawer}
            name={pathname}
            subName={pathname}
            handleSidenavType={handleSidenavType}
          />
        </Layout.Header>
        <Layout.Content className='content-ant'>
          {children}
          <Outlet />
        </Layout.Content>
        <ClientFooter />
      </Layout>
    </Layout>
  );
}

export default ClientLayout;
