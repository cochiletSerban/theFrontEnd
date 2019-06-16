import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPicturesComponent } from './filter-pictures.component';

describe('FilterPicturesComponent', () => {
  let component: FilterPicturesComponent;
  let fixture: ComponentFixture<FilterPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
