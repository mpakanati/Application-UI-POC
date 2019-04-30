export class Site {
    id: number;
    name: string;
    location: string;
    kpis: Array<IKpi>;
    jobsCount: number;
    effectiveDate?: string;
    groupId?: string;
    poweredBy?: string;
    redirectUrl?: string;
    status?: string;
    geofence? : Array<IBoundary>
}

export interface IKpi {
    name : string;
    value: number;
    target: number;
}

export interface Assets {
    make: string,
    serialNumber: string,
    id?: string,
    typeId?: string,
    type?: string,
    level?: string,
    origin?: string,
    organization?: string,
    organizationType?: string,
    associatedOrganization?: string,
    associatedOrganizationType?: string,
    status?: string,
    startTime?: string,
    assetKey?: string,
    dealerCustomerNumber?: string,
    children?: string,
    self?: string,
    asset?: string
}

export interface LocationDetails {
    siteName: string;
    street:string;
    cityState: string;
}

export interface FormCtrl{
    id?: string;
    placeHolder?: string;
    autocomplete?: boolean;
    errorMessage?: any;
}

export interface SiteMenuOption{
    id: string;
    label: string;
}

export class SiteTiles {
    siteId: number;
    location: string;
    tile1: Array<ITiles>;
    tile2: Array<ITiles>;
    tile3: Array<ITiles>;
    tile4: Array<ITiles>;
    poweredBy?: string;
}

export interface ITiles {
    value?: string; 
    icon?: string;
    class?: string;
    style?: Object;
}

export interface SiteKPIDetails {
    zoneName: string,
    materialDispatched: number,
    trucksDispatched: number,
    activeLoaders: number,
    averageTruckTimeOnSite: number,
    averageTruckTimeInQueue: number,
    noOfTrucks: number,
    jobsCount: number

}

export interface AssignedAssets {
    make: string,
    serialNumber: string,
    id?: string,
    typeId?: string,
    type?: string,
    level?: string,
    origin?: string,
    organization?: string,
    organizationType?: string,
    associatedOrganization?: string,
    associatedOrganizationType?: string,
    status?: string,
    startTime?: string,
    assetKey?: string,
    dealerCustomerNumber?: string,
    children?: string,
    self?: string,
    asset?: string
}

export interface IBoundary {
    boundaryName: string,
    boundaryZone: string,
    isEditable: Boolean,
    color: string,
    shape: IShape;
}

export interface IShape {
    type: string,
    latlngval: object,
    radius?: number 
}

export interface SiteMenuEvent{
    menuOptionId: string;
    site: Site;
}

export interface ICCDSGroup {
  name: string,
  assets : Array<Assets>
}
export interface AssetTag {
    tag?: string;
}

export interface Extensions {
    assetTags?: AssetTag[];
    model?: string;
}

export interface AssetMDM {
    id?: string;
    make: string;
    serialNumber: string;
    model?: string;
    typeId?: string;
    type?: string;
    level?: string;
    origin?: string;
    organization?: string;
    organizationType?: string;
    associatedOrganization?: string;
    associatedOrganizationType?: string;
    status?: string;
    startTime?: Date;
    endTime?: Date;
    cancelReason?: string;
    assetKey?: string;
    dealerCustomerNumber?: string;
    parent?: string;
    children?: string;
    self?: string;
    asset?: string;
    extensions?: Extensions;
}

