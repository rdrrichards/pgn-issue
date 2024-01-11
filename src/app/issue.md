I am having an issue with a InputText inside of a Table where there is a `pSelectableRow` set. I have a column with a textbox in it and when the `pSelectableRow` attribute is set the textbox does not allow spaces to be typed. If I remove `pSelectableRow` attribute, then I can add spaces to the value being typed. I need that attibute to make the application work as needed.

Here is the code to repro this issue:

Template:

```
<p-table [columns]="cols" [value]="interestingSlides" dataKey="slideId">
  <ng-template pTemplate="header" let-columns>
    <tr>
      <th *ngFor="let col of columns" [style.flex]="col?.width">
        {{col.header}}
      </th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-res let-rowData let-slide let-columns="columns" let-rowIndex="rowIndex">
    <tr [pSelectableRow]="rowData" [pSelectableRowIndex]="rowIndex">
      <td *ngFor="let col of columns" [style.flex]="col?.width">
        <input type="text" pInputText [(ngModel)]="interestingSlides[rowIndex].otherReason" [style]="{'width':'500px'}"
          maxlength="300" placeholder="primeng table; cannot add spaces here!">
      </td>
    </tr>
  </ng-template>
</p-table>

<input type="text" pInputText [(ngModel)]="interestingSlides[0].otherReason" [style]="{'width':'500px'}" maxlength="300"
  placeholder="Stand alone input text; can add spaces here!">


<table>
  <tr>
    <th *ngFor="let col of cols" [style.flex]="col?.width">
      {{col.header}}
    </th>
  </tr>
  <tr *ngFor="let row of interestingSlides; let j = index">
    <td *ngFor="let col of cols" [style.flex]="col?.width">
      <span *ngIf="!col.header.includes('Date') && !col.header.includes('Reason')">
        {{col.field}}
      </span>
      <span *ngIf="!col.header.includes('Date') && col.header.includes('Other')">
        <input type="text" [(ngModel)]="interestingSlides[j].otherReason" [style]="{'width':'500px'}" maxlength="300"
          placeholder="HTML table (no primeng components); can add spaces here, too!">
      </span>
    </td>
  </tr>
</table>
```

Backing code:

```
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    InputTextModule,
    TableModule,
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'png-issue';
  interestingSlides: RowData[] = [{ otherReason: undefined }];
  cols: any[] = [
    { field: 'otherReason', header: 'Other Reason', width: '0 0 20%' }
  ];
}

interface RowData {
  otherReason?: string;
}
```

Can someone explain why this is behaving the way it is?

