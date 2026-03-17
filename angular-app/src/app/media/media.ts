import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media',
  imports: [NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './media.html',
})
export class MediaComponent {
  protected readonly sermons = [
    {
      title: 'The Power of Now',
      date: '16 Feb 2026',
      thumbnail: 'assets/pastor/topic-insight.webp',
      watchUrl: 'https://www.youtube.com/@ActiveFaithChurch',
    },
    {
      title: "How to Grow in God's Favour",
      date: '9 Feb 2026',
      thumbnail: 'assets/pastor/speaking-hero.webp',
      watchUrl: 'https://www.youtube.com/@ActiveFaithChurch',
    },
    {
      title: 'The Courage to Change',
      date: '2 Feb 2026',
      thumbnail: 'assets/pastor/gallery-1.webp',
      watchUrl: 'https://www.youtube.com/@ActiveFaithChurch',
    },
  ];

  protected readonly podcasts = [
    {
      title: 'Faithfulness to Flourish',
      platform: 'Apple Podcasts',
      url: 'https://podcasts.apple.com/za/podcast/activefaith-church/id1465964955',
      thumbnail: 'assets/pastor/strategy-card.webp',
    },
    {
      title: 'Rise, Relate, Reach',
      platform: 'Spotify',
      url: 'https://open.spotify.com/show/3SrFPb3VGCMiMJCFP8KKGX',
      thumbnail: 'assets/pastor/leadership-card.webp',
    },
    {
      title: 'Active Faith in Real Life',
      platform: 'Apple Podcasts',
      url: 'https://podcasts.apple.com/za/podcast/activefaith-church/id1465964955',
      thumbnail: 'assets/pastor/discipleship-card.webp',
    },
    {
      title: 'From Potential to Purpose',
      platform: 'Spotify',
      url: 'https://open.spotify.com/show/3SrFPb3VGCMiMJCFP8KKGX',
      thumbnail: 'assets/pastor/hero-main.webp',
    },
  ];
}
