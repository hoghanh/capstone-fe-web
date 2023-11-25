import { Card, Col, Input, Row, Typography, DatePicker, Empty } from 'antd';
import { CustomDivider, CustomRow } from 'components/customize/Layout';
import { PaperClipOutlined } from 'components/icon/Icon';
import React, { useState } from 'react';
import color from 'styles/color';
import { useRecoilState, useRecoilValue } from 'recoil';
import { proposalListState, valueSearchState } from 'recoil/atom';

const tabListNoTitle = [
  {
    key: 'Sent',
    label: 'Đã gửi',
  },
  {
    key: 'Approved',
    label: 'Đã nhận',
  },
  {
    key: 'Declined',
    label: 'Từ chối',
  },
];

const TabSent = () => {
  const proposalList = useRecoilValue(proposalListState);
  const search = useRecoilValue(valueSearchState);
  const list = proposalList.filter((item) => {
    return search === ''
      ? item.status === 'Sent'
      : item.jobs.title.toLowerCase().includes(search) &&
          item.status === 'Sent';
  });
  return (
    <Row>
      {list.length === 0 || list === null ? (
        <Col span={24}>
          <Empty />
        </Col>
      ) : (
        list.map((proposal, index) => {
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
                          <Typography.Title level={4} style={{ margin: 0 }}>
                            {proposal.jobs.title}
                          </Typography.Title>
                        </Col>
                        <Col span={24}>
                          <Typography.Text style={{ margin: 0 }}>
                            Công ty cổ phần Foody
                          </Typography.Text>
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
                    {proposal.description}
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
  );
};

const TabApproved = () => {
  const proposalList = useRecoilValue(proposalListState);
  const search = useRecoilValue(valueSearchState);
  const list = proposalList.filter((item) => {
    return search === ''
      ? item.status === 'approved'
      : item.jobs.title.toLowerCase().includes(search) &&
          item.status === 'approved';
  });
  return (
    <>
      <Row>
        {list.length === 0 || list === null ? (
          <Col span={24}>
            <Empty />
          </Col>
        ) : (
          list.map((proposal, index) => {
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
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {proposal.jobs.title}
                            </Typography.Title>
                          </Col>
                          <Col span={24}>
                            <Typography.Text style={{ margin: 0 }}>
                              Lương: 400.000VND
                            </Typography.Text>
                          </Col>
                          <Col span={24}>
                            <Typography.Text
                              style={{ margin: 0, paddingRight: 15 }}
                            >
                              Ngày bắt đầu: 23/7/2023
                            </Typography.Text>
                            <Typography.Text style={{ margin: 0 }}>
                              Ngày kết thúc: 24/7/2023
                            </Typography.Text>
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
                      {proposal.description}
                    </Typography.Text>
                  </Col>
                  <Col span={24}>
                    <CustomRow align={'middle'}>
                      <Col>
                        <Typography.Title
                          level={5}
                          style={{ margin: 0, paddingRight: 10 }}
                        >
                          Hợp đồng
                        </Typography.Title>
                      </Col>
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

const TabDeclined = () => {
  const proposalList = useRecoilValue(proposalListState);
  const search = useRecoilValue(valueSearchState);
  const list = proposalList.filter((item) => {
    return search === ''
      ? item.status === 'declined'
      : item.jobs.title.toLowerCase().includes(search) &&
          item.status === 'declined';
  });
  return (
    <>
      <Row>
        {list.length === 0 || list === null ? (
          <Col span={24}>
            <Empty />
          </Col>
        ) : (
          list.map((proposal, index) => {
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
                            <Typography.Title level={4} style={{ margin: 0 }}>
                              {proposal.jobs.title}
                            </Typography.Title>
                          </Col>
                          <Col span={24}>
                            <Typography.Text style={{ margin: 0 }}>
                              Công ty cổ phần Foody
                            </Typography.Text>
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
                      {proposal.description}
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
  Sent: <TabSent />,
  Approved: <TabApproved />,
  Declined: <TabDeclined />,
};

const ProposalsTracking = () => {
  const [activeTabKey2, setActiveTabKey2] = useState('Sent');
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
    <Card style={{ marginBottom: 30 }}>
      <Row gutter={[0, 10]}>
        <Col span={24}>
          <Typography.Title level={3} style={{ margin: '20px 30px 10px' }}>
            Danh sách ứng tuyển của tôi
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
            placeholder="Tìm kiếm..."
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
            timezone="UTC"
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
          />
        </Col>
        <Col className="trackingJobs" span={24}>
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

export default ProposalsTracking;
