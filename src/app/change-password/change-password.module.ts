import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

import { MaterialModule } from '../shared/material.module';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';

import { ChangePasswordService } from './change-password.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChangePasswordRoutingModule,
    MaterialModule,
    HttpModule,
    PasswordStrengthBarModule
  ],
  declarations: [ChangePasswordComponent],
  providers: [ChangePasswordService]
})
export class ChangePasswordModule { }
