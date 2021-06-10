import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` 
  <p> Agular</p> 
  <child></child>
  <p>{{title }}</p>
  `
  ,
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
}
