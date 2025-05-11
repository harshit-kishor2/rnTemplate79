import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import {API} from './endpoints';
import Logger from '@helpers/logger';

// Create Axios Instance
const apiClient = axios.create({
  baseURL: API.BASE_URL,
  timeout: API.TIMEOUT,
});

// Logger for axios
apiClient.interceptors.request.use(
  AxiosLogger.requestLogger,
  AxiosLogger.errorLogger,
);
apiClient.interceptors.response.use(
  AxiosLogger.responseLogger,
  AxiosLogger.errorLogger,
);

// Request Interceptor
apiClient.interceptors.request.use(
  config => {
    try {
      // const accessToken = useAppSettingsStore.getState().accessToken
      const accessToken: string = '';
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      Logger.error('Error adding Authorization header:', error);
    }
    return config;
  },
  error => {
    Logger.error('Request Error:', error);
    return Promise.reject(new Error(error.message));
  },
);

// Response Interceptor
apiClient.interceptors.response.use(
  response => response, // Pass successful responses
  async error => {
    if (error.response) {
      const {status} = error.response;
      if (status === 401 && !error.config._retry) {
        // Attempt to refresh token
        error.config._retry = true;
        const newAccessToken = await refreshTokens();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(error.config); // Retry the original request
        } else {
          // Logout if token refresh fails
          handleLogout();
        }
      } else {
        // Handle other status codes
        handleApiError(error);
      }
    } else if (error.request) {
      Logger.error('No Response from Server:', error.request);
      Logger.error('Network Error', 'Please check your internet connection.');
    } else {
      Logger.error('Request Setup Error:', error.message);
      Logger.error('Error', 'An unexpected error occurred.');
    }
    return Promise.reject(new Error(error.message));
  },
);

// Global Error Handler Function
const handleApiError = (error: any) => {
  const {status, data} = error.response;
  const errorMessage = data?.message ?? 'An unexpected error occurred.';
  switch (status) {
    case 400:
      Logger.error('Bad Request', errorMessage);
      break;
    case 401:
      Logger.error('Unauthorized', 'Please log in again.');
      handleLogout();
      break;
    case 403:
      Logger.error('Forbidden', 'You do not have access to this resource.');
      break;
    case 404:
      Logger.error('Not Found', 'The requested resource could not be found.');
      break;
    case 500:
      Logger.error('Server Error', 'An internal server error occurred.');
      break;
    default:
      Logger.error('Error', errorMessage);
  }
};

// Refresh Token Logic
const refreshTokens = async (): Promise<string | null> => {
  try {
    // const refreshToken = useAppSettingsStore.getState().refreshToken
    const refreshToken: string = '';

    if (!refreshToken) {
      throw new Error('No refresh token available.');
    }
    const response = await apiClient.post(API.REFRESH_TOKEN_PATH, {
      refreshToken,
    });
    const {accessToken, refresh_token: newRefreshToken} = response.data;
    setAllApiTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    Logger.error('Token Refresh Error:', error);
    return null;
  }
};

// Logout Logic
export const handleLogout = () => {
  try {
    Logger.log('Session Expired', 'You have been logged out.');
    // Clear all stored data
    // Navigate to LoginScreen or restart the app
    // e.g., resetAndNavigate('LoginScreen');
  } catch (error) {
    Logger.error('Error during logout:', error);
  }
};

export const setAllApiTokens = (accessToken: string, refreshToken: string) => {
  // useAppSettingsStore.getState().setAccessToken(accessToken)
  // useAppSettingsStore.getState().setRefreshToken(refreshToken)
};

export const clearAllApiTokens = () => {
  // useAppSettingsStore.getState().setAccessToken('')
  // useAppSettingsStore.getState().setRefreshToken('')
};

export default apiClient;
