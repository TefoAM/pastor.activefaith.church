import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="sticky top-0 z-50 bg-pastor-navy/90 backdrop-blur-lg border-b border-white/15 shadow-lg text-white" role="banner">
      <nav class="max-w-6xl mx-auto px-6" aria-label="Main navigation">
        <div class="h-14 flex items-center justify-between">

          <!-- Left: Logo -->
          <div class="flex-1">
            <a routerLink="/" class="text-base font-semibold tracking-wide no-underline text-white font-['Playfair_Display']"
               aria-label="Pastor Abraham — home">
              Pastor Abraham
            </a>
          </div>

          <!-- Center: Desktop Nav -->
          <div class="hidden md:flex gap-8 text-xs tracking-widest uppercase text-white/80">
            <a routerLink="/" routerLinkActive="text-white border-b border-pastor-gold pb-1"
               [routerLinkActiveOptions]="{exact: true}"
               class="hover:text-white transition-colors no-underline">Home</a>
            <a routerLink="/about" routerLinkActive="text-white border-b border-pastor-gold pb-1"
               class="hover:text-white transition-colors no-underline">About</a>
            <a routerLink="/media" routerLinkActive="text-white border-b border-pastor-gold pb-1"
               class="hover:text-white transition-colors no-underline">Sermons &amp; Media</a>
            <a routerLink="/invite" routerLinkActive="text-white border-b border-pastor-gold pb-1"
               class="hover:text-white transition-colors no-underline">Invite</a>
          </div>

          <!-- Right: Social Icons + Mobile Hamburger -->
          <div class="flex-1 flex justify-end items-center gap-4">
            <!-- Social icons (desktop) -->
            <div class="hidden md:flex items-center gap-4 text-white/70">
              <a href="https://www.youtube.com/@ActiveFaithChurch" target="_blank" rel="noopener noreferrer"
                 aria-label="YouTube" class="hover:text-white transition-colors">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.1c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM10 15V9l5.2 3-5.2 3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/activefaithchurch" target="_blank" rel="noopener noreferrer"
                 aria-label="Instagram" class="hover:text-white transition-colors">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.851s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308C2.497 19.466 2.226 18.2 2.163 16.834 2.105 15.568 2.093 15.189 2.093 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.447 2.567 5.713 2.296 7.08 2.234 8.346 2.175 8.725 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.856.601 3.698 1.942 5.039 1.341 1.341 3.183 1.857 5.039 1.942C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.856-.085 3.698-.601 5.039-1.942 1.341-1.341 1.857-3.183 1.942-5.039.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.085-1.856-.601-3.698-1.942-5.039C20.646.673 18.804.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/activefaithchurch" target="_blank" rel="noopener noreferrer"
                 aria-label="Facebook" class="hover:text-white transition-colors">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>

            <!-- Mobile Hamburger -->
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
        </div>

        <!-- Mobile Nav (slide-down) -->
        @if (mobileMenuOpen()) {
          <div id="mobile-menu" class="md:hidden pb-4 space-y-1 border-t border-white/10 pt-2">
            <a routerLink="/" (click)="mobileMenuOpen.set(false)"
               class="block px-3 py-3 text-sm tracking-widest uppercase rounded-md hover:bg-white/10 no-underline text-white/80">Home</a>
            <a routerLink="/about" (click)="mobileMenuOpen.set(false)"
               class="block px-3 py-3 text-sm tracking-widest uppercase rounded-md hover:bg-white/10 no-underline text-white/80">About</a>
            <a routerLink="/media" (click)="mobileMenuOpen.set(false)"
               class="block px-3 py-3 text-sm tracking-widest uppercase rounded-md hover:bg-white/10 no-underline text-white/80">Sermons &amp; Media</a>
            <a routerLink="/invite" (click)="mobileMenuOpen.set(false)"
               class="block px-3 py-3 text-sm tracking-widest uppercase rounded-md hover:bg-white/10 no-underline text-pastor-gold">Invite</a>
          </div>
        }
      </nav>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly mobileMenuOpen = signal(false);
}
