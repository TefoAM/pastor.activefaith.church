import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-pastor-navy text-white" role="banner">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div class="flex items-center justify-between h-16">
          <!-- Logo / Brand -->
          <a routerLink="/" class="flex items-center gap-2 text-xl font-semibold tracking-wide no-underline text-white">
            <span class="font-['Playfair_Display']">Pastor Abraham</span>
          </a>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-6 text-sm font-medium">
            <a routerLink="/" routerLinkActive="text-pastor-gold" [routerLinkActiveOptions]="{exact: true}"
               class="hover:text-pastor-gold transition-colors no-underline text-white">Home</a>
            <a routerLink="/about" routerLinkActive="text-pastor-gold"
               class="hover:text-pastor-gold transition-colors no-underline text-white">About</a>
            <a routerLink="/speaking" routerLinkActive="text-pastor-gold"
               class="hover:text-pastor-gold transition-colors no-underline text-white">Speaking</a>
            <a routerLink="/media" routerLinkActive="text-pastor-gold"
               class="hover:text-pastor-gold transition-colors no-underline text-white">Media</a>
            <a routerLink="/contact" routerLinkActive="text-pastor-gold"
               class="hover:text-pastor-gold transition-colors no-underline text-white">Contact</a>
            <a routerLink="/invite" class="btn-pastor text-sm no-underline">Invite Pastor Abraham</a>
          </div>

          <!-- Mobile Menu Button -->
          <button
            type="button"
            class="md:hidden p-2 rounded-md text-white hover:text-pastor-gold focus:outline-none focus:ring-2 focus:ring-pastor-gold"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            (click)="mobileMenuOpen.set(!mobileMenuOpen())"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              @if (mobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              }
            </svg>
          </button>
        </div>

        <!-- Mobile Nav -->
        @if (mobileMenuOpen()) {
          <div id="mobile-menu" class="md:hidden pb-4 space-y-2">
            <a routerLink="/" (click)="mobileMenuOpen.set(false)"
               class="block px-3 py-2 rounded-md hover:bg-pastor-gold/10 no-underline text-white">Home</a>
            <a routerLink="/about" (click)="mobileMenuOpen.set(false)"
               class="block px-3 py-2 rounded-md hover:bg-pastor-gold/10 no-underline text-white">About</a>
            <a routerLink="/speaking" (click)="mobileMenuOpen.set(false)"
               class="block px-3 py-2 rounded-md hover:bg-pastor-gold/10 no-underline text-white">Speaking</a>
            <a routerLink="/media" (click)="mobileMenuOpen.set(false)"
               class="block px-3 py-2 rounded-md hover:bg-pastor-gold/10 no-underline text-white">Media</a>
            <a routerLink="/contact" (click)="mobileMenuOpen.set(false)"
               class="block px-3 py-2 rounded-md hover:bg-pastor-gold/10 no-underline text-white">Contact</a>
            <a routerLink="/invite" (click)="mobileMenuOpen.set(false)"
               class="block btn-pastor text-center no-underline mt-2">Invite Pastor Abraham</a>
          </div>
        }
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly mobileMenuOpen = signal(false);
}
