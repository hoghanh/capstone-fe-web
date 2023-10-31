import moment from 'moment';

export const FormatVND = (number, currencySymbol = 'VNĐ') => {
  const formattedNumber = new Intl.NumberFormat('vi-VN').format(number);
  return `${formattedNumber} ${currencySymbol}`;
};

export const CalculateDaysLeft = (endDate) => {
  const currentDate = new Date();

  endDate = new Date(endDate);
  endDate.setHours(endDate.getHours() - 7, 0, 0);
  let remainTime;
  let output;


    remainTime = {
      days: daysDifference,
      hours: hoursDifference,
    };
  }

  if (remainTime?.days) {
    output = remainTime.days + ' ngày ' + remainTime.hours + ' giờ còn lại';
  } else if (remainTime?.hours) {
    output = remainTime.hours + ' giờ còn lại';
  } else {
    output = 'Quá hạn';
  }
  return output;
};

export const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateTime = (dateInput) => {
  const date = new Date(dateInput);
  date.setHours(date.getHours() - 7, 0, 0);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return `${formattedDate}`;
export const checkIfIsUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return !!parsedUrl;
  } catch (error) {
    return false;
  }
};
