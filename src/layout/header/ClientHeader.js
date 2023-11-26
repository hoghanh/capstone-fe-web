import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Empty,
  Menu,
  notification,
  Typography,
  Badge,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import { Logout, Toggler } from 'components/icon/Icon';
import useAuthActions from 'recoil/action';
import AppBreadcrumb from 'components/AppBreadcrumb';
import { useNavigate } from 'react-router-dom';
import { get, put } from 'utils/APICaller';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/atom';
import socket from 'config';

function ClientHeader({ name, subName, onPress }) {
  useEffect(() => window.scrollTo(0, 0));
  const navigate = useNavigate();

  const auth = useRecoilValue(authState);

  const [notifications, setNotifications] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [count, setCount] = useState(0);

  const { logout } = useAuthActions();
  function handleLogout() {
    logout();
    navigate('/');
  }

  useEffect(() => {
    changeNotification();
  }, []);

  useEffect(() => {
    if (auth) {
      socket?.emit('newUser', auth.id);
      socket.on('getNotification', (data) => {
        notification.info({ message: data.notification.description });
        changeNotification();
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [auth]);

  const handleMenuClick = ({ key }) => {
    put({ endpoint: `/notification/${key}` })
      .then((res) => {
        changeNotification();
      })
      .catch((err) => {});
  };

  const changeNotification = () => {
    get({ endpoint: `/notification/account/${auth.id}` })
      .then((res) => {
        const arr = res.data.notifications.map((item) => ({
          key: item.id.toString(),
          label: (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography.Text
                style={{
                  textWrap: 'wrap',
                }}
              >
                {item.status === 'unread' ? (
                  <Badge
                    status='processing'
                    style={{ marginRight: '8px', fontSize: '20px' }}
                  />
                ) : (
                  ''
                )}
                {item.description}
              </Typography.Text>
            </div>
          ),
        }));

        if (res.data) {
          setNotifications(arr);
          setCount(res.data.unreadNotifications);
        } else {
          setNotifications([
            {
              id: 'no-data',
              label: <Empty />,
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
  };

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
          <div>
            <Badge count={count}>
              <ReactSVG
                onClick={toggleMenuVisibility}
                src='/icon/notification.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('width', '24');
                  svg.setAttribute('height', '24');
                }}
              />
              {menuVisible && (
                <Menu
                  className='notification'
                  items={notifications}
                  onClick={handleMenuClick}
                  style={{
                    backgroundColor: '#ffffff',
                    position: 'absolute',
                    top: 40,
                    width: 350,
                    right: 10,
                    zIndex: 1,
                    border: '1px solid #f5f5f5',
                  }}
                ></Menu>
              )}
            </Badge>
          </div>

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
