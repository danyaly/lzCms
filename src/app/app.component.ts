import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    
  `]
})
export class AppComponent {
  title = 'app works!';

  ngOnInit(){
    window.onresize = this.resizeFunc;
    this.resizeFunc();
  }

  public resizeFunc(){
    document.documentElement.style.fontSize = window.innerWidth / 1366 * 16 + 'px';
  }
}
