import Axios from "axios";
import { APP_API_URL } from "../config";
import LocalStorageUtils from "./LocalStorageUtils";

export const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${LocalStorageUtils.getToken()}`,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjIsIm5hbWUiOm51bGwsInBob25lIjoiMTIzNDU2Nzg5IiwiZW1haWwiOiJ1c2VyM0BnbWFpbC5jb20iLCJhZGRyZXNzIjoiTGUgVmFuIFZpZXQiLCJpbWFnZSI6IjEyMyIsInBhc3N3b3JkIjoiJDJiJDEwJFF6TVlzam03RDdjdVVhUGlRWXdpenV5d05jaUw3dWRHRXVxSm0zby9ldzZsejhkSi9IZUxxIiwicm9sZSI6InVzZXIiLCJjdXJyZW5jeSI6MTAwLCJzdGF0dXMiOnRydWV9LCJpYXQiOjE2OTI3ODU1NzUsImV4cCI6MTY5Mjc4OTE3NX0.D_HtiFPBtFuyL_8zGwfouz2OyLjqqE4COxTB1_7mJZk`,
  };
};

export const request = (
  endpoint,
  method,
  headers = {},
  params = {},
  body = {}
) => {
  return Axios({
    url: APP_API_URL + endpoint,
    method: method,
    headers: Object.assign(getHeaders(), headers),
    params: Object.assign(params),
    data: body,
  });
};

export const get = ({ endpoint, params = {}, headers = {} }) => {
  return request(endpoint, "GET", headers, params);
};

export function post({ endpoint, body = {}, params = {}, headers = {} }) {
  return request(endpoint, "POST", headers, params, body);
}

export const put = ({ endpoint, body = {}, params = {}, headers = {} }) => {
  return request(endpoint, "PUT", headers, params, body);
};

export const remove = ({ endpoint, body = {}, params = {}, headers = {} }) => {
  return request(endpoint, "DELETE", headers, params, body);
};
