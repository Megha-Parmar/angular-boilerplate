import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mp-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mp-loader.component.html'
})
export class MpLoaderComponent {

  @Input() class: { [key: string]: boolean };
}
