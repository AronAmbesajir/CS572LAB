import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'child',
  template:`
    <p>
      child works!
    </p>
    <p>{{data}}</p>
  `,
  styles: [
    `
p{
  color:red
}
  `],
  encapsulation:ViewEncapsulation.Emulated
  
})
export class ChildComponent implements OnInit {

  constructor() { }

  data:string="Child Data";
  ngOnInit(): void {
  }

}
