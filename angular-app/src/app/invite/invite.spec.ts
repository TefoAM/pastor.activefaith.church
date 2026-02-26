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
});
