import React, { useEffect, useState } from 'react';
import {
  Badge,
  Calendar,
  Card,
  Dropdown,
  Grid,
  Layout,
  Typography,
  notification,
  Row,
  Col,
  Table,
} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { get, put } from 'utils/APICaller';
import { formatDateTime } from 'components/formatter/format';
import { ArrowLeft, ArrowRight } from 'components/icon/Icon';
import Loading from 'components/loading/loading';
import EditScheduleModal from './EditScheduleModal';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useRecoilValue } from 'recoil';
import { clientProfile } from 'recoil/atom';

// Cài đặt ngôn ngữ tiếng Việt cho Day.js
dayjs.locale('vi');

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const MeetingCalendar = () => {
  const getListData = (value) => {
    let listData = [];
    // jobListColor.forEach((item) => {
    //   const time = new Date(item.time);
    //   if (time.getMonth() === value.month()) {
    //     if (time.getDate() === value.date()) {
    //       const checkDuplicate = listData.filter(
    //         (listData) => listData.color === item.color
    //       );
    //       if (checkDuplicate.length === 0) {
    //         listData.push(item);
    //       }
    //     }
    //   }
    // });
    return listData;
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className='events'>
        {listData.map((item) => (
          <li key={item.color + item.time}>
            <Badge status='default' color={item.color} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const monthHeader = (value, onChange) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px',
        }}
      >
        <button
          className='btn-month'
          onClick={() => onChange(value.clone().subtract(1, 'month'))}
        >
          <ArrowLeft />
        </button>
        <div className='text-month'>
          {capitalizeFirstLetter(value.format('MMMM'))}
        </div>
        <button
          className='btn-month'
          onClick={() => onChange(value.clone().add(1, 'month'))}
        >
          <ArrowRight />
        </button>
      </div>
    );
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <Calendar
      locale={{
        lang: {
          locale: 'vi',
          monthFormat: 'MMMM',
        },
      }}
      fullscreen={false}
      headerRender={({ value, onChange, type, onTypeChange }) => {
        if (type === 'month') {
          return monthHeader(value, onChange);
        } else {
          onTypeChange('month');
          return null;
        }
      }}
      className='calendar'
      cellRender={cellRender}
      style={{ margin: 30 }}
    />
  );
};

export default MeetingCalendar;
