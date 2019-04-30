import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadAssets, ResetAssets, SearchAssetAction, SearchAssetResponseReset, AssetState } from '@cc/ci-assetmanagement';
import { LoadAssignedAssets, ResetAssignedAssets, SiteState } from '../../+state';
import * as assetSelector from '@cc/ci-assetmanagement';
import * as siteSelector from '../../+state/site-management.selectors';
import { Assets, AssetMDM } from '../../models/sitemanagement.model';
import { Style } from '@cc/ui-core';
import { SEARCH_CONSTANTS, ASSET_TYPE } from '../../site-management.config';
import { Subscription } from 'rxjs';
import { cardBodyStyle, cardHeaderStyle, disabledIconStyle, enabledIconStyle, queryParam } from '../add-site.config';

@Component({
  selector: 'app-assign-assets',
  templateUrl: './assign-assets.component.html',
  styleUrls: ['./assign-assets.component.scss']
})

export class AssignAssetsComponent implements OnInit, OnDestroy {
  @Input() siteId: string;
  @Input() showSubscriptionAndaddall: Boolean;
  @Input() allowSearch: boolean;
  @Output() assetsAssigned = new EventEmitter<any>();
  assets: Array<Assets> = [];
  avaliableAssets = [];
  assignedAssets: any = [];
  totalAssetsCount: number;
  nextURL: string;
  cardHeaderStyle: Style = cardHeaderStyle;
  cardBodyStyle: Style = cardBodyStyle;
  enabledIconStyle: Style = enabledIconStyle;
  disabledIconStyle: Style = disabledIconStyle;
  queryParam = queryParam;
  assetTiles = [];
  ucId: string;
  searchInput = '';
  searchedTerm = '';
  placeHolderText: string = SEARCH_CONSTANTS.PLACEHOLDER_TEXT;
  minLength_search: number = SEARCH_CONSTANTS.MIN_LENGTH;
  ghostText: string = SEARCH_CONSTANTS.GHOST_TEXT;
  showEmptySearchResults = false;
  tagAssetSubscription = new Subscription();
  userDetails: string = '';

  constructor(private assetStore: Store<AssetState>, private siteStore: Store<SiteState>, private appStore: Store<any>) { }

  ngOnInit() {
    /* const tokenSubscription = this.appStore.select((appStore: any) => appStore.app.parsedToken).subscribe(token => {
      const query = `offset=${this.queryParam.offset}&limit=${this.queryParam.limit}`;
      this.userDetails = `${token.ucid || 'gthraves'}`;
      (this.siteId) ? this.dispatchLoadAssignedAssets() : this.resetAssignedAssets(); */
      this.assetStore.dispatch(new LoadAssets(''));
    // })
    // this.tagAssetSubscription.add(tokenSubscription);

    const assignAssetSubscription = this.assetStore.select(siteSelector.assignedAssets).subscribe((res) => {
      if (res !== null && res.length) {
        this.assignedAssets = JSON.parse(JSON.stringify(res));
      }
    });
    this.tagAssetSubscription.add(assignAssetSubscription);

    const assetSubscription = this.assetStore.select(assetSelector.getAssetState).subscribe((res) => {
      this.assets = JSON.parse(JSON.stringify(res.assets));
      this.nextURL = res.nextUrl;
      this.totalAssetsCount = (res.totalCount) ? res.totalCount : 0;
      this.renderAssetCards(res.assets);
    });
    this.tagAssetSubscription.add(assetSubscription);

    const filteredAssetsSubscrpition = this.assetStore.select(assetSelector.filteredAssets).subscribe(filteredAssets => {
      //this.renderAssetCards(filteredAssets);
    });
    this.tagAssetSubscription.add(filteredAssetsSubscrpition);

    const emptySearchSubscription = this.assetStore.select(assetSelector.emptySearchResult).subscribe(isEmpty => {
      this.showEmptySearchResults = isEmpty && this.allowSearch && !!this.searchInput;
      this.searchedTerm = this.searchInput;
    });
    this.tagAssetSubscription.add(emptySearchSubscription);
  }

  renderAssetCards(_assets) {
    /* To show 'no results found card when search is active and */
    this.assetTiles = [];
    if (_assets !== null && _assets.length) {
      this.showEmptySearchResults = false;
      this.avaliableAssets = _assets;
      this.avaliableAssets.map((assets) => {
        const isSiteMatched = (this.assignedAssets.find(list => list.serialNumber === assets.serialNumber)) ? 1 : 0;
        const iconUrl = (isSiteMatched) ? 'asset-icon-tick.svg' : 'asset-icon-add.svg';
        const subscriptions: Array<string> = assets.type && assets.type.split('|');
        const isActive = !assets.type || this.checkIfActiveAsset(assets.type);
        this.assetTiles.push({
          asset: assets,
          assets: [
            { value: '', icon: '/assets/images/asset-loader-icon-web-hd.svg', class: 'icon-loader' }
          ],
          loader: [
            {
              value: `${assets.make} ${assets.model ? assets.model : ''}`,
              class: 'tile-header-text'
            },
            {
              value: `${assets.serialNumber}`,
              class: 'tile-body-text bold-text'
            }
          ],
          sites: assets.sites ? [
            {
              value: 'Assigned',
              class: 'tile-header-text tile-opacity-text'
            },
            {
              value: `${assets.sites.length > 0 ? `${assets.sites.length} Sites` : `-`} `,
              class: `${assets.sites.length > 0 ? 'tile-body-text' : 'tile-body-text align-content'}`
            }
          ] : [],
          subscriptionTitle: [{
            value: 'Subscriptions',
            class: 'tile-header-text tile-opacity-text'
          }],
          subscriptions: subscriptions,
          icon: [
            {
              value: '',
              isSiteMatched: isSiteMatched,
              isActive: isActive,
              icon: '/assets/images/' + iconUrl,
              class: 'tmp',
              style: isActive ? this.enabledIconStyle : this.disabledIconStyle
            }
          ]
        })
      })
    }
  }

  checkIfActiveAsset(subscription: string): boolean {
    return subscription.indexOf(ASSET_TYPE.ADVANCED_PRODUCTIVITY) > -1
      || subscription.indexOf(ASSET_TYPE.VISION_LINK_LOAD_CYCLE) > -1;
  }

  dispatchLoadAssignedAssets() {
    const query = `?Ucid=${this.userDetails}`;
    this.assetStore.dispatch(new LoadAssignedAssets(this.siteId, query))
  }

  resetAssignedAssets() {
    this.assetStore.dispatch(new ResetAssets());
    this.siteStore.dispatch(new ResetAssignedAssets());
  }

  assignAssets(tile) {
    if (!tile.icon[0].isSiteMatched && tile.icon[0].isActive) {
      tile.icon[0].isSiteMatched = 1;
      tile.icon[0].icon = '/assets/images/asset-icon-tick.svg';
      const newAsset: AssetMDM = tile.asset;
      this.assignedAssets.push(newAsset);
      this.assetsAssigned.emit(this.assignedAssets);
    }
  }

  assignAll(): void {
    // setTimeout(() => {
    this.assetTiles.map((tile, i) => {
      this.assignAssets(tile);
    })
    // }, 100);
  }

  removeAssets(assignedAssets: any, index: number): void {
    const tiles = this.assetTiles.filter((tile) => tile.loader[1].value === assignedAssets.serialNumber)[0];
    /**
     * Check if removed asset exists in rendered tiles
     * if not, filter/search applied.
     * No need to reset icons, as the tiles will be
     * re-rendered when filter/search removed or changed
     */
    if (tiles) {
      tiles.icon[0].isSiteMatched = 0;
      tiles.icon[0].icon = '/assets/images/asset-icon-add.svg';
    }
    this.assignedAssets.splice(index, 1);
    (this.assignedAssets.length !== 0) ? this.assetsAssigned.emit(this.assignedAssets) :
      this.assetsAssigned.emit(null);
  }

  removeAll(): void {
    this.assetTiles.map((tile) => {
      tile.icon[0].isSiteMatched = 0;
      tile.icon[0].icon = '/assets/images/asset-icon-add.svg';
    });
    this.assignedAssets = [];
    this.assetsAssigned.emit(null);
  }

  loadAvailiableAssets() {
    if (this.nextURL) {
      const params = this.nextURL.split('&');
      const paginateParams = `${params[params.length - 2]}&${params[params.length - 1]}`;
      this.assetStore.dispatch(new LoadAssets(paginateParams))
    }
  }

  onSearchTermEntered(searchTerm: string) {
    const params = `serialNumber=${searchTerm}`;
    this.assetStore.dispatch(new SearchAssetResponseReset());
    this.assetStore.dispatch(new SearchAssetAction(params));
  }

  getAssignedAssetsTrack(index, assignedAssets) {
    return assignedAssets.serialNumber;
  }

  getAssetTilesTrack(index, assetTiles) {
    return index;
  }

  onEmptySearchField(isSearchEmpty: boolean) {
    if (isSearchEmpty) {
      this.assetStore.dispatch(new SearchAssetResponseReset());
      this.renderAssetCards(this.assets);
    }
  }

  ngOnDestroy() {
    this.tagAssetSubscription.unsubscribe();
  }
}

