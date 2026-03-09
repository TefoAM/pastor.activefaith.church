import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { InviteComponent } from './invite';

describe('InviteComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteComponent],
      providers: [provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(InviteComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have an invalid form initially', () => {
    const fixture = TestBed.createComponent(InviteComponent);
    const component = fixture.componentInstance;
    expect(component['form'].valid).toBe(false);
  });

  it('should be valid when all required fields are filled', () => {
    const fixture = TestBed.createComponent(InviteComponent);
    const component = fixture.componentInstance;
    const form = component['form'];

    form.patchValue({
      organizerName: 'John Doe',
      organizerRole: 'Event Director',
      organization: 'Grace Church',
      email: 'john@example.com',
      phone: '0123456789',
      eventName: 'Leadership Summit',
      city: 'Johannesburg',
      venueType: 'church',
      proposedDates: '20-22 March 2026',
      audienceSize: '100-300',
      audienceType: 'leaders',
      theme: 'Leadership development',
      consentProcessing: true,
    });

    expect(form.valid).toBe(true);
  });
});
