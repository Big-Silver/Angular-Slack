import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
} from '@angular/material';

const matModules = [
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
];

@NgModule({
  imports: matModules,
  exports: matModules
})
export class MaterialModule { }
