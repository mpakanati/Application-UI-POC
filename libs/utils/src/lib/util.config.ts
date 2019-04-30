export const ERROR_MESSAGES = {
    SPECIAL_CHAR_NOT_ALLOWED: 'Special charatcer not allowed',
    PLEASE_ENTER_MIN_CHAR: 'Please enter minimum ',
    CHAR: ' characters',
    PLEASE_ENTER_VALUES_BETWEEN: 'Please enter values between',
    AND: ' and '
}

export const UtilsConstants = {
    STRING: 'string'
}

export enum UNITTEXT {
    Imperial = 'Tons',
    Metric = 'Tonne',
    'US Standard' = 'US Tons'
  }

  export enum UNIT {
    Imperial = 'Imperial',
    Metric = 'Metric',
    'US Standard' = 'US Standard'
  }
  
  export const MT_TO_PREF = {
    Imperial: 0.98420652761106,
    Metric: 1,
    'US Standard': 1.1023113109244
  };

  export const PREF_TO_MT = {
    Imperial: 1.0160469088,
    Metric: 1,
    'US Standard': 0.90718474
  };
  
 export const CONVERSION_TYPE = {
  PREFERENCE_TO_METRIC: 'CONVERT_PREFERENCE_TO_METRIC',
  METRIC_TO_PREFERENCE : 'CONVERT_METRIC_TO_PREFERENCE'
 } 
