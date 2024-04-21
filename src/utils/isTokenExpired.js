import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
  if (!token) return true;

  const tokenDetails = jwtDecode(token);
  const exp = tokenDetails.exp * 1000;
  return Date.now() >= exp;
};
