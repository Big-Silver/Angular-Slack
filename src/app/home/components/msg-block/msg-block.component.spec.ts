import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgBlockComponent } from './msg-block.component';

describe('MsgBlockComponent', () => {
  let component: MsgBlockComponent;
  let fixture: ComponentFixture<MsgBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
