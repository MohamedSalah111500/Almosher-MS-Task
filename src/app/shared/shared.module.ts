import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ArabicNumPipe } from './pipes/arabic-num.pipe';
import { ItemComponent } from './components/item/item.component';




@NgModule({
  declarations:
    [
      EmptyStateComponent,
      LoadingSpinnerComponent,
      ItemComponent,
      ArabicNumPipe
      
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

  ],
  exports: [
    EmptyStateComponent,
    LoadingSpinnerComponent,
    ItemComponent,
    ArabicNumPipe
    
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
