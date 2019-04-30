import { SiteState } from './site-management.reducer';
import {site, nextUrl, getDeletedSite, assignedAssets, getFailedDelete, getNoSiteLoaded, getCreateSite, getSiteLoadFailed, getCreateFailed, locationDetails, getSiteKPIDetails, getEditedSite, getEditedSiteFailed  } from './site-management.selectors';
import { Site, AssignedAssets } from '../models/sitemanagement.model'

describe('site management component selector', () => {
    let siteState: SiteState;
    beforeEach(() => {
        const createSite = (id: number, name = '', location = ''): Site => ({
            id: id,
            name: name,
            location: location,
            kpis: [],
            jobsCount: 0
          });
          const createAssignedAssets = (make = '', serialNumber = ''): AssignedAssets => ({
            make: make,
            serialNumber: serialNumber
          });
        siteState = {
          sites:[
            createSite(171, 'Zonal','Chennai,Tamil nadu'),
            createSite(211, 'Rental','Madurai,Tamil nadu')
          ],
          nextUrl: '',
          noSiteLoaded : false,
        siteDeleted: 'Site Deleted Successfully',
        siteDeleteFailed: 'Site id not exists',
        siteEdited: 'Site update Successfully',
        siteEditedFailed: 'Site id not exists',
        siteLoadFailed: 'Site Load Fails',
        locationDetails: {
            siteName: 'Zoanal',
            street: "Bahrat street",
            cityState: "Chennai, Tamil nadu"
        },
        assetDetails: null,
        siteCreate: 'Site Created Successfully',
        siteCreteFailed: 'Site name already exists',
        geofenceDetails: [{
            boundaryName: '',
            boundaryZone: '',
            isEditable: true,
            color: '',
            shape: {
                type: '',
                latlngval: {},
                radius: 0
            }
        }],
        resetTempSite: {
            siteName: "",
            street: "",
            cityState: ""
        },
        siteKPIDetails: {
            zoneName: 'Zoneq',
            materialDispatched: 1,
            trucksDispatched: 4,
            activeLoaders: 1,
            averageTruckTimeOnSite: 34,
            averageTruckTimeInQueue: 21,
            noOfTrucks: 1,
            jobsCount: 0
        },
        assignedAssets: [
            createAssignedAssets('777','YUWJW88u'),
            createAssignedAssets('777','MA8818I'),
        ]
        };
      });

    it('should handle getSiteState Selector', () => {
        const results = site.projector(
            siteState
          );
          expect(results.length).toBe(2);
    })

    it('should handle getNoSiteLoaded Selector', () => {
        const results = getNoSiteLoaded.projector(
            siteState
          );
          expect(results).toBe(siteState.noSiteLoaded);
    })

    it('should handle nextUrl Selector', () => {
        const results = nextUrl.projector(
            siteState
          );
          expect(results).toEqual(siteState.nextUrl);
    })

    it('should handle getDeletedSite Selector', () => {
        const results = getDeletedSite.projector(
            siteState
          );
          expect(results).toEqual(siteState.siteDeleted);
    })

    it('should handle getFailedDelete Selector', () => {
        const results = getFailedDelete.projector(
            siteState
          );
          expect(results).toEqual(siteState.siteDeleteFailed);
    })

    it('should handle assignedAssets Selector', () => {
        const results = assignedAssets.projector(
            siteState
          );
          expect(results.length).toBe(2);
    })

    it('should handle getCreateSite  Selector', () => {
        const results = getCreateSite.projector(
            siteState
          );
          expect(results).toEqual(siteState.siteCreate);
    })

    it('should handle getCreateFailed   Selector', () => {
        const results = getCreateFailed.projector(
            siteState
          );
          expect(results).toEqual(siteState.siteCreteFailed);
    })

    it('should handle getEditedSite  Selector', () => {
        const results = getEditedSite.projector(
            siteState
          );
          expect(results).toEqual(siteState.siteEdited);
    })

    it('should handle getEditedSiteFailed  Selector', () => {
        const results = getEditedSiteFailed.projector(
            siteState
          );
          expect(results).toEqual(siteState.siteEditedFailed);
    })

    it('should handle locationDetails Selector', () => {
        const results = locationDetails.projector(
            siteState
          );
          expect(results).toEqual(siteState.locationDetails);
    })

    it('should handle getSiteKPIDetails  Selector', () => {
        const results = getSiteKPIDetails.projector(
            siteState
          );
          expect(results).toEqual(siteState.siteKPIDetails);
    });

    it('should handle getSiteLoadFailed  Selector', () => {
        const results = getSiteLoadFailed.projector(
            siteState
          );
          expect(results).toEqual(siteState.siteLoadFailed);
    });
});
