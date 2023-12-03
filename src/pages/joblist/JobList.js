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
  Spin,
  Row,
  Col,Empty,
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { FileTextFilled, MenuUnfoldOutlined } from '@ant-design/icons';

import joblist from 'styles/joblist';
import { get, post, remove } from 'utils/APICaller';
import { CalculateDaysLeft, FormatVND } from 'components/formatter/format';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/atom';
import { BookMark, BookMarkOutlined } from 'components/icon/Icon';

const JobList = () => {
  const { useBreakpoint } = Grid;
  const { sm, md } = useBreakpoint();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [jobList, setJobList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOption, setSortOption] = useState('Latest');
  const [openSelect, setOpenSelect] = useState();
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useRecoilValue(authState);
  const { subCateId, subCateName } = useParams();

  useEffect(() => {
    changePage(page);
    if (auth.role === 'freelancer') {
      getFavorite();
    } else {
      setFavoriteList([]);
    }
  }, [page, subCateId, subCateName, auth]);

  function changePage(page) {
    if (subCateId) {
      get({
        endpoint: `/job/subCategory/${subCateId}?limit=${limit}&page=${page}`,
      })
        .then((res) => {
          setJobList(res.data.jobs);
          setTotalItems(res.data.pagination.totalItems);
        })
        .catch((error) => {
          notification.error({
            message: error.response.data.message,
          });
        });
    } else {
      get({ endpoint: `/job?limit=${limit}&page=${page}` })
        .then((res) => {
          setJobList(res.data.jobs);
          setTotalItems(res.data.pagination.totalItems);
        })
        .catch((error) => {
          notification.error({
            message: error.response.data.message,
          });
        });
    }
  }

  const getFavorite = () => {
    get({ endpoint: `/accounts/favorite/${auth.id}` })
      .then((res) => {
        const idList = res.data.jobs.map((item) => item.id);
        setFavoriteList(idList);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const addFavorite = (id) => {
    post({
      endpoint: `/job/favorite/add`,
      body: {
        accountId: auth.id,
        jobId: id,
      },
    })
      .then((res) => {
        getFavorite();
        setIsLoading(false);
        changePage(page);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
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
        getFavorite();
        setIsLoading(false);
        changePage(page);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const handleFavoriteChange = (id) => {
    setIsLoading(true);
    if (!favoriteList.includes(id)) {
      addFavorite(id);
    } else {
      removeFavorite(id);
    }
  };

  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleChange = (value) => {
    setSortOption(value);
  };

  const sortedJobList = [...jobList];

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
        {subCateName && (
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
                Kết quả hàng đầu
              </Typography.Title>
              <Typography.Text style={joblist.textResult}>
                {totalItems > 0
                  ? `${limit * (page - 1) + 1} - ${
                      limit * page < totalItems ? limit * page : totalItems
                    } của ${totalItems} kết quả `
                  : `0 kết quả`}
              </Typography.Text>
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
            <div>
              <Empty description={<span>Dữ liệu trống</span>} />
            </div>
          ) : (sortedJobList?.map((job) => (
            <Row
              key={job.id}
              style={{
                display: ' flex',
                alignItems: 'center',
                padding: 10,
                borderBottom: '0.5px solid #000',
              }}
            >
              <Col
                span={5}
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
                    src={job.clients?.accounts?.image ? job.clients?.accounts?.image : 'https://firebasestorage.googleapis.com/v0/b/fpt-sep-fe-eb227.appspot.com/o/images%2Favatars%2Favatar.png?alt=media&token=2b0c05dc-cde2-49bc-a280-a101c5216fc8'}
                    alt='logo'
                    preview={false}
                    style={{ borderRadius: '50%', aspectRatio: 1, objectFit: 'cover' }}
                    />
                <Typography.Title
                  level={4}
                  style={{ width: 144, margin: 0, textAlign: 'center' }}
                >
                  {job.clients?.accounts?.name.toUpperCase()}
                </Typography.Title>
              </Col>
              <Col
                span={24}
                md={{ span: 19 }}
                style={{ padding: 10, overflow: 'auto' }}
              >
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
                      {CalculateDaysLeft(job.proposalSubmitDeadline)}
                    </Typography.Text>
                  </div>
                  {auth.role === 'freelancer' ? (
                    <div
                      style={{
                        cursor: 'pointer',
                        alignSelf: md ? ' ' : 'flex-start',
                        display: 'flex',
                      }}
                      onClick={() => handleFavoriteChange(job.id)}
                    >
                      {isLoading ? (
                        <Spin />
                      ) : favoriteList.includes(job.id) ? (
                        <BookMark />
                      ) : (
                        <BookMarkOutlined />
                      )}
                    </div>
                  ) : null}
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
                    padding: '0px 10px 10px',
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
                    {job.applied ? job.applied : 0} ứng tuyển{' '}
                    <FileTextFilled />
                  </Typography.Title>
                </div>
              </Col>
            </Row>
          )))}
          <Pagination
            current={page}
            total={totalItems}
            onChange={onChange}
            showSizeChanger={false}
            style={{ padding: 20, display: 'flex', justifyContent: 'center' }}
          />
        </Card>
      </Layout.Content>
    </>
  );
};

export default JobList;
