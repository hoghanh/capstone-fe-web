import { useSetRecoilState } from 'recoil';
import LocalStorageUtils from '../utils/LocalStorageUtils';
import { authState } from './atom';
import jwtDecode from 'jwt-decode';

const useAuthActions = () => {
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
      exp: jwtDecode(token).exp,
    });
  };

  const autoLogin = () => {
    const token = LocalStorageUtils.getToken();
    const user = LocalStorageUtils.getUser();
    if (user && typeof user === 'object') {
      const expireTime = user.exp * 1000 + Date.now();
      if (user?.exp && expireTime > Date.now()) {
        setAuth({
          id: user.result.id,
          email: user.result.email,
          name: user.result.name,
          token,
          role: user.result.role,
          exp: user.exp,
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
    LocalStorageUtils.removeItem('profile');
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
  const saveProfile = (data) => {
    LocalStorageUtils.setItem('profile', data);
  };

  return {
    login,
    autoLogin,
    logout,
    saveProfile,
  };
};

export default useAuthActions;
