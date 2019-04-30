import {
  CIAssetManagementActions,
  CIAssetManagementActionTypes
} from './ci-assetmanagement.actions';
import { Asset } from '../models/ci-assetmanagement.model';

/**
* Interface to the part of the Store containing CIAssetManagementState
*/
export interface AssetState {
  readonly assets: Asset[];
  readonly nextUrl: string;
  readonly totalCount: number;
  readonly filteredAssets: Asset[];
  readonly isEmptySearchResults: boolean;
}

export const initialState: AssetState = {
  assets: null,
  nextUrl: null,
  totalCount: null,
  filteredAssets: [],
  isEmptySearchResults: false
};

export function assetReducer(
  state = initialState,
  action: CIAssetManagementActions
): AssetState {
  switch (action.type) {

    case CIAssetManagementActionTypes.AssetsLoaded: {
      const _assets = action.payload.records || action.payload.subscriptions;
      const _nextUrl = action.payload.nextUrl || action.payload.next;
      const assets = (state.assets) ? [...state.assets, ..._assets]
      : _assets;
      return { ...state, assets:assets , nextUrl:_nextUrl, totalCount: action.payload.totalCount};
    }

    case CIAssetManagementActionTypes.ResetAssets: {
      return { ...state, assets:null};
    }

    case CIAssetManagementActionTypes.SearchAssetActionSuccess: {
      let returnVal: Asset[];
      if (!action.payload) {
        returnVal = [];
      } else {
        returnVal = action.payload.subscriptions;
        }
      return {
        ...state,
        filteredAssets: returnVal,
      }
    }
    
    case CIAssetManagementActionTypes.SearchAssetActionFailed: {
      return {
        ...state,
        isEmptySearchResults: true
      }
    }

    case CIAssetManagementActionTypes.SearchAssetResponseReset: {
      return {
        ...state,
        filteredAssets: [],
        isEmptySearchResults: false
      }
    }

    case CIAssetManagementActionTypes.PostAssetsTagSuccess: {
      return {
        ...state
      }
    }

    default:
      return state;
  }
}