import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SiteState } from './site-management.reducer';

// Lookup the 'App' feature state managed by NgRx
const getSiteState = createFeatureSelector<SiteState>('siteManagement');

export const site = createSelector(
    getSiteState,
  (state: SiteState) => state.sites
);

export const nextUrl = createSelector(
  getSiteState,
(state: SiteState) => state.nextUrl
);

export const getDeletedSite = createSelector(
    getSiteState,
  (state: SiteState) => state.siteDeleted
);

export const getFailedDelete = createSelector(
  getSiteState,
(state: SiteState) => state.siteDeleteFailed
);

export const resetFlag = createSelector(
  getSiteState,
(state: SiteState) => state.siteDeleted
);

export const getNoSiteLoaded = createSelector(
  getSiteState,
(state: SiteState) => state.noSiteLoaded
);

export const getCreateSite = createSelector(
  getSiteState,
(state: SiteState) => state.siteCreate
);

export const getCreateFailed = createSelector(
  getSiteState,
(state: SiteState) => state.siteCreteFailed
);

export const getEditedSite = createSelector(
  getSiteState,
(state: SiteState) => state.siteEdited
);

export const getEditedSiteFailed = createSelector(
  getSiteState,
(state: SiteState) => state.siteEditedFailed
);

export const locationDetails = createSelector(
  getSiteState,
(state: SiteState) => state.locationDetails
);

export const getSiteKPIDetails = createSelector(
  getSiteState,
(state: SiteState) => state.siteKPIDetails
);

export const assignedAssets = createSelector(
  getSiteState,
(state: SiteState) => state.assignedAssets
);

export const geofenceDetails = createSelector(
  getSiteState,
(state: SiteState) => state.geofenceDetails
);

export const getSiteLoadFailed = createSelector(
  getSiteState,
  (state: SiteState) => state.siteLoadFailed
);

// export const resetlocationDetails = createSelector(
//   getSiteState,
// (state: SiteState) => state.resetLocationDetails
// );

/* export const siteStateFail = createSelector(getSiteState, (state: SiteState) => state.siteStateFail); */
