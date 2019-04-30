import { Entity, AppStoreState } from './app-store.reducer';
import { appStoreQuery } from './app-store.selectors';

describe('AppStore Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAppStoreId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createAppStore = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      appStore: {
        list: [
          createAppStore('PRODUCT-AAA'),
          createAppStore('PRODUCT-BBB'),
          createAppStore('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('AppStore Selectors', () => {
    it('getAllAppStore() should return the list of AppStore', () => {
      const results = appStoreQuery.getAllAppStore(storeState);
      const selId = getAppStoreId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedAppStore() should return the selected Entity', () => {
      const result = appStoreQuery.getSelectedAppStore(storeState);
      const selId = getAppStoreId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = appStoreQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = appStoreQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
