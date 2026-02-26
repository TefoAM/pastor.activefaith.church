import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

export interface InvitePayload {
  organizerName: string;
  organizerRole: string;
  organization: string;
  organizerWebsite?: string;
  email: string;
  phone: string;
  eventName: string;
  city: string;
  venueType: string;
  proposedDates: string;
  sessionCount: string;
  audienceSize: string;
  audienceType: string;
  theme: string;
  technicalNotes?: string;
  consentProcessing: boolean;
  honeypot?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface MediaKitPayload {
  name: string;
  email: string;
  organization?: string;
  optInUpdates: boolean;
  honeypot?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  submitInvite(payload: InvitePayload) {
    return this.http.post(`${this.baseUrl}/submit`, {
      formType: 'speakerInvite',
      ...payload,
    });
  }

  submitContact(payload: ContactPayload) {
    return this.http.post(`${this.baseUrl}/submit`, {
      formType: 'contact',
      ...payload,
    });
  }

  requestMediaKit(payload: MediaKitPayload) {
    return this.http.post(`${this.baseUrl}/submit`, {
      formType: 'mediaKit',
      ...payload,
    });
  }
}
