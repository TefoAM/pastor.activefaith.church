import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-media',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './media.html',
})
export class MediaComponent {}
