import color from './color';

export const home = {
  banner: {
    height: 350,
    padding: 30,
    maxWidth: 1080,
    margin: '0 auto',
  },
  topbanner: {
    subtitle: {
      margin: 0,
      paddingRight: 10,
      color: color.colorBlueWhale,
    },
    button: {
      borderRadius: 25,
      border: '1px solid #013042',
      color: color.colorBlueWhale,
      marginRight: 10,
      background: 'none',
      padding: '3px 10px',
      fontSize: 12,
      height: 23,
    },
    bannerImg: {
      backgroundImage: "url('img/Successful-Freelancer.png')",
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
    },
  },
  jobpopular: {
    swipper: { width: 170, height: 216, padding: 10, margin: '10px 0' },
    card: {
      width: '100%',
      height: '100%',
      backgroundImage: `url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  },

  promotebanner: {
    padding: 30,
    maxWidth: 1080,
    margin: '0 auto',
    bannerImg: {
      backgroundImage: "url('img/freelancer-1.png')",
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
      minHeight: '220px',
    },
    title: {
      fontSize: 18,
    },
    des: {
      borderBlockEnd: 'unset',
      padding: 0,
      margin: 5,
      fontSize: 16,
    },
  },
  banner3: {
    column: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
    text: { marginTop: 10 },
  },
  login: {
    input: {
      width: '100%',
      height: 40,
      padding: 10,
      borderRadius: 10,
      borderColor: color.colorBlueWhale,
    },
    line: {
      backgroundColor: color.colorDeactive,
      height: 1,
      width: 140,
    },
    or: {
      color: color.colorDeactive,
      padding: 2,
      margin: 0,
    },
    contain: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    bodyModal: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 50px 30px',
      gap: 10,
    },
    footerModal: {
      textAlign: 'center',
      height: 90,
      padding: '30px 10px',
      borderTop: '0.75px solid #013042',
    },
    button: {
      width: '100%',
      height: 50,
      display: 'flex',
      padding: 10,
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: 10,
    },
    remindText: {
      fontSize: 12,
      color: color.colorDeactive,
    },
    remindTextError: {
      fontSize: 12,
    },
  },
};
