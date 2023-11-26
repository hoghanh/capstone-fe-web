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
  Dropdown,
  Grid,
} from 'antd';
import { ReactSVG } from 'react-svg';
import { Company, Job, Logout, Toggler, User } from 'components/icon/Icon';
import useAuthActions from 'recoil/action';
import AppBreadcrumb from 'components/AppBreadcrumb';
import { useNavigate, Link } from 'react-router-dom';
import { get, put, post } from 'utils/APICaller';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/atom';
import socket from 'config';

function ClientHeader({ name, subName, onPress }) {
  const [results, setResults] = useState([]);
  const { useBreakpoint } = Grid;

  const { md, lg } = useBreakpoint();
  const auth = useRecoilValue(authState);

  useEffect(() => window.scrollTo(0, 0));
  const navigate = useNavigate();

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
        notification.info({
          message:
            data.notification.name + ': ' + data.notification.description,
        });
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

        if (res.data.notification) {
          setNotifications(arr);
          setCount(res.data.unreadNotifications);
        } else {
          setNotifications([
            {
              id: 'no-data',
              label: (
                <Empty description={<span>Không có thông báo nào</span>} />
              ),
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

  const onSearch = (value) => {
    post({
      endpoint: `/accounts/`,
      body: {
        searchInput: value,
      },
    })
      .then((res) => {
        const data = res.data.searchList;
        setResults(data);
      })
      .catch((error) => {
        console.error({
          message: error.response.data.message,
        });
      });
  };

  const items = results.length
    ? results.map((result, index) => ({
        label: (
          <Link
            to={
              result.tag === 'freelancer'
                ? `/client/applications/freelancer-profile/${result.id}`
                : result.tag === 'client'
                ? result.id === auth.id
                  ? `/client/profile`
                  : `/profile-client/${result.id}`
                : `/client/jobs-management/job-detail/${result.id}`
            }
            state={{
              clientId: result.tag === 'client' ? result.referId : null,
            }}
          >
            <Typography.Text style={{ padding: 10 }}>
              {result.name || result.title}{' '}
              {result.id === auth.id ? '(Bạn)' : ''}
            </Typography.Text>
          </Link>
        ),
        key: index,
        icon:
          result.tag === 'freelancer' ? (
            <User />
          ) : result.tag === 'client' ? (
            <Company />
          ) : (
            <Job />
          ),
      }))
    : [{ label: <Empty />, key: '1' }];

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
          <Dropdown
            overlayStyle={{
              maxHeight: '300px',
              overflow: 'auto',
              boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
              borderRadius: 10,
              border: '1px solid #ccc',
            }}
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <Input.Search
              style={{
                padding: 10,
                borderRadius: 8,
                width: lg ? 477 : md ? 325 : 250,
              }}
              placeholder='Tìm kiếm'
              onSearch={onSearch}
            />
          </Dropdown>
        </Col>
      </Row>
    </>
  );
}

export default ClientHeader;
