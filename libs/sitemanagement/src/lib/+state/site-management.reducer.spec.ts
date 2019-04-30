import { LoadSite, SiteLoaded, DeleteSuccess, DeleteFailed, ResetFlags, CreateSuccess, CreateFailed, EditSuccess,
  EditFailed, AddLocationDetails, NoSiteLoaded, ResetLocationDetails, SiteLoadFailed, KPIDetailsLoaded, ResetAssignedAssets, ResetKPIDetails, AssignedAssetsLoaded, UpdateAssignedAssets } from './site-management.actions';
import { siteReducer, initialState } from './site-management.reducer';
import { SiteManagementMockData, MockAssignedAssets } from '../site-management.mockdata';
import  {AssignedAssets} from '../models/sitemanagement.model';

describe('siteReducer', () => {

  it('should work intial state', () => {
    const query = `?Ucid=12354&Offset=0&Limit=5`;
    const action = new LoadSite(query);
    const actual = siteReducer(initialState, action);
    expect(actual.nextUrl).toBe(initialState.nextUrl);
  });

  it('should work for noSiteLoaded state', () => {
    const action = new NoSiteLoaded(true);
    const actual = siteReducer(initialState, action);
    expect(actual.noSiteLoaded).toBe(true);
  });

  it('should work with payload ', () => {
    const sites = SiteManagementMockData;
    const action = new SiteLoaded(sites);
    const state = siteReducer(initialState, action);
    expect(state.nextUrl).toBeDefined();
  });

  it('should work for DeleteSuccess', () => {
    const sites = SiteManagementMockData;
    const siteState = siteReducer(initialState, new SiteLoaded(sites));
    const action = new DeleteSuccess(sites.sites[0].id);
    const state = siteReducer(siteState, action);
    expect(state.sites.length).toEqual(sites.sites.length-1);
  });

  it('should work for DeleteFailed', () => {
    const errorMessage = 'Site Id alredy exists'
    const action = new DeleteFailed(errorMessage);
    const state = siteReducer(initialState, action);
    expect(state.siteDeleteFailed).toEqual(errorMessage);
  });

  it('should work for ResetFlags', () => {
    const action = new ResetFlags();
    const state = siteReducer(initialState, action);
    expect(state.siteDeleted).toEqual(null);
    expect(state.siteDeleteFailed).toEqual(null);
  });

  it('should work for CreateSuccess', () => {
    const siteCreationMessage = 'Site Created Successfullly'
    const action = new CreateSuccess(siteCreationMessage);
    const state = siteReducer(initialState, action);
    expect(state.siteCreate).toEqual(siteCreationMessage);
  });

  it('should work for CreateFailed', () => {
    const siteCreationMessage = 'Site Name exists'
    const action = new CreateFailed(siteCreationMessage);
    const state = siteReducer(initialState, action);
    expect(state.siteCreteFailed).toEqual(siteCreationMessage);
  });

  it('should work for EditSuccess', () => {
    const siteEditMessage = 'Site Updated Successfully'
    const action = new EditSuccess(siteEditMessage);
    const state = siteReducer(initialState, action);
    expect(state.siteEdited).toEqual(siteEditMessage);
  });

  it('should work for EditFailed', () => {
    const siteEditMessage = 'Site Updated Successfully'
    const action = new EditFailed(siteEditMessage);
    const state = siteReducer(initialState, action);
    expect(state.siteEditedFailed).toEqual(siteEditMessage);
  });

  it('should work for AddLocationDetails', () => {
    const siteLocationDetails = {
        siteName: 'Zone 1',
        street: 'Balscar Street',
        cityState: 'Chennai, Tamil nadu'
    }
    const action = new AddLocationDetails(siteLocationDetails);
    const state = siteReducer(initialState, action);
    expect(state.locationDetails).toEqual(siteLocationDetails);
  });

  it('should work for ResetLocationDetails', () => {
    const siteResetLocationDetails = {
      siteName: "",
      street: "",
      cityState: ""
    }
    const action = new ResetLocationDetails(siteResetLocationDetails);
    const state = siteReducer(initialState, action);
    expect(state.locationDetails).toEqual(siteResetLocationDetails);
  });

  it('should work for KPIDetailsLoaded', () => {
    const siteKPIDetails = {
      zoneName: 'Zone 1',
      materialDispatched: 2,
      trucksDispatched: 4,
      activeLoaders: 1,
      averageTruckTimeOnSite: 2,
      averageTruckTimeInQueue: 3,
      noOfTrucks: 3,
      jobsCount: 0
    }
    const action = new KPIDetailsLoaded(siteKPIDetails);
    const state = siteReducer(initialState, action);
    expect(state.siteKPIDetails).toEqual(siteKPIDetails);
  });

  it('should work for ResetKPIDetails', () => {
    const siteKPIDetails = {
        zoneName: null,
        materialDispatched: null,
        trucksDispatched: null,
        activeLoaders: null,
        averageTruckTimeOnSite: null,
        averageTruckTimeInQueue: null,
        noOfTrucks: null,
        jobsCount: 0
    }
    const action = new ResetKPIDetails();
    const state = siteReducer(initialState, action);
    expect(state.siteKPIDetails).toEqual(siteKPIDetails);
  });

  it('should work with assigned assets loaded ', () => {
    const data = MockAssignedAssets;
    const assignedAssets: AssignedAssets[] = MockAssignedAssets.records;
    const action = new AssignedAssetsLoaded(data);
    const actual = siteReducer(initialState, action);
    expect(actual.assignedAssets).toEqual(assignedAssets);
  });

  it('should work with update assigned assets', () => {
    const updateAssignedAssets: AssignedAssets[] = MockAssignedAssets.records;
    const action = new UpdateAssignedAssets(updateAssignedAssets);
    const actual = siteReducer(initialState, action);
    expect(actual.assignedAssets).toEqual(updateAssignedAssets);
  });

  it('should work with reset assets', () => {
    const data = MockAssignedAssets;
    const action = new AssignedAssetsLoaded(data);
    const actual = siteReducer(initialState, action);
    const resetAction = new ResetAssignedAssets();
    const reset = siteReducer(actual, resetAction);
    expect(reset.assignedAssets).toEqual(null);
  });

  it('should work for site load Failed', () => {
    const siteLoadFailMessage = 'Site Load Failed';
    const action = new SiteLoadFailed(siteLoadFailMessage);
    const state = siteReducer(initialState, action);
    expect(state.siteLoadFailed).toEqual(siteLoadFailMessage);
  });


});
