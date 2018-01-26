export const API_DOMAIN = 'http://127.0.0.1:8000'
export const API_PATH = '/api/'

export const VIDEO_API_PATH = (): string => `${API_PATH}videos/`;
export const VIDEO_API_URL = (): string => `${API_DOMAIN}${VIDEO_API_PATH()}`;
