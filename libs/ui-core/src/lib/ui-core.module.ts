import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { TileComponent } from './tile/tile.component';
import { FooterComponent } from './footer/footer.component';
import { DatepickerModule } from './datepicker/datepicker.module';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  imports: [CommonModule, DatepickerModule,RouterModule],
  declarations: [HeaderComponent, CardComponent, TileComponent, FooterComponent],
  exports: [HeaderComponent,CardComponent,TileComponent]
})
export class UiCoreModule {}
