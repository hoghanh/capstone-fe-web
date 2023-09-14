import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import LocalStorageUtils from '../utils/LocalStorageUtils';
import { authState } from './atom';
import jwtDecode from 'jwt-decode';

const useAuthActions = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const login = (token) => {
    LocalStorageUtils.setUser(token);
    const {
      id,
      name,
      phone,
      email,
      address,
      image,
      password,
      role,
      currency,
      status,
    } = jwtDecode(token).result;

    setAuth({
      id,
      name,
      phone,
      email,
      address,
      image,
      password,
      role,
      currency,
      status,
      exp: 120,
    });
    if (role === 'freelancer') {
      navigate('/');
    } else {
      navigate('/client/');
    }
  };

  const autoLogin = () => {
    const token = LocalStorageUtils.getToken();
    const user = LocalStorageUtils.getUser();
    if (user && typeof user === 'object') {
      const expireTime = 120 * 10000 + Date.now();
      if (user?.exp && expireTime > Date.now()) {
        setAuth({
          id: user.id,
          email: user.email,
          name: user.name,
          token,
          role: user.role,
          exp: 120,
        });
      } else {
        logout();
      }
    } else {
      setAuth({
        id: '',
        token: null,
        email: '',
        name: '',
        role: '',
        exp: 0,
      });
    }
  };

  const logout = () => {
    LocalStorageUtils.deleteUser();
    setAuth({
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
    });
  };

  return {
    login,
    autoLogin,
    logout,
  };
};

export default useAuthActions;
