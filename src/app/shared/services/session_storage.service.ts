import { STORAGE_ACCESS_TOKEN, STORAGE_REFRESH_TOKEN } from '@/app/shared/constants/storage-constant';
import { environment } from '@/environments/environment.development';
import { Injectable } from "@angular/core";

import * as CryptoJS from 'crypto-js';

const STORAGE_USER_INFO = 'user_info';

@Injectable()
export class SessionStorageService {

    saveTokens(accessToken: string, refreshToken: string): void {
        const secure = window.location.protocol === 'https:';
        const sameSite = 'Strict';

        // Set expiration times
        const accessTokenMaxAge = 30 * 60; // 30 minutes in seconds
        const refreshTokenMaxAge = 24 * 60 * 60; // 24 hours in seconds

        // Set cookies with security parameters
        document.cookie = `${STORAGE_ACCESS_TOKEN}=${accessToken}; path=/; ${secure ? 'Secure;' : ''} max-age=${accessTokenMaxAge}; SameSite=${sameSite}`;
        document.cookie = `${STORAGE_REFRESH_TOKEN}=${refreshToken}; path=/; ${secure ? 'Secure;' : ''} max-age=${refreshTokenMaxAge}; SameSite=${sameSite}`;
    }

    saveCredentials(email: string, password: string, remember: boolean): void {
        console.log(`Remember: ${remember}`);

        if (remember) {
            localStorage.setItem(`email`, `${email}`);
            const encryptedPassword = this.encrypt(password);
            localStorage.setItem(`password`, encryptedPassword);
            localStorage.setItem(`remember`, `${remember}`);
        } else {
            localStorage.removeItem(`remember`);
            localStorage.removeItem(`email`);
            localStorage.removeItem(`password`);
        }
    }

    getCredentials(): any {
        const email = localStorage.getItem(`email`);
        const encryptedPassword = localStorage.getItem(`password`);
        const remember = localStorage.getItem(`remember`);

        const password = encryptedPassword ? this.decrypt(encryptedPassword) : null;

        return { email, password, remember }
    }

    getAccessToken(): string | null {
        return this.getCookie(STORAGE_ACCESS_TOKEN);
    }

    getRefreshToken(): string | null {
        return this.getCookie(STORAGE_REFRESH_TOKEN);
    }

    saveUserInfo(userInfo: any): void {
        localStorage.setItem(STORAGE_USER_INFO, JSON.stringify(userInfo));
    }

    getUserInfo(): any {
        const userInfo = localStorage.getItem(STORAGE_USER_INFO);

        return userInfo ? JSON.parse(userInfo) : null;
    }

    async refreshAccessToken(): Promise<boolean> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            return false;
        }

        try {
            // Implement your refresh token logic here
            // This is a placeholder - you'll need to implement the actual API call
            return true;
        } catch (error) {
            console.error('Error refreshing token:', error);

            return false;
        }
    }

    clear(): void {
        // Clear cookies
        document.cookie = `${STORAGE_ACCESS_TOKEN}=; path=/; max-age=0`;
        document.cookie = `${STORAGE_REFRESH_TOKEN}=; path=/; max-age=0`;

        // Clear session storage
        localStorage.removeItem(STORAGE_USER_INFO);
    }

    logout(): void {
        console.log(`Logging out...`);

        this.clear();
    }

    private getCookie(name: string): string | null {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() || null;
        }

        return null;
    }

    private encrypt(text: string): string {
        return CryptoJS.AES.encrypt(text, environment.encryptionKey).toString();
    }

    private decrypt(encryptedText: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedText, environment.encryptionKey);

        return bytes.toString(CryptoJS.enc.Utf8);
    }
}