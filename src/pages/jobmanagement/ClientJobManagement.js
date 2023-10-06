import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Layout,
  Typography,
  notification,
  Grid,
  Dropdown,
} from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { EllipsisOutlined } from '@ant-design/icons';

import joblist from 'styles/joblist';
import { get, post, remove } from 'utils/APICaller';
import {
  CalculateDaysLeft,
  FormatVND,
  formatDate,
} from 'components/formatter/format';
import Loading from 'components/loading/loading';
import { useRecoilValue } from 'recoil';
import { clientProfile } from 'recoil/atom';
import { File } from 'components/icon/Icon';
import LocalStorageUtils from 'utils/LocalStorageUtils';

const tabList = [
  {
    key: 'hiring',
    label: 'Đang tuyển',
  },
  {
    key: 'closing',
    label: 'Đã đóng',
  },
];

const hiringItems = [
  {
    key: 'edit',
    label: 'Chỉnh sửa',
  },
  {
    key: 'close',
    label: 'Đóng bài viết',
  },
  {
    key: 'delete',
    label: 'Xoá',
    danger: true,
  },
];

const closingItems = [
  {
    key: 'edit',
    label: 'Chỉnh sửa',
  },
  {
    key: 'open',
    label: 'Gia hạn bài viết',
  },
  {
    key: 'delete',
    label: 'Xoá',
    danger: true,
  },
];

const ClientJobManagement = () => {
  const { useBreakpoint } = Grid;
  const { sm, md, lg, xl } = useBreakpoint();

  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTabKey, setActiveTabKey] = useState('');
  const [filteredJobList, setFilteredJobList] = useState(jobList);

  const profileUser = LocalStorageUtils.getItem('profile');

  const navigate = useNavigate();

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  useEffect(() => {
    setIsLoading(true);
    getJobList();
    setActiveTabKey('hiring');
  }, []);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const filtered = jobList.filter((job) => {
      if (activeTabKey === 'hiring') {
        return new Date(job.proposalSubmitDeadline).getTime() > currentTime;
      } else if (activeTabKey === 'closing') {
        return new Date(job.proposalSubmitDeadline).getTime() <= currentTime;
      }
      return true;
    });

    setFilteredJobList(filtered);
  }, [isLoading, activeTabKey]);

  function getJobList() {
    get({
      endpoint: `/job/client/${profileUser.id}`,
    })
      .then((res) => {
        const filtered = res.data.filter((job) => {
          return job.status === true;
        });
        setJobList(filtered);
        setFilteredJobList(filtered);
        setTimeout(() => {
          setIsLoading(false);
        }, [500]);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }

  const onClick = ({ key }) => {
    const checkAction = key.toString();
    if (checkAction.includes('delete')) {
      const itemId = checkAction.replace('delete_', '');
      removeItem(itemId);
    } else if (checkAction.includes('close')) {
      const itemId = checkAction.replace('close_', '');
      closeItem(itemId);
    } else if (checkAction.includes('edit')) {
      const itemId = checkAction.replace('edit_', '');
      navigate(`edit-job/${itemId}`);
    }
  };

  function closeItem(id) {
    post({ endpoint: `/job/close/${id}` })
      .then((res) => {
        notification.success({
          message: 'Đã đóng bài viết thành công',
        });
        getJobList();
        setActiveTabKey('closing');
      })
      .catch((err) => {
        notification.error({
          message: 'Xảy ra lỗi trong quá trình',
        });
      });
  }

  function removeItem(id) {
    remove({ endpoint: `/job/detail/${id}` })
      .then((res) => {
        notification.success({
          message: 'Xoá bài viết thành công',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Có lỗi xảy ra trong quá trình xoá',
        });
      });
  }

  return (
    <>
      <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Card
          bodyStyle={{ padding: 'unset' }}
          style={joblist.card}
          className='card-jobs'
          headStyle={{ paddingLeft: 0 }}
          title={
            <div className='trackingJobs'>
              <Typography.Title level={md ? 3 : 5} style={{ paddingLeft: 30 }}>
                Bài viết đã đăng
              </Typography.Title>
              <Card
                bordered={false}
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={onTabChange}
              />
            </div>
          }
          extra={
            <Link to={`/client/jobs-management/post-job`}>
              <Button type='primary' size='large'>
                Đăng bài
              </Button>{' '}
            </Link>
          }
        >
          {isLoading && <Loading />}
          {filteredJobList?.map((job) => (
            <div
              key={job.id}
              style={{
                alignItems: 'center',
                padding: '20px 30px',
                borderBottom: '0.5px solid #000',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 15,
                }}
              >
                <div>
                  <Link
                    to={`/client/jobs-management/job-detail/${job.id}`}
                    target='_blank'
                  >
                    <Typography.Title style={{ margin: 0 }} level={md ? 4 : 5}>
                      {job.title}
                    </Typography.Title>
                  </Link>
                  <Typography.Text level={4}>
                    Lương thoả thuận: {FormatVND(job.lowestIncome)} -{' '}
                    {FormatVND(job.highestIncome)}
                  </Typography.Text>
                </div>
                <Dropdown
                  menu={{
                    items:
                      activeTabKey === 'hiring'
                        ? hiringItems.map((item) => ({
                            ...item,
                            key: item.key + '_' + job.id.toString(),
                          }))
                        : closingItems.map((item) => ({
                            ...item,
                            key: item.key + '_' + job.id.toString(),
                          })),
                    onClick,
                  }}
                >
                  <EllipsisOutlined />
                </Dropdown>
              </div>
              <Typography.Text level={4}>
                Ngày đăng: {formatDate(job.createdAt)} -{' '}
                {CalculateDaysLeft(job.proposalSubmitDeadline)}
              </Typography.Text>
              <br />
              <Typography.Text
                level={4}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 0',
                  gap: 10,
                }}
              >
                <File size={20} />
                {job.applied ? job.applied : '0'} đã đăng kí
              </Typography.Text>
            </div>
          ))}
        </Card>
      </Layout.Content>
    </>
  );
};

export default ClientJobManagement;
