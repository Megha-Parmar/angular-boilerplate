import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Params } from '@angular/router';
import { MpLoaderComponent } from '@app/shared/libs/mp-loader/mp-loader.component';

@Component({
  selector: 'app-mp-button',
  standalone: true,
  imports: [NgClass, MpLoaderComponent],
  templateUrl: './mp-button.component.html',
  styleUrls: ['./mp-button.component.scss']
})
export class MpButtonComponent {

  @Input() type: 'button' | 'submit' = 'button';
  @Input() class: Params;
  @Input() isDisabled = false;
  @Input() tooltip = '';
  @Input() spin = false;

  @Output() buttonTap = new EventEmitter<void>();

  click(): void {
    this.buttonTap.emit();
  }
}
