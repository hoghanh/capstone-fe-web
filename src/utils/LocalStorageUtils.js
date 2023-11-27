import jwtDecode from 'jwt-decode';

import { TOKEN } from '../config';

class LocalStorageUtils {
  getItem(key) {
    if (typeof localStorage !== 'undefined') {
      let item = localStorage.getItem(key);
      if (!item) {
        this.setItem(key);
        return localStorage.getItem(key);
      }
      return JSON.parse(item || '{}');
    }
    return undefined;
  }

  setItem(key, value = '') {
    if (typeof localStorage !== 'undefined' && value !== '') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  removeItem(key) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }

  setUser(token) {
    if (typeof localStorage !== 'undefined') {
      this.setItem(TOKEN, token);
    }
    return undefined;
  }

  getUser() {
    if (typeof localStorage !== 'undefined') {
      const token = this.getItem(TOKEN);
      try {
        if (token) return jwtDecode(token.result);
        else {
          return token;
        }
      } catch (error) {
        return token;
      }
    }
    return undefined;
  }

  deleteUser() {
    this.removeItem(TOKEN);
  }

  getToken() {
    return this.getItem(TOKEN);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LocalStorageUtils();
