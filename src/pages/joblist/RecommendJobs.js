import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Image,
  Layout,
  Typography,
  notification,
  Pagination,
  Grid,
  Spin,
  Row, Col,
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { FileTextFilled } from '@ant-design/icons';
import joblist from 'styles/joblist';
import { get, post, remove } from 'utils/APICaller';
import {
  CalculateDaysLeft,
  FormatVND,
  formatDate,
} from 'components/formatter/format';
import { BookMark, BookMarkOutlined } from 'components/icon/Icon';
import { useRecoilValue } from 'recoil';
import { authState } from 'recoil/atom';

const JobList = () => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();

  const auth = useRecoilValue(authState);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [recommendedList, setRecommendedList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.role === 'freelancer') {
      getFavorite();
      get({
        endpoint: `/job/recommended/${auth.id}?limit=${limit}&page=${page}`,
      })
        .then((res) => {
          setRecommendedList(res.data.recommendeds);
          setTotalItems(res.data.pagination.totalItems);
        })
        .catch((error) => {
          notification.error({
            message: error.response.data.message,
          });
        });
    } else {
      setFavoriteList([]);
    }
  }, [auth, page]);

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

  return (
    <>
      <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Card
          bodyStyle={{ padding: 'unset' }}
          style={joblist.card}
          className="card-jobs"
          title={
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <Typography.Title level={md ? 3 : 5}>
                Đề xuất
              </Typography.Title>
              <Typography.Text style={joblist.textResult}>
                {totalItems > 0
                  ? `${limit * (page - 1) + 1} - ${limit * page < totalItems
                    ? limit * page
                    : totalItems
                  } của ${totalItems} kết quả`
                  : `0 kết quả`}
              </Typography.Text>
            </div>
          }
        >
          {recommendedList?.map((job) => (
            <Row
              key={job.jobs.id}
              style={{
                display: ' flex',
                alignItems: 'center',
                padding: 10,
                borderBottom: '0.5px solid #000',
              }}
            >
              <Col span={5}
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
                  src={job.jobs.clients?.accounts?.image}
                  alt="Doanh nghiệp logo"
                  preview={false}
                  style={{ borderRadius: '50%' }}
                />
                <Typography.Title
                  level={4}
                  style={{ width: 144, margin: 0, textAlign: 'center' }}
                >
                  {job.jobs.clients?.accounts?.name.toUpperCase()}
                </Typography.Title>
              </Col>
              <Col span={24} md={{ span: 19 }} style={{ padding: 10, overflow: 'auto', width: '100%' }}>
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
                    <Link
                      to={`/jobs/job-detail/${job.jobs.id}`}
                      target="_blank"
                    >
                      <Typography.Title
                        style={{ margin: 0 }}
                        level={md ? 4 : 5}
                      >
                        {job.jobs.title}
                      </Typography.Title>
                    </Link>
                    <Typography.Text level={4}>
                      Lương thoả thuận: {FormatVND(job.jobs.lowestIncome)} -{' '}
                      {FormatVND(job.jobs.highestIncome)} /{' '}
                      {CalculateDaysLeft(job.jobs.applicationSubmitDeadline)}
                    </Typography.Text>
                    <Typography.Text level={4} style={{ display: 'block' }}>
                      Ngày đăng bài: {formatDate(job.jobs.updatedAt)}
                    </Typography.Text>
                  </div>
                  {auth.role === 'freelancer' ? <div
                    style={{
                      cursor: 'pointer',
                      alignSelf: md ? ' ' : 'flex-start',
                      display: 'flex',
                    }}
                    onClick={() => handleFavoriteChange(job.jobs.id)}
                  >
                    {isLoading ? (
                      <Spin />
                    ) : favoriteList.includes(job.jobs.id) ? (
                      <BookMark />
                    ) : (
                      <BookMarkOutlined />
                    )}
                  </div> : null}
                </div>
                <Link to={`/jobs/job-detail/${job.jobs.id}`} target="_blank">
                  <Typography.Paragraph
                    ellipsis={{
                      rows: 3,
                      expandable: false,
                    }}
                    style={joblist.des}
                  >
                    {job.jobs.description}
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
                  {job.jobs.skills?.map((skill) => (
                    <Button
                      type="primary"
                      style={joblist.button}
                      key={skill.id}
                    >
                      {skill.name}
                    </Button>
                  ))}
                </div>
                <div style={joblist.applied}>
                  <Typography.Title level={5} style={joblist.applied.text}>
                    {job.jobs.applied ? job.jobs.applied : 0} ứng tuyển{' '}
                    <FileTextFilled />
                  </Typography.Title>
                </div>
              </Col>
            </Row>
          ))}
          <Pagination
            current={1}
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
