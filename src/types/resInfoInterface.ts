import { User } from './userInterface';

export interface SignUpResInfo {
  message?: string;
  error?: string;
}

export interface LogInResInfo {
  error?: string;
  accessToken?: string;
  message?: string;
}

export interface GetUserResInfo {
  error?: string;
  user?: User;
  message?: string;
}

export interface GoogleResponse {
  error?: string;
  accessToken?: string;
  message?: string;
}

export interface LogOut {
  message?: string;
  error?: string;
}

export interface ResetPassword {
  message?: string;
  error?: string;
}

export interface RefreshResponse {
  error?: string;
  accessToken?: string;
}

export interface ChangePasswordResponse {
  message?: string;
  error?: string;
}

export interface UpdateUserResponse {
  error?: string;
  details?: string;
  message?: string;
  user?: User;
}
