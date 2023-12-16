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
      schedule: 1,
      locations: [],
      privateLocations: ['eu-shared-services_prd'],
    },
    /**
     * Project monitors settings
     */
    project: {
      id: 'eu-shared-services_prd',
      url: 'https://kibana-europe.pvhcorp.com',
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
