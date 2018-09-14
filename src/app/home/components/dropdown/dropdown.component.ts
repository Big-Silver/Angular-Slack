import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MenuDir, MenuItem } from '../../models';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() title = 'Title';
  @Input() showArrow = false;
  @Input() menus: Array<MenuItem> = [];
  @Input() defaultDir: MenuDir = MenuDir.Down;

  @Output() itemClicked = new EventEmitter<string>();

  menuOpen = false;
  dir = MenuDir.Down;

  constructor() { }

  ngOnInit() {
  }

  menuClick() {
    this.menuOpen = !this.menuOpen;
    if (
      (this.defaultDir === MenuDir.Down && !this.menuOpen) ||
      (this.defaultDir === MenuDir.Up && this.menuOpen)
    ) {
      this.dir = MenuDir.Down;
    } else {
      this.dir = MenuDir.Up;
    }
  }

  itemClick(id) {
    this.itemClicked.emit(id);
  }
}
