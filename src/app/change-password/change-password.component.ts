import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../auth/custom-validators';
import { ChangePasswordService } from './change-password.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;
  public barLabel: string = '';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  constructor(private fb: FormBuilder, private service: ChangePasswordService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      oldPassword: '',
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      confirm: ''
    }, {
      validator: Validators.compose([
        CustomValidators.matchPassword,
        CustomValidators.passwordStrength
      ])
    });
  }


  submit() {
    this.service.change(this.passwordForm.value)
      .subscribe(rst => {
        if (rst.success) {
          this.snackBar.open('Password changed successfully!', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'welcome-msg'
          });
        }
      }, err => {
        this.snackBar.open('Password change failed!', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'error-msg'
        });
      });
  }
}
