import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MpDialogComponent } from '@app/shared/libs/mp-dialog/mp-dialog.component';
import { DEFAULT_MAT_DIALOG_CONFIG } from '@constants/app.constants';
import { PartnerDetail } from '@models/partner.model';
import { ImportDynamicComponentService } from '@services/import-dynamic-component.service';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private _closeDialogEvent = new EventEmitter<boolean>();

  constructor(
    private matDialog: MatDialog,
    private importDynamicComponentService: ImportDynamicComponentService,
  ) { }

  openGenerateCodeDialog(data?: PartnerDetail, config = DEFAULT_MAT_DIALOG_CONFIG):
    MatDialogRef<MpDialogComponent, any> {
    const dialogRef: MatDialogRef<MpDialogComponent, any> = this.matDialog.open(MpDialogComponent, {
      data: {
        loadComponent: this.importDynamicComponentService.importGenerateCodeComponent(),
        data,
        dialogTitle: 'partner.confirmDialog.Title',
      },
      ...config
    });
    return dialogRef;
  }

  // Method to subscribe to the private event emitter
  subscribeToEvent(callback: (data: boolean) => void): void {
    this._closeDialogEvent.subscribe(callback);
  }

  // Method to emit events from the service
  emitEvent(data: boolean): void {
    this._closeDialogEvent.emit(data);
  }
}
