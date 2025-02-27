import { SessionStorageService } from '@/app/shared/services/session_storage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { Store } from '@ngrx/store';
import { logout } from '@/app/store/auth/auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '@/app/api/auth-api.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        NzLayoutModule,
        NzIconModule,
        NzBadgeModule,
        NzAvatarModule,
        NzButtonModule,
        NzDropDownModule,
        NzTabsModule
    ],
    providers: [SessionStorageService],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, Extracted, Extracted {
    constructor(
        private router: Router,
        private sessionStorageService: SessionStorageService,
        private authService: AuthService,
        private store: Store
    ) { }

    unreadCount = 3;
    notifications = [
        {
            id: 1,
            avatar: 'assets/avatars/josephine.jpg',
            sender: 'Josephine Thompson',
            content: 'commented on admin panel "Wow 😍 ! this admin looks good and awesome design"',
            time: new Date(),
            isRead: false,
            count: 659
        },
        {
            id: 2,
            avatarText: 'D',
            avatarColor: '#1890ff',
            sender: 'Donoghue Susan',
            content: 'Hi, How are you? What about our next meeting',
            time: new Date(),
            isRead: false,
            count: 485
        },
        {
            id: 3,
            avatar: 'assets/avatars/jacob.jpg',
            sender: 'Jacob Gines',
            content: 'Answered to your comment on the cash flow forecast\'s graph 📈.',
            time: new Date(),
            isRead: false,
            count: 355
        },
        {
            id: 4,
            icon: 'mail',
            sender: '',
            content: 'You have received 20 new messages',
            time: new Date(),
            isRead: false,
            count: 204
        }
    ];

    ngOnInit(): void {
        console.log('HeaderComponent initialized');
    }

    clearAll(): void {
        this.notifications = this.notifications.map(notification => ({
            ...notification,
            isRead: true
        }));
        this.unreadCount = 0;
    }

    logout(): void {
        try {
            const accessToken: string = this.sessionStorageService.getAccessToken() ?? '';
            this.authService.logout(accessToken).subscribe(() => {
                this.sessionStorageService.logout();
                this.store.dispatch(logout());
                this.router.navigate(['/login']);
            });
        } catch (error) {
            console.log('Error logging out:', error);
        }
    }




    viewAllNotifications(): void {
        // นำทางไปยังหน้าแสดงรายการแจ้งเตือนทั้งหมด
        console.log('View all notifications');
    }
}

interface Extracted {
    unreadCount: number;
    notifications: any;
    ngOnInit(): void;
    clearAll(): void;
    viewAllNotifications(): void;
}

interface Extracted {
    unreadCount: number;
    notifications: any;
    ngOnInit(): void;
    clearAll(): void;
    viewAllNotifications(): void;
}