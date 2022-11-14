import { Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private readonly alertService: TuiAlertService) {}
  showNotificationSuccess(message: string) {
    return this.alertService.open(message, { status: TuiNotification.Success });
  }
  showNotificationError(message: string) {
    return this.alertService.open(message, { status: TuiNotification.Error });
  }
}
