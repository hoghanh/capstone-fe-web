import io from 'socket.io-client';

const config = {
  FPTSEP: 'https://fpt-sep.onrender.com',
  TOKEN: 'token',
  CLIENTID:
    '673221908635-es5j9jeudmcsgg7d3navnhcvknsdm3s7.apps.googleusercontent.com',
};

export const { FPTSEP, TOKEN, CLIENTID } = config;

const socket = io(FPTSEP);

export default socket;
