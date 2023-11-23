import {
  Card,
  Col,
  Input,
  Row,
  Typography,
  DatePicker,
  Image,
  Empty,
} from 'antd';
import {
  CustomCol,
  CustomDivider,
  CustomRow,
} from 'components/customize/Layout';
import { PaperClipOutlined } from 'components/icon/Icon';
import React, { useState } from 'react';
import color from 'styles/color';
import { useRecoilState, useRecoilValue } from 'recoil';
import { profileState, applicationListState, valueSearchState } from 'recoil/atom';
import { ButtonPrimary } from 'components/customize/GlobalCustomize';
import { Link } from 'react-router-dom';
import locale from 'antd/es/date-picker/locale/vi_VN';
import 'dayjs/locale/vi';


const tabListNoTitle = [
  {
    key: 'Recommend',
    label: 'Phù hợp với công việc',
  },
  {
    key: 'Approved',
    label: 'Được gửi',
  },
  {
    key: 'Declined',
    label: 'Phỏng vấn',
  },
];

const TabRecommend = () => {
  const applicationList = useRecoilValue(applicationListState);
  const search = useRecoilValue(valueSearchState);
  const list = applicationList.filter((item) => {
    return search === ''
      ? item.status === 'Sent'
      : item.freelancers?.accounts.name.toLowerCase().includes(search) &&
          item.status === 'Sent';
  });
  const [ellipsis, setEllipsis] = useState(true);
  console.log(applicationList);
  console.log(list);
  return (
    <>
      <Row>
        {list.length === 0 || list === null ? (
          <Col span={24}>
            <Empty />
          </Col>
        ) : (
          list.map((application, index) => {
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
                  <Col span={24}>
                    <Row justify={'space-between'}>
                      <Col>
                        <Row align={'middle'}>
                          <Col
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginRight: 10,
                              position: 'relative',
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                          >
                            <Image
                              width={72}
                              src={application?.freelancers.accounts.image}
                              alt='Freelancer Avatar'
                              preview={true}
                              style={{ borderRadius: '50%' }}
                            />
                          </Col>
                          <CustomCol>
                            <Row gutter={10}>
                              <Col>
                                <Link to='/client/applications/freelancer-profile'>
                                  <Typography.Title
                                    level={4}
                                    style={{ margin: 0 }}
                                  >
                                    {application?.freelancers.accounts.name}
                                  </Typography.Title>
                                </Link>
                              </Col>
                            </Row>
                          </CustomCol>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Link to={`/jobs/job-detail/${application.id}`}>
                      <Typography.Paragraph
                        style={{
                          margin: 0,
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                        ellipsis={
                          ellipsis
                            ? {
                                rows: 3,
                              }
                            : false
                        }
                      >
                        {application?.description}
                      </Typography.Paragraph>
                    </Link>
                  </Col>
                  <Col span={24}>
                    <CustomRow align={'middle'}>
                      <Col>
                        <PaperClipOutlined />
                      </Col>
                      <Col>
                        <a
                          href={application?.fileAttach}
                          target='_blank'
                          download={application?.fileAttach}
                          rel='noreferrer'
                        >
                          <Typography.Text
                            underline={true}
                            style={{
                              fontWeight: 700,
                              fontSize: 14,
                              marginLeft: 5,
                              color: color.colorPrimary,
                            }}
                          >
                            fileAttachName.doc
                          </Typography.Text>
                        </a>
                      </Col>
                    </CustomRow>
                  </Col>
                </Row>
                {list.length === index + 1 ? null : <CustomDivider />}
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

const TabDeclined = () => {
  const applicationList = useRecoilValue(applicationListState);
  const search = useRecoilValue(valueSearchState);
  const list = applicationList.filter((item) => {
    return search === ''
      ? item.status === 'declined'
      : item.freelancers?.accounts?.name.toLowerCase().includes(search) &&
          item.status === 'declined';
  });
  const informationUser = useRecoilValue(profileState);

  return (
    <>
      <Row>
        {list.length === 0 || list === null ? (
          <Col span={24}>
            <Empty />
          </Col>
        ) : (
          list.map((application, index) => {
            return (
              <Col span={24}>
                <Row
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                  gutter={[0, 5]}
                >
                  <Col span={24}>
                    <Row justify={'space-between'}>
                      <Col>
                        <Row align={'middle'}>
                          <Col
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginRight: 10,
                              position: 'relative',
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                          >
                            <Image
                              width={72}
                              src={application.freelancers?.accounts?.image}
                              alt='Apofoitisi logo'
                              preview={true}
                              style={{ borderRadius: '50%' }}
                            />
                          </Col>
                          <CustomCol>
                            <Row gutter={10}>
                              <Col>
                                <Typography.Title
                                  level={4}
                                  style={{ margin: 0 }}
                                >
                                  {application.freelancers?.accounts?.name}
                                </Typography.Title>
                              </Col>
                            </Row>
                          </CustomCol>
                        </Row>
                      </Col>
                      <Col>
                        <Row gutter={[10, 10]}>
                          <Col>
                            <ButtonPrimary
                              $info
                              style={{
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingBottom: 10,
                                paddingTop: 10,
                              }}
                            >
                              Sửa thời gian phỏng vấn
                            </ButtonPrimary>
                          </Col>
                          <Col>
                            <ButtonPrimary
                              $warning
                              style={{
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingBottom: 10,
                                paddingTop: 10,
                              }}
                            >
                              Từ chối
                            </ButtonPrimary>
                          </Col>
                          <Col>
                            <ButtonPrimary
                              style={{
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingBottom: 10,
                                paddingTop: 10,
                              }}
                            >
                              Bắt đầu làm
                            </ButtonPrimary>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Typography.Text
                      style={{
                        display: 'flex',
                        margin: 0,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      {application.description}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <CustomRow align={'middle'}>
                      <Col>
                        <PaperClipOutlined />
                      </Col>
                      <Col>
                        <Typography.Text
                          underline={true}
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            marginLeft: 5,
                            color: color.colorPrimary,
                          }}
                        >
                          fileAttachName.doc
                        </Typography.Text>
                      </Col>
                    </CustomRow>
                  </Col>
                </Row>
                {list.length === index + 1 ? null : <CustomDivider />}
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

const TabApproved = () => {
  const applicationList = useRecoilValue(applicationListState);
  const search = useRecoilValue(valueSearchState);
  const list = applicationList.filter((item) => {
    return search === ''
      ? item.status === 'Sent'
      : item.freelancers?.accounts?.name.toLowerCase().includes(search) &&
          item.status === 'Sent';
  });
  const informationUser = useRecoilValue(profileState);
  return (
    <>
      <Row>
        {list.length === 0 || list === null ? (
          <Col span={24}>
            <Empty />
          </Col>
        ) : (
          list.map((application, index) => {
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
                  <Col span={24}>
                    <Row justify={'space-between'}>
                      <Col>
                        <Row align={'middle'}>
                          <Col
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginRight: 10,
                              position: 'relative',
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                          >
                            <Image
                              width={72}
                              src={application.freelancers?.accounts?.image}
                              alt='Apofoitisi logo'
                              preview={true}
                              style={{ borderRadius: '50%' }}
                            />
                          </Col>
                          <CustomCol>
                            <Row gutter={10}>
                              <Col>
                                <Typography.Title
                                  level={4}
                                  style={{ margin: 0 }}
                                >
                                  {application.freelancers?.accounts?.name}
                                </Typography.Title>
                              </Col>
                            </Row>
                          </CustomCol>
                        </Row>
                      </Col>
                      <Col>
                        <Row gutter={[10, 10]}>
                          <Col>
                            <ButtonPrimary
                              $warning
                              style={{ padding: '10px 20px' }}
                            >
                              Từ chối
                            </ButtonPrimary>
                          </Col>
                          <Col>
                            <ButtonPrimary style={{ padding: '10px 20px' }}>
                              Bắt đầu làm
                            </ButtonPrimary>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <Typography.Text
                      style={{
                        display: 'flex',
                        margin: 0,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      {application.description}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <CustomRow align={'middle'}>
                      <Col>
                        <PaperClipOutlined />
                      </Col>
                      <Col>
                        <Typography.Text
                          underline={true}
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            marginLeft: 5,
                            color: color.colorPrimary,
                          }}
                        >
                          fileAttachName.doc
                        </Typography.Text>
                      </Col>
                    </CustomRow>
                  </Col>
                </Row>
                {list.length === index + 1 ? null : <CustomDivider />}
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

const contentListNoTitle = {
  Recommend: <TabRecommend />,
  Approved: <TabApproved />,
  Declined: <TabDeclined />,
};

const ApplicationsTracking = () => {
  const [activeTabKey2, setActiveTabKey2] = useState('Recommend');
  const [, setSearch] = useRecoilState(valueSearchState);
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const { RangePicker } = DatePicker;
  const { Search } = Input;

  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  const onSearch = (value, _e, info) => setSearch(value.toLowerCase());

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
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
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey2}
            onTabChange={onTab2Change}
          >
            {contentListNoTitle[activeTabKey2]}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default ApplicationsTracking;
