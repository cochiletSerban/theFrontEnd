import { Component, OnInit, Output, EventEmitter, OnChanges, AfterViewInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-filter-pictures',
  templateUrl: './filter-pictures.component.html',
  styleUrls: ['./filter-pictures.component.scss']
})
export class FilterPicturesComponent implements OnInit, AfterViewInit {

  readonly userProfileCriteria = [
    { name: 'All'},
    { name: 'Private', value:  true },
    { name: 'Public',  value:  false }
  ];

  readonly feedCriteria = [
    { name: 'Latest', value: 'date' },
    { name: 'Top rated', value: 'rating' }
  ];

  criteria =  this.feedCriteria;
  selectedCriteria = this.feedCriteria[0].value; // make this influenced by route

  @Output() sorted = new EventEmitter<any>();
  @Input() loading;
  constructor() { }

  ngOnInit() { // subscribe to route to know what to filter
  }

  sort(criteria) {
    if (this.loading) {
      return;
    }
    if (this.selectedCriteria !== criteria) {
      this.selectedCriteria = criteria;
      this.sorted.emit(criteria);
    }
  }

  ngAfterViewInit(): void {
    $('select').formSelect();
  }
}
