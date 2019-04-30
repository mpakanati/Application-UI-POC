import { AppStoreLoaded } from './app-store.actions';
import {
  AppStoreState,
  Entity,
  initialState,
  appStoreReducer
} from './app-store.reducer';

describe('AppStore Reducer', () => {
  const getAppStoreId = it => it['id'];
  let createAppStore;

  beforeEach(() => {
    createAppStore = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid AppStore actions ', () => {
    it('should return set the list of known AppStore', () => {
      const appStores = [
        createAppStore('PRODUCT-AAA'),
        createAppStore('PRODUCT-zzz')
      ];
      const action = new AppStoreLoaded(appStores);
      const result: AppStoreState = appStoreReducer(initialState, action);
      const selId: string = getAppStoreId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = appStoreReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
