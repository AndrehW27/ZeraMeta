import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent {
  @Input() type: 'success' | 'error' = 'success';  // passed in from parent
  @Input() message: string = '';
  @Input() show: boolean = false;                 // visibility control

  @Output() close = new EventEmitter<void>();     // event back to parent

  onClose() {
    this.close.emit();
  }
}

