// recoilAtoms.js
import { atom } from 'recoil';

export const categoriesNavbarState = atom({
  key: 'categoriesNavbarState',
  default: [],
});

export const applicationListState = atom({
  key: 'applicationListState',
  default: [],
});

export const valueSearchState = atom({
  key: 'valueSearchState',
  default: [],
});

export const profileState = atom({
  key: 'profileState',
  default: {
    id: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    image: '',
    password: '',
    role: '',
    currency: 0,
    status: 0,
    createdAt: '',
    updatedAt: '',
  },
});

const accounts = {
  id: 0,
  name: '',
  phone: '',
  email: '',
  address: '',
  image: '',
  password: '',
  role: '',
  currency: 0,
  status: false,
  createdAt: '',
  updatedAt: '',
};

export const jobDetailState = atom({
  key: 'jobDetailState',
  default: {},
});

const language = {
  id: '',
  name: '',
  level: '',
  freelancerId: 0,
};

const certificates = {
  name: '',
  issuingOrganization: '',
  issueDate: '',
  expirationDate: '',
  credentialId: '',
  credentialUrl: '',
};

export const freelancerState = atom({
  key: 'freelancerState',
  default: {
    id: '',
    status: '',
    cvFile: '',
    hoursPerWeek: '',
    language: [],
    certificates: [],
    skills: [],
    introduction: '',
    major: '',
    title: '',
    createdAt: '',
    updatedAt: '',
    accountId: '',
    accounts: accounts,
  },
});

const clientAccounts = {
  id: 0,
  name: '',
  phone: '',
  email: '',
  address: '',
  image: '',
  password: '',
  role: '',
  currency: 0,
  status: true,
  createdAt: '',
  updatedAt: '',
};

export const clientProfile = atom({
  key: 'clientProfile',
  default: {
    id: 0,
    status: false,
    taxCode: '',
    companyWebsite: '',
    currency: 0,
    createdAt: '',
    updatedAt: '',
    accountId: 0,
    introduction: '',
    accounts: clientAccounts,
  },
});

export const listSkillsState = atom({
  key: 'listSkills',
  default: {
    id: '',
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
  },
});

export const authState = atom({
  key: 'auth',
  default: {},
});

export const appoinmentState = atom({
  key: 'appointmentList',
  default: [],
});

export const otp = atom({
  key: 'otp',
  default: '',
});

export const registerInfo = atom({
  key: 'registerInfo',
  default: {},
});
