import { ClockCircleFilled, InboxOutlined } from '@ant-design/icons';
import {
  Col,
  List,
  Row,
  Typography,
  Upload,
  Form,
  Skeleton,
  notification,
  Spin,
  Grid,
} from 'antd';
import {
  CustomCard,
  CustomCol,
  CustomDivider,
  CustomRow,
} from 'components/customize/Layout';
import {
  BookMark,
  BookMarkOutlined,
  Envelope,
  MapMarkerAlt,
  PaperClipOutlined,
  PhoneAlt,
} from 'components/icon/Icon';
import LoginModal from 'layout/header/LoginModal';
import React, { useEffect, useState } from 'react';
import color from 'styles/color';
import css from './jobDetail.module.css';
import './jobDetail.module.css';
import { ButtonPrimary } from 'components/customize/GlobalCustomize';
import { CalculateDaysLeft, FormatVND } from 'components/formatter/format';
import { useRecoilValue } from 'recoil';
import { authState, freelancerState, jobDetailState } from 'recoil/atom';
import { ModalPrimary } from 'components/Modal/Modal';
import TextArea from 'antd/es/input/TextArea';
import { get, post, remove } from 'utils/APICaller';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'config/firebase';
import { Link, useParams } from 'react-router-dom';
import socket from 'config';

const { Dragger } = Upload;

const SubmitApplication = ({ status, setStatus }) => {
  const { useBreakpoint } = Grid;
  const { lg } = useBreakpoint();
  const [form] = Form.useForm();

  const freelancer = useRecoilValue(freelancerState);
  const jobDetail = useRecoilValue(jobDetailState);
  const auth = useRecoilValue(authState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setProgresspercent] = useState(0);
  let { id } = useParams();

  const [notificationData, setNotificationData] = useState({
    accountId: auth.id,
    notificationName: 'Đơn ứng tuyển mới',
    notificationDescription: `Bạn vừa nhận 1 đơn ứng tuyển từ ${auth.name}`,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const uploadFile = (event) => {
    const file = event.dragger[0].originFileObj;

    if (!file) return;
    const storageRef = ref(storage, `applications/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          createApplication(event, downloadURL);
        });
      }
    );
  };

  const createApplication = (values, url) => {
    const { description } = values;
    const time = new Date();
    post({
      endpoint: `/application`,
      body: {
        fileAttach: url,
        description: description,
        sendDate: time,
        freelancerId: freelancer.id,
        jobId: id,
      },
    })
      .then((res) => {
        //Gửi notification [thông tin] - đến [email người nhận]
        socket.emit(
          'sendNotification',
          notificationData,
          'caohanh1711@gmail.com'
        );

        notification.success({
          message: 'Ứng tuyển thành công',
        });

        return () => {
          socket.disconnect();
        };
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (
          values.dragger !== undefined &&
          values.dragger !== null &&
          values.dragger !== ''
        ) {
          uploadFile(values);
        } else {
          createApplication(values);
        }
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    name: 'files',
    maxCount: 1,
    beforeUpload: () => false,
  };

  return (
    <>
      <ButtonPrimary style={{ fontSize: lg ? 16 : 11 }} onClick={showModal}>
        Gửi CV/Resume
      </ButtonPrimary>
      <ModalPrimary
        title={'Chi tiết ứng tuyển'}
        open={isModalOpen}
        bodyStyle={{ paddingTop: 20 }}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'Gửi đi'}
      >
        <Form
          form={form}
          name='submitApplication'
          initialValues={{ remember: true }}
        >
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    Mô tả mong muốn
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='description'
                    rules={[
                      {
                        required: true,
                        message: 'Xin không để trường nhập trống!',
                      },
                    ]}
                  >
                    <TextArea
                      className='introText'
                      showCount
                      allowClear={true}
                      maxLength={1000}
                      rows={5}
                      placeholder='textarea'
                    />
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
            <Col span={24}>
              <CustomRow gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    CV/Resume đính kèm (PDF)
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name='dragger'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                  >
                    <Dragger {...props}>
                      <p className='ant-upload-drag-icon'>
                        <InboxOutlined />
                      </p>
                      <p className='ant-upload-text'>Kéo hoặc chọn tệp</p>
                    </Dragger>
                  </Form.Item>
                </Col>
              </CustomRow>
            </Col>
          </Row>
        </Form>
      </ModalPrimary>
    </>
  );
};

//Header Article right
const HeaderArticle = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const auth = useRecoilValue(authState);
  const [isLoading, setIsLoading] = useState(false);
  const jobDetail = useRecoilValue(jobDetailState);

  useEffect(() => {
    if (auth.role === 'freelancer') {
      getFavorite();
    } else {
      setFavoriteList([]);
    }
  }, []);

  const getFavorite = () => {
    get({ endpoint: `/accounts/favorite/${auth.id}` })
      .then((res) => {
        const idList = res.data.jobs.map((item) => item.id);
        setFavoriteList(idList);
      })
      .catch((error) => {
        console.log(error);
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
    switch (auth.role) {
      case 'freelancer':
        if (!favoriteList.includes(id)) {
          addFavorite(id);
        } else {
          removeFavorite(id);
        }
        break;
      case 'client':
        notification.error('Bạn không thể thêm hoặc xóa job yêu thích');
        setIsLoading(false);
        break;
      default:
        notification.error('Hãy đăng nhập!');
        setIsLoading(false);
        break;
    }
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 24 }} xs={{ span: 0 }}>
          <CustomRow>
            <CustomCol span={11} style={styles.headerRight}>
              <Typography.Title level={3} style={styles.headerTitleRight}>
                Chi tiết dự án
              </Typography.Title>
              <Typography.Text style={styles.headerTextRight}>
                {jobDetail.applied} Freelancer đã ứng tuyển
              </Typography.Text>
            </CustomCol>
            <CustomCol
              span={11}
              style={{
                ...styles.headerRight,
                alignItems: 'flex-end',
              }}
            >
              <Typography.Title level={4} style={styles.headerTitleRight}>
                {FormatVND(jobDetail.lowestIncome)} -{' '}
                {FormatVND(jobDetail.highestIncome)}
              </Typography.Title>
              <div>
                <ClockCircleFilled />
                <Typography.Text
                  style={{ ...styles.headerTextRight, marginLeft: 10 }}
                >
                  {CalculateDaysLeft(jobDetail.applicationSubmitDeadline)}
                </Typography.Text>
              </div>
            </CustomCol>
            <Col
              span={2}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleFavoriteChange(jobDetail.id)}
            >
              {isLoading ? (
                <Spin />
              ) : favoriteList.includes(jobDetail.id) ? (
                <BookMark />
              ) : (
                <BookMarkOutlined />
              )}
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
                    {FormatVND(jobDetail.lowestIncome)} -{' '}
                    {FormatVND(jobDetail.highestIncome)}
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text style={styles.headerTextRight}>
                    {jobDetail.applied} Freelancer đã ứng tuyển
                  </Typography.Text>
                </Col>{' '}
                <Col span={24}>
                  <div>
                    <ClockCircleFilled />
                    <Typography.Text
                      style={{ ...styles.headerTextRight, marginLeft: 10 }}
                    >
                      {CalculateDaysLeft(jobDetail.applicationSubmitDeadline)}
                    </Typography.Text>
                  </div>
                </Col>
              </Row>
            </CustomCol>
            <Col
              span={2}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '10px 0px',
                cursor: 'pointer',
              }}
              onClick={() => handleFavoriteChange(jobDetail.id)}
            >
              {isLoading ? (
                <Spin />
              ) : favoriteList.includes(jobDetail.id) ? (
                <BookMark />
              ) : (
                <BookMarkOutlined />
              )}
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
            <Typography.Text style={{ fontSize: 14, fontWeight: 400 }}>
              {description}
            </Typography.Text>
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
            fileCV.pdf
          </Typography.Link>
        ) : (
          <Typography.Text
            style={{
              fontWeight: 700,
              fontSize: 14,
              marginLeft: 5,
              color: '#ccc',
              cursor: 'not-allowed',
            }}
          >
            fileCV.pdf
          </Typography.Text>
        )}
      </CustomCol>
    </CustomRow>
  );
};

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

//About customer
const AboutCustomer = () => {
  const jobDetail = useRecoilValue(jobDetailState);
  return (
    <CustomRow gutter={[0, 10]}>
      <Col span={24}>
        <Typography.Title
          level={4}
          style={{
            fontStyle: 'normal',
            margin: '0 0 0 -10px',
            paddingBottom: 20,
          }}
        >
          Về khách hàng
        </Typography.Title>
      </Col>
      <CustomCol
        span={24}
        style={{ display: 'flex', gap: 10, flexDirection: 'column' }}
      >
        <Typography.Text style={{ fontSize: 14, color: color.colorDeactivate }}>
          Công ty
        </Typography.Text>
        <Link
          to={`/profile-client/${jobDetail?.clients.accountId}`}
          state={{ clientId: jobDetail?.clientId }}
        >
          <Typography.Title
            className={css.titleAboutCustomer}
            level={5}
            style={{
              margin: '0 0 10px 0',
              textAlign: 'center',
            }}
          >
            {jobDetail?.clients?.accounts?.name.toUpperCase()}
          </Typography.Title>
        </Link>
      </CustomCol>
    </CustomRow>
  );
};

//Contact Info
const ContactInfo = () => {
  const jobDetail = useRecoilValue(jobDetailState);
  return (
    <CustomRow gutter={[0, 10]}>
      <Col span={24}>
        <Typography.Title level={5} style={{ margin: '0 0 0 -5px' }}>
          Thông tin sơ bộ
        </Typography.Title>
      </Col>
      <Col span={24} style={{ display: 'flex' }}>
        <MapMarkerAlt />
        <Typography.Text
          style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}
        >
          {jobDetail?.clients?.accounts?.address != null
            ? jobDetail?.clients?.accounts?.address
            : 'Chưa xác minh'}
        </Typography.Text>
      </Col>
      <Col span={24} style={{ display: 'flex' }}>
        <Envelope />
        <Typography.Text
          style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}
        >
          {jobDetail.clients.accounts?.email != null
            ? jobDetail.clients.accounts?.email
            : 'Chưa xác minh'}
        </Typography.Text>
      </Col>
      <Col span={24} style={{ display: 'flex' }}>
        <PhoneAlt />
        <Typography.Text
          style={{ fontWeight: 400, fontSize: 14, marginLeft: 10 }}
        >
          {jobDetail.clients.accounts?.phone != null
            ? jobDetail.clients.accounts?.phone
            : 'Chưa xác minh'}
        </Typography.Text>
      </Col>
    </CustomRow>
  );
};

const ArticleLeft = () => {
  const jobDetail = useRecoilValue(jobDetailState);

  return (
    <Col md={{ span: 18 }} xs={{ span: 24 }} style={{ paddingRight: 20 }}>
      <HeaderArticle
        lowestIncome={jobDetail.lowestIncome}
        highestIncome={jobDetail.highestIncome}
        applicationSubmitDeadline={jobDetail.applicationSubmitDeadline}
      />
      <CustomDivider />
      <DescriptionsArticle description={jobDetail.description} />
      <CustomDivider />
      <AttachmentArticle />
      <CustomDivider />
      <SkillArticle />
    </Col>
  );
};

const InformationRight = ({ showModalLogin, status, setStatus }) => {
  const auth = useRecoilValue(authState);
  return (
    <Col
      md={{ span: 6 }}
      xs={{ span: 0 }}
      style={{
        paddingLeft: 10,
        borderLeft: `1px solid ${color.colorBlueWhale}`,
      }}
    >
      <Row style={{ justifyContent: 'center' }}>
        {auth.email ? (
          status ? null : (
            <>
              <Col
                style={{
                  margin: '20px 0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SubmitApplication status={status} setStatus={setStatus} />
              </Col>
              <CustomDivider />
            </>
          )
        ) : (
          <>
            <Col
              style={{
                margin: '20px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ButtonPrimary onClick={showModalLogin}>Đăng nhập</ButtonPrimary>
            </Col>
            <CustomDivider />
          </>
        )}
        <AboutCustomer />
        <CustomDivider />
        <ContactInfo />
      </Row>
    </Col>
  );
};

// khi màn hình <=768px sẽ xuất hiện
const InformationResponsive = ({ showModalLogin }) => {
  return (
    <Col
      md={{ span: 0 }}
      xs={{ span: 24 }}
      style={{
        padding: 10,
        boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
        marginBottom: 30,
        borderRadius: 20,
        backgroundColor: color.colorWhite,
      }}
    >
      <Row
        className={css.containerInfoRes}
        style={{ justifyContent: 'center' }}
      >
        <AboutCustomer />
        <CustomDivider />
        <ContactInfo />
      </Row>
    </Col>
  );
};

const Details = ({ status, setStatus }) => {
  const jobDetail = useRecoilValue(jobDetailState);
  const [loading, setLoading] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const auth = useRecoilValue(authState);
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();

  const showModalLogin = () => {
    setOpenLogin(true);
  };

  const handleOkLogin = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(false);
      setOpenLogin(false);
    }, 3000);
  };

  const handleCancelLogin = () => {
    setOpenLogin(false);
  };

  return (
    <>
      <LoginModal
        visible={openLogin}
        onCancel={handleCancelLogin}
        onOk={handleOkLogin}
        // handleMove={handleMove}
      />
      <Typography.Title level={2} style={styles.titlePost}>
        {jobDetail.title}
      </Typography.Title>
      <CustomCard style={{ marginBottom: 30 }}>
        <CustomRow gutter={[20, 0]}>
          <ArticleLeft jobDetail={jobDetail} />
          <InformationRight
            showModalLogin={showModalLogin}
            status={status}
            setStatus={setStatus}
          />
        </CustomRow>
      </CustomCard>
      <InformationResponsive />
      {!md ? (
        auth.email ? (
          status ? null : (
            <>
              <Col
                style={{
                  margin: '20px 0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SubmitApplication status={status} setStatus={setStatus} />
              </Col>
            </>
          )
        ) : (
          <>
            <Col
              style={{
                margin: '20px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ButtonPrimary onClick={showModalLogin}>Đăng nhập</ButtonPrimary>
            </Col>
          </>
        )
      ) : null}
    </>
  );
};

const styles = {
  titlePost: { padding: '10px 30px', margin: '20px 0' },

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
