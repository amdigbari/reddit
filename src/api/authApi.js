import { BASE_API, ACCOUNTS_API } from 'api';

export const REGISTER_API = `${ACCOUNTS_API}register/`;

export const LOGIN_API = `${ACCOUNTS_API}login/`;

export const forgotPasswordApi = `${ACCOUNTS_API}forgot-password/`;

export const sendVerificationCodeApi = username => `${forgotPasswordApi}?username=${username}`;

export const changePasswordApi = `${ACCOUNTS_API}profile/`;
