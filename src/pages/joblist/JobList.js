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
} from 'antd';
import Link from 'antd/es/typography/Link';
import joblist from 'styles/joblist';
import { FileTextFilled } from '@ant-design/icons';
import { get } from 'utils/APICaller';

const CalculateDaysLeft = (endDate) => {
  const currentDate = new Date();

  endDate = new Date(endDate);
  let remainTime;
  let output;

  if (endDate >= currentDate) {
    const timeDifference = endDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    const hoursDifference = Math.floor(
      (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600)
    );

    remainTime = {
      days: daysDifference - 1,
      hours: hoursDifference,
    };
  }

  if (remainTime?.days) {
    output = remainTime.days + ' ngày ' + remainTime.hours + ' giờ còn lại';
  } else if (remainTime?.hours) {
    output = remainTime.hours + ' giờ còn lại';
  } else {
    output = 'Quá hạn';
  }
  return output;
};

const JobList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [jobList, setJobList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOption, setSortOption] = useState('Latest');

  useEffect(() => {
    changePage(page);
  }, [page]);

  function changePage(page) {
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

  console.log(jobList);

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
        <Typography.Title
          level={3}
          style={{ padding: '10px 20px', marginBottom: 20 }}
        >
          Logo Design
        </Typography.Title>
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
              <Typography.Title level={3}>Kết quả hàng đầu</Typography.Title>
              <Typography.Text style={joblist.textResult}>
                1-10 of 200 kết quả
              </Typography.Text>
            </div>
          }
          extra={
            <div>
              <Typography.Text style={joblist.sortbyText}>
                Sắp xếp theo
              </Typography.Text>
              <Select
                placeholder=''
                size='large'
                style={{
                  borderRadius: 8,
                  width: 200,
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.10)',
                  border: '1px solid #000',
                }}
                bordered={false}
                onChange={handleChange}
                defaultValue='Latest'
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
                  display: ' flex',
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
              <div style={{ padding: 10, width: '100%' }}>
                <div
                  style={{
                    display: ' flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                  }}
                >
                  <div>
                    <Typography.Title style={{ margin: 0 }} level={4}>
                      {job.title}
                    </Typography.Title>
                    <Typography.Text level={4}>
                      Lương thoả thuận: {job.lowestIncome} - {job.highestIncome}
                      VND / {CalculateDaysLeft(job.proposalSubmitDeadline)}
                    </Typography.Text>
                  </div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='28'
                    viewBox='0 0 30 28'
                    fill='none'
                  >
                    <path
                      d='M5.49352 25.5555L5.51231 25.5905L5.53382 25.624C6.2433 26.7277 7.56456 26.8266 8.47475 26.4868L8.54052 26.4622L8.60221 26.4287L15 22.9545L21.3978 26.4287L21.4245 26.4432L21.4521 26.4561C21.6405 26.544 21.8256 26.6077 22.0338 26.6401C22.2064 26.667 22.3706 26.6667 22.4784 26.6666C22.4858 26.6666 22.4931 26.6666 22.5 26.6666C23.0824 26.6666 23.6536 26.4828 24.0886 26.0768C24.5298 25.665 24.75 25.0988 24.75 24.4999V5.83325C24.75 3.23377 22.6112 1.33325 20 1.33325H10C7.38882 1.33325 5.25 3.23377 5.25 5.83325V24.4999C5.25 24.5065 5.24999 24.5136 5.24997 24.521C5.24977 24.6207 5.24943 24.7895 5.2812 24.9674C5.31996 25.1844 5.39551 25.3725 5.49352 25.5555Z'
                      fill='white'
                      stroke='black'
                      strokeWidth='2'
                    />
                  </svg>
                </div>
                <Link href='/jobdetails' target='_blank'>
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
                  }}
                >
                  <Button type='primary' style={joblist.button}>
                    Javascript
                  </Button>
                  <Button type='primary' style={joblist.button}>
                    Html
                  </Button>
                  <Button type='primary' style={joblist.button}>
                    CSS
                  </Button>
                  <Button type='primary' style={joblist.button}>
                    NextJS
                  </Button>
                  <Button type='primary' style={joblist.button}>
                    ReactJS
                  </Button>
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
