import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? 'https://timblog.com' : 'http://loclhost:8000';
export const APP_NAME = publicRuntimeConfig.APP_NAME;