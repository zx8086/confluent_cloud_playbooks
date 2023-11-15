import type { SyntheticsConfig } from '@elastic/synthetics';

export default env => {
  const config: SyntheticsConfig = {
    params: {
      url: 'https://elastic.github.io/synthetics-demo/',
    },
    playwrightOptions: {
      ignoreHTTPSErrors: false,
    },
    /**
     * Configure global monitor settings
     */
    monitor: {
      schedule: 30,
      locations: [],
      privateLocations: ['Private II'],
    },
    /**
     * Project monitors settings
     */
    project: {
      id: 'B2B_WEBSHOP',
      url: 'https://kibana-europe.pvhcorp.com/',
      space: 'developer-experience',
    },
  };
  if (env !== 'development') {
    /**
     * Override configuration specific to environment
     * Ex: config.params.url = ""
     */
  }
  return config;
};
