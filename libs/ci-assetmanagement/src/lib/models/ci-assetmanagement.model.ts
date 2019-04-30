export class Asset {
    make: string;
    model: string;
    serialNumber: string;
    sites:Sites[];
}

export interface AssetInfo {
    records: Asset[];
    nextUrl?:string;
    totalCount?: number;
}

export interface Sites {
     siteId: string
}
