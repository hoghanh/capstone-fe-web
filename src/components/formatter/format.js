import moment from 'moment';

export const FormatVND = (number, currencySymbol = 'VNĐ') => {
  const formattedNumber = new Intl.NumberFormat('vi-VN').format(number);
  return `${formattedNumber} ${currencySymbol}`;
};

export const CalculateDaysLeft = (endDate) => {
  const currentDate = moment();
  endDate = moment(endDate);

  endDate.setHours(endDate.moment().hour() - 7);
  let output;

  if (endDate.isSameOrAfter(currentDate)) {
    const duration = moment.duration(endDate.diff(currentDate));
    const daysDifference = duration.days();
    const hoursDifference = duration.hours();

    if (daysDifference > 0) {
      output = daysDifference + ' ngày ' + hoursDifference + ' giờ còn lại';
    } else if (hoursDifference > 0) {
      output = hoursDifference + ' giờ còn lại';
    } else {
      output = 'Sắp hết hạn';
    }
    return output;
  }
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
  date.setHours(date.getHours() - 7);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat('vi-VN', options).format(date);

  return `${formattedDate}`;
};

export const checkIfIsUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return !!parsedUrl;
  } catch (error) {
    return false;
  }
};
