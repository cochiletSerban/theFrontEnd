import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFeedComponent } from './location-feed.component';

describe('LocationFeedComponent', () => {
  let component: LocationFeedComponent;
  let fixture: ComponentFixture<LocationFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
