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

