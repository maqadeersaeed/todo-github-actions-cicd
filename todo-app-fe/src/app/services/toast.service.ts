import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {

  constructor(private message: MessageService) {}

  success(detail: string, summary = 'Success') {
    this.message.add({ severity: 'success', summary, detail });
  }

  error(detail: string, summary = 'Error') {
    this.message.add({ severity: 'error', summary, detail });
  }

  info(detail: string, summary = 'Info') {
    this.message.add({ severity: 'info', summary, detail });
  }

  warn(detail: string, summary = 'Warning') {
    this.message.add({ severity: 'warn', summary, detail });
  }
}
