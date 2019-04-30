import {
  SiteManagementActions,
  SiteManagementActionTypes
} from './site-management.actions';
import { Site, LocationDetails, Assets, SiteKPIDetails, AssignedAssets, IBoundary } from '../models/sitemanagement.model';

/**
 * Interface to the part of the Store containing SiteManagementState
 * and other information related to SiteManagementData.
 */
export interface SiteState {
  readonly sites: Site[];
  readonly nextUrl: string;
  readonly siteDeleted: any;
  readonly siteDeleteFailed: any;
  readonly locationDetails : LocationDetails;
  readonly assetDetails : Assets;
  readonly siteKPIDetails: SiteKPIDetails;
  readonly assignedAssets:AssignedAssets[];
  readonly geofenceDetails:IBoundary[];
  noSiteLoaded: boolean;
  siteCreate: any;
  siteCreteFailed: any;
  resetTempSite: any;
  siteEdited: any,
  siteEditedFailed: any,
  siteLoadFailed: any
}

export const initialState: SiteState = {
  sites: [],
  nextUrl: null,
  siteDeleted: null,
  siteDeleteFailed: null,
  siteEdited: null,
  siteEditedFailed: null,
  siteLoadFailed: '',
  noSiteLoaded: false,
  locationDetails: {
    siteName: "",
    street: "",
    cityState: ""
  },
  assetDetails: null,
  siteCreate: null,
  siteCreteFailed: null,
  resetTempSite: {
    siteName: "",
    street: "",
    cityState: ""
  },
  siteKPIDetails: {
    zoneName: null,
    materialDispatched: null,
    trucksDispatched: null,
    activeLoaders: null,
    averageTruckTimeOnSite: null,
    averageTruckTimeInQueue: null,
    noOfTrucks: null,
    jobsCount: 0
  },
  assignedAssets: null,
  geofenceDetails: null
};

export function siteReducer(
  state = initialState,
  action: SiteManagementActions
): SiteState {
  switch (action.type) {

    case SiteManagementActionTypes.SiteLoaded: {
      return { ...state, sites: action.payload.sites, nextUrl: action.payload.nextUrl };
    }

    case SiteManagementActionTypes.NoSiteLoaded: {
      return { ...state, noSiteLoaded: action.payload };
    }

    case SiteManagementActionTypes.DeleteSuccess: {
      const data = state.sites.filter(site => (site.id !== action.payload));
      return { ...state, sites: data, siteDeleted: action.payload };
    }

    case SiteManagementActionTypes.DeleteFailed: {
      return { ...state, siteDeleteFailed: action.payload };
    }

    case SiteManagementActionTypes.ResetFlags: {
      return {
        ...state,
        siteDeleted: null,
        siteDeleteFailed:null,
        siteEdited: null,
        siteEditedFailed: null,
        siteCreate: null,
        siteCreteFailed: null,
        siteLoadFailed: '',
        geofenceDetails: null
      };
    }

    case SiteManagementActionTypes.CreateSuccess: {
      return { ...state, siteCreate: action.payload };
    }

    case SiteManagementActionTypes.CreateFailed: {
      return { ...state, siteCreteFailed: action.payload };
    }

    case SiteManagementActionTypes.EditSuccess: {
      return { ...state, siteEdited: action.payload };
    }

    case SiteManagementActionTypes.EditFailed: {
      return { ...state, siteEditedFailed: action.payload };
    }

    case SiteManagementActionTypes.AddLocationDetails: {
      return { ...state, locationDetails:action.payload };
    }

    case SiteManagementActionTypes.ResetLocationDetails: {
      return { ...state, locationDetails:action.payload };
    }

    case SiteManagementActionTypes.KPIDetailsLoaded: {
      return { ...state, siteKPIDetails:action.payload };
    }

    case SiteManagementActionTypes.AssignedAssetsLoaded: {
      return { ...state, assignedAssets:action.payload.records};
    }

    case SiteManagementActionTypes.UpdateAssignedAssets: {
      return { ...state, assignedAssets:action.payload};
    }
    case SiteManagementActionTypes.UpdateGeofence: {
      return { ...state, geofenceDetails:action.payload};
    }


    case SiteManagementActionTypes.ResetAssignedAssets: {
      return { ...state, assignedAssets:null};
    }

    case SiteManagementActionTypes.ResetKPIDetails: {
      return { ...state, siteKPIDetails:{
        zoneName: null,
        materialDispatched: null,
        trucksDispatched: null,
        activeLoaders: null,
        averageTruckTimeOnSite: null,
        averageTruckTimeInQueue: null,
        noOfTrucks: null,
        jobsCount: 0
      }
    };
    }

    case SiteManagementActionTypes.SiteLoadFailed: {
      return { ...state,  siteLoadFailed:action.payload };
    }

    default:
      return state;
  }
}
