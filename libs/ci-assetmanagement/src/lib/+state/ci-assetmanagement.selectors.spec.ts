import { AssetState } from './ci-assetmanagement.reducer';
import {assets, nextUrl, totalCount  } from './ci-assetmanagement.selectors';
import { Asset } from '../models/ci-assetmanagement.model';

describe('site management component selector', () => {
    let assetState: any;
    beforeEach(() => {
        const createAssets = (make = '', model = '', serialNumber = ''): Asset => ({
            make: make,
            model: model,
            serialNumber: serialNumber,
            sites:[]
          });
          assetState = {
            assets:[
            createAssets('CAT', '777','YUWJW88u'),
            createAssets('CAT', '777','MA8818I')
          ],
          nextUrl: '',
          totalCount: 2
        };
      });

    it('should handle assets Selector', () => {
        const results = assets.projector(
            assetState
          );
          expect(results.length).toBe(2);
    })

    it('should handle nextUrl Selector', () => {
        const results = nextUrl.projector(
            assetState
          );
          expect(results).toEqual(assetState.nextUrl);
    })

    it('should handle totalCount Selector', () => {
        const results = totalCount.projector(
            assetState
          );
          expect(results).toEqual(assetState.totalCount);
    })
});
