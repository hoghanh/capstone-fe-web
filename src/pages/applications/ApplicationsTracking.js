import {
  Card,
  Col,
  Input,
  Row,
  Typography,
  DatePicker,
  Empty,
  Pagination,
} from 'antd';
import { CustomDivider, CustomRow } from 'components/customize/Layout';
import { PaperClipOutlined } from 'components/icon/Icon';
import React, { useEffect, useState } from 'react';
import color from 'styles/color';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { freelancerState, valueSearchState } from 'recoil/atom';
import { Link } from 'react-router-dom';
import { get } from 'utils/APICaller';
import { formatDate } from 'components/formatter/format';
import locale from 'antd/es/date-picker/locale/vi_VN';
import 'dayjs/locale/vi';

const tabList = [
  {
    key: 'sent',
    label: 'Ứng tuyển',
  },
  {
    key: 'interview',
    label: 'Phỏng vấn',
  },
  {
    key: 'approved',
    label: 'Đã nhận',
  },

  {
    key: 'declined',
    label: 'Từ chối',
  },
];

const TabSent = ({ activeTabKey, value, page, setPage }) => {
  const [applicationList, setApplicationList] = useState([]);
  const search = useRecoilValue(valueSearchState);
  const [list, setList] = useState([]);
  const [pageSize] = useState(10);
  const user = useRecoilValue(freelancerState);

  useEffect(() => {
    if (user) {
      getApplications(user);
    }
  }, [user]);

  useEffect(() => {
    if (value) {
      const start = new Date(value[0]);
      const end = new Date(value[1]);
      const filteredDate = applicationList.filter((item) => {
        const sendDate = new Date(item.sendDate);
        return sendDate >= start && sendDate <= end;
      });
      const filtered = filteredDate.filter((item) => {
        if (activeTabKey === 'sent') {
          return search === ''
            ? item.status === 'sent'
            : item.jobs.title.toLowerCase().includes(search) &&
                item.status === 'sent';
        } else if (activeTabKey === 'interview') {
          return search === ''
            ? item.status === 'interview'
            : item.jobs.title.toLowerCase().includes(search) &&
                item.status === 'interview';
        } else if (activeTabKey === 'approved') {
          return search === ''
            ? item.status === 'approved'
            : item.jobs.title.toLowerCase().includes(search) &&
                item.status === 'approved';
        } else if (activeTabKey === 'declined') {
          return search === ''
            ? item.status === 'declined'
            : item.jobs.title.toLowerCase().includes(search) &&
                item.status === 'declined';
        }
        return true;
      });
      setList(filtered);
    } else {
      const filtered = applicationList.filter((item) => {
        if (activeTabKey === 'sent') {
          return search === ''
            ? item.status === 'sent'
            : item.jobs.title.toLowerCase().includes(search) &&
                item.status === 'sent';
        } else if (activeTabKey === 'interview') {
          return search === ''
            ? item.status === 'interview'
            : item.jobs.title.toLowerCase().includes(search) &&
                item.status === 'interview';
        } else if (activeTabKey === 'approved') {
          return search === ''
            ? item.status === 'approved'
            : item.jobs.title.toLowerCase().includes(search) &&
                item.status === 'approved';
        } else if (activeTabKey === 'declined') {
          return search === ''
            ? item.status === 'declined'
            : item.jobs.title.toLowerCase().includes(search) &&
                item.status === 'declined';
        }
        return true;
      });
      setList(filtered);
    }
  }, [search, activeTabKey, applicationList, value]);

  const getApplications = (user) => {
    get({ endpoint: `/application/freelancer/${user.id}` })
      .then((response) => {
        const data = response.data;
        let applications = data.filter(
          (application) =>
            application.jobId !== null && application.jobs !== null
        );
        setApplicationList(applications);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (page) => {
    setPage(page);
  };

  const getPagedList = () => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return list.slice(start, end);
  };

  return (
    <Row>
      {list.length === 0 || list === null ? (
        <Col span={24}>
          <Empty description={<span>Dữ liệu trống</span>} />
        </Col>
      ) : (
        getPagedList().map((application, index) => {
          return (
            <Col key={index} span={24}>
              <Row
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                gutter={[0, 5]}
              >
                <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Row justify={'space-between'}>
                    <Col>
                      <Row gutter={[0, 10]}>
                        <Col span={24}>
                          <Link
                            to={`/jobs/job-detail/${application.jobId}`}
                            target='_blank'
                          >
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {application.jobs.title}
                            </Typography.Title>
                          </Link>
                        </Col>
                        <Col span={24}>
                          <Typography.Text style={{ margin: 0 }}>
                            Công ty: {application.jobs.clients?.accounts?.name}
                          </Typography.Text>
                        </Col>
                        <Col span={24}>
                          <Typography.Text style={{ margin: 0 }}>
                            Ngày gửi: {formatDate(application.sendDate)}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Typography.Paragraph
                    style={{
                      margin: 0,
                      paddingLeft: 10,
                      paddingRight: 10,
                      cursor: 'pointer',
                      textAlign: 'justify',
                    }}
                    ellipsis={{
                      rows: 3,
                      expandable: true,
                      symbol: 'Xem thêm',
                    }}
                  >
                    <p dangerouslySetInnerHTML={{ __html: application.description }} />
                  </Typography.Paragraph>
                </Col>
                {application.fileAttach ? (
                  <Col span={24}>
                    <CustomRow align={'middle'}>
                      <Col>
                        <PaperClipOutlined />
                      </Col>
                      <Col>
                        <Typography.Link
                          href={application.fileAttach}
                          target='_blank'
                          underline={true}
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            marginLeft: 5,
                            color: color.colorPrimary,
                            cursor: 'pointer',
                          }}
                        >
                          CV.pdf
                        </Typography.Link>
                      </Col>
                    </CustomRow>
                  </Col>
                ) : null}
              </Row>
              <CustomDivider />
            </Col>
          );
        })
      )}
      <Col span={24}>
        <Pagination
          current={page}
          total={list.length}
          showSizeChanger={false}
          pageSize={pageSize}
          onChange={handleChange}
          style={{ padding: 20, display: 'flex', justifyContent: 'center' }}
        />
      </Col>
    </Row>
  );
};

const ApplicationsTracking = () => {
  const [activeTabKey, setActiveTabKey] = useState('sent');
  const setSearch = useSetRecoilState(valueSearchState);
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const { RangePicker } = DatePicker;
  const { Search } = Input;
  const [page, setPage] = useState(1);


  const onTabChange = (key) => {
    setPage(1)
    setActiveTabKey(key);
  };

  const onSearch = (value, _e, info) => setSearch(value.toLowerCase());

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 30;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 30;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  return (
    <Card style={{ padding: 0, marginBottom: 30 }}>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <Typography.Title level={3} style={{ margin: '20px 30px 10px' }}>
            Công việc của tôi
          </Typography.Title>
        </Col>
        <Col
          span={12}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Search
            placeholder='Tìm kiếm...'
            allowClear
            onSearch={onSearch}
            style={{
              width: '100%',
            }}
          />
        </Col>
        <Col
          span={12}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <RangePicker
            timezone='UTC'
            value={dates || value}
            disabledDate={disabledDate}
            onCalendarChange={(val) => {
              setDates(val);
            }}
            onChange={(val) => {
              setValue(val);
            }}
            format={'DD/MM/YYYY'}
            onOpenChange={onOpenChange}
            changeOnBlur
            locale={locale}
          />
        </Col>
        <Col className='trackingJobs' span={24}>
          <Card
            style={{
              width: '100%',
              border: 'transparent',
            }}
            headStyle={{
              color: color.colorBlack,
              fontWeight: 'bold',
              paddingLeft: 30,
              paddingRight: 30,
              margin: '10px 0',
              borderBottom: '0.5px solid #000 !important',
            }}
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
          >
            <TabSent activeTabKey={activeTabKey} value={value} page={page} setPage={setPage} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ApplicationsTracking;
