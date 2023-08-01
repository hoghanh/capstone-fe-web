import React from 'react';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import { Card, Image, Layout, Select, Typography } from 'antd';
import './job_list.css';
import AppBreadcrumb from '../components/AppBreadcrumb';
import Link from 'antd/es/typography/Link';

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const JobList = () => {
  return (
    <>
      <Header />
      <Layout.Content style={{ maxWidth: 1080, margin: '0 auto' }}>
        <AppBreadcrumb />
        <Typography.Title
          level={3}
          style={{ padding: '10px 20px', marginBottom: 20 }}
        >
          Logo Design
        </Typography.Title>
        <Card
          style={{
            marginBottom: 30,
            boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
          className='card-jobs'
          title={
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <Typography.Title level={3}>Kết quả hàng đầu</Typography.Title>
              <Typography.Text
                style={{
                  color: '#000',
                  fontFamily: 'Montserrat',
                  fontSize: 12,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  paddingLeft: 10,
                }}
              >
                1-10 of 200 results
              </Typography.Text>
            </div>
          }
          extra={
            <div>
              <Typography.Text
                style={{
                  color: '#000',
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  paddingRight: 14,
                }}
              >
                Sort By:
              </Typography.Text>
              <Select
                placeholder='Sort By'
                size='large'
                style={{
                  borderRadius: 8,
                  width: 200,
                  backgroundColor: '#FFF',
                  boxShadow: '0px 4px 14px 0px rgba(0, 0, 0, 0.10)',
                  border: '1px solid #000',
                }}
                bordered={false}
                onChange={handleChange}
                options={[
                  {
                    value: 'Latest',
                    label: 'Latest',
                  },
                  {
                    value: 'Oldest',
                    label: 'Oldest',
                  },
                  {
                    value: 'Lowest Price',
                    label: 'Lowest Price',
                  },
                  {
                    value: 'Highest Price',
                    label: 'Highest Price',
                  },
                  {
                    value: 'Most Applications',
                    label: 'Most Applications',
                  },
                  {
                    value: 'Lest Applications',
                    label: 'Lest Applications',
                  },
                ]}
              />
            </div>
          }
        >
          <div
            style={{
              display: ' flex',
              alignItems: 'center',
              padding: 10,
              borderBottom: '0.5px solid #000',
            }}
          >
            <div
              style={{
                display: ' flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 5,
                padding: 30,
                height: 209,
              }}
            >
              <Image
                width={100}
                src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                alt='Apofoitisi logo'
                preview={false}
                style={{ borderRadius: '50%' }}
              />
              <Typography.Title level={4} style={{ width: 144, margin: 0 }}>
                CÔNG TY CỔ<br></br> PHẦN FOODY
              </Typography.Title>
            </div>
            <div style={{ padding: 10 }}>
              <div
                style={{
                  display: ' flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
              >
                <div>
                  <Typography.Title style={{ margin: 0 }} level={4}>
                    Javascript expert with Next.js and React.js expertise
                  </Typography.Title>
                  <Typography.Text level={4}>
                    Payment: 000.000VND - 000.000VND / 4 days left
                  </Typography.Text>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30'
                  height='28'
                  viewBox='0 0 30 28'
                  fill='none'
                >
                  <path
                    d='M5.49352 25.5555L5.51231 25.5905L5.53382 25.624C6.2433 26.7277 7.56456 26.8266 8.47475 26.4868L8.54052 26.4622L8.60221 26.4287L15 22.9545L21.3978 26.4287L21.4245 26.4432L21.4521 26.4561C21.6405 26.544 21.8256 26.6077 22.0338 26.6401C22.2064 26.667 22.3706 26.6667 22.4784 26.6666C22.4858 26.6666 22.4931 26.6666 22.5 26.6666C23.0824 26.6666 23.6536 26.4828 24.0886 26.0768C24.5298 25.665 24.75 25.0988 24.75 24.4999V5.83325C24.75 3.23377 22.6112 1.33325 20 1.33325H10C7.38882 1.33325 5.25 3.23377 5.25 5.83325V24.4999C5.25 24.5065 5.24999 24.5136 5.24997 24.521C5.24977 24.6207 5.24943 24.7895 5.2812 24.9674C5.31996 25.1844 5.39551 25.3725 5.49352 25.5555Z'
                    fill='white'
                    stroke='black'
                    strokeWidth='2'
                  />
                </svg>
              </div>
              <Typography style={{ padding: 10 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
                eget et volutpat dui quis quis. Eu dictum turpis ultrices in.
                Ullamcorper nam eget lobortis mauris maecenas dapibus duis.
                Libero lectus venenatis, cursus id pulvinar donec tincidunt
                tellus justo. Vitae ac aliquam, id sagittis aliquam viverra
                dolor blandit... <Link>more</Link>
              </Typography>
              <div
                style={{
                  display: 'flex',
                  padding: '0px 10px',
                  alignItems: 'flex-start',
                  gap: '15px',
                  alignSelf: 'stretch',
                }}
              >
                <button
                  style={{
                    borderRadius: 25,
                    background: 'var(--bluish-cyan, #89DBE9)',
                    border: 'unset',
                    padding: '3px 10px',
                    color: 'var(--blue-whale, #013042)',
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                  }}
                >
                  Javascript
                </button>
                <button
                  style={{
                    borderRadius: 25,
                    background: 'var(--bluish-cyan, #89DBE9)',
                    border: 'unset',
                    padding: '3px 10px',
                    color: 'var(--blue-whale, #013042)',
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                  }}
                >
                  Html
                </button>
                <button
                  style={{
                    borderRadius: 25,
                    background: 'var(--bluish-cyan, #89DBE9)',
                    border: 'unset',
                    padding: '3px 10px',
                    color: 'var(--blue-whale, #013042)',
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                  }}
                >
                  CSS
                </button>
                <button
                  style={{
                    borderRadius: 25,
                    background: 'var(--bluish-cyan, #89DBE9)',
                    border: 'unset',
                    padding: '3px 10px',
                    color: 'var(--blue-whale, #013042)',
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                  }}
                >
                  NextJS
                </button>
                <button
                  style={{
                    borderRadius: 25,
                    background: 'var(--bluish-cyan, #89DBE9)',
                    border: 'unset',
                    padding: '3px 10px',
                    color: 'var(--blue-whale, #013042)',
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                  }}
                >
                  ReactJS
                </button>
              </div>
              <div></div>
            </div>
          </div>
        </Card>
      </Layout.Content>
      <Footer />
    </>
  );
};

export default JobList;
