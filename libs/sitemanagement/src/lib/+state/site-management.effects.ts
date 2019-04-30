import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import {
  SiteManagementActionTypes,
  LoadSite,
  SiteLoaded,
  SiteLoadFailed,
  NoSiteLoaded,
  DeleteSite,
  DeleteFailed,
  DeleteSuccess,
  CreateSite,
  CreateFailed,
  CreateSuccess,
  EditSite,
  EditFailed,
  EditSuccess,
  LoadKPIDetails,
  KPIDetailsLoaded,
  KPIDetailsFailed,
  LoadAssignedAssets,
  AssignedAssetsLoaded,
  AssignedAssetsLoadFailed
} from './site-management.actions';
import { SiteState } from './site-management.reducer';
import { DataPersistence } from '@nrwl/nx';
import { SiteManagementService } from '../site-management.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as MockData from '../site-management.mockdata';

@Injectable()
export class SiteEffects {
  constructor(
    private dataPersistence: DataPersistence<SiteState>,
    private siteManagementService: SiteManagementService
  ) {}

  @Effect()
  SiteState$ = this.dataPersistence.fetch(SiteManagementActionTypes.LoadSite, {
    run: (action: LoadSite) => {
      const siteWrapper = {
        sites: []
      };
      // return this.siteManagementService.getSite(action.payload).pipe(
      //   map(sitesData => {
      //     //TDO logic. To be removed once WOA API is available
      //     if (!sitesData) {
      //       return new NoSiteLoaded(true);
      //     }
      //     sitesData.sites = sitesData.sites || sitesData.records;
      //     sitesData.sites.forEach(siteData => {
      //       siteWrapper.sites.push({
      //         id: siteData.id || siteData.siteId,
      //         name: siteData.name || siteData.siteName,
      //         location: siteData.location,
      //         poweredBy: siteData.poweredBy,
      //         redirectUrl: siteData.redirectUrl,
      //         geofence: siteData.geoFence
      //           ? JSON.parse(siteData.geoFence)
      //           : undefined,
      //         jobsCount: siteData.jobsCount,
      //         effectiveUntilDate: siteData.effectiveUntilDate,
      //         groupId: siteData.groupId,
      //         kpis: siteData.kpis || [
      //           {
      //             name: 'Active Loaders',
      //             value: siteData.activeLoaders
      //           },
      //           {
      //             name: 'Material Dispatched',
      //             value: siteData.materialDispatched
      //           },
      //           {
      //             name: 'Truck(s) Dispatched',
      //             value: siteData.trucksDispatched
      //           }
      //         ]
      //       });
      //     });
      //     return new SiteLoaded(siteWrapper);
      //   })
      // );
      return new SiteLoaded(MockData.SiteManagementMockData);
    },
    onError: (action: LoadSite, error) => {
      console.error('Error', error);
      return new SiteLoadFailed(error);
    }
  });

  @Effect()
  EditSite$ = this.dataPersistence.fetch(SiteManagementActionTypes.EditSite, {
    run: (action: EditSite) => {
      return this.siteManagementService
        .editSite(action.payload.siteId, action.payload)
        .pipe(
          map(siteData => new EditSuccess(action.payload)),
          catchError(err => of(new EditFailed(err)))
        );
    },
    onError: (action: EditSite, error) => {
      console.error('Error', error);
      return new EditFailed(error);
    }
  });

  @Effect()
  DeleteSite$ = this.dataPersistence.fetch(
    SiteManagementActionTypes.DeleteSite,
    {
      run: (action: DeleteSite) => {
        return this.siteManagementService
          .deleteSite(action.payload)
          .pipe(
            map(siteData => new DeleteSuccess(action.payload)),
            catchError(err => of(new DeleteFailed(err)))
          );
      },
      onError: (action: DeleteSite, error) => {
        console.error('Error', error);
        return new DeleteFailed(error);
      }
    }
  );

  @Effect()
  CreateSite$ = this.dataPersistence.fetch(
    SiteManagementActionTypes.CreateSite,
    {
      run: (action: CreateSite) => {
        return this.siteManagementService
          .postSite(action.payload)
          .pipe(
            map(siteData => new CreateSuccess(action.payload)),
            catchError(err => of(new CreateFailed(err)))
          );
      },
      onError: (action: CreateSite, error) => {
        console.error('Error', error);
        return new DeleteFailed(error);
      }
    }
  );

  @Effect()
  SiteKPIState$ = this.dataPersistence.fetch(
    SiteManagementActionTypes.LoadKPIDetails,
    {
      run: (action: LoadKPIDetails) => {
        return this.siteManagementService
          .getSiteKPIDetails(action.siteId, action.payload)
          .pipe(
            map(kpiData => {
              const records = {
                zoneName: null,
                materialDispatched: null,
                trucksDispatched: null,
                activeLoaders: null,
                averageTruckTimeOnSite: null,
                averageTruckTimeInQueue: null,
                noOfTrucks: null,
                jobsCount: 0
              };
              return new KPIDetailsLoaded(kpiData ? kpiData : records);
            })
          );
      },
      onError: (action: LoadKPIDetails, error) => {
        console.error('Error', error);
        return new KPIDetailsFailed(error);
      }
    }
  );

  @Effect()
  GetAssignedAssets$ = this.dataPersistence.fetch(
    SiteManagementActionTypes.LoadAssignedAssets,
    {
      run: (action: LoadAssignedAssets) => {
        // return this.siteManagementService
        //   .getAssignedAssets(action.siteId, action.payload)
        //   .pipe(
        //     map(assignedAssetData => {
        //       const records = {
        //         records: []
        //       };
        //       return new AssignedAssetsLoaded(
        //         assignedAssetData ? assignedAssetData : records
        //       );
        //     })
        //   );
        return new AssignedAssetsLoaded(MockData.MockAssignedAssets);

      },

      onError: (action: LoadAssignedAssets, error) => {
        console.error('Error', error);
        return new AssignedAssetsLoadFailed(error);
      }
    }
  );
}
