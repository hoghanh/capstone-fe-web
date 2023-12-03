import { ClockCircleFilled } from '@ant-design/icons';
import { Col, List, Row, Typography, Skeleton, Modal, notification } from 'antd';
import { CustomCard, CustomCol, CustomDivider, CustomRow } from 'components/customize/Layout';
import { PaperClipOutlined, Pen, Trash } from 'components/icon/Icon';
import React, { useState } from 'react';
import color from 'styles/color';
import '../jobDetail.module.css';
import { CalculateDaysLeft, FormatVND } from 'components/formatter/format';
import { useRecoilValue } from 'recoil';
import { jobDetailState } from 'recoil/atom';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ModalAlert } from 'components/Modal/Modal';
import { remove } from 'utils/APICaller';


const RemoveAlert = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const removeItem = () => {
    remove({ endpoint: `/job/detail/${id}` })
      .then((res) => {
        notification.success({
          message: 'Xoá bài viết thành công',
        });
        navigate('/client/jobs-management');
      })
      .catch((error) => {
        notification.error({
          message: 'Có lỗi xảy ra trong quá trình xoá',
        });
      });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    removeItem();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Col onClick={showModal} style={{ cursor: 'pointer' }}>
        <Trash color={'red'} />
      </Col>
      <ModalAlert title={'Thông báo'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Typography.Text>Bạn chắc chắn muốn xóa chưa?</Typography.Text>
      </ModalAlert>
    </>
  );
};

//Header Article right
const HeaderArticle = () => {
  const jobDetail = useRecoilValue(jobDetailState);
  const { id } = useParams();

  return (
    <>
      <Row>
        <Col sm={{ span: 24 }} xs={{ span: 0 }}>
          <CustomRow>
            <CustomCol span={11} style={styles.headerRight}>
              <Typography.Title level={3} style={styles.headerTitleRight}>
                Chi tiết dự án
              </Typography.Title>
            </CustomCol>
            <CustomCol
              span={11}
              style={{
                ...styles.headerRight,
                alignItems: 'flex-end',
              }}
            >
              <Typography.Title level={4} style={styles.headerTitleRight}>
                {FormatVND(jobDetail.lowestIncome)} - {FormatVND(jobDetail.highestIncome)}
              </Typography.Title>
              <div>
                <ClockCircleFilled />
                <Typography.Text style={{ ...styles.headerTextRight, marginLeft: 10 }}>
                  {CalculateDaysLeft(jobDetail.applicationSubmitDeadline)}
                </Typography.Text>
              </div>
            </CustomCol>
            <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Row gutter={[15, 10]}>
                <RemoveAlert />
                <Link to={`/client/jobs-management/edit-job/${id}`}>
                  <Col style={{ cursor: 'pointer' }}>
                    <Pen size={24} />
                  </Col>
                </Link>
              </Row>
            </Col>
          </CustomRow>
        </Col>
        <Col sm={{ span: 0 }} xs={{ span: 24 }}>
          <CustomRow>
            <CustomCol span={22} style={styles.headerRight}>
              <Row gutter={[0, 5]}>
                <Col span={24}>
                  <Typography.Title level={3} style={styles.headerTitleRight}>
                    Chi tiết dự án
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Title level={4} style={styles.headerTitleRight}>
                    {FormatVND(jobDetail.lowestIncome)} - {FormatVND(jobDetail.highestIncome)}
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <div>
                    <ClockCircleFilled />
                    <Typography.Text style={{ ...styles.headerTextRight, marginLeft: 10 }}>
                      {CalculateDaysLeft(jobDetail.applicationSubmitDeadline)}
                    </Typography.Text>
                  </div>
                </Col>
              </Row>
            </CustomCol>
            <Col
              span={2}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '10px 0px' }}
            >
              <Row gutter={[15, 10]}>
                <Col style={{ cursor: 'pointer' }}>
                  <Trash color={'red'} />
                </Col>
                <Link to={`/client/jobs-management/edit-job/${id}`}
                >
                  <Col style={{ cursor: 'pointer' }}>
                    <Pen size={24} />
                  </Col>
                </Link>
              </Row>
            </Col>
          </CustomRow>
        </Col>
      </Row>
    </>
  );
};

//Description
const DescriptionsArticle = ({ description }) => {
  return (
    <Row>
      <CustomCol span={24}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>{description}</Typography.Text>
          </Col>
        </Row>
      </CustomCol>
    </Row>
  );
};

//Attachment
const AttachmentArticle = () => {
  const jobDetail = useRecoilValue(jobDetailState);
  return (
    <CustomRow>
      <Col span={24}>
        <Typography.Title level={5} style={styles.titleSection}>
          Tệp tin đính kèm
        </Typography.Title>
      </Col>
      <CustomCol span={24} style={{ display: 'flex' }}>
        <PaperClipOutlined />
        {jobDetail.fileAttachment ? (
          <Typography.Link
            href={jobDetail.fileAttachment}
            target="_blank"
            underline={true}
            style={{
              fontWeight: 700,
              fontSize: 14,
              marginLeft: 5,
              color: color.colorPrimary,
              cursor: "pointer",
            }}
          >
            Tệp đính kèm
          </Typography.Link>
        ) : (
          <Typography.Text
            style={{
              fontWeight: 700,
              fontSize: 14,
              marginLeft: 5,
              color: "#ccc",
              cursor: "not-allowed",
            }}
          >
            Tệp đính kèm
          </Typography.Text>
        )}
      </CustomCol>
    </CustomRow>
  );
};

//Skill
const SkillArticle = () => {
  const jobDetail = useRecoilValue(jobDetailState);
  const SkeletonSkills = () => {
    const skeletonButtons = Array.from({ length: 5 }, (_, index) => (
      <Skeleton.Button key={index} active shape={'round'} />
    ));

    return <div style={{ display: 'flex', gap: 15 }}>{skeletonButtons}</div>;
  };

  return (
    <CustomRow className='skillArticle' gutter={[0, 10]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Yêu cầu kỹ năng
        </Typography.Title>
      </Col>
      <CustomCol span={24}>
        {jobDetail.skills.id !== '' ? (
          <List
            style={{ overflowX: 'auto' }}
            grid={{
              gutter: 15,
            }}
            dataSource={jobDetail.skills}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  padding: '5px 10px',
                  backgroundColor: color.colorBluishCyan,
                  borderRadius: 25,
                  whiteSpace: 'nowrap',
                }}
              >
                {item.name}
              </List.Item>
            )}
          />
        ) : (
          <SkeletonSkills />
        )}
      </CustomCol>
    </CustomRow>
  );
};


const ArticleLeft = () => {
  const jobDetail = useRecoilValue(jobDetailState);

  return (
    <Col span={24} style={{ paddingRight: 20 }}>
      <HeaderArticle
        lowestIncome={jobDetail.lowestIncome}
        highestIncome={jobDetail.highestIncome}
        applicationSubmitDeadline={jobDetail.applicationSubmitDeadline}
      />
      <CustomDivider />
      <DescriptionsArticle description={jobDetail.description} />
      <CustomDivider />
      {jobDetail.fileAttachment ? (
        <>
          <AttachmentArticle />
          <CustomDivider />
        </>
      ) : null}
      <SkillArticle />
    </Col>
  );
};


const Details = () => {
  const jobDetail = useRecoilValue(jobDetailState);

  return (
    <>
      <Typography.Title level={2} style={styles.titlePost}>
        {jobDetail.title}
      </Typography.Title>
      <CustomCard style={{ marginBottom: 30 }}>
        <CustomRow gutter={[20, 0]}>
          <ArticleLeft />
        </CustomRow>
      </CustomCard>
    </>
  );
};

const styles = {
  titlePost: { padding: '10px 30px', margin: '20px 0' },

  //Article Right
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  headerTitleRight: {
    lineHeight: 'normal',
    margin: 0,
  },

  headerTextRight: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
  },

  titleSection: { margin: '0 0 10px 0' },

  iconBookmark: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Details;
