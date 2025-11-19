import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { TaskService } from '../../services/task.service';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { TaskApiService } from '../../services/task-api.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ListboxModule,
    CardModule,
    CheckboxModule,
    DividerModule
  ],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage {

  form!: FormGroup;
  tasks: any[] = []; // <— final tasks list

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: MessageService,
    private taskApi: TaskApiService,
    private theme: ThemeService,
  ) {
    this.form = this.fb.group({
      task: ['', Validators.required]
    });

    // ✔ initialize here (strict mode safe)
    // this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit() {
    this.loadTasks();
  }

  // ===============================
  // LOAD TASKS FROM BACKEND
  // ===============================
  loadTasks() {
    this.taskApi.getAll().subscribe({
      next: (res) => {
        this.tasks = res;
      },
      error: () => {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load tasks' });
      }
    });
  }



  // ===============================
  // ADD NEW TASK
  // ===============================
  addTask() {
    if (this.form.invalid) return;

    const title = this.form.value.task!;

    this.taskApi.create(title).subscribe({
      next: (task) => {
        this.tasks.unshift(task);
        this.form.reset();
      },
      error: () => {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Could not create task' });
      }
    });
  }

  // ===============================
  // TOGGLE (complete / uncomplete)
  // ===============================
  toggleTask(task: any) {
    this.taskApi.toggle(task.id).subscribe({
      next: (updated) => {
        task.completed = updated.completed;
      },
      error: () => {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Toggle failed' });
      }
    });
  }

  // ===============================
  // DELETE TASK
  // ===============================
  deleteTask(task: any, index: number) {
    this.taskApi.delete(task.id).subscribe({
      next: () => {
        this.tasks.splice(index, 1);
      },
      error: () => {
        this.toast.add({ severity: 'error', summary: 'Error', detail: 'Delete failed' });
      }
    });
  }

}
