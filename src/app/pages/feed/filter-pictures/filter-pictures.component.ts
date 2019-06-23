import { Component, OnInit, Output, EventEmitter, OnChanges, AfterViewInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-filter-pictures',
  templateUrl: './filter-pictures.component.html',
  styleUrls: ['./filter-pictures.component.scss']
})
export class FilterPicturesComponent implements OnInit, AfterViewInit {

  @Output() sorted = new EventEmitter<any>();
  @Input() loading;
  @Input() criteria;

  selectedCriteria: any;
  constructor() { }

  ngOnInit() {
    this.selectedCriteria = this.criteria[0].value;
  }

  sort(criteria) {
    if (this.loading) {
      return;
    }
    this.sorted.emit(this.selectedCriteria);
  }

  ngAfterViewInit(): void {

  }
}
