import { Menu, Typography } from 'antd';
import {
  Billing,
  Dashboard,
  Documents,
  List,
  Timer,
  User,
} from 'components/icon/Icon';
import { Link } from 'react-router-dom';

const items = [
  {
    key: 'dashboard-client',
    label: (
      <Link to='/client/dashboard'>
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
      <Link to='/client/jobs'>
        <span className='icon'>
          <List />
        </span>
        <span className='label'>Bài viết</span>
      </Link>
    ),
  },
  {
    key: 'jobs-list-client',
    label: (
      <Link to='/client/jobs'>
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
      <Link to='/client/schedule'>
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
      <Link to='/client/billing'>
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
      <Link to='/client/profile'>
        <span className='icon'>
          <User />
        </span>
        <span className='label'>Hồ sơ</span>
      </Link>
    ),
  },
];

function Sidenav({ color }) {
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
