import { Action } from '@ngrx/store';

export enum CIAssetManagementActionTypes {
    LoadAssets = '[CIAssetManagement] State',
    PostAssetsTag = '[CIAssetManagement] Post Assets Tag',
    PostAssetsTagSuccess = '[CIAssetManagement] Post Assets Tag Success',
    PostAssetsTagFailed = '[CIAssetManagement]  Post Assets Tag Failed',
    AssetsLoaded = '[CIAssetManagement] State Assets Loaded',
    AssetsLoadedFailed = '[CIAssetManagement] State Assets Failed',
    ResetAssets = '[CIAssetManagement] State Reset Assets',
    SearchAssetAction = '[CIAssetManagement] Search Asset',
    SearchAssetResponseReset = '[CIAssetManagement] Search Reset',
    SearchAssetActionSuccess = '[CIAssetManagement] Search Success',
    SearchAssetActionFailed = '[CIAssetManagement] Search failed'
  }

  export class LoadAssets implements Action {
    readonly type = CIAssetManagementActionTypes.LoadAssets;
    constructor(public payload: any) { }
  }
  export class AssetsLoaded implements Action {
    readonly type = CIAssetManagementActionTypes.AssetsLoaded;
    constructor(public payload: any) {}
  }
  
  export class AssetsLoadedFailed implements Action {
    readonly type = CIAssetManagementActionTypes.AssetsLoadedFailed;
    constructor(public payload: any) {}
  }

  export class ResetAssets implements Action {
    readonly type = CIAssetManagementActionTypes.ResetAssets;
    constructor() {}
  }
  export class PostAssetsTag implements Action {
    readonly type = CIAssetManagementActionTypes.PostAssetsTag;
    constructor(public payload: any) { }
  }
  export class PostAssetsTagSuccess implements Action {
    readonly type = CIAssetManagementActionTypes.PostAssetsTagSuccess;
    constructor() { }
  }
  export class PostAssetsTagFailed implements Action {
    readonly type = CIAssetManagementActionTypes.PostAssetsTagFailed;
    constructor() { }
  }

  export class SearchAssetAction implements Action {
    readonly type = CIAssetManagementActionTypes.SearchAssetAction;
    constructor(public payload: any) {}
  }
  
  export class SearchAssetResponseReset implements Action {
    readonly type = CIAssetManagementActionTypes.SearchAssetResponseReset;
    constructor() {}
  }

  export class SearchAssetActionSuccess implements Action {
    readonly type = CIAssetManagementActionTypes.SearchAssetActionSuccess;
    constructor(public payload: any) {}
  }
  
  export class SearchAssetActionFailed implements Action {
    readonly type = CIAssetManagementActionTypes.SearchAssetActionFailed;
    constructor() {}
  }
  
  
  export type CIAssetManagementActions =
    | LoadAssets
    | AssetsLoaded
    | AssetsLoadedFailed
    | ResetAssets
    | SearchAssetAction
    | SearchAssetResponseReset
    | SearchAssetActionSuccess
    | SearchAssetActionFailed
    | PostAssetsTag
    | PostAssetsTagSuccess
    | PostAssetsTagFailed

  