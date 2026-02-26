import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-pastor-navy text-white py-12" role="contentinfo">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Brand -->
          <div>
            <h3 class="text-lg font-semibold text-pastor-gold mb-3">Pastor Abraham Tshabuse</h3>
            <p class="text-sm text-gray-300 leading-relaxed">
              Faith. Leadership. Potential. — Equipping believers and leaders to depend on Jesus daily
              and reach their God-given potential.
            </p>
          </div>

          <!-- Quick Links -->
          <nav aria-label="Footer navigation">
            <h3 class="text-lg font-semibold text-pastor-gold mb-3">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/about" class="text-gray-300 hover:text-pastor-gold transition-colors no-underline">About</a></li>
              <li><a routerLink="/speaking" class="text-gray-300 hover:text-pastor-gold transition-colors no-underline">Speaking Topics</a></li>
              <li><a routerLink="/media" class="text-gray-300 hover:text-pastor-gold transition-colors no-underline">Media</a></li>
              <li><a routerLink="/invite" class="text-gray-300 hover:text-pastor-gold transition-colors no-underline">Invite</a></li>
              <li><a routerLink="/contact" class="text-gray-300 hover:text-pastor-gold transition-colors no-underline">Contact</a></li>
              <li><a routerLink="/privacy-policy" class="text-gray-300 hover:text-pastor-gold transition-colors no-underline">Privacy Policy</a></li>
            </ul>
          </nav>

          <!-- Ministry Home -->
          <div>
            <h3 class="text-lg font-semibold text-pastor-gold mb-3">Ministry Home</h3>
            <p class="text-sm text-gray-300 leading-relaxed">
              Lead Pastor of
              <a href="https://activefaith.church" target="_blank" rel="noopener noreferrer"
                 class="text-pastor-gold hover:underline">ActiveFaith Church</a>,
              Ferndale, Randburg.
            </p>
            <p class="text-sm text-gray-400 mt-4">
              &copy; {{ currentYear }} Pastor Abraham Tshabuse. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
