import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authState } from 'recoil/atom';
const PrivateRoute = ({ element: Element, allowedRoles }) => {
  const auth = useRecoilValue(authState);

  if (!auth.email) {
    return <Navigate to='/' />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to='/' />;
  }

  return <Element />;
};
export default PrivateRoute;
