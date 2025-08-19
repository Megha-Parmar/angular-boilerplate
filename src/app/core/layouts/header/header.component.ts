
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MpEventsService } from '@app/core/services/mp-events.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private mpEventsService: MpEventsService
  ) { }

  openSidebar(): void {
    this.mpEventsService.toggleSidebar.emit(true);
  }
}
