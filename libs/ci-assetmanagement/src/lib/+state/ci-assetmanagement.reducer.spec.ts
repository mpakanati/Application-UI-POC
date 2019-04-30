import { LoadAssets, AssetsLoaded, ResetAssets} from './ci-assetmanagement.actions';
import { assetReducer, initialState } from './ci-assetmanagement.reducer';
import { CiAssetManagementMockData } from '../ci-assetmanagement.mockdata';
import { Asset } from '../models/ci-assetmanagement.model';

describe('assetReducer', () => {

  it('should work intial state', () => {
    const query = '?Ucid=gthraves&offset=0&Limit=10&isTotalCountRequired=true';
    const action = new LoadAssets(query);
    const actual = assetReducer(initialState, action);
    expect(actual.nextUrl).toBe(initialState.nextUrl);
    expect(actual.assets).toBe(initialState.assets);
  });

  it('should work with assets loaded ', () => {
    const data = CiAssetManagementMockData;
    const asset: Asset[] = CiAssetManagementMockData.records;
    const action = new AssetsLoaded(data);
    const actual = assetReducer(initialState, action);
    expect(actual.assets).toEqual(asset);
  });

  it('should work with assets loaded with exists asset', () => {
    const data = CiAssetManagementMockData;
    const asset: Asset[] = CiAssetManagementMockData.records;
    const action = new AssetsLoaded(data);
    const actual = assetReducer(initialState, action);
    const newData= {
      "records": [
        {
            make: "CAT",
            serialNumber: "12EJJEE"
        },
        {
            make: "CAT",
            serialNumber: "J1010OO"
        }
    ]};
    const newAction = new AssetsLoaded(newData);
    assetReducer(actual, newAction)
    expect(actual.assets.length).toBeGreaterThan(0);
  });

  it('should work with reset asset ', () => {
    const data = CiAssetManagementMockData;
    const action = new AssetsLoaded(data);
    const actualAssetLoad = assetReducer(initialState, action);
    const resetAction = new ResetAssets();
    const actual = assetReducer(initialState, resetAction);
    expect(actual.assets).toEqual(null);
  });
});
