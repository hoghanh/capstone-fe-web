import {
  Button,
  Card,
  DatePicker,
  Grid,
  Layout,
  Table,
  Tag,
  Typography,
  notification,
} from 'antd';
import { FormatVND, formatDateTime } from 'components/formatter/format';
import Loading from 'components/loading/loading';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import joblist from 'styles/joblist';
import { get, post } from 'utils/APICaller';
import ModalTopup from './ModalTopup';
import { useRecoilValue } from 'recoil';
import { authState, clientProfile } from 'recoil/atom';
import locale from 'antd/es/date-picker/locale/vi_VN';
import 'dayjs/locale/vi';
import ModalAlert from './ModalAlert';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import socket from 'config';

const columns = [
  {
    title: 'Loại',
    key: 'types',
    dataIndex: 'types',
    render: (_, { type, status }) => (
      <Tag
        color={
          type === '+'
            ? 'green'
            : type === '-' && status === '1'
            ? 'red'
            : 'gold'
        }
        key={type}
      >
        {type === '-' && status === '0' ? '...' : type}
      </Tag>
    ),
  },
  {
    title: 'Ngày giao dịch',
    dataIndex: 'datetime',
    key: 'datetime',
    render: (_, { createdAt }) => (
      <Typography>{formatDateTime(createdAt)}</Typography>
    ),
  },
  {
    title: 'Chi tiết',
    dataIndex: 'detail',
    key: 'detail',
    render: (_, { description }) => <Typography>{description}</Typography>,
  },
  {
    title: 'Biến động',
    key: 'amounts',
    dataIndex: 'amounts',
    render: (_, { amount, type, status }) => (
      <>
        <Typography
          style={{
            color:
              type === '+'
                ? '#6FCD40'
                : type === '-' && status === '1'
                ? '#F8797F'
                : '#f5b252',
          }}
        >
          {type === '-' && status === '0' ? null : type}
          {FormatVND(amount)}
        </Typography>
      </>
    ),
  },
];

function Billing() {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();

  const user = useRecoilValue(clientProfile);
  const auth = useRecoilValue(authState);

  const [bills, setBills] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [currency, setCurrency] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalRefund, setOpenModalRefund] = useState(false);
  const [fee, setFee] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const job = LocalStorageUtils.getItem('jobPost');

  const queryParams = new URLSearchParams(location.search);
  const {
    vnp_Amount,
    vnp_BankTranNo,
    vnp_PayDate,
    vnp_TransactionNo,
    amount,
    partnerCode,
    orderId,
    resultCode,
  } = Object.fromEntries(queryParams.entries());

  useEffect(() => {
    if (job) {
      setIsLoading(true);
      get({ endpoint: `/systemValue/fee` })
        .then((res) => {
          setFee(Number(res.data[1].value));
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((err) => {
          setFee(0);
          console.log(err);
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (user.id) {
      setIsLoading(true);
      if (!vnp_Amount && !amount) {
        get({
          endpoint: `/payment/client/${user.id}`,
        })
          .then((res) => {
            setBills(res.data.payment);
            setFilterList(res.data.payment);
            setCurrency(res.data.clientCurrency);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });

        if (job) {
          post({
            endpoint: `/job`,
            body: job,
          })
            .then((res) => {
              notification.success({
                message: 'Đăng bài viết mới thành công',
              });

              const notificationData = {
                notificationName: 'Thay đổi số dư',
                notificationDescription: `Tính phí bài viết ${job.title} -  ${fee} `,
                context: 'payment',
              };

              //Gửi notification [thông tin] - đến [accountID người nhận]
              socket.emit('sendNotification', notificationData, auth.id);

              LocalStorageUtils.removeItem('jobPost');
              setIsLoading(false);
            })
            .catch((err) => {
              const errMess = err.response.data.message;
              notification.error({ message: errMess });
            });
        }
      } else {
        setIsLoading(true);
        let amountIn = vnp_Amount ? parseFloat(vnp_Amount) / 100 : amount;
        post({
          endpoint: `/payment`,
          body: {
            status: 'success',
            name: vnp_BankTranNo || partnerCode,
            description: 'Giao dịch ' + orderId,
            amount: amountIn.toString(),
            orderId: vnp_TransactionNo || orderId,
            transDate: vnp_PayDate || Date().toString(),
            transType: resultCode,
            type: '+',
            clientId: user.id,
          },
        })
          .then((res) => {
            setIsLoading(false);
            navigate('/client/billing');
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      }
    }
  }, [vnp_Amount, user, amount]);

  function filterDate(date, dateString) {
    if (dateString) {
      setFilterList([]);
      const list = bills.filter((bill) => {
        const compareDate = bill.createdAt.split('T', 1);
        return compareDate[0] === dateString;
      });
      setFilterList(list);
    } else {
      setFilterList(bills);
    }
  }

  const showModal = (id) => {
    setOpenModal(true);
  };
  const handleOkModal = () => {
    setTimeout(() => {
      setOpenModal(false);
    }, 3000);
  };
  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const showModalRefund = (id) => {
    setOpenModalRefund(true);
  };
  const handleOkModalRefund = () => {
    setTimeout(() => {
      setOpenModalRefund(false);
    }, 3000);
  };
  const handleCancelModalRefund = () => {
    setOpenModalRefund(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
      <ModalTopup
        visible={openModal}
        onCancel={handleCancelModal}
        onOk={handleOkModal}
        id={user.id}
      />
      <ModalAlert
        visible={openModalRefund}
        onCancel={handleCancelModalRefund}
        onOk={handleOkModalRefund}
        id={user.id}
      />
      <Card
        bodyStyle={{ padding: 'unset' }}
        style={joblist.card}
        className='card-jobs'
        headStyle={{ paddingLeft: 0 }}
        title={
          <div className='trackingJobs'>
            <Typography.Title level={md ? 3 : 5} style={{ paddingLeft: 30 }}>
              Tra cứu giao dịch
            </Typography.Title>
            <Typography.Title level={5} style={{ paddingLeft: 30 }}>
              Số dư : {FormatVND(currency)}
            </Typography.Title>
          </div>
        }
        extra={
          <>
            <DatePicker
              timezone='UTC'
              style={{ marginRight: 20 }}
              onChange={filterDate}
              size='middle'
              locale={locale}
            />
            <Button
              style={{ marginRight: 20 }}
              size='large'
              type='primary'
              onClick={showModal}
            >
              Nạp tiền
            </Button>
            <Button
              size='large'
              type='primary'
              danger
              onClick={showModalRefund}
            >
              Rút tiền
            </Button>
          </>
        }
      >
        <Table
          columns={columns}
          dataSource={filterList}
          rowKey={(filterList) => filterList.id}
          style={{ padding: 30 }}
        />
      </Card>
    </Layout.Content>
  );
}

export default Billing;
