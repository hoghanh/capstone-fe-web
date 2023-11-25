import {
  Button,
  Card,
  DatePicker,
  Grid,
  Layout,
  Table,
  Tag,
  Typography,
} from 'antd';
import { FormatVND, formatDateTime } from 'components/formatter/format';
import Loading from 'components/loading/loading';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import joblist from 'styles/joblist';
import { get, post } from 'utils/APICaller';
import ModalTopup from './ModalTopup';
import { useRecoilValue } from 'recoil';
import { clientProfile } from 'recoil/atom';
import locale from 'antd/es/date-picker/locale/vi_VN';
import 'dayjs/locale/vi';

const columns = [
  {
    title: 'Loại',
    key: 'types',
    dataIndex: 'types',
    render: (_, { type }) => (
      <Tag color={type === '+' ? 'green' : 'red'} key={type}>
        {type}
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
    render: (_, { amount, type }) => (
      <>
        <Typography
          style={{
            color: type === '+' ? '#6FCD40' : '#F8797F',
          }}
        >
          {type}
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

  const [bills, setBills] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [currency, setCurrency] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const { vnp_Amount, vnp_BankTranNo, vnp_PayDate, vnp_TransactionNo } =
    Object.fromEntries(queryParams.entries());

  useEffect(() => {
    setIsLoading(true);
    if (!vnp_Amount) {
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
    } else {
      setIsLoading(true);
      let amount = parseFloat(vnp_Amount) / 100;
      post({
        endpoint: `/payment`,
        body: {
          status: 'success',
          name: vnp_BankTranNo,
          description: 'Giao dịch ' + vnp_BankTranNo,
          amount: amount.toString(),
          orderId: vnp_TransactionNo,
          transDate: vnp_PayDate,
          transType: '02',
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
  }, [vnp_Amount, user]);

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
      <Card
        bodyStyle={{ padding: 'unset' }}
        style={joblist.card}
        className="card-jobs"
        headStyle={{ paddingLeft: 0 }}
        title={
          <div className="trackingJobs">
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
              timezone="UTC"
              style={{ marginRight: 20 }}
              onChange={filterDate}
              size="middle"
              locale={locale}
            />
            <Button size="large" type="primary" onClick={showModal}>
              Nạp tiền
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
