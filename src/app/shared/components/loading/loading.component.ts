import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
    selector: 'app-loading',
    imports: [NzIconModule, NzSpinModule],
    template: `
    <div class="loading-container">
      <ng-template #indicatorTemplate><nz-icon nzType="loading" /></ng-template>
      <nz-spin nzSimple [nzIndicator]="indicatorTemplate"></nz-spin>
    </div>
  `,
    styles: [`
    :host {
      display: flex;
      width: 100%;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: #f5f5f5;
        font-size: 24px;
      }

      nz-icon {
        font-size: 70px;
      }
    `]

})
export class LoadingComponent {

}
