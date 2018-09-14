import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from '../../models';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menus: Array<MenuItem> = [
    {
      id: 'logout',
      label: 'Logout'
    }
  ];
  directChannels: Array<MenuItem> = [
    {
      id: 'john',
      label: 'John'
    },
    {
      id: 'nick',
      label: 'Nick'
    },
  ];
  channels: Array<MenuItem> = [
    {
      id: 'general',
      label: 'General'
    }
  ];
  username = 'test';

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
  }

  menuClick(id: string) {
    if (id === 'logout') {
      this.user.resetUser();
      this.router.navigate(['/login']);
    }
  }
}
