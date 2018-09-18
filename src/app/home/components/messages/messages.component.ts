import { Component, OnInit, Input, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../../models';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @ViewChild('message_board') private messageContainer: ElementRef;

  @Input() messages: Message[] = [];

  constructor() { }

  ngOnInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

}
