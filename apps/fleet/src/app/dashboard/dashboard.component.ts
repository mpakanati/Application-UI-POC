import { Component, OnInit } from '@angular/core';
import { CardHeader} from '@cc/ui-core';
import {Tile} from '@cc/ui-core';

@Component({
  selector: 'cc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  title = 'fleet';
  appCardHeader: CardHeader;
  completed: Tile[];
  weatherRequest:{};

  ngOnInit(){
    this.appCardHeader ={value:"Summalry",style:{}};
    this.weatherRequest = {'params':{'date':'2018/12/14','location':'Peoria','uom':'metric'}};
    this.completed = [{
      'class': 'icon-Completed iconStyle',
    }, {

      'class': 'tile-header',
      value: '40'
    }, {
      'class': 'tile-footer',
      'value': 'Completed'
    }]
  }
}
