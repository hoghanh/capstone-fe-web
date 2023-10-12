import moment from 'moment';

export const FormatVND = (number, currencySymbol = 'VNĐ') => {
  const formattedNumber = new Intl.NumberFormat('vi-VN').format(number);
  return `${formattedNumber} ${currencySymbol}`;
};

export const CalculateDaysLeft = (endDate) => {
  const currentDate = moment();
  endDate = moment(endDate);
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
  } else {
    const duration = moment.duration(currentDate.diff(endDate));
    const daysDifference = duration.days();

    output = 'Quá hạn ' + daysDifference + ' ngày';
  }

  return output;
};

export const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
