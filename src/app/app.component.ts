import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'png-issue';
  interestingSlides: AccessionSlide[] = [
    { slideId: 1, stain: 'H&E', partId: '1', blockId: '1', scanDate: new Date(), orderDateRescan: new Date(), orderByRescan: 'UID', printDateRescan: new Date() },
  ];
  selectedSlides: AccessionSlide[] = [];
  canOrderRescans = false;
  cols: any[] = [
    { field: 'stain', header: 'Stain', width: '0 0 8%' },
    { field: 'partId', header: 'Part', width: '0 0 5%' },
    { field: 'blockId', header: 'Block', width: '0 0 5%' },
//    { field: 'rescanReason', header: 'Rescan Reason', width: '0 0 20%' },
    { field: 'otherReason', header: 'Other Reason', width: '0 0 20%' },
    { field: 'scanDate', header: 'Scan Date', width: '0 0 10%' },
    { field: 'orderDateRescan', header: 'Order Date', width: '0 0 10%', toolTip: 'orderInfoRescan' },
    { field: 'orderByRescan', header: 'Order By', width: '0 0 7%' },
  //  { field: 'printDateRescan', header: 'Lab Received Date', width: '0 0 12%' }
  ];
  reasons: RescanReason[] = [];
  @ViewChild('slides') slides!: Table;
  onRowSelect(event: any): void {
    this.formValid();
  }
  onRowUnselect(event: any): void {
    this.formValid();
    const unselectedSlide = this.interestingSlides.find(s => s.slideId === event.data.slideId);
    if (unselectedSlide) {
      unselectedSlide.rescanReason = undefined;
      unselectedSlide.otherReason = undefined;
    }
  }
  formValid(): void {
    // console.log('Slides to order: ', this.selectedSlides);
    const others = this.selectedSlides.filter(s => s.rescanReason === 'Other').every(r => r.otherReason);
    this.canOrderRescans = this.selectedSlides.length > 0 &&
      this.selectedSlides.some(s => s.rescanReason && others);
  }
  dropDownEnabled(slide: AccessionSlide): boolean {
    return this.selectedSlides.some(s => s.slideId === slide.slideId);
  }
}

interface RescanReason{}
interface AccessionSlide {
  stain: string;
  partId: string;
  blockId: string;
  rescanReason?: string;
  otherReason?: string;
  scanDate: Date;
  orderDateRescan: Date;
  orderByRescan: string;
  printDateRescan: Date;
  slideId: number;
}

