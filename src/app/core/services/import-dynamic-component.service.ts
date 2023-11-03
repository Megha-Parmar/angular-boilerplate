import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImportDynamicComponentService {

  importGenerateCodeComponent(): () => Promise<unknown> {
    return () => import('@libs/generate-code/generate-code.component').then((m) => m.GenerateCodeComponent);
  }

}
