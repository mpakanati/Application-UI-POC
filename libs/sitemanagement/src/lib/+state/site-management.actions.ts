import { Action } from '@ngrx/store';
import { LocationDetails, SiteKPIDetails } from '../models/sitemanagement.model';

export enum SiteManagementActionTypes {
  LoadSite = '[SiteManagement] State',
  SiteLoaded = '[SiteManagement] State Site Loaded',
  SiteLoadFailed = '[SiteManagement] State Site Failed',
  NoSiteLoaded = '[SiteManagement] State No Site Loaded',


  EditSite = '[SiteManagement] Edit',
  EditSuccess = '[SiteManagement] Edit Success',
  EditFailed = '[SiteManagement] Edit Failed',

  DeleteSite = '[SiteManagement] Delete',
  DeleteSuccess = '[SiteManagement] Delete Success',
  DeleteFailed = '[SiteManagement] Delete Failed',
  ResetFlags = '[SiteManagement] Reset Flags',

  CreateSite = '[SiteManagement] Create',
  CreateSuccess = '[SiteManagement] Create Success',
  CreateFailed = '[SiteManagement] Create Failed',
  AddLocationDetails = '[SiteManagement] Add location details',
  ResetLocationDetails = "[SiteManagement] ResetLocationDetails",

  LoadKPIDetails = '[SiteManagement] Load KPI Detials',
  KPIDetailsLoaded = '[SiteManagement] KPI Detials Loaded',
  KPIDetailsFailed = '[SiteManagement] KPI Detials Failed',
  ResetKPIDetails = '[SiteManagement] KPI Detials Reseted',

  LoadAssignedAssets = '[SiteManagement] State AssignedAssets',
  AssignedAssetsLoaded = '[SiteManagement] State AssignedAssets Loaded',
  AssignedAssetsLoadFailed = '[SiteManagement] State AssignedAssets Failed',
  UpdateAssignedAssets = '[SiteManagement] State UpdateAssigned Assets',
  ResetAssignedAssets = '[SiteManagement] Reset AssignedAssets',

  UpdateGeofence = '[SiteManagement] State Update Geofence Boundaries'
}

export class LoadSite implements Action {
  readonly type = SiteManagementActionTypes.LoadSite;
  constructor(public payload: string) { }
}

export class SiteLoaded implements Action {
  readonly type = SiteManagementActionTypes.SiteLoaded;
  constructor(public payload: any) {}
}

export class NoSiteLoaded implements Action {
  readonly type = SiteManagementActionTypes.NoSiteLoaded;
  constructor(public payload: any) {}
}

export class SiteLoadFailed implements Action {
  readonly type = SiteManagementActionTypes.SiteLoadFailed;
  constructor(public payload: any) {}
}

export class EditSite implements Action {
  readonly type = SiteManagementActionTypes.EditSite;
  constructor(public payload: any) { }
}

export class EditSuccess implements Action {
  readonly type = SiteManagementActionTypes.EditSuccess;
  constructor(public payload: any) {}
}

export class EditFailed implements Action {
  readonly type = SiteManagementActionTypes.EditFailed;
  constructor(public payload: any) {}
}

export class DeleteSite implements Action {
  readonly type = SiteManagementActionTypes.DeleteSite;
  constructor(public payload: any) { }
}

export class DeleteSuccess implements Action {
  readonly type = SiteManagementActionTypes.DeleteSuccess;
  constructor(public payload: any) {}
}

export class DeleteFailed implements Action {
  readonly type = SiteManagementActionTypes.DeleteFailed;
  constructor(public payload: any) {}
}

export class ResetFlags implements Action {
  readonly type = SiteManagementActionTypes.ResetFlags;
  constructor() {}
}

export class ResetAssignedAssets implements Action {
  readonly type = SiteManagementActionTypes.ResetAssignedAssets;
  constructor() {}
}

export class CreateSite implements Action {
  readonly type = SiteManagementActionTypes.CreateSite;
  constructor(public payload: any) { }
}

export class CreateSuccess implements Action {
  readonly type = SiteManagementActionTypes.CreateSuccess;
  constructor(public payload: any) {}
}

export class CreateFailed implements Action {
  readonly type = SiteManagementActionTypes.CreateFailed;
  constructor(public payload: any) {}
}

export class AddLocationDetails implements Action {
  readonly type = SiteManagementActionTypes.AddLocationDetails;
  constructor(public payload: LocationDetails) {}
}

export class ResetLocationDetails implements Action {
  readonly type = SiteManagementActionTypes.ResetLocationDetails;
  constructor(public payload: LocationDetails) {}
}

export class LoadKPIDetails implements Action {
  readonly type = SiteManagementActionTypes.LoadKPIDetails;
  constructor(public siteId: number, public payload: any) { }
}

export class KPIDetailsLoaded implements Action {
  readonly type = SiteManagementActionTypes.KPIDetailsLoaded;
  constructor(public payload: SiteKPIDetails) { }
}

export class KPIDetailsFailed implements Action {
  readonly type = SiteManagementActionTypes.KPIDetailsFailed;
  constructor(public payload: any) { }
}

export class ResetKPIDetails implements Action {
  readonly type = SiteManagementActionTypes.ResetKPIDetails;
  constructor() {}
}

export class LoadAssignedAssets implements Action {
  readonly type = SiteManagementActionTypes.LoadAssignedAssets;
  constructor(public siteId: string, public payload: any) {}
}

export class AssignedAssetsLoaded implements Action {
  readonly type = SiteManagementActionTypes.AssignedAssetsLoaded;
  constructor(public payload: any) {}
}

export class AssignedAssetsLoadFailed implements Action {
  readonly type = SiteManagementActionTypes.AssignedAssetsLoadFailed;
  constructor(public payload: any) {}
}

export class UpdateAssignedAssets implements Action {
  readonly type = SiteManagementActionTypes.UpdateAssignedAssets;
  constructor(public payload: any) {}
}

export class UpdateGeofence implements Action {
  readonly type = SiteManagementActionTypes.UpdateGeofence;
  constructor(public payload: any) {}
}

export type SiteManagementActions =
  | LoadSite
  | SiteLoaded
  | SiteLoadFailed
  | NoSiteLoaded
  | EditSite
  | EditSuccess
  | EditFailed
  | DeleteSite
  | DeleteSuccess
  | DeleteFailed
  | ResetFlags
  | CreateSite
  | CreateSuccess
  | CreateFailed
  | AddLocationDetails
  | ResetLocationDetails
  | LoadKPIDetails
  | KPIDetailsLoaded
  | KPIDetailsFailed
  | ResetKPIDetails
  | LoadAssignedAssets
  | AssignedAssetsLoaded
  | AssignedAssetsLoadFailed
  | UpdateAssignedAssets
  | ResetAssignedAssets
  | UpdateGeofence
 