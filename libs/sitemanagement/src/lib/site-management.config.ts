export const TERRA_URL_CONFIG = {
  'local': 'https://dev-api-sites-terra-ussc-cat-api-01.azurewebsites.net',
  'dev': 'https://dev-api-sites-terra-ussc-cat-api-01.azurewebsites.net',
  'qa': 'https://qa-api-sites-terra-ussc-cat-api-01.azurewebsites.net',
  'int': 'https://int-api-sites-terra-ussc-cat-api-01.azurewebsites.net',
  'stg': 'https://stg-api-sites-terra-ussc-cat-api-01.azurewebsites.net',
  'perf': 'https://perf-api-sites-terra-ussc-cat-api-01.azurewebsites.net',
  'prod': 'https://prod-api-sites-terra-ussc-cat-api-01.azurewebsites.net'
}

export const API_ENDPOINTS = {
  jobSites: "/api/v1/jobsites",
  sites: "/api/v2/sites",
  KPIDetails: "/api/v1/sites/{siteId}/metrices"
}

export const SITE_PARAMS = {
  dateFormat: 'DD/MM/YYYY',
  timezone: 'UTC',
  lang: 'en-US',
  UOM: 'metric',
  groupId: 'bf0e8c06-777a-45c9-abc9-0e35eb934729'
}

export const SEARCH_CONSTANTS = {
PLACEHOLDER_TEXT: 'Search Assets',
MIN_LENGTH: 4,
GHOST_TEXT: 'You can search by Asset ID'
}

export const GROUP = {
GROUP_ID_ERROR_MSG: 'An error occured in group creation. Try with a different site name',
GROUP_ERROR_MSG: 'An error occured'
}

export const ASSET_TYPE = {
ADVANCED_PRODUCTIVITY: 'Advanced Productivity',
VISION_LINK_LOAD_CYCLE: 'VisionLink Load and Cycle'
}

export const ASSIGNED_ASSET_ERROR: string = 'Please Assign an asset to proceed further';

export const TAG_ERROR: string = 'Please Assign Tags for all the Assigned assets';

export const ADD_ASSET_CONSTANTS = {
CREATE_JOBSITE : "CREATE JOBSITE",
EDIT_JOBSITE : "EDIT JOBSITE",
}