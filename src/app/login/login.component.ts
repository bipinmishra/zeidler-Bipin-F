import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginF: FormGroup;
  constructor(private router: Router) { }
  ngOnInit() {
    this.loginF = new FormGroup({
      id: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }
  login() {
    if (this.loginF.valid) {
      this.router.navigate(['holiday']);
    } else {
      Object.keys(this.loginF.controls).forEach(field => {
        const control = this.loginF.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }
}
