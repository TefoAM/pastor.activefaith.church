import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MonitoringService {
  private appInsights: ApplicationInsights | null = null;

  constructor() {
    if (environment.applicationInsightsConnectionString) {
      this.appInsights = new ApplicationInsights({
        config: {
          connectionString: environment.applicationInsightsConnectionString,
          enableAutoRouteTracking: true,
        },
      });
      this.appInsights.loadAppInsights();
      this.appInsights.trackPageView();
    }
  }

  logEvent(name: string, properties?: Record<string, unknown>) {
    this.appInsights?.trackEvent({ name }, properties);
  }

  logException(exception: Error, severityLevel?: number) {
    this.appInsights?.trackException({ exception, severityLevel });
  }

  logTrace(message: string, properties?: Record<string, unknown>) {
    this.appInsights?.trackTrace({ message }, properties);
  }
}
