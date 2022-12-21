import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import { ConfirmDialogService } from './confirm-dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';



@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ], exports: [
    ConfirmDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    ConfirmDialogService
  ]
})
export class MaterialModule { }
