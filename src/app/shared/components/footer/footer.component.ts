import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
    selector: 'app-footer',
    imports: [NzLayoutModule],
    template: `
        <nz-footer class="app-footer">
        <p style="margin: 0;">2025 © LKPlanWise. Crafted by - Luecha Kanmaneekul</p>
        </nz-footer>
  `,
    styles: [`
        .app-footer {
        text-align: center;
        padding: 16px;
        background: #ffffff;
        box-shadow: 0 -1px 4px rgba(0, 21, 41, 0.08);
        z-index: 1000;
        margin-top: auto;
        width: 100%;
        }
    `],
})
export class FooterComponent { }
