import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../shared/material.module';
import { HomeComponent } from './home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarGroupComponent } from './components/sidebar-group/sidebar-group.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MsgBlockComponent } from './components/msg-block/msg-block.component';
import { ChatsService } from './chats.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    MaterialModule,
    TextareaAutosizeModule
  ],
  declarations: [
    HomeComponent,
    SidebarComponent,
    SidebarGroupComponent,
    DropdownComponent,
    MessagesComponent,
    MsgBlockComponent
  ],
  providers: [
    ChatsService
  ]
})
export class HomeModule { }
