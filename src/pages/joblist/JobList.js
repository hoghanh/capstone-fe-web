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
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import {
  FileTextFilled,
  DownOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { ReactSVG } from 'react-svg';

import joblist from 'styles/joblist';
import { get } from 'utils/APICaller';
import { CalculateDaysLeft, FormatVND } from 'components/formatter/format';

const JobList = () => {
  const { useBreakpoint } = Grid;
  const { sm, md, lg, xl } = useBreakpoint();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [jobList, setJobList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOption, setSortOption] = useState('Latest');
  const [openSelect, setOpenSelect] = useState();

  const { subCateId, subCateName } = useParams();

  useEffect(() => {
    changePage(page);
  }, [page, subCateId, subCateName]);

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

  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
                {md ? '1-10 of 200 kết quả' : ''}
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
          {sortedJobList?.map((job) => (
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
              <div style={{ padding: 10, overflow: 'auto' }}>
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
                  <ReactSVG
                    style={{
                      alignSelf: md ? ' ' : 'flex-start',
                      display: 'flex',
                    }}
                    src='/icon/bookmark.svg'
                    beforeInjection={(svg) => {
                      svg.setAttribute('width', '28');
                      svg.setAttribute('height', '29');
                    }}
                  />
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
          ))}
          <Pagination
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
