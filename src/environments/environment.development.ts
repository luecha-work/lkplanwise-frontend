import { appInfo, applicationBase } from './environment.common';

export const environment = {
  appInfo,
  application: {
    ...applicationBase,
    angular: `${applicationBase.angular} DEV`,
  },
  urlNews: './assets/params/json/mock/trailers.json',
  urlMovies: './assets/params/json/mock/movies.json',
  config: {
    api: false,
    url: './assets/params/json/crud/',
  },
  backendLKPlanWiseUrl: 'http://localhost:8080',
  encryptionKey: 'KzvBVBWgmczUSty1SujwnmdDwQRdsl60',
};
