import { Component,  Input } from '@angular/core';
import { Tile } from '../models/tile.model';
import { Style } from '../models/common.model';

@Component({
  selector: 'cc-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() tile: Tile[];
  @Input() tileStyle: Style;
  @Input() tileClass: string;
  @Input() tileBodyStyle: any;

  constructor() {
  }
}
