import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlaceSuggestionComponent } from './google-place-suggestion/google-place-suggestion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BlockSpecialCharDirective } from './block-special-char.directive';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  declarations: [GooglePlaceSuggestionComponent, BlockSpecialCharDirective],
  exports: [GooglePlaceSuggestionComponent]
})
export class GooglePlaceSuggestionModule { }
