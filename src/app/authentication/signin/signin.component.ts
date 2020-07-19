import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationSvc: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm(): void{
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitSigninForm(): void{
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.authenticationSvc.signInUser(email, password).then(
      (data) => {
        console.log(data);
        this.router.navigate(['admin/dashboard']);
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }


}
