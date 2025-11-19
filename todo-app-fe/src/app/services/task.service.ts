import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem('tasks');
    const list = saved ? JSON.parse(saved) : [];
    this.tasksSubject.next(list);
  }

  private save(list: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(list));
    this.tasksSubject.next(list);
  }

  addTask(title: string) {
    const updated = [{ title, completed: false }, ...this.tasksSubject.value];
    this.save(updated);
  }

  toggleTask(index: number) {
    const updated = [...this.tasksSubject.value];
    updated[index].completed = !updated[index].completed;
    this.save(updated);
  }

  deleteTask(index: number) {
    const updated = [...this.tasksSubject.value];
    updated.splice(index, 1);
    this.save(updated);
  }
}
