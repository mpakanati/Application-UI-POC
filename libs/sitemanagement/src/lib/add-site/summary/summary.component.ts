import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SiteState } from '../../+state/site-management.reducer';
import { AssetState } from '@cc/ci-assetmanagement';
import { Store } from '@ngrx/store';
import * as stateSelector from '../../+state/site-management.selectors';
import * as AssetSelector from '@cc/ci-assetmanagement';
import { LoadSite } from '../../+state/site-management.actions';
import { SiteManagementService, WizardSteps } from '../../site-management.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Output() setSelectedIndex = new EventEmitter<any>();
  wizardSteps: any = WizardSteps;
  summaryData: any = {
    locationDetails: '',
    assetsDetails: [],
    geofenceDetails: []
  }
  constructor(private store: Store<SiteState>, private assetStore: Store<AssetState>,
    public wizardService: SiteManagementService) { 
    }

  ngOnInit() {
    this.store.select(stateSelector.locationDetails).subscribe((res) => {
      this.summaryData.locationDetails = res;
    });

    this.assetStore.select(stateSelector.assignedAssets).subscribe((res) => {
      this.summaryData.assetsDetails = res;
    });

    this.store.select(stateSelector.geofenceDetails).subscribe(res => {
      this.summaryData.geofenceDetails = res;
    });

  }

  onEditClicked(label) {
    this.setSelectedIndex.emit(label);
  }


}
