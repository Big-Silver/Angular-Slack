import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { pick } from 'lodash';

import { CustomValidators } from '../custom-validators';
import { AuthService } from '../auth.service';
import { handleError } from '../../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      username: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
      confirm: ''
    }, {
      validator: CustomValidators.matchPassword
    });
  }

  submit() {
    this.auth.register(
      pick(this.registerForm.value, ['email', 'username', 'password'])
    ).subscribe(
      success => {
        this.router.navigate(['/home']);
      },
      handleError(this.snackBar)
    );
  }
}
