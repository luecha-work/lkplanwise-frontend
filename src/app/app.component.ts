import { STORAGE_ACCESS_TOKEN } from '@/app/shared/constants/storage-constant';
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
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) { }

    isLoggedIn: boolean = false;
    isLoading: boolean = true;

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.checkToken();
            // window.addEventListener('storage', () => {
            //     this.checkToken();
            // });
        }
    }

    private checkToken(): void {
        this.isLoading = true; // เริ่มโหลด
        setTimeout(() => { // จำลองโหลดข้อมูลจริง (เช่น จาก API)
            if (typeof localStorage !== 'undefined') {
                const token = localStorage.getItem(STORAGE_ACCESS_TOKEN);

                if (token) {
                    this.isLoggedIn = true;
                } else {
                    this.isLoggedIn = false;
                    this.router.navigate(['/login']);
                }
                this.isLoading = false; // หยุดโหลดเมื่อเช็คเสร็จ
            }
        }, 500); // จำลองดีเลย์ครึ่งวินาที
    }
}
