import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToolsComponent } from './list-tools.component';

describe('ListToolsComponent', () => {
  let component: ListToolsComponent;
  let fixture: ComponentFixture<ListToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListToolsComponent]
    });
    fixture = TestBed.createComponent(ListToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
