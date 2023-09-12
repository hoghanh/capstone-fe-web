import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import authAtom from './atom';
import jwtDecode from 'jwt-decode';

const useAuthActions = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);

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
      const expireTime = user.exp * 1000 + Date.now();
      if (user?.exp && expireTime > Date.now()) {
        setAuth({
          id: user.id,
          email: user.email,
          name: user.name,
          token,
          role: user.role,
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
    });
  };

  return {
    login,
    autoLogin,
    logout,
  };
};

export default useAuthActions;
