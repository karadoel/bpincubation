import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private automatic: boolean = false;
  private timeLeft: number = 15;

  constructor() {}

  public isAutomatic(): boolean {
    return this.automatic;
  }

  setAutomatic(isAutomatic: boolean): void {
    this.automatic = isAutomatic;
  }
}
