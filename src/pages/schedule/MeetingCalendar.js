import React, { useEffect, useState } from 'react';
import {
  Badge,
  Calendar,
  notification,
} from 'antd';
import './styles.css';
import { get } from 'utils/APICaller';
import { ArrowLeft, ArrowRight } from 'components/icon/Icon';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useRecoilValue } from 'recoil';
import { clientProfile } from 'recoil/atom';
import moment from 'moment';

// Cài đặt ngôn ngữ tiếng Việt cho Day.js
dayjs.locale('vi');

const MeetingCalendar = () => {
  const user = useRecoilValue(clientProfile);
  const [dataCalendar, setDataCalendar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    get({
      endpoint: `/appointment/client/${user.id}`,
    })
      .then((res) => {
        setDataCalendar(res.data);
        setTimeout(() => {
          setIsLoading(false);
        }, [500]);
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.message,
        });
      });
  }, []);

  console.log('dataCalender', dataCalendar);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

   // Hàm kiểm tra xem một ngày có cuộc hẹn không
   const hasAppointment = (date) => {
    return dataCalendar.some(
      (appointment) =>
        moment(appointment.time).format('YYYY-MM-DD') === date
    );
  };

  // Hàm render cell của Calendar
  const cellRender = (value) => {
    const date = new Date(value)
    const showBadge = hasAppointment(formatDate(date));

    return showBadge ? <Badge status="success" /> : null;
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
