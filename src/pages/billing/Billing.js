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
import { useEffect, useState } from 'react';
import joblist from 'styles/joblist';
import { get, post } from 'utils/APICaller';
import LocalStorageUtils from 'utils/LocalStorageUtils';

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
  const { md, lg } = useBreakpoint();

  const [bills, setBills] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [currency, setCurrency] = useState();
  const id = LocalStorageUtils.getItem('profile').id;

  useEffect(() => {
    get({
      endpoint: `/payment/client/${id}`,
    })
      .then((res) => {
        setBills(res.data.payment);
        setFilterList(res.data.payment);
        setCurrency(res.data.clientCurrency);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  function onClick() {
    post({
      endpoint: `/payment/vnpay`,
      body: {
        amount: '10000',
        bankCode: '',
        language: 'vn',
        clientId: id,
      },
    }).then((res) => {
      window.open(res.data.vnpUrl);
    });
  }

  return (
    <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
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
              style={{ marginRight: 20 }}
              onChange={filterDate}
              size='middle'
            />
            <Button size='large' type='primary' onClick={onClick}>
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
