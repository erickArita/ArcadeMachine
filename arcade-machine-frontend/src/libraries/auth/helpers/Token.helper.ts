import jwtDecode, { JwtPayload } from 'jwt-decode';
import { secondsToMilliseconds } from '../utils/secondsToMilliseconds';

export const deleteToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expireTime');
  localStorage.removeItem('refreshToken');
};

export const getToken = () => {
  try {
    const now = new Date(Date.now()).getTime();

    const expireTimeString = localStorage.getItem('expireTime');

    const refreshToken = localStorage.getItem('refreshToken');

    const token = localStorage.getItem('token');

    const expireTime = Number(expireTimeString);

    const isExpiredToken = now >= expireTime - 2000;

    if (token) decodeToken(token);

    return {
      token: token === null ? undefined : token,
      isExpiredToken: isExpiredToken && !!token,
      isAuthenticated: !!token && !isExpiredToken,
      expireTime,
      refreshToken,
    };
  } catch (error) {
    return {
      token: undefined,
      isExpiredToken: true,
      isAuthenticated: false,
      expireTime: 0,
      refreshToken: undefined,
    };
  }
};

export const setToken = (
  token: string,
  expiration: number,
 ) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expireTime', String(expiration));
 };

type JwtApiClaims = {
  exp: number;
  UserId: string;
  Role: string;
  Email: string;
  DisplayName: string;
};

type JwtClaims = JwtPayload & JwtApiClaims;

export const decodeToken = (token: string): JwtClaims => {
  const decoded = jwtDecode<JwtClaims>(token);

  const expireTimeMilliseconds = secondsToMilliseconds(decoded.exp);

  return { ...decoded, exp: expireTimeMilliseconds };
};
