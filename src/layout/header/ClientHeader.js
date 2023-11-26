import { useEffect, useState } from 'react';
import { Row, Col, Input, Button, Dropdown, Typography, Empty, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ReactSVG } from 'react-svg';
import { Company, Job, Logout, Toggler, User } from 'components/icon/Icon';
import useAuthActions from 'recoil/action';
import AppBreadcrumb from 'components/AppBreadcrumb';
import { useNavigate, Link } from 'react-router-dom';
import { post } from 'utils/APICaller';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/atom';

function ClientHeader({ name, subName, onPress }) {
  const [results, setResults] = useState([]);
  const { useBreakpoint } = Grid;
  const { md, lg } = useBreakpoint();
  const auth = useRecoilValue(authState);


  useEffect(() => window.scrollTo(0, 0));
  const navigate = useNavigate();

  const { logout } = useAuthActions();
  function handleLogout() {
    logout();
    navigate('/');
  }


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
                : `/jobs/job-detail/${result.id}`
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
