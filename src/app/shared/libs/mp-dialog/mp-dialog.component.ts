
import { Component, ComponentRef, DestroyRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicDirective } from '@app/core/directives/dynamic.directive';
import { DialogService } from '@app/core/services/dialog.service';
import { DynamicComponentLoaderService } from '@app/core/services/dynamic-component-loader.service';
import { MpButtonComponent } from '@app/shared/libs/mp-button/mp-button.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mp-dialog',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, DynamicDirective, MpButtonComponent],
  templateUrl: './mp-dialog.component.html',
  styleUrls: ['./mp-dialog.component.scss']
})
export class MpDialogComponent implements OnInit {

  title: string;
  customHeaderClass: string;
  loadComponent: () => Promise<unknown>;
  compData: any;

  @ViewChild(DynamicDirective, { static: true })
  private dynamicDirective: DynamicDirective;
  private destroyRef = inject(DestroyRef);

  constructor(
    public translate: TranslateService,
    public dialogService: DialogService,
    public dialogRef: MatDialogRef<MpDialogComponent>,
    private dynamicComponentLoaderService: DynamicComponentLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: {
      loadComponent: () => Promise<unknown>;
      data: any;
      dialogTitle: string;
      showHeader: boolean;
      customHeaderClass: string;
    }) {
    this.dialogService.subscribeToEvent((data) => {
      // Handle the emitted event here
      this.dialogRef.close(data);
    });
    this.title = data.dialogTitle;
    this.customHeaderClass = data.customHeaderClass;
    this.loadComponent = data.loadComponent;
    this.compData = data.data;
  }

  ngOnInit(): void {
    const viewContainerRef = this.dynamicDirective.viewContainerRef;
    this.dynamicComponentLoaderService
      .loadComponentDynamically(viewContainerRef, this.loadComponent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: ComponentRef<any>) => {
        result.instance.compData = this.compData;
      });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}