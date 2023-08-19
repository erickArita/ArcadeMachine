import { IUserInfo } from '../models/IUserInfo.model';

export type StateWithToken = {
  isAuthenticated: boolean;
  token?: string;
  isExpiredToken: boolean;
  isLoading: boolean;
  userInfo?: IUserInfo;
};
