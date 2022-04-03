import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

  constructor() {}

  addTodo(text: string) {
    const newTodo: TodoInterface = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean) {
    const updatedTodos = this.todos$.getValue().map(todo => {
      return {
        ...todo,
        isCompleted
      }
    })
    this.todos$.next(updatedTodos)
  }
}
