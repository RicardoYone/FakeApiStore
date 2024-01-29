import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  users: User[] = [];
  formSubmitted: boolean = false;

  loginForm: any = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.emailValidate().subscribe((users) => {
      const user = users.find(
        (user) =>
          user.email === this.loginForm.value.email &&
          user.password === this.loginForm.value.password
      );

      if (user) {
        this.userService.setUser(user);
        console.log(user);

        this.router.navigate(['/']);
      } else {
        console.log(
          'No se encontró ningún usuario con ese correo electrónico y contraseña'
        );
      }
    });
  }

  emailValidate(): Observable<User[]> {
    return this.http.get<User[]>('https://api.escuelajs.co/api/v1/users');
  }
}
