import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SPEAKING_TOPICS } from './speaking';

@Component({
  selector: 'app-topic-detail',
  imports: [RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topic-detail.html',
})
export class TopicDetailComponent {
  readonly topicSlug = input.required<string>();

  protected readonly topic = computed(() => {
    return SPEAKING_TOPICS.find((t) => t.slug === this.topicSlug()) ?? null;
  });
}
