import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  text: string = '';

  constructor(private todoService: TodosService) {
    this.todoService.todos$.subscribe((todos) => {
      console.log('Deez todos', todos);
    });
  }

  ngOnInit(): void {}

  changeText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    if (this.text) {
      console.log(this.text);
    }
  }

  addTodo() {
    if (this.text) {
      console.log('Add todo', this.text);
      this.todoService.addTodo(this.text);
    }
  }
}
