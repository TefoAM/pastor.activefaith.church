import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-invite',
  imports: [ReactiveFormsModule, NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invite.html',
})
export class InviteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly form = this.fb.group({
    organizerName: ['', Validators.required],
    organizerRole: ['', Validators.required],
    organization: ['', Validators.required],
    organizerWebsite: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    eventName: ['', Validators.required],
    city: ['', Validators.required],
    venueType: ['', Validators.required],
    proposedDates: ['', Validators.required],
    sessionCount: ['1', Validators.required],
    audienceSize: ['', Validators.required],
    audienceType: ['', Validators.required],
    theme: ['', Validators.required],
    technicalNotes: [''],
    consentProcessing: [false, Validators.requiredTrue],
    honeypot: [''],
  });

  ngOnInit() {
    const topic = this.route.snapshot.queryParamMap.get('topic');
    if (topic) {
      this.form.patchValue({ theme: topic });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Honeypot check
    if (this.form.value.honeypot) {
      this.submitted.set(true);
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set('');

    this.api.submitInvite(this.form.getRawValue() as Parameters<ApiService['submitInvite']>[0]).subscribe({
      next: () => {
        this.submitting.set(false);
        this.submitted.set(true);
      },
      error: () => {
        this.submitting.set(false);
        this.errorMessage.set('Something went wrong. Please try again or email us directly.');
      },
    });
  }
}
