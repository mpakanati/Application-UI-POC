import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilService } from './util.service';

import { XmlToJsonPipe } from './xml-to-json.pipe';


export { UtilService } from './util.service';

@NgModule({
  imports: [CommonModule],
  providers: [UtilService],
  declarations: [XmlToJsonPipe]
})
export class UtilsModule { }