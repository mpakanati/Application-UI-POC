
import { Injectable } from '@angular/core';
// import { TreeNode } from 'primeng/api';
import { UtilsConstants, ERROR_MESSAGES, MT_TO_PREF,PREF_TO_MT,UNITTEXT,CONVERSION_TYPE  } from './util.config';
// import { UtilTreeNode } from './models/treeNode.model';
declare var google;
@Injectable()
export class UtilService {


  static utctoUserPreferredTimeZone(
    timestamp: string,
    preferenceFormat: string
  ): string {
    switch (preferenceFormat) {
      default: {
        return timestamp;
      }
    }
  }

  static tonstoUserPreferedFormat(
    value: number,
    preferenceType: string
  ): number {
    switch (preferenceType) {
      case 'KG': {
        return value / 0.001;
      }
      case 'MT': {
        return value;
      }
      case 'LB': {
        return value / 0.000453592;
      }
      case 'UST': {
        return value / 0.907;
      }
      default: {
        return value;
      }
    }
  }

  sortTreeNodes(params, result) {
    if (params.sortBy) {
      result.sort((prevElement, nextElement) => {
        if (typeof prevElement[params.sortBy] === UtilsConstants.STRING) {
          return prevElement[params.sortBy].localeCompare(
            nextElement[params.sortBy]
          );
        } else {
          return prevElement[params.sortBy] - nextElement[params.sortBy];
        }
      });
      if (!params.sortAsc) {
        result.reverse();
      }
    }
    return result;
  }

  /* prepareTree(itemList: any[]) {
    const treeTableData = [];
    if (itemList !== undefined) {
      for (const item of itemList) {
        treeTableData.push(this.generateNode(item));
      }
    }
    return treeTableData;
  } */

  /* generateNode(item: any): TreeNode {
    const nodeList: TreeNode[] = [];
    if (item.groups !== null && item.groups !== undefined) {
      for (const subItem of item.groups) {
        nodeList.push(this.generateNode(subItem));
      }
    }
    const treeNode = new UtilTreeNode(item.name, item, nodeList);
    return treeNode;
  } */

  /**
   * function to validate string which has been passed
   * @param value get the string value
   * @param minLength get the minlength of the string
   * @param maxLength get the max length of the string
   * @param regex get the regex to validate if required
   */
  validateString(
    value: string,
    minLength: number,
    maxLength: number,
    regex?: any
  ) {
    if (value !== '' && value !== undefined) {
      if (regex) {
        if (regex.test(value)) {
          return ERROR_MESSAGES.SPECIAL_CHAR_NOT_ALLOWED;
        }
      }
      if (value.length >= minLength && value.length <= maxLength) {
        return '';
      } else {
        return (
          ERROR_MESSAGES.PLEASE_ENTER_VALUES_BETWEEN +
          minLength +
          ERROR_MESSAGES.AND +
          maxLength
        );
      }
    } else {
      return (
        ERROR_MESSAGES.PLEASE_ENTER_MIN_CHAR + minLength + ERROR_MESSAGES.CHAR
      );
    }
  }
  showAccordion(y) {
    if (y.show === undefined) {
      y['show'] = true;
    } else {
      y.show = !y.show;
    }
  }

  /**
   * function to get LatLng of address
   * @param address get address
   */
  getLatLng(address: string) {
    return new Promise((resolve, reject) => {
      // Initialize the Geocoder
      const geocoder = new google.maps.Geocoder();
      if (geocoder) {
        geocoder.geocode(
          {
            address: address
          },
          function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              resolve(results[0].geometry.location);
            } else {
              reject();
            }
          }
        );
      }
    });
  }

  tonstoUserPreferedFormat(value: number, preferenceType: string): number {
    switch (preferenceType) {
      case 'KG': {
        return value / 0.001;
      }
      case 'MT': {
        return value;
      }
      case 'LB': {
        return value / 0.000453592;
      }
      case 'UST': {
        return value / 0.907;
      }
      default: {
        return value;
      }
    }
  }
  userPreferedFormatToTons(value: number, preferenceType: string): number {
    switch (preferenceType) {
      case 'KG': {
        return value * 0.001;
      }
      case 'MT': {
        return value;
      }
      case 'LB': {
        return value * 0.000453592;
      }
      case 'UST': {
        return value * 0.907;
      }
      default: {
        return value;
      }
    }
  }

  userPreferencesUnits(
    preferenceType: string,
    conversionType: string
  ): Function {
    return (value: number) => {
      if (isNaN(value)) {
        return { value: value, unitText: UNITTEXT[preferenceType] };
      }

      const getValueBasedOnPreference = () => {
        if (conversionType === CONVERSION_TYPE.PREFERENCE_TO_METRIC) {
          return Math.round(value * PREF_TO_MT[preferenceType]);
        }
        return Math.round(value * MT_TO_PREF[preferenceType]);
      };

      const getUnits = {
        'US Standard': () => {
          return {
            value: getValueBasedOnPreference(),
            unitText: UNITTEXT[preferenceType]
          };
        },

        Imperial: () => {
          return {
            value: getValueBasedOnPreference(),
            unitText: UNITTEXT[preferenceType]
          };
        },

        default: () => {
          return {
            value: getValueBasedOnPreference(),
            unitText: UNITTEXT[preferenceType]
          };
        }
      };
      return (getUnits[preferenceType] || getUnits['default'])();
    };
  }
  getDateTimeFormat(preference) {
    /* let dateFormat = preference.dateFormat
    let timeFormat = preference.timeFormat.split(' ');
    timeFormat[0] = preference.timeFormat.split(' ')[0].replace('SS', 'ss').replace('MM', 'mm')
    if (!timeFormat[1].match(24)) {
      timeFormat[0] = timeFormat[0].replace('HH', 'hh');
      timeFormat[0]=timeFormat[0]+' a';
    }else{
      timeFormat[0] = timeFormat[0]
    }
    dateFormat = dateFormat.replace('DD', 'dd').replace('YY', 'yy');
    dateFormat = dateFormat + ' ' + timeFormat[0];
    return dateFormat;  */
  }
}
