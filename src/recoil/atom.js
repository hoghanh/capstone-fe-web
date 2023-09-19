// recoilAtoms.js
import { atom } from 'recoil';

export const categoriesNavbarState = atom({
  key: 'categoriesNavbarState',
  default: [],
});

export const profileState = atom({
  key: 'profileState',
  default: {
    id: '',
    name: '',
    phone:'',
    email:'',
    address: '',
    image: '',
    password: '',
    role: '',
    currency: 0,
    status: 0,
    createdAt: '',
    updatedAt: ''
  }
});

export const jobDetailState = atom({
  key: 'jobDetailState',
  default: {
    id: '',
    title: '',
    description: '',
    fileAttachment: '',
    proposalSubmitDeadline: '',
    lowestIncome: 0,
    highestIncome: 0,
    applied: 0,
    status: '',
    createdAt: '',
    updatedAt: '',
    clientId: 0
  }
});

export const authState = atom({
  key: 'auth',
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
    exp: 0,
  },
});
