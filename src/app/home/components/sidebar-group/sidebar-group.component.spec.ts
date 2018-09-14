import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarGroupComponent } from './sidebar-group.component';

describe('SidebarGroupComponent', () => {
  let component: SidebarGroupComponent;
  let fixture: ComponentFixture<SidebarGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
