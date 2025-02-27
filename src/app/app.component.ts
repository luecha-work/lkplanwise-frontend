import { selectIsLoggedIn } from './store/auth/auth.selectors';
import { logout, login } from './store/auth/auth.actions';
import { SessionStorageService } from '@/app/shared/services/session_storage.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { isPlatformBrowser } from '@angular/common';
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        LoadingComponent
    ],
    providers: [SessionStorageService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: object,
        private sessionStorageService: SessionStorageService,
        private store: Store
    ) {
        this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    }

    isLoggedIn$: Observable<boolean>;
    isLoading: boolean = true;

    ngOnInit(): void {
        this.isLoggedIn$.subscribe(isLoggedIn => {
            console.log('isLoggedIn value:', isLoggedIn);
        });
        
        if (isPlatformBrowser(this.platformId)) {
            this.checkToken();
        }
    }

    private checkToken(): void {
        this.isLoading = true;
        setTimeout(() => {
            if (typeof localStorage !== 'undefined') {
                const token = this.sessionStorageService.getAccessToken();

                if (token) {
                    this.store.dispatch(login());
                } else {
                    this.store.dispatch(logout());
                    this.router.navigate(['/login']);
                }
                this.isLoading = false;
            }
        }, 1000);
    }
}
