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
      privateLocations: ['eu-shared-services.prd'],
    },
    /**
     * Project monitors settings
     */
    project: {
      id: 'eu-shared-services.prd',
      url: 'https://7a2ee305f9de43feb3d2b8e78e848ed8.eu-central-1.aws.cloud.es.io:443',
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
