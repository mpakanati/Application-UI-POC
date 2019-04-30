import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CardHeader } from '../models/card.model';
import {Style} from '../models/common.model';

@Component({
  selector: 'cc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Output() expand = new EventEmitter();
  @Input() cardHeader: CardHeader;
  @Input() badge: number;
  @Input() cardStyle: Style;
  @Input() expandIcon: boolean;
  @Input() cardClass: string
  @Output() cardClick = new EventEmitter();
  @Input() cardBodyStyle: Style;
  constructor() {
  }

  /**
   * Use this function to emit the expand event on Expand icon click
   *
   * @author Ashok Nadavala
   * @memberof CardComponent
   */
  expandCard(event) {
    event.stopPropagation()
    this.expand.emit();
  }
  onCardClick() {
    this.cardClick.emit()
  }
}
