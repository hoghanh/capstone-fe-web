import { Menu, Typography } from 'antd';
import {
  Billing,
  Dashboard,
  Documents,
  List,
  Timer,
  User,
} from 'components/icon/Icon';
import { Link, useLocation } from 'react-router-dom';

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');
  const items = [
    {
      key: 'dashboard-client',
      label: (
        <Link
          to='/client/dashboard'
          className={page === 'client/dashboard' ? 'active' : ''}
        >
          <span className='icon'>
            <Dashboard />
          </span>
          <span className='label'>Bảng điều khiển</span>
        </Link>
      ),
    },
    {
      key: 'list-jobs-client',
      label: (
        <Link
          to='/client/jobs-management'
          className={
            page === 'client/jobs-management' ||
            page === 'client/jobs-management/post-job'
              ? 'active'
              : ''
          }
        >
          <span className='icon'>
            <List />
          </span>
          <span className='label'>Bài viết</span>
        </Link>
      ),
    },
    {
      key: 'list-proposal-client',
      label: (
        <Link
          // to='/client/proposal'
          to='/client/proposals/freelancer-profile'
          className={
            page === 'client/proposals/freelancer-profile' ? 'active' : ''
          }
        >
          <span className='icon'>
            <Documents />
          </span>
          <span className='label'>Đề xuất</span>
        </Link>
      ),
    },
    {
      key: 'meeting-schedule-client',
      label: (
        <Link
          to='/client/schedule'
          className={page === 'client/billing' ? 'active' : ''}
        >
          <span className='icon'>
            <Timer />
          </span>
          <span className='label'>Lịch phỏng vấn</span>
        </Link>
      ),
    },
    {
      key: 'billing-client',
      label: (
        <Link
          to='/client/billing'
          className={page === 'client/billing' ? 'active' : ''}
        >
          <span className='icon'>
            <Billing />
          </span>
          <span className='label'>Hoá đơn</span>
        </Link>
      ),
    },
    {
      key: 'profile-client',
      label: (
        <Link
          to='/client/profile'
          className={page === 'client/profile' ? 'active' : ''}
        >
          <span className='icon'>
            <User />
          </span>
          <span className='label'>Hồ sơ</span>
        </Link>
      ),
    },
  ];
  return (
    <>
      <Typography.Title level={4} style={{ textAlign: 'center' }}>
        FPT - SEP
      </Typography.Title>
      <hr />
      <Menu
        mode='inline'
        items={items}
        style={{
          position: 'absolute',
          width: 300,
          zIndex: 100,
        }}
      />
    </>
  );
}

export default Sidenav;
