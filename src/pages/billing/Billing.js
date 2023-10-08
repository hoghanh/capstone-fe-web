import { Card, Grid, Layout, Space, Table, Tag, Typography } from 'antd';
import joblist from 'styles/joblist';

const columns = [
  {
    title: 'Loại',
    key: 'types',
    dataIndex: 'types',
    render: (_, { types }) => (
      <>
        {types.map((type) => {
          let color = type.length > 5 ? 'geekblue' : 'green';
          if (type === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={type}>
              {type.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Ngày giao dịch',
    dataIndex: 'datetime',
    key: 'datetime',
  },
  {
    title: 'Chi tiết',
    dataIndex: 'detail',
    key: 'detail',
  },
  {
    title: 'Biến động',
    key: 'amounts',
    dataIndex: 'amounts',
    render: (_, { amounts }) => (
      <>
        {amounts.map((amount) => {
          let color = amount.length > 5 ? 'geekblue' : 'green';
          if (amount === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={amount}>
              {amount}
            </Tag>
          );
        })}
      </>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    types: ['nice', 'developer'],
    amounts: ['cool', 'teacher'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    types: ['loser'],
    amounts: ['cool', 'teacher'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    types: ['cool', 'teacher'],
    amounts: ['cool', 'teacher'],
  },
];

function Billing() {
  const { useBreakpoint } = Grid;
  const { md, lg } = useBreakpoint();

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
          </div>
        }
      >
        <Table columns={columns} dataSource={data} style={{ padding: 30 }} />
      </Card>
    </Layout.Content>
  );
}

export default Billing;
