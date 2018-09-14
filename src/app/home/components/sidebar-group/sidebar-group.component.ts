import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MenuItem } from '../../models';

@Component({
  selector: 'app-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss']
})
export class SidebarGroupComponent implements OnInit {
  @Input() menus: Array<MenuItem> = [];
  @Input() title = '';
  @Output() itemClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  itemClick(id: string) {
    this.itemClicked.emit(id);
  }
}
