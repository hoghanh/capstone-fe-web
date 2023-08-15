import color from './color';
import theme from './theme';

export const footer = {
  backgroundColor: color.colorDeepSeaBlue,
  marginTop: 80,
  padding: '30px 0',
  text: {
    color: '#F7F8F9',
    fontWeight: 700,
  },
  firstrow: {
    ...theme.responseWidth,
    padding: '20px 30px',
  },
  secondrow: {
    ...theme.responseWidth,
    padding: 10,
    justifyContent: 'space-between',
    borderBottom: '1px solid #EDF6FF',
  },
  containIcon: { display: 'flex', justifyContent: 'center', gap: 10 },
  icons: { fontSize: 25, color: '#F7F8F9' },
  name: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    text: {
      color: '#F7F8F9',
    },
  },
};
