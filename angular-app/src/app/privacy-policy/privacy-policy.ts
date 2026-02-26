import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-16 sm:py-20 bg-pastor-ivory">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
        <h1 class="text-4xl font-bold text-pastor-navy mb-8">Privacy Policy</h1>

        <p>
          This Privacy Policy explains how personal information is collected, used, and protected
          when you use the pastor.activefaith.church website.
        </p>

        <h2 class="text-xl font-semibold text-pastor-navy mt-8 mb-4">Information We Collect</h2>
        <p>We collect personal information only when you voluntarily submit it through forms on this site, including:</p>
        <ul>
          <li>Speaker invitation requests (name, email, phone, event details)</li>
          <li>Contact form submissions (name, email, message)</li>
          <li>Media kit requests (name, email, organization)</li>
        </ul>

        <h2 class="text-xl font-semibold text-pastor-navy mt-8 mb-4">How We Use Your Information</h2>
        <p>Personal information is used solely to:</p>
        <ul>
          <li>Respond to your inquiry or invitation request</li>
          <li>Deliver requested resources (e.g., media kit)</li>
          <li>Send updates only if you have explicitly opted in</li>
        </ul>

        <h2 class="text-xl font-semibold text-pastor-navy mt-8 mb-4">Data Storage</h2>
        <p>
          Data is stored securely on Microsoft Azure infrastructure in compliance with
          applicable data protection regulations, including POPIA.
        </p>

        <h2 class="text-xl font-semibold text-pastor-navy mt-8 mb-4">Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data at any time
          by contacting us directly.
        </p>

        <h2 class="text-xl font-semibold text-pastor-navy mt-8 mb-4">Contact</h2>
        <p>
          For privacy-related inquiries, please email
          <a href="mailto:pastor&#64;activefaith.church" class="text-pastor-gold hover:underline">
            pastor&#64;activefaith.church</a>.
        </p>
      </div>
    </section>
  `,
})
export class PrivacyPolicyComponent {}
