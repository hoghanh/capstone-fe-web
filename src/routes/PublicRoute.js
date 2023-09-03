import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authAtom from '../recoil/auth'; // Điều chỉnh import dựa trên cách bạn quản lý trạng thái người dùng

const PublicRoute = ({ element: Element }) => {
  const auth = useRecoilValue(authAtom);

  if (auth.email) {
    return <Navigate to='/' />;
  }

  return <Element />;
};

export default PublicRoute;
