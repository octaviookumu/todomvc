import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  text: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    console.log(this.text)
  }

  addTodo(){
    console.log("Add todo", this.text)
  }

}
