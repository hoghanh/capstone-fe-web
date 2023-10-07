export const FormatVND = (number, currencySymbol = 'VNĐ') => {
  const formattedNumber = new Intl.NumberFormat('vi-VN').format(number);
  return `${formattedNumber} ${currencySymbol}`;
};

export const CalculateDaysLeft = (endDate) => {
  const currentDate = new Date();

  endDate = new Date(endDate);
  let remainTime;
  let output;

  if (endDate >= currentDate) {
    const timeDifference = endDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    const hoursDifference = Math.floor(
      (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600)
    );

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
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
