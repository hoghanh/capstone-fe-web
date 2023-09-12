import color from './color';

const joblist = {
  card: {
    marginBottom: 30,
    boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)',
    width: '97%',
    margin: '0 auto',
  },
  textResult: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    paddingLeft: 10,
  },
  button: {
    border: 'unset',
    padding: '3px 10px',
    fontSize: 12,
    cursor: 'default',
  },
  des: {
    paddingLeft: 10,
  },
  applied: {
    display: 'flex',
    padding: '0px 20px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
    text: {
      color: color.colorDeactive,
    },
  },
};

export default joblist;
