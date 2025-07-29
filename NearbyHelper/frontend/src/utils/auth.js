// utils/auth.js

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export const getUserFromToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (err) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login'; // You can change the redirect path if needed
};
