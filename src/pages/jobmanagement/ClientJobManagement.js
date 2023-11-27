import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Layout,
  Typography,
  notification,
  Grid,
  Dropdown,
  Pagination,
  Empty,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EllipsisOutlined } from '@ant-design/icons';

import joblist from 'styles/joblist';
import { get, put, remove } from 'utils/APICaller';
import {
  CalculateDaysLeft,
  FormatVND,
  formatDate,
} from 'components/formatter/format';
import Loading from 'components/loading/loading';
import { File } from 'components/icon/Icon';
import { ModalPrimary } from 'components/Modal/Modal';
import { clientProfile } from 'recoil/atom';
import { useRecoilValue } from 'recoil';

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
    key: 'extend',
    label: 'Gia hạn bài viết 3 ngày',
  },
  {
    key: 'delete',
    label: 'Xoá',
    danger: true,
  },
];

const ClientJobManagement = () => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();

  const user = useRecoilValue(clientProfile);

  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTabKey, setActiveTabKey] = useState('');
  const [filteredJobList, setFilteredJobList] = useState(jobList);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalClose, setIsModalClose] = useState(false);
  const [isModalExtend, setIsModalExtend] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [itemIdToClose, setItemIdToClose] = useState(null);
  const [itemIdToExtend, setItemIdToExtend] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

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
    if (user) {
      getJobList();
    }
  }, [user]);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const filtered = jobList.filter((job) => {
      if (activeTabKey === 'hiring') {
        return new Date(job.applicationSubmitDeadline).getTime() > currentTime;
      } else if (activeTabKey === 'closing') {
        return new Date(job.applicationSubmitDeadline).getTime() <= currentTime;
      }
      return true;
    });

    setFilteredJobList(filtered);
  }, [isLoading, activeTabKey, jobList]);

  function getJobList() {
    get({
      endpoint: `/job/client/${user.id}`,
    })
      .then((res) => {
        const filtered = res.data.filter((job) => {
          return job.status === 'open';
        });
        setJobList(res.data);
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
      setItemIdToDelete(itemId);
      setIsModalDelete(true);
    } else if (checkAction.includes('close')) {
      const itemId = checkAction.replace('close_', '');
      setItemIdToClose(itemId);
      setIsModalClose(true);
    } else if (checkAction.includes('edit')) {
      const itemId = checkAction.replace('edit_', '');
      navigate(`edit-job/${itemId}`);
    } else if (checkAction.includes('extend')) {
      const itemId = checkAction.replace('extend_', '');
      setItemIdToExtend(itemId);
      setIsModalExtend(true);
    }
  };

  function closeItem(id) {
    put({ endpoint: `/job/close/${id}` })
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

  function extendItem(id) {
    put({ endpoint: `/job/extend/${id}` })
      .then((res) => {
        notification.success({
          message: 'Gia hạn bài viết 3 ngày thành công',
        });
        getJobList();
        setActiveTabKey('hiring');
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

  const handleDelete = () => {
    if (itemIdToDelete) {
      removeItem(itemIdToDelete);
      setIsModalDelete(false);
    }
  };

  const handleClose = () => {
    if (itemIdToClose) {
      closeItem(itemIdToClose);
      setIsModalClose(false);
    }
  };

  const handleExtend = () => {
    if (itemIdToExtend) {
      extendItem(itemIdToExtend);
      setIsModalExtend(false);
    }
  };

  const handleCancelDeleteModal = () => {
    setIsModalDelete(false);
    setItemIdToDelete(null);
  };

  const handleCancelCloseModal = () => {
    setIsModalClose(false);
    setItemIdToClose(null);
  };

  const handleCancelExtendModal = () => {
    setIsModalExtend(false);
    setItemIdToExtend(null);
  };

  const handleChange = (page) => {
    setPage(page);
  };

  const getPagedList = () => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filteredJobList.slice(start, end);
  };
 console.log(getPagedList());

  return (
    <>
      <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Card
          bodyStyle={{ padding: 'unset' }}
          style={joblist.card}
          className="card-jobs"
          headStyle={{ paddingLeft: 0 }}
          title={
            <div className="trackingJobs">
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
              <Button type="primary" size="large">
                Đăng bài
              </Button>
            </Link>
          }
        >
          {isLoading && <Loading />}
          {getPagedList().length === 0 || getPagedList() === null ? (
            <div>
              <Empty description={<span>Dữ liệu trống</span>} />
            </div>
          ) : (
            getPagedList()?.map((job) => (
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
                      target="_blank"
                    >
                      <Typography.Title
                        style={{ margin: 0 }}
                        level={md ? 4 : 5}
                      >
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
                  {CalculateDaysLeft(job.applicationSubmitDeadline)}
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
            ))
          )}
          <Pagination
            current={page}
            total={filteredJobList.length}
            showSizeChanger={false}
            pageSize={pageSize}
            onChange={handleChange}
            style={{ padding: 20, display: 'flex', justifyContent: 'center' }}
          />
        </Card>
        <ModalPrimary
          title="Hoàn thành công việc"
          open={isModalDelete}
          bodyStyle={{ paddingTop: 20 }}
          onOk={handleDelete}
          onCancel={handleCancelDeleteModal}
          okText="Xoá"
          okType="danger"
        >
          Bạn có chắc muốn xoá công việc
        </ModalPrimary>
        <ModalPrimary
          title="Đóng công việc"
          open={isModalClose}
          bodyStyle={{ paddingTop: 20 }}
          onOk={handleClose}
          onCancel={handleCancelCloseModal}
          okText="Đóng công việc"
          okType="danger"
        >
          Bạn có chắc muốn đóng công việc
        </ModalPrimary>
        <ModalPrimary
          title="Gia hạn công việc"
          open={isModalExtend}
          bodyStyle={{ paddingTop: 20 }}
          onOk={handleExtend}
          onCancel={handleCancelExtendModal}
          okText="Gia hạn công việc"
        >
          Bạn có chắc muốn gia hạn công việc
        </ModalPrimary>
      </Layout.Content>
    </>
  );
};

export default ClientJobManagement;
