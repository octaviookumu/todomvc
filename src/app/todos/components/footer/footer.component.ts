import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  noTodosClass$!: Observable<boolean>;
  activeCount$!: Observable<number>;
  itemsLeftText$!: Observable<string>;
  filter$!: Observable<FilterEnum>;
  filterEnum = FilterEnum;

  constructor(private todosService: TodosService) {
    this.checkIfNoTodos();
    this.checkActiveTodos();
    this.getItemsLeftText();
    this.filter$ = this.todosService.filter$;
  }

  ngOnInit(): void {}

  checkIfNoTodos() {
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
  }

  checkActiveTodos() {
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
  }

  getItemsLeftText() {
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => {
        let text = '';
        text = activeCount !== 1 ? 's' : '';
        return `item${text} left`;
      })
    );
  }

  changeFilter(event: Event, filterName: FilterEnum) {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }
}
