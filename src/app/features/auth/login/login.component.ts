import { LoginResponse } from '@/app/shared/models/auth.model';
import { AuthService } from '@/app/api/auth-api.service';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SessionStorageService } from '@/app/shared/services/session_storage.service';
import { Store } from '@ngrx/store';
import { login } from '@/app/store/auth/auth.actions';

@Component({
    selector: 'app-login',
    imports: [
        NzDividerModule,
        NzGridModule,
        NzLayoutModule,
        NzImageModule,
        NzAvatarModule,
        NzCardModule,
        NzIconModule,
        NzButtonModule,
        NzCheckboxModule,
        NzFormModule,
        NzInputModule,
        ReactiveFormsModule,
        RouterLink,
    ],
    providers: [SessionStorageService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isPasswordVisible = true;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private sessionStorageService: SessionStorageService,
        private store: Store
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            remember: [false],
        });
    }

    ngOnInit(): void {
        this.headerLoginForm()
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            this.authService.login(email, password).subscribe({
                next: (loginResponse: LoginResponse) => {
                    if (loginResponse) {
                        // console.log(`Login response: ${JSON.stringify(loginResponse)}`);
                        this.saveTokens(loginResponse.access_token, loginResponse.refresh_token);
                        this.store.dispatch(login());
                    }
                    console.log('Login successful');
                    this.router.navigate(['/']).then(() => {
                        window.location.reload();
                    });
                },
                error: (error) => {
                    console.error('Login failed', error);
                }
            });
        } else {
            Object.values(this.loginForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    headerLoginForm(): void {
        const savedCredentials = this.sessionStorageService.getCredentials();
        
        if (savedCredentials && savedCredentials.remember) {
            this.loginForm.patchValue({
                email: savedCredentials.email,
                password: savedCredentials.password,
                remember: savedCredentials.remember
            });
        }
    }

    saveTokens(accessToken: string, refreshToken: string): void {
        const { email, password, remember } = this.loginForm.value;

        this.sessionStorageService.saveTokens(accessToken, refreshToken);
        this.sessionStorageService.saveCredentials(email, password, remember);
    }
}
