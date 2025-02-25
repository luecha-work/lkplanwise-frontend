import { LoginResponse } from '@/app/shared/models/auth.model';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceDetector } from '@/app/shared/utils/device-detector';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private deviceDetector: DeviceDetector) { }

    login(email: string, password: string): Observable<LoginResponse> {
        const device = this.deviceDetector.getDevice();

        return this.http.post<LoginResponse>(`${environment.backendLKPlanWiseUrl}/api/auth/login`, {
            email,
            password,
            ...device
        },
            {
                withCredentials: true,
            }
        );
    }
}
