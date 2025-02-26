import { Component } from '@angular/core';

@Component({
    selector: 'app-loading',
    imports: [],
    template: `
    <div class="loading-container">
      <h1 class="text-red-500">Loading...</h1>
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
    `]

})
export class LoadingComponent {

}
