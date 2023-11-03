import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActionToolbar } from '@models/common.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mp-action-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, TranslateModule],
  templateUrl: './mp-action-toolbar.component.html',
  styleUrls: ['./mp-action-toolbar.component.scss']
})
export class MpActionToolbarComponent {

  @Input() actionData: ActionToolbar[];
  @Input() rowReference: any;
}
