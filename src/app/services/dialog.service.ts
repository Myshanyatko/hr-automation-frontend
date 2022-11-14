import { Observable } from 'rxjs';
import { TuiDialogOptions, TuiDialogService } from '@taiga-ui/core';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private readonly dialogService: TuiDialogService) {}

  public showDialog(message: string): Observable<TuiDialogOptions<any>> {
    return this.dialogService.open(message, { label: ``, size: `s` });
  }
}
