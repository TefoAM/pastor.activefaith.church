import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

/** Speaking topics data — single source of truth for templates and routing. */
export interface SpeakingTopic {
  slug: string;
  title: string;
  synopsis: string;
  takeaways: string[];
  audienceTypes: string[];
  sessionFormats: string[];
}

export const SPEAKING_TOPICS: SpeakingTopic[] = [
  {
    slug: 'active-faith-in-real-life',
    title: 'Active Faith in Real Life',
    synopsis:
      'Faith is not passive; it is daily dependence on Jesus expressed through action, resilience, and obedience. Designed to move audiences from inspiration to tangible steps.',
    takeaways: [
      'Identify one area where passive faith needs to become active obedience',
      'Build a daily dependence rhythm anchored in Scripture',
      'Leave with a personal action plan for the next 7 days',
    ],
    audienceTypes: ['Mixed congregation', 'Revival nights', 'Church anniversaries'],
    sessionFormats: ['Keynote', 'Sunday service', 'Evangelism gathering'],
  },
  {
    slug: 'from-potential-to-purpose',
    title: 'From Potential to Purpose',
    synopsis:
      'A growth pathway for believers: aligning identity in Christ with disciplined habits and purpose-driven decisions. Strong fit with ActiveFaith\'s "God-given potential" vision language.',
    takeaways: [
      'Discover your identity anchors in Christ',
      'Map discipline habits to purpose outcomes',
      'Create a 90-day personal growth plan',
    ],
    audienceTypes: ['Young adults', 'Leadership weekends', 'Mentorship programs'],
    sessionFormats: ['Keynote', 'Breakout session', 'Discipleship intensive'],
  },
  {
    slug: 'rise-relate-reach',
    title: 'Rise, Relate, Reach',
    synopsis:
      'A transferable discipleship framework: salvation foundations (Rise), community and partnership (Relate), and ministry purpose (Reach). Positioned as a system churches can adapt.',
    takeaways: [
      'Understand the three-phase discipleship lifecycle',
      'Assess where your congregation sits on the Rise–Relate–Reach spectrum',
      'Leave with an adaptable framework for your own church context',
    ],
    audienceTypes: ['Pastors & leaders', 'Church growth summits', 'Small-group leaders'],
    sessionFormats: ['Workshop', 'Panel', 'Pastor training'],
  },
  {
    slug: 'governance-excellence-sustainable-church',
    title: 'Governance, Excellence & Sustainable Church Building',
    synopsis:
      'Practical counsel for building ministry that lasts: accountability, governance structure, stewardship, excellence culture, and sustainable volunteer mobilization.',
    takeaways: [
      'Establish accountability structures that actually work',
      'Build an excellence culture without burnout',
      'Create a sustainable volunteer mobilization strategy',
    ],
    audienceTypes: ['Leadership conferences', 'Elders/deacons', 'Church boards'],
    sessionFormats: ['Workshop', 'Breakout', 'Ministry operations retreat'],
  },
  {
    slug: 'the-courage-to-change',
    title: 'The Courage to Change',
    synopsis:
      'A transformation message aimed at turning points: honesty, repentance, renewed thinking, and decisive action.',
    takeaways: [
      'Name the area that needs courageous change',
      'Understand the biblical pattern: honesty → repentance → renewal → action',
      'Leave with one decisive commitment',
    ],
    audienceTypes: ["Men's/women's conferences", 'Recovery/renewal events', 'New Year services'],
    sessionFormats: ['Keynote', 'Altar-call night', 'Vision service'],
  },
];

@Component({
  selector: 'app-speaking',
  imports: [RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './speaking.html',
})
export class SpeakingComponent {
  protected readonly topics = SPEAKING_TOPICS;
}
