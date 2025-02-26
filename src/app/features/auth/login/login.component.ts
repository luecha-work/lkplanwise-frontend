import { STORAGE_ACCESS_TOKEN, STORAGE_REFRESH_TOKEN } from '@/app/shared/constants/storage-constant';
import { LoginResponse } from '@/app/shared/models/auth.model';
import { AuthService } from '@/app/shared/services/auth.service';
import { Component } from '@angular/core';
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
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
})
export class LoginComponent {
    loginForm: FormGroup;
    isPasswordVisible = true;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            remember: [false],
        });
    }

    async onSubmit(): Promise<void> {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            this.authService.login(email, password).subscribe({
                next: async (loginResponse: LoginResponse) => {
                    if (loginResponse) {
                        await this.saveTokens(loginResponse.access_token, loginResponse.refresh_token);
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
        }
    }


    async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
        const { email, password, remember } = this.loginForm.value;
        localStorage.setItem(STORAGE_ACCESS_TOKEN, accessToken);
        localStorage.setItem(STORAGE_REFRESH_TOKEN, refreshToken);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("remember", remember);
    }
}
