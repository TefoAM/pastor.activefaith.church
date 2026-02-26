import { ErrorHandler, Injectable, inject } from '@angular/core';
import { MonitoringService } from './monitoring.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private monitoring = inject(MonitoringService);

  handleError(error: unknown): void {
    if (error instanceof Error) {
      this.monitoring.logException(error);
    }
    console.error('Error caught by GlobalErrorHandler:', error);
  }
}
