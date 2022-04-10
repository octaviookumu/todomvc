import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();
  
  editingText: string = '';
  @ViewChild('textInput') textInput!: ElementRef;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log("changes", changes)
  }

  setTodoInEditMode() {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo() {
    this.todosService.removeTodo(this.todoProps.id);
  }

  toggleTodo() {
    this.todosService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event) {
    console.log('change text');
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo() {
    console.log('change todo');
    this.todosService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
