// recoilAtoms.js
import { atom } from 'recoil';

export const categoriesNavbarState = atom({
  key: 'categoriesNavbarState',
  default: [],
});

export const proposalListState = atom({
  key: 'proposalListState',
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

const jobskill = {
  jobSkillId: 0,
  createdAt: '',
  updatedAt: '',
  jobId: 0,
  skillId: 0,
};

const skills = {
  id: '',
  name: '',
  description: '',
  jobskill: jobskill,
};

const clients = {
  accountId: 0,
  accounts: accounts,
  companyWebsite: '',
  id: 0,
  status: '',
  taxCode: null,
  applied: 0,
  createAt: '',
  updateAt: '',
};

const proposals = {
  id: '',
  description: '',
  fileAttach: '',
  sendDate: '',
  status: '',
  createdAt: '',
  updatedAt: '',
  freelancerId: '',
  jobId: '',
};

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
    clientId: 0,
    clients: clients,
    skills: skills,
    proposals: proposals,
  },
});



export const freelancerState = atom({
  key: 'freelancerState',
  default: {
    id: '',
    status: '',
    cvFile: '',
    hoursPerWeek: '',
    languages: '',
    education: '',
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
}

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

export const appoinmentState = atom({
  key: 'appointmentList',
  default: [],
});
