import { atom } from 'recoil';

const authAtom = atom({
  key: 'authAtom',
  default: {
    token: null,
    id: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    image: '',
    password: '',
    role: '',
    currency: '',
    status: 0,
  },
});

export default authAtom;
