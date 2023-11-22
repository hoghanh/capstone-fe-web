import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Image,
  Layout,
  Select,
  Typography,
  notification,
  Pagination,
  Grid,
  Empty,
  Col,
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { FileTextFilled, MenuUnfoldOutlined } from '@ant-design/icons';
import joblist from 'styles/joblist';
import { get, remove } from 'utils/APICaller';
import { CalculateDaysLeft, FormatVND } from 'components/formatter/format';
import { BookMark } from 'components/icon/Icon';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/atom';
import { ModalPrimary } from 'components/Modal/Modal';


const RemoveFavorite = ({id, getFavorite}) => {
  const auth = useRecoilValue(authState);
  const [isModal, setIsModal] = useState(false);

  const showModal = () => {
    setIsModal(true);
  };

  const handleOk = () => {
    removeFavorite(id)
  };
  const handleCancel = () => {
    setIsModal(false);
  };

  const removeFavorite = (id) => {
    remove({
      endpoint: `/job/favorite/remove`,
      body: {
        accountId: auth.id,
        jobId: id,
      },
    })
      .then((res) => {
        setIsModal(false);
        getFavorite();
        notification.success({
          message: 'Đã xóa',
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };
  return (
    <>
      <div style={{ cursor: 'pointer' }} onClick={showModal}>
        <BookMark />
      </div>
      <ModalPrimary
        title='Xóa khỏi yêu thích'
        open={isModal}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Xoá'
        okType='danger'
      >
        Bạn có chắc muốn xóa khỏi danh sách yêu thích
      </ModalPrimary>
    </>
  );
};

const FavoriteList = () => {
  const { useBreakpoint } = Grid;
  const { sm, md } = useBreakpoint();
  const [page, setPage] = useState(1);
  const [jobList, setJobList] = useState([]);
  const [sortOption, setSortOption] = useState('Latest');
  const [openSelect, setOpenSelect] = useState();
  const [pageSize,] = useState(5)
  const { subCateId, subCateName } = useParams();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    getFavorite();
  }, [subCateId, subCateName]);

  const getFavorite = () => {
    get({ endpoint: `/accounts/favorite/${auth.id}` })
      .then((res) => {
        setJobList(res.data.jobs);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };


  const handleChange = (value) => {
    setSortOption(value);
  };

  const sortedJobList = [...jobList];

  const onChange = (page) => {
    setPage(page);
  };

  const getPagedList = () => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sortedJobList.slice(start, end);
  };


  if (sortOption === 'Latest') {
    sortedJobList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } else if (sortOption === 'Oldest') {
    sortedJobList.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  } else if (sortOption === 'Lowest Price') {
    sortedJobList.sort((a, b) => a.lowestIncome - b.lowestIncome);
  } else if (sortOption === 'Highest Price') {
    sortedJobList.sort((a, b) => b.highestIncome - a.highestIncome);
  } else if (sortOption === 'Most Applications') {
    sortedJobList.sort((a, b) => b.applied - a.applied);
  } else if (sortOption === 'Lest Applications') {
    sortedJobList.sort((a, b) => a.applied - b.applied);
  }

  return (
    <>
      <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
        {sortedJobList && (
          <Typography.Title
            level={3}
            style={{ padding: '10px 20px', marginBottom: 20 }}
          >
            {subCateName}
          </Typography.Title>
        )}

        <Card
          bodyStyle={{ padding: 'unset' }}
          style={joblist.card}
          className='card-jobs'
          title={
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <Typography.Title level={md ? 3 : 5}>
                Danh sách yêu thích
              </Typography.Title>
            </div>
          }
          extra={
            <div>
              <Typography.Text
                style={{
                  display: md ? '' : 'none',
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  paddingRight: 14,
                }}
              >
                Sắp xếp theo
              </Typography.Text>
              <>
                <Select
                  placeholder=''
                  size='large'
                  style={{
                    borderRadius: 8,
                    width: md ? 200 : sm ? 150 : 100,
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.10)',
                    border: '1px solid #000',
                    visibility: md ? '' : 'hidden',
                  }}
                  bordered={false}
                  onChange={handleChange}
                  defaultValue='Latest'
                  open={openSelect}
                  onClick={() => setOpenSelect(!openSelect)}
                  options={[
                    {
                      value: 'Latest',
                      label: 'Mới Nhất',
                    },
                    {
                      value: 'Oldest',
                      label: 'Cũ Nhất',
                    },
                    {
                      value: 'Lowest Price',
                      label: 'Giá Thấp',
                    },
                    {
                      value: 'Highest Price',
                      label: 'Giá Cao',
                    },
                    {
                      value: 'Most Applications',
                      label: 'Nhiều Lượt Đăng Ký',
                    },
                    {
                      value: 'Lest Applications',
                      label: 'Ít Lượt Đăng Ký',
                    },
                  ]}
                />
                {md ? null : (
                  <MenuUnfoldOutlined
                    onClick={() => setOpenSelect(!openSelect)}
                  />
                )}
              </>
            </div>
          }
        >
          {sortedJobList.length === 0 || sortedJobList === null ? (
            <Col span={24}>
              <Empty />
            </Col>
          ) : (
            getPagedList()?.map((job) => (
              <div
                key={job.id}
                style={{
                  display: ' flex',
                  alignItems: 'center',
                  padding: 10,
                  borderBottom: '0.5px solid #000',
                }}
              >
                <div
                  style={{
                    display: md ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 5,
                    padding: 30,
                    height: 209,
                  }}
                >
                  <Image
                    width={100}
                    src={job.clients?.accounts?.image}
                    alt='Apofoitisi logo'
                    preview={false}
                    style={{ borderRadius: '50%' }}
                  />
                  <Typography.Title
                    level={4}
                    style={{ width: 144, margin: 0, textAlign: 'center' }}
                  >
                    {job.clients?.accounts?.name.toUpperCase()}
                  </Typography.Title>
                </div>
                <div style={{ padding: 10, overflow: 'auto', width: '100%' }}>
                  <div
                    style={{
                      display: ' flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 10,
                      gap: 15,
                    }}
                  >
                    <div>
                      <Link to={`/jobs/job-detail/${job.id}`} target='_blank'>
                        <Typography.Title
                          style={{ margin: 0 }}
                          level={md ? 4 : 5}
                        >
                          {job.title}
                        </Typography.Title>
                      </Link>
                      <Typography.Text level={4}>
                        Lương thoả thuận: {FormatVND(job.lowestIncome)} -{' '}
                        {FormatVND(job.highestIncome)} /{' '}
                        {CalculateDaysLeft(job.applicationSubmitDeadline)}
                      </Typography.Text>
                    </div>
                    <RemoveFavorite id={job.id} getFavorite={getFavorite} />
                  </div>
                  <Link to={`/jobs/job-detail/${job.id}`} target='_blank'>
                    <Typography.Paragraph
                      ellipsis={{
                        rows: 3,
                        expandable: false,
                      }}
                      style={joblist.des}
                    >
                      {job.description}
                    </Typography.Paragraph>
                  </Link>
                  <div
                    style={{
                      display: 'flex',
                      padding: '0px 10px',
                      alignItems: 'flex-start',
                      gap: '15px',
                      alignSelf: 'stretch',
                      overflow: 'auto',
                    }}
                  >
                    {job.skills?.map((skill) => (
                      <Button
                        type='primary'
                        style={joblist.button}
                        key={skill.id}
                      >
                        {skill.name}
                      </Button>
                    ))}
                  </div>
                  <div style={joblist.applied}>
                    <Typography.Title level={5} style={joblist.applied.text}>
                      {job.applied ? job.applied : 0} applied <FileTextFilled />
                    </Typography.Title>
                  </div>
                </div>
              </div>
            ))
          )}

          <Pagination
            current={page}
            total={sortedJobList.length}
            onChange={onChange}
            pageSize={pageSize}
            showSizeChanger={false}
            style={{ padding: 20, display: 'flex', justifyContent: 'center' }}
          />
        </Card>
      </Layout.Content>
    </>
  );
};

export default FavoriteList;
