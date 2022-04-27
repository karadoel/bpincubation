import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  messages: any[] = [];

  add(message: any): void {
    this.messages.push(message);
    console.log(message);
  }

  clear(): void {
    this.messages = [];
  }

  constructor() {}
}
