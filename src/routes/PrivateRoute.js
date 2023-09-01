import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import authAtom from '../recoil/auth';
const PrivateRoute = ({ element: Element, allowedRoles }) => {
  const auth = useRecoilValue(authAtom);

  if (!auth.email) {
    return <Navigate to='/' />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to='/' />;
  }

  return <Element />;
};
export default PrivateRoute;
