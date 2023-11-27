import React, { useEffect, useState } from 'react';
import {
  Button,
  Select,
  Typography,
  notification,
  Pagination,
  Grid,
  Empty,
} from 'antd';
import { Link } from 'react-router-dom';
import { FileTextFilled, MenuUnfoldOutlined } from '@ant-design/icons';
import joblist from 'styles/joblist';
import { get } from 'utils/APICaller';
import {
  CalculateDaysLeft,
  FormatVND,
  formatDate,
} from 'components/formatter/format';
import { CustomCard } from 'components/customize/Layout';
import { useLocation } from 'react-router-dom';

const ListPosts = () => {
  const { useBreakpoint } = Grid;
  const { sm, md } = useBreakpoint();
  const [page, setPage] = useState(1);
  const [jobList, setJobList] = useState([]);
  const [pageSize] = useState(10);
  const [sortOption, setSortOption] = useState('Latest');
  const [openSelect, setOpenSelect] = useState();
  const { clientId } = useLocation().state;

  useEffect(() => {
    changePage(clientId);
  }, [clientId]);

  function changePage(clientId) {
    get({ endpoint: `/job/client/${clientId}` })
      .then((res) => {
        setJobList(res.data);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }

  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleChange = (value) => {
    setSortOption(value);
  };

  let sortedJobList = [];

  if (sortOption === 'Latest') {
    sortedJobList = [...jobList];
    sortedJobList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } else if (sortOption === 'Oldest') {
    sortedJobList = [...jobList];
    sortedJobList.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  } else if (sortOption === 'Lowest Price') {
    sortedJobList = [...jobList];
    sortedJobList.sort((a, b) => a.lowestIncome - b.lowestIncome);
  } else if (sortOption === 'Highest Price') {
    sortedJobList = [...jobList];
    sortedJobList.sort((a, b) => b.highestIncome - a.highestIncome);
  } else if (sortOption === 'Most Applications') {
    sortedJobList = [...jobList];
    sortedJobList.sort((a, b) => b.applied - a.applied);
  } else if (sortOption === 'Lest Applications') {
    sortedJobList = [...jobList];
    sortedJobList.sort((a, b) => a.applied - b.applied);
  }

  const getPagedList = () => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sortedJobList.slice(start, end);
  };

  return (
    <>
      <CustomCard
        bodyStyle={{ padding: 'unset' }}
        title={
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            <Typography.Title level={md ? 3 : 5}>
              {'Danh sách bài đăng'}
            </Typography.Title>
            <Typography.Text style={joblist.textResult}></Typography.Text>
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
                defaultValue={'Latest'}
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Empty description={<span>Dữ liệu trống</span>} />
          </div>
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
                    <Typography.Text level={4} style={{ display: 'block' }}>
                      Ngày đăng bài: {formatDate(job.updatedAt)}
                    </Typography.Text>
                  </div>
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
                    {job.applied ? job.applied : 0} đã ứng tuyển{' '}
                    <FileTextFilled />
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
      </CustomCard>
    </>
  );
};

export default ListPosts;
