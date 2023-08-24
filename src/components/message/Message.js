import { message } from 'antd';

const showSuccessMessage = (content) => {
  message.success(content, 4.5);
};

const showErrorMessage = (content) => {
  message.error(content, 4.5);
};

const showWarningMessage = (content) => {
  message.warning(content, 4.5);
};

const showInfoMessage = (content) => {
  message.info(content, 4.5);
};

export {
  showErrorMessage,
  showInfoMessage,
  showSuccessMessage,
  showWarningMessage,
};
