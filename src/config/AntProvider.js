import { ConfigProvider, notification } from 'antd';
import '@fontsource/montserrat';
import '@fontsource/montserrat/700.css';

notification.config({
  placement: 'bottomRight',
  duration: 10,
});

export default function AntProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#02ADFD',
          fontFamily: 'Montserrat, sans-serif',
          fontSizeHeading1: 32,
          fontSizeHeading2: 24,
          fontSizeHeading3: 20,
          fontSizeHeading4: 18,
          fontSizeHeading5: 16,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
