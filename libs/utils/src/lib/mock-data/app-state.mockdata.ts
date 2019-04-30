import { Action } from '@ngrx/store';
export interface AppData {
    isValidUser: boolean;
    userAccessToken: string;
    parsedToken: any;
    ucidData: any;
    x_application_id: string;
    isIGrant: boolean;
  }

  export interface AppState {
    readonly app: AppData;
  }

  export const appInitialState: AppData = {
    isValidUser: false,
    userAccessToken: '',
    x_application_id: "2",
    isIGrant: true,
    parsedToken: {
      scope: [],
      client_id: '',
      iss: '',
      aud: '',
      catloginid: '',
      catrecid: '',
      catafltncode: '',
      ucid: '',
      exp: 0
    },
    ucidData: 'gthraves'

  };

  export function appReducer(state = appInitialState, action: AppActions): AppData {
    switch (action.type) {
      case AppActionTypes.AppAction:
        return state;

      case AppActionTypes.AppLoaded: {
        return { ...state, ...action.payload };
      }
      case AppActionTypes.AppLoginSuccess: {
        return {
          ...state,
          userAccessToken: action.payload.accessToken,
          isValidUser: action.payload.isValidUser,
          parsedToken: action.payload.parsedToken,
          ucidData:  action.payload.parsedToken.ucid || appInitialState.ucidData
        };
      }
      default:
        return state;
    }
  }

export enum AppActionTypes {

  LoadApp = '[App] Load Data',
  AppLoaded = '[App] Data Loaded',
  AppLoginSuccess = "[App] App Login Success",
  AppAction = '[App] Action',
  DumpAction = '[App] DumpAction',
}

export class App implements Action {
  readonly type = AppActionTypes.AppAction;
}
export class AppLoaded implements Action {
  readonly type = AppActionTypes.AppLoaded;
  constructor(public payload: any) { }
}

export class AppLoginSuccess implements Action {
  readonly type = AppActionTypes.AppLoginSuccess;
  constructor(public payload: any) { }
}

export class DumpAction implements Action {
  readonly type = AppActionTypes.DumpAction;
  // constructor(public payload: any) { }
}

export type AppActions = App | AppLoaded | AppLoginSuccess | DumpAction;


/**
 * Interface for the 'Environment' data used in
 *  - EnvironmentState, and
 *  - environmentReducer
 */

/**
 * Interface to the part of the Store containing EnvironmentState
 * and other information related to EnvironmentData.
 */
export interface EnvironmentData {
  env: string;
  app_baseURL: string,
  woa_msBaseURL: string,
  appLoginURL?: string,
  auth_ms_baseURL: string,
  site_url?: SiteURL,
  assets_URL?: string,
  assigned_assets_URL: string;

}

interface SiteURL {
  GET: string,
  POST: string,
  PUT: string,
  DELETE: string
}

export interface EnvironmentState {
  readonly environment: EnvironmentData;
}

export const environmentInitialState: EnvironmentData = {
  env: '',
  app_baseURL: '',
  woa_msBaseURL: '',
  appLoginURL: '',
  auth_ms_baseURL: '',
  site_url: {
    GET: '',
    POST: '',
    PUT: '',
    DELETE: ''
  },
  assets_URL: '',
  assigned_assets_URL: ''
};

export function environmentReducer(
  state = environmentInitialState,
  action: EnvironmentActions
): EnvironmentData {
  switch (action.type) {
    case EnvironmentActionTypes.EnvironmentAction:
      return state;

    case EnvironmentActionTypes.EnvironmentLoaded: {
      return { ...state, ...action.payload };
    }

    case EnvironmentActionTypes.IdentifyEnvironment: {
      const envLocalIdentifier = action.payload;
      const modifiedenv_state: EnvironmentData = {
        env: envLocalIdentifier,
        app_baseURL: '',
        woa_msBaseURL: '',
        appLoginURL: '',
        auth_ms_baseURL: '',
        site_url: environmentInitialState.site_url,
        assets_URL: '',
        assigned_assets_URL: ''
      }

      return {
        ...state,
        ...modifiedenv_state
      };
    }

    default:
      return state;
  }
}

export enum EnvironmentActionTypes {
    EnvironmentAction = '[Environment] Action',
    LoadEnvironment = '[Environment] Load Data',
    EnvironmentLoaded = '[Environment] Data Loaded',
    IdentifyEnvironment = '[Environment] identifyEnv',
    DumpAction = '[Environment] DumpAction'
  }

  export class Environment implements Action {
    readonly type = EnvironmentActionTypes.EnvironmentAction;
  }

  export class EnvironmentLoaded implements Action {
    readonly type = EnvironmentActionTypes.EnvironmentLoaded;
    constructor(public payload: any) { }
  }

  export class IdentifyEnvironment implements Action {
    readonly type = EnvironmentActionTypes.IdentifyEnvironment;
    constructor(public payload: any) { }
  }


  export type EnvironmentActions =
    | Environment
    // | LoadEnvironment
    | EnvironmentLoaded
    | IdentifyEnvironment
    | Environment;
